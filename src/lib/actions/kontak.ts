"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { kontakSettingsSchema } from "@/lib/validation/settings";

export type KontakFormState = { error?: string; success?: boolean } | undefined;

export async function updateKontakAction(
  _prevState: KontakFormState,
  formData: FormData
): Promise<KontakFormState> {
  await requireAdmin();

  const parsed = kontakSettingsSchema.safeParse({
    kontakAlamat: formData.get("kontakAlamat"),
    kontakEmail: formData.get("kontakEmail"),
    kontakMapEmbedUrl: formData.get("kontakMapEmbedUrl"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Input tidak valid." };
  }

  await prisma.siteSettings.update({
    where: { id: 1 },
    data: parsed.data,
  });

  revalidatePath("/admin/kontak");
  revalidatePath("/kontak");
  revalidatePath("/");
  return { success: true };
}
