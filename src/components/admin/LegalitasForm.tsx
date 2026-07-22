"use client";

import { useActionState } from "react";
import { createLegalitasAction, updateLegalitasAction } from "@/lib/actions/legalitas";
import type { LegalitasFormState } from "@/lib/actions/legalitas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";

export type LegalitasFormValues = {
  id: number;
  judul: string;
  keterangan: string;
  pasal: string | null;
  catatan: string | null;
  urutan: number;
};

export function LegalitasForm({ initial }: { initial?: LegalitasFormValues }) {
  const action = initial ? updateLegalitasAction.bind(null, initial.id) : createLegalitasAction;
  const [state, formAction, pending] = useActionState<LegalitasFormState, FormData>(action, undefined);

  return (
    <form action={formAction}>
      <FieldGroup>
        <Field data-invalid={!!state?.error}>
          <FieldLabel htmlFor="judul">Judul dokumen</FieldLabel>
          <Input id="judul" name="judul" required defaultValue={initial?.judul ?? ""} />
        </Field>
        <Field data-invalid={!!state?.error}>
          <FieldLabel htmlFor="keterangan">Keterangan</FieldLabel>
          <Textarea id="keterangan" name="keterangan" required rows={3} defaultValue={initial?.keterangan ?? ""} />
        </Field>
        <Field>
          <FieldLabel htmlFor="pasal">Rujukan pasal (opsional)</FieldLabel>
          <Input id="pasal" name="pasal" defaultValue={initial?.pasal ?? ""} />
        </Field>
        <Field>
          <FieldLabel htmlFor="catatan">Catatan tambahan (opsional)</FieldLabel>
          <Textarea id="catatan" name="catatan" rows={2} defaultValue={initial?.catatan ?? ""} />
        </Field>
        {initial && (
          <Field>
            <FieldLabel htmlFor="urutan">Urutan tampil</FieldLabel>
            <Input id="urutan" name="urutan" type="number" defaultValue={initial.urutan} />
          </Field>
        )}
        <FieldError errors={state?.error ? [{ message: state.error }] : undefined} />
        <Button type="submit" disabled={pending}>
          {pending && <Spinner data-icon="inline-start" />}
          {initial ? "Simpan perubahan" : "Tambah dokumen"}
        </Button>
      </FieldGroup>
    </form>
  );
}
