"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { changePasswordAction, logoutEverywhereAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AkunPage() {
  const [state, formAction, pending] = useActionState(changePasswordAction, undefined);

  useEffect(() => {
    if (state?.success) {
      toast.success("Password berhasil diganti.");
    }
  }, [state?.success]);

  return (
    <div className="max-w-lg">
      <h1 className="font-serif text-2xl font-medium text-navy mb-1">Akun</h1>
      <p className="text-sm text-muted-foreground mb-6">Kelola password login admin.</p>

      <Card>
        <CardHeader>
          <CardTitle>Ganti password</CardTitle>
          <CardDescription>Password baru minimal 8 karakter.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} key={state?.success ? "reset" : "form"}>
            <FieldGroup>
              <Field data-invalid={!!state?.error}>
                <FieldLabel htmlFor="currentPassword">Password saat ini</FieldLabel>
                <Input id="currentPassword" name="currentPassword" type="password" required />
              </Field>
              <Field data-invalid={!!state?.error}>
                <FieldLabel htmlFor="newPassword">Password baru</FieldLabel>
                <Input id="newPassword" name="newPassword" type="password" required minLength={8} />
              </Field>
              <Field data-invalid={!!state?.error}>
                <FieldLabel htmlFor="confirmPassword">Konfirmasi password baru</FieldLabel>
                <Input id="confirmPassword" name="confirmPassword" type="password" required minLength={8} />
                <FieldError errors={state?.error ? [{ message: state.error }] : undefined} />
              </Field>
              <Button type="submit" disabled={pending} className="mt-2">
                Simpan password baru
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Keluar dari semua perangkat</CardTitle>
          <CardDescription>
            Membatalkan semua sesi login yang aktif, termasuk sesi ini. Anda perlu login ulang setelahnya.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={logoutEverywhereAction}>
            <Button type="submit" variant="destructive">
              Keluar dari semua perangkat
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
