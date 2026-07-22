"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { tentangSettingsSchema } from "@/lib/validation/settings";

export type TentangFormState = { error?: string; success?: boolean } | undefined;

export async function updateTentangAction(
  _prevState: TentangFormState,
  formData: FormData
): Promise<TentangFormState> {
  await requireAdmin();
  const parsed = tentangSettingsSchema.safeParse({
    landasan: formData.get("landasan"),
    asas: formData.get("asas"),
    tujuanKoperasi: formData.get("tujuanKoperasi"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Input tidak valid." };

  await prisma.siteSettings.update({ where: { id: 1 }, data: parsed.data });

  revalidatePath("/admin/tentang");
  revalidatePath("/tentang");
  return { success: true };
}
