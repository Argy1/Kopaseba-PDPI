"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { pengurusSchema } from "@/lib/validation/pengurus";
import { uploadMedia, deleteMediaIfUnused } from "@/lib/actions/media";
import type { PengurusKategori } from "@/generated/prisma/enums";

export type PengurusFormState = { error?: string } | undefined;

function readValues(formData: FormData) {
  return {
    kategori: formData.get("kategori"),
    nama: formData.get("nama"),
    jabatan: formData.get("jabatan"),
    urutan: formData.get("urutan") || 0,
  };
}

function revalidatePengurus() {
  revalidatePath("/admin/pengurus");
  revalidatePath("/pengurus");
  revalidatePath("/");
}

export async function createPengurusAction(
  _prevState: PengurusFormState,
  formData: FormData
): Promise<PengurusFormState> {
  const admin = await requireAdmin();
  const parsed = pengurusSchema.safeParse(readValues(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Input tidak valid." };

  let fotoMediaId: number | undefined;
  const foto = formData.get("foto");
  if (foto instanceof File && foto.size > 0) {
    fotoMediaId = await uploadMedia(foto, parsed.data.nama, Number(admin.id));
  }

  const urutan = await prisma.pengurus.count({ where: { kategori: parsed.data.kategori } });

  await prisma.pengurus.create({
    data: {
      kategori: parsed.data.kategori,
      nama: parsed.data.nama,
      jabatan: parsed.data.jabatan || null,
      urutan,
      fotoMediaId,
    },
  });

  revalidatePengurus();
  redirect("/admin/pengurus");
}

export async function updatePengurusAction(
  id: number,
  _prevState: PengurusFormState,
  formData: FormData
): Promise<PengurusFormState> {
  const admin = await requireAdmin();
  const current = await prisma.pengurus.findUnique({ where: { id } });
  if (!current) return { error: "Data tidak ditemukan." };

  const parsed = pengurusSchema.safeParse(readValues(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Input tidak valid." };

  let fotoMediaId = current.fotoMediaId;
  const foto = formData.get("foto");
  if (foto instanceof File && foto.size > 0) {
    const newId = await uploadMedia(foto, parsed.data.nama, Number(admin.id));
    const oldId = current.fotoMediaId;
    fotoMediaId = newId;
    if (oldId) await deleteMediaIfUnused(oldId);
  }

  await prisma.pengurus.update({
    where: { id },
    data: {
      kategori: parsed.data.kategori,
      nama: parsed.data.nama,
      jabatan: parsed.data.jabatan || null,
      urutan: parsed.data.urutan,
      fotoMediaId,
    },
  });

  revalidatePengurus();
  redirect("/admin/pengurus");
}

export async function deletePengurusAction(id: number) {
  await requireAdmin();
  const item = await prisma.pengurus.delete({ where: { id } });
  if (item.fotoMediaId) await deleteMediaIfUnused(item.fotoMediaId);
  revalidatePengurus();
}

export async function reorderPengurusAction(id: number, kategori: PengurusKategori, direction: "up" | "down") {
  await requireAdmin();
  const items = await prisma.pengurus.findMany({ where: { kategori }, orderBy: { urutan: "asc" } });
  const index = items.findIndex((i) => i.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= items.length) return;

  const a = items[index];
  const b = items[swapIndex];
  await prisma.$transaction([
    prisma.pengurus.update({ where: { id: a.id }, data: { urutan: b.urutan } }),
    prisma.pengurus.update({ where: { id: b.id }, data: { urutan: a.urutan } }),
  ]);

  revalidatePengurus();
}
