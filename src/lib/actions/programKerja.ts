"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { programKerjaSettingsSchema } from "@/lib/validation/settings";

export type ProgramKerjaFormState = { error?: string; success?: boolean } | undefined;

export async function updateProgramKerjaAction(
  _prevState: ProgramKerjaFormState,
  formData: FormData
): Promise<ProgramKerjaFormState> {
  await requireAdmin();
  const parsed = programKerjaSettingsSchema.safeParse({
    programKerjaSkemaBagiHasilJudul: formData.get("programKerjaSkemaBagiHasilJudul"),
    programKerjaPengembanganObatJudul: formData.get("programKerjaPengembanganObatJudul"),
    programKerjaPengembanganObatDeskripsi: formData.get("programKerjaPengembanganObatDeskripsi"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Input tidak valid." };

  await prisma.siteSettings.update({ where: { id: 1 }, data: parsed.data });

  revalidatePath("/admin/program-kerja");
  revalidatePath("/program-kerja");
  return { success: true };
}
