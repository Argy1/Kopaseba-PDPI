"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { z } from "zod";

const schema = z.object({
  pertanyaan: z.string().min(1, "Pertanyaan wajib diisi."),
  jawaban: z.string().min(1, "Jawaban wajib diisi."),
});

function revalidateFAQ() {
  revalidatePath("/admin/keanggotaan");
  revalidatePath("/keanggotaan");
}

export type FAQFormState = { error?: string } | undefined;

export async function createFAQAction(_prevState: FAQFormState, formData: FormData): Promise<FAQFormState> {
  await requireAdmin();
  const parsed = schema.safeParse({ pertanyaan: formData.get("pertanyaan"), jawaban: formData.get("jawaban") });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Input tidak valid." };

  const urutan = await prisma.keanggotaanFAQ.count();
  await prisma.keanggotaanFAQ.create({ data: { ...parsed.data, urutan } });
  revalidateFAQ();
  return undefined;
}

export async function updateFAQAction(
  id: number,
  _prevState: FAQFormState,
  formData: FormData
): Promise<FAQFormState> {
  await requireAdmin();
  const parsed = schema.safeParse({ pertanyaan: formData.get("pertanyaan"), jawaban: formData.get("jawaban") });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Input tidak valid." };

  await prisma.keanggotaanFAQ.update({ where: { id }, data: parsed.data });
  revalidateFAQ();
  return undefined;
}

export async function deleteFAQAction(id: number) {
  await requireAdmin();
  await prisma.keanggotaanFAQ.delete({ where: { id } });
  revalidateFAQ();
}

export async function reorderFAQAction(id: number, direction: "up" | "down") {
  await requireAdmin();
  const items = await prisma.keanggotaanFAQ.findMany({ orderBy: { urutan: "asc" } });
  const index = items.findIndex((i) => i.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= items.length) return;

  const a = items[index];
  const b = items[swapIndex];
  await prisma.$transaction([
    prisma.keanggotaanFAQ.update({ where: { id: a.id }, data: { urutan: b.urutan } }),
    prisma.keanggotaanFAQ.update({ where: { id: b.id }, data: { urutan: a.urutan } }),
  ]);
  revalidateFAQ();
}
