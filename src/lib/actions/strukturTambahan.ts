"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { z } from "zod";

const schema = z.object({
  nama: z.string().min(1, "Nama wajib diisi."),
  babPasal: z.string().min(1, "Rujukan pasal wajib diisi."),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi."),
});

export type StrukturTambahanFormState = { error?: string; success?: boolean } | undefined;

export async function updateStrukturTambahanAction(
  id: number,
  _prevState: StrukturTambahanFormState,
  formData: FormData
): Promise<StrukturTambahanFormState> {
  await requireAdmin();
  const parsed = schema.safeParse({
    nama: formData.get("nama"),
    babPasal: formData.get("babPasal"),
    deskripsi: formData.get("deskripsi"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Input tidak valid." };

  await prisma.strukturTambahan.update({ where: { id }, data: parsed.data });

  revalidatePath("/admin/pengurus");
  revalidatePath("/pengurus");
  return { success: true };
}
