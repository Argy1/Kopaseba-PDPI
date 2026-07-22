"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { legalitasDocSchema } from "@/lib/validation/settings";

export type LegalitasFormState = { error?: string } | undefined;

function readValues(formData: FormData) {
  return {
    judul: formData.get("judul"),
    keterangan: formData.get("keterangan"),
    pasal: formData.get("pasal"),
    catatan: formData.get("catatan"),
    urutan: formData.get("urutan") || 0,
  };
}

function revalidateLegalitas() {
  revalidatePath("/admin/legalitas");
  revalidatePath("/legalitas");
}

export async function createLegalitasAction(
  _prevState: LegalitasFormState,
  formData: FormData
): Promise<LegalitasFormState> {
  await requireAdmin();
  const parsed = legalitasDocSchema.safeParse(readValues(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Input tidak valid." };

  const urutan = await prisma.legalitasDoc.count();

  await prisma.legalitasDoc.create({
    data: {
      judul: parsed.data.judul,
      keterangan: parsed.data.keterangan,
      pasal: parsed.data.pasal || null,
      catatan: parsed.data.catatan || null,
      urutan,
    },
  });

  revalidateLegalitas();
  redirect("/admin/legalitas");
}

export async function updateLegalitasAction(
  id: number,
  _prevState: LegalitasFormState,
  formData: FormData
): Promise<LegalitasFormState> {
  await requireAdmin();
  const parsed = legalitasDocSchema.safeParse(readValues(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Input tidak valid." };

  await prisma.legalitasDoc.update({
    where: { id },
    data: {
      judul: parsed.data.judul,
      keterangan: parsed.data.keterangan,
      pasal: parsed.data.pasal || null,
      catatan: parsed.data.catatan || null,
      urutan: parsed.data.urutan,
    },
  });

  revalidateLegalitas();
  redirect("/admin/legalitas");
}

export async function deleteLegalitasAction(id: number) {
  await requireAdmin();
  await prisma.legalitasDoc.delete({ where: { id } });
  revalidateLegalitas();
}

export async function reorderLegalitasAction(id: number, direction: "up" | "down") {
  await requireAdmin();
  const items = await prisma.legalitasDoc.findMany({ orderBy: { urutan: "asc" } });
  const index = items.findIndex((i) => i.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= items.length) return;

  const a = items[index];
  const b = items[swapIndex];
  await prisma.$transaction([
    prisma.legalitasDoc.update({ where: { id: a.id }, data: { urutan: b.urutan } }),
    prisma.legalitasDoc.update({ where: { id: b.id }, data: { urutan: a.urutan } }),
  ]);

  revalidateLegalitas();
}
