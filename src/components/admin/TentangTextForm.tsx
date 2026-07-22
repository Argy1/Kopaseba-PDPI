"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { updateTentangAction } from "@/lib/actions/tentang";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";

export function TentangTextForm({
  initial,
}: {
  initial: { landasan: string; asas: string; tujuanKoperasi: string };
}) {
  const [state, formAction, pending] = useActionState(updateTentangAction, undefined);

  useEffect(() => {
    if (state?.success) toast.success("Tersimpan.");
  }, [state?.success]);

  return (
    <form action={formAction}>
      <FieldGroup>
        <Field data-invalid={!!state?.error}>
          <FieldLabel htmlFor="landasan">Landasan</FieldLabel>
          <Textarea id="landasan" name="landasan" required rows={2} defaultValue={initial.landasan} />
        </Field>
        <Field data-invalid={!!state?.error}>
          <FieldLabel htmlFor="asas">Asas</FieldLabel>
          <Textarea id="asas" name="asas" required rows={2} defaultValue={initial.asas} />
        </Field>
        <Field data-invalid={!!state?.error}>
          <FieldLabel htmlFor="tujuanKoperasi">Tujuan koperasi</FieldLabel>
          <Textarea id="tujuanKoperasi" name="tujuanKoperasi" required rows={2} defaultValue={initial.tujuanKoperasi} />
          <FieldError errors={state?.error ? [{ message: state.error }] : undefined} />
        </Field>
        <Button type="submit" disabled={pending} size="sm">
          Simpan
        </Button>
      </FieldGroup>
    </form>
  );
}
