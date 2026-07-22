"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { unitUsahaPillarSchema } from "@/lib/validation/settings";

export type UnitUsahaFormState = { error?: string; success?: boolean } | undefined;

export async function updateUnitUsahaPillarAction(
  id: number,
  _prevState: UnitUsahaFormState,
  formData: FormData
): Promise<UnitUsahaFormState> {
  await requireAdmin();
  const parsed = unitUsahaPillarSchema.safeParse({
    judul: formData.get("judul"),
    deskripsi: formData.get("deskripsi"),
    urutan: formData.get("urutan") || 0,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Input tidak valid." };

  await prisma.unitUsahaPillar.update({
    where: { id },
    data: parsed.data,
  });

  revalidatePath("/admin/unit-usaha");
  revalidatePath("/unit-usaha");
  return { success: true };
}
