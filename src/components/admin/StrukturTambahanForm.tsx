"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { updateStrukturTambahanAction } from "@/lib/actions/strukturTambahan";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StrukturTambahanForm({
  item,
}: {
  item: { id: number; nama: string; babPasal: string; deskripsi: string };
}) {
  const action = updateStrukturTambahanAction.bind(null, item.id);
  const [state, formAction, pending] = useActionState(action, undefined);

  useEffect(() => {
    if (state?.success) toast.success("Tersimpan.");
  }, [state?.success]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{item.nama}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            <Field data-invalid={!!state?.error}>
              <FieldLabel htmlFor={`nama-${item.id}`}>Nama</FieldLabel>
              <Input id={`nama-${item.id}`} name="nama" required defaultValue={item.nama} />
            </Field>
            <Field data-invalid={!!state?.error}>
              <FieldLabel htmlFor={`babPasal-${item.id}`}>Rujukan pasal</FieldLabel>
              <Input id={`babPasal-${item.id}`} name="babPasal" required defaultValue={item.babPasal} />
            </Field>
            <Field data-invalid={!!state?.error}>
              <FieldLabel htmlFor={`deskripsi-${item.id}`}>Deskripsi</FieldLabel>
              <Textarea id={`deskripsi-${item.id}`} name="deskripsi" required rows={3} defaultValue={item.deskripsi} />
            </Field>
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
