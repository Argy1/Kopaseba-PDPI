"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { z } from "zod";

const schema = z.object({
  tahun: z.string().min(1, "Tahun wajib diisi."),
  tanggal: z.string().optional().or(z.literal("")),
  judul: z.string().min(1, "Judul wajib diisi."),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi."),
});

function revalidateSejarah() {
  revalidatePath("/admin/tentang");
  revalidatePath("/tentang");
}

export type SejarahFormState = { error?: string } | undefined;

function readValues(formData: FormData) {
  return {
    tahun: formData.get("tahun"),
    tanggal: formData.get("tanggal"),
    judul: formData.get("judul"),
    deskripsi: formData.get("deskripsi"),
  };
}

export async function createSejarahAction(
  _prevState: SejarahFormState,
  formData: FormData
): Promise<SejarahFormState> {
  await requireAdmin();
  const parsed = schema.safeParse(readValues(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Input tidak valid." };

  const urutan = await prisma.sejarahTimeline.count();
  await prisma.sejarahTimeline.create({
    data: { ...parsed.data, tanggal: parsed.data.tanggal || null, urutan },
  });
  revalidateSejarah();
  return undefined;
}

export async function updateSejarahAction(
  id: number,
  _prevState: SejarahFormState,
  formData: FormData
): Promise<SejarahFormState> {
  await requireAdmin();
  const parsed = schema.safeParse(readValues(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Input tidak valid." };

  await prisma.sejarahTimeline.update({
    where: { id },
    data: { ...parsed.data, tanggal: parsed.data.tanggal || null },
  });
  revalidateSejarah();
  return undefined;
}

export async function deleteSejarahAction(id: number) {
  await requireAdmin();
  await prisma.sejarahTimeline.delete({ where: { id } });
  revalidateSejarah();
}

export async function reorderSejarahAction(id: number, direction: "up" | "down") {
  await requireAdmin();
  const items = await prisma.sejarahTimeline.findMany({ orderBy: { urutan: "asc" } });
  const index = items.findIndex((i) => i.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= items.length) return;

  const a = items[index];
  const b = items[swapIndex];
  await prisma.$transaction([
    prisma.sejarahTimeline.update({ where: { id: a.id }, data: { urutan: b.urutan } }),
    prisma.sejarahTimeline.update({ where: { id: b.id }, data: { urutan: a.urutan } }),
  ]);
  revalidateSejarah();
}
