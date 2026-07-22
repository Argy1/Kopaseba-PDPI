"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { updateProgramKerjaAction } from "@/lib/actions/programKerja";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";

export function ProgramKerjaTextForm({
  initial,
}: {
  initial: {
    programKerjaSkemaBagiHasilJudul: string;
    programKerjaPengembanganObatJudul: string;
    programKerjaPengembanganObatDeskripsi: string;
  };
}) {
  const [state, formAction, pending] = useActionState(updateProgramKerjaAction, undefined);

  useEffect(() => {
    if (state?.success) toast.success("Tersimpan.");
  }, [state?.success]);

  return (
    <form action={formAction}>
      <FieldGroup>
        <Field data-invalid={!!state?.error}>
          <FieldLabel htmlFor="programKerjaSkemaBagiHasilJudul">Judul: Skema bagi hasil</FieldLabel>
          <Input
            id="programKerjaSkemaBagiHasilJudul"
            name="programKerjaSkemaBagiHasilJudul"
            required
            defaultValue={initial.programKerjaSkemaBagiHasilJudul}
          />
        </Field>
        <Field data-invalid={!!state?.error}>
          <FieldLabel htmlFor="programKerjaPengembanganObatJudul">Judul: Pengembangan obat</FieldLabel>
          <Input
            id="programKerjaPengembanganObatJudul"
            name="programKerjaPengembanganObatJudul"
            required
            defaultValue={initial.programKerjaPengembanganObatJudul}
          />
        </Field>
        <Field data-invalid={!!state?.error}>
          <FieldLabel htmlFor="programKerjaPengembanganObatDeskripsi">Deskripsi: Pengembangan obat</FieldLabel>
          <Textarea
            id="programKerjaPengembanganObatDeskripsi"
            name="programKerjaPengembanganObatDeskripsi"
            required
            rows={3}
            defaultValue={initial.programKerjaPengembanganObatDeskripsi}
          />
          <FieldError errors={state?.error ? [{ message: state.error }] : undefined} />
        </Field>
        <Button type="submit" disabled={pending} size="sm">
          Simpan
        </Button>
      </FieldGroup>
    </form>
  );
}
