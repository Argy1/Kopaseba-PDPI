"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, HelpCircle } from "lucide-react";
import { createFAQAction, updateFAQAction, deleteFAQAction, reorderFAQAction } from "@/lib/actions/faq";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

type FAQ = { id: number; pertanyaan: string; jawaban: string };

function FAQDialogForm({
  initial,
  onSubmit,
  trigger,
  title,
}: {
  initial?: FAQ;
  onSubmit: (formData: FormData) => Promise<{ error?: string } | undefined>;
  trigger: React.ReactNode;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger as React.ReactElement} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form
          action={(formData) => {
            startTransition(async () => {
              const res = await onSubmit(formData);
              if (res?.error) {
                setError(res.error);
              } else {
                toast.success("Tersimpan.");
                setOpen(false);
                setError(undefined);
              }
            });
          }}
        >
          <FieldGroup>
            <Field data-invalid={!!error}>
              <FieldLabel htmlFor="pertanyaan">Pertanyaan</FieldLabel>
              <Input id="pertanyaan" name="pertanyaan" required defaultValue={initial?.pertanyaan ?? ""} />
            </Field>
            <Field data-invalid={!!error}>
              <FieldLabel htmlFor="jawaban">Jawaban</FieldLabel>
              <Textarea id="jawaban" name="jawaban" required rows={3} defaultValue={initial?.jawaban ?? ""} />
              <FieldError errors={error ? [{ message: error }] : undefined} />
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-4">
            <DialogClose render={<Button type="button" variant="outline" />}>Batal</DialogClose>
            <Button type="submit" disabled={isPending}>
              Simpan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function FAQEditor({ items }: { items: FAQ[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <div className="flex justify-end mb-3">
        <FAQDialogForm
          title="Tambah pertanyaan"
          onSubmit={(fd) => createFAQAction(undefined, fd)}
          trigger={
            <Button size="sm">
              <Plus data-icon="inline-start" />
              Tambah FAQ
            </Button>
          }
        />
      </div>

      {items.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <HelpCircle />
            </EmptyMedia>
            <EmptyTitle>Belum ada FAQ</EmptyTitle>
            <EmptyDescription>Tambahkan pertanyaan umum pertama.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={item.id} className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.pertanyaan}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.jawaban}</p>
                </div>
                <div className="flex gap-0.5 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    disabled={isPending || i === 0}
                    onClick={() => startTransition(() => reorderFAQAction(item.id, "up"))}
                  >
                    <ArrowUp />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    disabled={isPending || i === items.length - 1}
                    onClick={() => startTransition(() => reorderFAQAction(item.id, "down"))}
                  >
                    <ArrowDown />
                  </Button>
                  <FAQDialogForm
                    title="Edit pertanyaan"
                    initial={item}
                    onSubmit={(fd) => updateFAQAction(item.id, undefined, fd)}
                    trigger={
                      <Button variant="ghost" size="icon-sm">
                        <Pencil />
                      </Button>
                    }
                  />
                  <AlertDialog>
                    <AlertDialogTrigger render={<Button variant="ghost" size="icon-sm" />}>
                      <Trash2 />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus FAQ ini?</AlertDialogTitle>
                        <AlertDialogDescription>Tindakan ini tidak bisa dibatalkan.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            startTransition(async () => {
                              await deleteFAQAction(item.id);
                              toast.success("FAQ dihapus.");
                            })
                          }
                        >
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
