import { z } from "zod";

export const pengurusKategoriValues = ["PIMPINAN", "DEWAN_PENGAWAS", "ANGGOTA", "SEKRETARIAT"] as const;

export const pengurusKategoriLabel: Record<(typeof pengurusKategoriValues)[number], string> = {
  PIMPINAN: "Pimpinan",
  DEWAN_PENGAWAS: "Dewan Pengawas",
  ANGGOTA: "Anggota",
  SEKRETARIAT: "Sekretariat",
};

export const pengurusSchema = z.object({
  kategori: z.enum(pengurusKategoriValues),
  nama: z.string().min(1, "Nama wajib diisi."),
  jabatan: z.string().optional().or(z.literal("")),
  urutan: z.coerce.number().int().default(0),
});

export type PengurusInput = z.infer<typeof pengurusSchema>;
