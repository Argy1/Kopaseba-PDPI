"use client";

import { useActionState, useState } from "react";
import { createPengurusAction, updatePengurusAction, type PengurusFormState } from "@/lib/actions/pengurus";
import { pengurusKategoriValues, pengurusKategoriLabel } from "@/lib/validation/pengurus";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Field, FieldGroup, FieldLabel, FieldError, FieldDescription } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";

type PengurusKategori = (typeof pengurusKategoriValues)[number];

export type PengurusFormValues = {
  id: number;
  kategori: PengurusKategori;
  nama: string;
  jabatan: string | null;
  urutan: number;
  fotoMediaId: number | null;
};

export function PengurusForm({ initial, defaultKategori }: { initial?: PengurusFormValues; defaultKategori?: PengurusKategori }) {
  const action = initial ? updatePengurusAction.bind(null, initial.id) : createPengurusAction;
  const [state, formAction, pending] = useActionState<PengurusFormState, FormData>(action, undefined);

  const [kategori, setKategori] = useState<PengurusKategori>(initial?.kategori ?? defaultKategori ?? "ANGGOTA");
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initial?.fotoMediaId ? `/api/media/${initial.fotoMediaId}` : null
  );

  return (
    <form action={formAction}>
      <FieldGroup>
        <Field>
          <FieldLabel>Kategori</FieldLabel>
          <ToggleGroup
            value={[kategori]}
            onValueChange={(vals) => vals[0] && setKategori(vals[0] as PengurusKategori)}
            variant="outline"
          >
            {pengurusKategoriValues.map((k) => (
              <ToggleGroupItem key={k} value={k}>
                {pengurusKategoriLabel[k]}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <input type="hidden" name="kategori" value={kategori} />
        </Field>

        <Field data-invalid={!!state?.error}>
          <FieldLabel htmlFor="nama">Nama lengkap</FieldLabel>
          <Input id="nama" name="nama" required defaultValue={initial?.nama ?? ""} />
        </Field>

        <Field>
          <FieldLabel htmlFor="jabatan">Jabatan (opsional)</FieldLabel>
          <Input id="jabatan" name="jabatan" placeholder="mis. Ketua, Sekretaris" defaultValue={initial?.jabatan ?? ""} />
          <FieldDescription>Terutama untuk kategori Pimpinan (Ketua/Sekretaris/Bendahara).</FieldDescription>
        </Field>

        {initial && (
          <Field>
            <FieldLabel htmlFor="urutan">Urutan tampil</FieldLabel>
            <Input id="urutan" name="urutan" type="number" defaultValue={initial.urutan} />
          </Field>
        )}

        <Field>
          <FieldLabel htmlFor="foto">Foto (opsional)</FieldLabel>
          {previewUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewUrl} alt="Preview" className="w-24 h-24 object-cover rounded-lg border border-border mb-2" />
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
          {initial ? "Simpan perubahan" : "Tambah pengurus"}
        </Button>
      </FieldGroup>
    </form>
  );
}
