"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, History } from "lucide-react";
import { createSejarahAction, updateSejarahAction, deleteSejarahAction, reorderSejarahAction } from "@/lib/actions/sejarah";
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

type Entry = { id: number; tahun: string; tanggal: string | null; judul: string; deskripsi: string };

function SejarahDialogForm({
  initial,
  onSubmit,
  trigger,
  title,
}: {
  initial?: Entry;
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
              <FieldLabel htmlFor="tahun">Tahun</FieldLabel>
              <Input id="tahun" name="tahun" required placeholder="mis. 2024–2027" defaultValue={initial?.tahun ?? ""} />
            </Field>
            <Field>
              <FieldLabel htmlFor="tanggal">Tanggal (opsional)</FieldLabel>
              <Input id="tanggal" name="tanggal" placeholder="mis. 1 Maret 2024" defaultValue={initial?.tanggal ?? ""} />
            </Field>
            <Field data-invalid={!!error}>
              <FieldLabel htmlFor="judul">Judul</FieldLabel>
              <Input id="judul" name="judul" required defaultValue={initial?.judul ?? ""} />
            </Field>
            <Field data-invalid={!!error}>
              <FieldLabel htmlFor="deskripsi">Deskripsi</FieldLabel>
              <Textarea id="deskripsi" name="deskripsi" required rows={3} defaultValue={initial?.deskripsi ?? ""} />
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

export function SejarahEditor({ items }: { items: Entry[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <div className="flex justify-end mb-3">
        <SejarahDialogForm
          title="Tambah milestone"
          onSubmit={(fd) => createSejarahAction(undefined, fd)}
          trigger={
            <Button size="sm">
              <Plus data-icon="inline-start" />
              Tambah Milestone
            </Button>
          }
        />
      </div>

      {items.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <History />
            </EmptyMedia>
            <EmptyTitle>Belum ada milestone</EmptyTitle>
            <EmptyDescription>Tambahkan titik waktu sejarah pertama.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={item.id} className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gold-dark uppercase">
                    {item.tahun}
                    {item.tanggal && ` · ${item.tanggal}`}
                  </p>
                  <p className="text-sm font-medium mt-0.5">{item.judul}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.deskripsi}</p>
                </div>
                <div className="flex gap-0.5 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    disabled={isPending || i === 0}
                    onClick={() => startTransition(() => reorderSejarahAction(item.id, "up"))}
                  >
                    <ArrowUp />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    disabled={isPending || i === items.length - 1}
                    onClick={() => startTransition(() => reorderSejarahAction(item.id, "down"))}
                  >
                    <ArrowDown />
                  </Button>
                  <SejarahDialogForm
                    title="Edit milestone"
                    initial={item}
                    onSubmit={(fd) => updateSejarahAction(item.id, undefined, fd)}
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
                        <AlertDialogTitle>Hapus milestone ini?</AlertDialogTitle>
                        <AlertDialogDescription>Tindakan ini tidak bisa dibatalkan.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            startTransition(async () => {
                              await deleteSejarahAction(item.id);
                              toast.success("Milestone dihapus.");
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
