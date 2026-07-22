import { z } from "zod";

export const katalogKategoriValues = ["PRODUK_MITRA", "LAYANAN_UNIT_USAHA"] as const;

export const katalogItemSchema = z.object({
  kategori: z.enum(katalogKategoriValues),
  nama: z.string().min(1, "Nama wajib diisi."),
  slug: z
    .string()
    .min(1, "Slug wajib diisi.")
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Slug hanya boleh huruf kecil, angka, dan tanda hubung."),
  mitraNama: z.string().optional().or(z.literal("")),
  ringkasan: z.string().min(1, "Ringkasan wajib diisi."),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi."),
  komposisi: z.string().optional().or(z.literal("")),
  wilayahKetersediaan: z.string().optional().or(z.literal("")),
  harga: z.coerce.number().nonnegative("Harga tidak boleh negatif.").optional(),
  tampilkanHarga: z.coerce.boolean().default(false),
  published: z.coerce.boolean().default(true),
  urutan: z.coerce.number().int().default(0),
});

export type KatalogItemInput = z.infer<typeof katalogItemSchema>;

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
