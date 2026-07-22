import { z } from "zod";

export const kontakSettingsSchema = z.object({
  kontakAlamat: z.string().min(1, "Alamat wajib diisi."),
  kontakEmail: z.email("Email tidak valid."),
  kontakMapEmbedUrl: z.string().min(1, "URL embed peta wajib diisi."),
});

export type KontakSettingsInput = z.infer<typeof kontakSettingsSchema>;

export const legalitasDocSchema = z.object({
  judul: z.string().min(1, "Judul wajib diisi."),
  keterangan: z.string().min(1, "Keterangan wajib diisi."),
  pasal: z.string().optional().or(z.literal("")),
  catatan: z.string().optional().or(z.literal("")),
  urutan: z.coerce.number().int().default(0),
});

export type LegalitasDocInput = z.infer<typeof legalitasDocSchema>;

export const unitUsahaPillarSchema = z.object({
  judul: z.string().min(1, "Judul wajib diisi."),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi."),
  urutan: z.coerce.number().int().default(0),
});

export type UnitUsahaPillarInput = z.infer<typeof unitUsahaPillarSchema>;

export const tentangSettingsSchema = z.object({
  landasan: z.string().min(1, "Landasan wajib diisi."),
  asas: z.string().min(1, "Asas wajib diisi."),
  tujuanKoperasi: z.string().min(1, "Tujuan wajib diisi."),
});

export type TentangSettingsInput = z.infer<typeof tentangSettingsSchema>;

export const programKerjaSettingsSchema = z.object({
  programKerjaSkemaBagiHasilJudul: z.string().min(1, "Judul wajib diisi."),
  programKerjaPengembanganObatJudul: z.string().min(1, "Judul wajib diisi."),
  programKerjaPengembanganObatDeskripsi: z.string().min(1, "Deskripsi wajib diisi."),
});

export type ProgramKerjaSettingsInput = z.infer<typeof programKerjaSettingsSchema>;
