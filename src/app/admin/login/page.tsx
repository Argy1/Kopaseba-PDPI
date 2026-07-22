"use client";

import { Suspense, useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { loginAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm mb-4">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-paper/70 hover:text-paper transition">
          ← Kembali ke situs
        </Link>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <p className="text-gold-dark font-semibold tracking-widest text-xs uppercase mb-1">Kopaseba</p>
          <CardTitle className="font-serif text-2xl">Masuk ke Dashboard Admin</CardTitle>
          <CardDescription>Khusus untuk admin yang mengelola konten situs.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <FieldGroup>
              <Field data-invalid={!!state?.error}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!state?.error} />
              </Field>
              <Field data-invalid={!!state?.error}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  aria-invalid={!!state?.error}
                />
                <FieldError errors={state?.error ? [{ message: state.error }] : undefined} />
              </Field>
              <Button type="submit" disabled={pending} className="mt-2">
                {pending && <Spinner data-icon="inline-start" />}
                Masuk
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
