"use client";

import { useActionState, useState, useEffect } from "react";
import { toast } from "sonner";
import { updateKontakAction } from "@/lib/actions/kontak";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel, FieldError, FieldDescription } from "@/components/ui/field";
import MapEmbed from "@/components/MapEmbed";

export function KontakForm({
  initial,
}: {
  initial: { kontakAlamat: string; kontakEmail: string; kontakMapEmbedUrl: string };
}) {
  const [state, formAction, pending] = useActionState(updateKontakAction, undefined);
  const [mapUrl, setMapUrl] = useState(initial.kontakMapEmbedUrl);

  useEffect(() => {
    if (state?.success) toast.success("Info kontak berhasil disimpan.");
  }, [state?.success]);

  return (
    <form action={formAction}>
      <FieldGroup>
        <Field data-invalid={!!state?.error}>
          <FieldLabel htmlFor="kontakAlamat">Alamat sekretariat</FieldLabel>
          <Textarea id="kontakAlamat" name="kontakAlamat" required rows={3} defaultValue={initial.kontakAlamat} />
        </Field>

        <Field data-invalid={!!state?.error}>
          <FieldLabel htmlFor="kontakEmail">Email</FieldLabel>
          <Input id="kontakEmail" name="kontakEmail" type="email" required defaultValue={initial.kontakEmail} />
        </Field>

        <Field data-invalid={!!state?.error}>
          <FieldLabel htmlFor="kontakMapEmbedUrl">URL embed Google Maps</FieldLabel>
          <Input
            id="kontakMapEmbedUrl"
            name="kontakMapEmbedUrl"
            required
            defaultValue={initial.kontakMapEmbedUrl}
            onChange={(e) => setMapUrl(e.target.value)}
          />
          <FieldDescription>
            Format: https://www.google.com/maps?q=&lt;alamat&gt;&amp;output=embed
          </FieldDescription>
          <FieldError errors={state?.error ? [{ message: state.error }] : undefined} />
        </Field>

        <Button type="submit" disabled={pending}>
          Simpan
        </Button>
      </FieldGroup>

      <div className="mt-6">
        <p className="text-sm text-muted-foreground mb-2">Pratinjau peta</p>
        <MapEmbed src={mapUrl} />
      </div>
    </form>
  );
}
