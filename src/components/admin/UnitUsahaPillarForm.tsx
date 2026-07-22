"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { updateUnitUsahaPillarAction } from "@/lib/actions/unitUsaha";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UnitUsahaPillarForm({
  pillar,
}: {
  pillar: { id: number; judul: string; deskripsi: string; urutan: number };
}) {
  const action = updateUnitUsahaPillarAction.bind(null, pillar.id);
  const [state, formAction, pending] = useActionState(action, undefined);

  useEffect(() => {
    if (state?.success) toast.success("Kartu pilar tersimpan.");
  }, [state?.success]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Pilar {pillar.urutan + 1}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            <Field data-invalid={!!state?.error}>
              <FieldLabel htmlFor={`judul-${pillar.id}`}>Judul</FieldLabel>
              <Input id={`judul-${pillar.id}`} name="judul" required defaultValue={pillar.judul} />
            </Field>
            <Field data-invalid={!!state?.error}>
              <FieldLabel htmlFor={`deskripsi-${pillar.id}`}>Deskripsi</FieldLabel>
              <Textarea id={`deskripsi-${pillar.id}`} name="deskripsi" required rows={3} defaultValue={pillar.deskripsi} />
            </Field>
            <input type="hidden" name="urutan" value={pillar.urutan} />
            <FieldError errors={state?.error ? [{ message: state.error }] : undefined} />
            <Button type="submit" disabled={pending} size="sm">
              Simpan
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
