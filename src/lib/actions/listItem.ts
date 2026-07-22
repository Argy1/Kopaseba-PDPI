"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import type { ListSection } from "@/generated/prisma/enums";
import { z } from "zod";

const schema = z.object({ teks: z.string().min(1, "Teks wajib diisi.") });

const sectionPaths: Record<ListSection, string[]> = {
  SYARAT_ANGGOTA: ["/admin/keanggotaan", "/keanggotaan"],
  HAK_ANGGOTA: ["/admin/keanggotaan", "/keanggotaan"],
  KEWAJIBAN_ANGGOTA: ["/admin/keanggotaan", "/keanggotaan"],
  PROSEDUR_PENDAFTARAN: ["/admin/keanggotaan", "/keanggotaan"],
  LANDASAN_PRINSIP: ["/admin/tentang", "/tentang"],
  FUNGSI_PERAN: ["/admin/tentang", "/tentang"],
  PROGRAM_JANGKA_PENDEK: ["/admin/program-kerja", "/program-kerja", "/"],
  PROGRAM_JANGKA_PANJANG: ["/admin/program-kerja", "/program-kerja", "/"],
  PROGRAM_SKEMA_BAGI_HASIL_POIN: ["/admin/program-kerja", "/program-kerja"],
};

function revalidateSection(section: ListSection) {
  for (const path of sectionPaths[section]) revalidatePath(path);
}

export type ListItemFormState = { error?: string } | undefined;

export async function createListItemAction(section: ListSection, formData: FormData) {
  await requireAdmin();
  const parsed = schema.safeParse({ teks: formData.get("teks") });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const urutan = await prisma.listItem.count({ where: { section } });
  await prisma.listItem.create({ data: { section, teks: parsed.data.teks, urutan } });

  revalidateSection(section);
  return { error: undefined };
}

export async function updateListItemAction(id: number, section: ListSection, teks: string) {
  await requireAdmin();
  const parsed = schema.safeParse({ teks });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  await prisma.listItem.update({ where: { id }, data: { teks: parsed.data.teks } });
  revalidateSection(section);
  return { error: undefined };
}

export async function deleteListItemAction(id: number, section: ListSection) {
  await requireAdmin();
  await prisma.listItem.delete({ where: { id } });
  revalidateSection(section);
}

export async function reorderListItemAction(id: number, section: ListSection, direction: "up" | "down") {
  await requireAdmin();
  const items = await prisma.listItem.findMany({ where: { section }, orderBy: { urutan: "asc" } });
  const index = items.findIndex((i) => i.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= items.length) return;

  const a = items[index];
  const b = items[swapIndex];
  await prisma.$transaction([
    prisma.listItem.update({ where: { id: a.id }, data: { urutan: b.urutan } }),
    prisma.listItem.update({ where: { id: b.id }, data: { urutan: a.urutan } }),
  ]);

  revalidateSection(section);
}
