"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, List } from "lucide-react";
import {
  createListItemAction,
  updateListItemAction,
  deleteListItemAction,
  reorderListItemAction,
} from "@/lib/actions/listItem";
import type { ListSection } from "@/generated/prisma/enums";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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

type Item = { id: number; teks: string };

function EditItemDialog({ item, section }: { item: Item; section: ListSection }) {
  const [open, setOpen] = useState(false);
  const [teks, setTeks] = useState(item.teks);
  const [isPending, startTransition] = useTransition();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="ghost" size="icon-sm" />}>
        <Pencil />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit item</DialogTitle>
          <DialogDescription>Ubah teks lalu simpan.</DialogDescription>
        </DialogHeader>
        <Textarea value={teks} onChange={(e) => setTeks(e.target.value)} rows={3} />
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Batal</DialogClose>
          <Button
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                const res = await updateListItemAction(item.id, section, teks);
                if (res?.error) {
                  toast.error(res.error);
                } else {
                  toast.success("Tersimpan.");
                  setOpen(false);
                }
              });
            }}
          >
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddItemDialog({ section }: { section: ListSection }) {
  const [open, setOpen] = useState(false);
  const [teks, setTeks] = useState("");
  const [isPending, startTransition] = useTransition();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="sm" />}>
        <Plus data-icon="inline-start" />
        Tambah item
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah item</DialogTitle>
        </DialogHeader>
        <Textarea value={teks} onChange={(e) => setTeks(e.target.value)} rows={3} placeholder="Tulis item baru..." />
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Batal</DialogClose>
          <Button
            disabled={isPending || !teks.trim()}
            onClick={() => {
              startTransition(async () => {
                const formData = new FormData();
                formData.set("teks", teks);
                const res = await createListItemAction(section, formData);
                if (res?.error) {
                  toast.error(res.error);
                } else {
                  toast.success("Item ditambahkan.");
                  setTeks("");
                  setOpen(false);
                }
              });
            }}
          >
            Tambah
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ListEditor({ section, items }: { section: ListSection; items: Item[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <div className="flex justify-end mb-3">
        <AddItemDialog section={section} />
      </div>

      {items.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <List />
            </EmptyMedia>
            <EmptyTitle>Belum ada item</EmptyTitle>
            <EmptyDescription>Tambahkan item pertama.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={item.id} className="flex items-start gap-2 bg-muted/50 rounded-lg p-3">
              <p className="flex-1 text-sm leading-relaxed">{item.teks}</p>
              <div className="flex gap-0.5 shrink-0">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  disabled={isPending || i === 0}
                  onClick={() => startTransition(() => reorderListItemAction(item.id, section, "up"))}
                >
                  <ArrowUp />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  disabled={isPending || i === items.length - 1}
                  onClick={() => startTransition(() => reorderListItemAction(item.id, section, "down"))}
                >
                  <ArrowDown />
                </Button>
                <EditItemDialog item={item} section={section} />
                <AlertDialog>
                  <AlertDialogTrigger render={<Button variant="ghost" size="icon-sm" />}>
                    <Trash2 />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus item ini?</AlertDialogTitle>
                      <AlertDialogDescription>Tindakan ini tidak bisa dibatalkan.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          startTransition(async () => {
                            await deleteListItemAction(item.id, section);
                            toast.success("Item dihapus.");
                          })
                        }
                      >
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
