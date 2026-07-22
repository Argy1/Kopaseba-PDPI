"use client";

import { useActionState, useState } from "react";
import { createKatalogAction, updateKatalogAction, type KatalogFormState } from "@/lib/actions/katalog";
import { slugify } from "@/lib/validation/katalog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Field, FieldGroup, FieldLabel, FieldError, FieldDescription } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";

type KatalogKategori = "PRODUK_MITRA" | "LAYANAN_UNIT_USAHA";

export type KatalogFormValues = {
  id: number;
  kategori: KatalogKategori;
  nama: string;
  slug: string;
  mitraNama: string | null;
  ringkasan: string;
  deskripsi: string;
  komposisi: string | null;
  wilayahKetersediaan: string | null;
  harga: string | null;
  tampilkanHarga: boolean;
  published: boolean;
  urutan: number;
  imageMediaId: number | null;
};

export function KatalogForm({ initial }: { initial?: KatalogFormValues }) {
  const action = initial ? updateKatalogAction.bind(null, initial.id) : createKatalogAction;
  const [state, formAction, pending] = useActionState<KatalogFormState, FormData>(action, undefined);

  const [kategori, setKategori] = useState<KatalogKategori>(initial?.kategori ?? "PRODUK_MITRA");
  const [nama, setNama] = useState(initial?.nama ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!initial);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initial?.imageMediaId ? `/api/media/${initial.imageMediaId}` : null
  );

  return (
    <form action={formAction}>
      <FieldGroup>
        <Field>
          <FieldLabel>Kategori</FieldLabel>
          <ToggleGroup
            value={[kategori]}
            onValueChange={(vals) => vals[0] && setKategori(vals[0] as KatalogKategori)}
            variant="outline"
          >
            <ToggleGroupItem value="PRODUK_MITRA">Produk Mitra</ToggleGroupItem>
            <ToggleGroupItem value="LAYANAN_UNIT_USAHA">Layanan Unit Usaha</ToggleGroupItem>
          </ToggleGroup>
          <input type="hidden" name="kategori" value={kategori} />
        </Field>

        <Field data-invalid={!!state?.error}>
          <FieldLabel htmlFor="nama">Nama</FieldLabel>
          <Input
            id="nama"
            name="nama"
            required
            value={nama}
            onChange={(e) => {
              setNama(e.target.value);
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
          />
        </Field>

        <Field data-invalid={!!state?.error}>
          <FieldLabel htmlFor="slug">Slug</FieldLabel>
          <Input
            id="slug"
            name="slug"
            required
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugTouched(true);
            }}
          />
          <FieldDescription>Dipakai di URL: /katalog/{slug || "..."}</FieldDescription>
        </Field>

        {kategori === "PRODUK_MITRA" && (
          <Field>
            <FieldLabel htmlFor="mitraNama">Nama mitra</FieldLabel>
            <Input id="mitraNama" name="mitraNama" defaultValue={initial?.mitraNama ?? ""} placeholder="mis. PT Novel Pharmaceutical" />
          </Field>
        )}

        <Field data-invalid={!!state?.error}>
          <FieldLabel htmlFor="ringkasan">Ringkasan</FieldLabel>
          <Textarea id="ringkasan" name="ringkasan" required rows={2} defaultValue={initial?.ringkasan ?? ""} />
          <FieldDescription>Teks singkat yang tampil di kartu daftar katalog.</FieldDescription>
        </Field>

        <Field data-invalid={!!state?.error}>
          <FieldLabel htmlFor="deskripsi">Deskripsi lengkap</FieldLabel>
          <Textarea id="deskripsi" name="deskripsi" required rows={4} defaultValue={initial?.deskripsi ?? ""} />
        </Field>

        <Field>
          <FieldLabel htmlFor="komposisi">Komposisi / spesifikasi (opsional)</FieldLabel>
          <Textarea id="komposisi" name="komposisi" rows={2} defaultValue={initial?.komposisi ?? ""} />
        </Field>

        <Field>
          <FieldLabel htmlFor="wilayahKetersediaan">Wilayah ketersediaan (opsional)</FieldLabel>
          <Input id="wilayahKetersediaan" name="wilayahKetersediaan" defaultValue={initial?.wilayahKetersediaan ?? ""} />
        </Field>

        <Field>
          <FieldLabel htmlFor="harga">Harga (opsional, Rp)</FieldLabel>
          <Input id="harga" name="harga" type="number" min={0} step="0.01" defaultValue={initial?.harga ?? ""} />
        </Field>

        <Field orientation="horizontal">
          <FieldLabel htmlFor="tampilkanHarga">Tampilkan harga ke publik</FieldLabel>
          <Switch id="tampilkanHarga" name="tampilkanHarga" defaultChecked={initial?.tampilkanHarga ?? false} />
        </Field>

        <Field orientation="horizontal">
          <FieldLabel htmlFor="published">Tayang di situs publik</FieldLabel>
          <Switch id="published" name="published" defaultChecked={initial?.published ?? true} />
        </Field>

        {initial && (
          <Field>
            <FieldLabel htmlFor="urutan">Urutan tampil</FieldLabel>
            <Input id="urutan" name="urutan" type="number" defaultValue={initial.urutan} />
          </Field>
        )}

        <Field>
          <FieldLabel htmlFor="foto">Foto</FieldLabel>
          {previewUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-lg border border-border mb-2" />
          )}
          <Input
            id="foto"
            name="foto"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPreviewUrl(URL.createObjectURL(file));
            }}
          />
          <FieldDescription>Kosongkan jika tidak ingin mengganti foto.</FieldDescription>
        </Field>

        <FieldError errors={state?.error ? [{ message: state.error }] : undefined} />

        <Button type="submit" disabled={pending}>
          {pending && <Spinner data-icon="inline-start" />}
          {initial ? "Simpan perubahan" : "Tambah item"}
        </Button>
      </FieldGroup>
    </form>
  );
}
