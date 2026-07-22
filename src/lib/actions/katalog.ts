"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { katalogItemSchema, slugify } from "@/lib/validation/katalog";
import { uploadMedia, deleteMediaIfUnused } from "@/lib/actions/media";

export type KatalogFormState = { error?: string } | undefined;

function readFormValues(formData: FormData) {
  return {
    kategori: formData.get("kategori"),
    nama: formData.get("nama"),
    slug: formData.get("slug"),
    mitraNama: formData.get("mitraNama"),
    ringkasan: formData.get("ringkasan"),
    deskripsi: formData.get("deskripsi"),
    komposisi: formData.get("komposisi"),
    wilayahKetersediaan: formData.get("wilayahKetersediaan"),
    harga: formData.get("harga") || undefined,
    tampilkanHarga: formData.get("tampilkanHarga") === "on",
    published: formData.get("published") === "on",
    urutan: formData.get("urutan") || 0,
  };
}

export async function createKatalogAction(
  _prevState: KatalogFormState,
  formData: FormData
): Promise<KatalogFormState> {
  const admin = await requireAdmin();

  const parsed = katalogItemSchema.safeParse(readFormValues(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Input tidak valid." };
  }

  const slug = slugify(parsed.data.slug || parsed.data.nama);
  const existing = await prisma.katalogItem.findUnique({ where: { slug } });
  if (existing) {
    return { error: "Slug sudah dipakai item lain, gunakan slug yang berbeda." };
  }

  let imageMediaId: number | undefined;
  const foto = formData.get("foto");
  if (foto instanceof File && foto.size > 0) {
    imageMediaId = await uploadMedia(foto, parsed.data.nama, Number(admin.id));
  }

  const urutan = await prisma.katalogItem.count({ where: { kategori: parsed.data.kategori } });

  const item = await prisma.katalogItem.create({
    data: {
      kategori: parsed.data.kategori,
      nama: parsed.data.nama,
      slug,
      mitraNama: parsed.data.mitraNama || null,
      ringkasan: parsed.data.ringkasan,
      deskripsi: parsed.data.deskripsi,
      komposisi: parsed.data.komposisi || null,
      wilayahKetersediaan: parsed.data.wilayahKetersediaan || null,
      harga: parsed.data.harga ?? null,
      tampilkanHarga: parsed.data.tampilkanHarga,
      published: parsed.data.published,
      urutan,
      imageMediaId,
    },
  });

  revalidatePath("/admin/katalog");
  revalidatePath("/katalog");
  revalidatePath(`/katalog/${item.slug}`);
  revalidatePath("/");
  redirect("/admin/katalog");
}

export async function updateKatalogAction(
  id: number,
  _prevState: KatalogFormState,
  formData: FormData
): Promise<KatalogFormState> {
  const admin = await requireAdmin();

  const current = await prisma.katalogItem.findUnique({ where: { id } });
  if (!current) return { error: "Item tidak ditemukan." };

  const parsed = katalogItemSchema.safeParse(readFormValues(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Input tidak valid." };
  }

  const slug = slugify(parsed.data.slug || parsed.data.nama);
  if (slug !== current.slug) {
    const existing = await prisma.katalogItem.findUnique({ where: { slug } });
    if (existing) {
      return { error: "Slug sudah dipakai item lain, gunakan slug yang berbeda." };
    }
  }

  let imageMediaId = current.imageMediaId;
  const foto = formData.get("foto");
  if (foto instanceof File && foto.size > 0) {
    const newId = await uploadMedia(foto, parsed.data.nama, Number(admin.id));
    const oldId = current.imageMediaId;
    imageMediaId = newId;
    if (oldId) await deleteMediaIfUnused(oldId);
  }

  await prisma.katalogItem.update({
    where: { id },
    data: {
      kategori: parsed.data.kategori,
      nama: parsed.data.nama,
      slug,
      mitraNama: parsed.data.mitraNama || null,
      ringkasan: parsed.data.ringkasan,
      deskripsi: parsed.data.deskripsi,
      komposisi: parsed.data.komposisi || null,
      wilayahKetersediaan: parsed.data.wilayahKetersediaan || null,
      harga: parsed.data.harga ?? null,
      tampilkanHarga: parsed.data.tampilkanHarga,
      published: parsed.data.published,
      urutan: parsed.data.urutan,
      imageMediaId,
    },
  });

  revalidatePath("/admin/katalog");
  revalidatePath("/katalog");
  revalidatePath(`/katalog/${slug}`);
  if (slug !== current.slug) revalidatePath(`/katalog/${current.slug}`);
  revalidatePath("/");
  redirect("/admin/katalog");
}

export async function deleteKatalogAction(id: number) {
  await requireAdmin();
  const item = await prisma.katalogItem.delete({ where: { id } });
  if (item.imageMediaId) await deleteMediaIfUnused(item.imageMediaId);

  revalidatePath("/admin/katalog");
  revalidatePath("/katalog");
  revalidatePath(`/katalog/${item.slug}`);
  revalidatePath("/");
}

export async function togglePublishedAction(id: number, published: boolean) {
  await requireAdmin();
  const item = await prisma.katalogItem.update({ where: { id }, data: { published } });
  revalidatePath("/admin/katalog");
  revalidatePath("/katalog");
  revalidatePath(`/katalog/${item.slug}`);
  revalidatePath("/");
}
