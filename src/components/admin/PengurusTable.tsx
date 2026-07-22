"use client";

import { useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Pencil, Trash2, ArrowUp, ArrowDown, User } from "lucide-react";
import { deletePengurusAction, reorderPengurusAction } from "@/lib/actions/pengurus";
import type { PengurusKategori } from "@/generated/prisma/enums";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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

type Row = { id: number; nama: string; jabatan: string | null; fotoMediaId: number | null };

export function PengurusTable({ items, kategori }: { items: Row[]; kategori: PengurusKategori }) {
  const [isPending, startTransition] = useTransition();

  if (items.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <User />
          </EmptyMedia>
          <EmptyTitle>Belum ada data</EmptyTitle>
          <EmptyDescription>Tambahkan pengurus untuk kategori ini.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead>Jabatan</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, i) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.nama}</TableCell>
            <TableCell className="text-muted-foreground">{item.jabatan ?? "—"}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  disabled={isPending || i === 0}
                  onClick={() => startTransition(() => reorderPengurusAction(item.id, kategori, "up"))}
                >
                  <ArrowUp />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  disabled={isPending || i === items.length - 1}
                  onClick={() => startTransition(() => reorderPengurusAction(item.id, kategori, "down"))}
                >
                  <ArrowDown />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  nativeButton={false}
                  render={<Link href={`/admin/pengurus/${item.id}/edit`} />}
                >
                  <Pencil />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger render={<Button variant="ghost" size="icon-sm" />}>
                    <Trash2 />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus &quot;{item.nama}&quot;?</AlertDialogTitle>
                      <AlertDialogDescription>Tindakan ini tidak bisa dibatalkan.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          startTransition(async () => {
                            await deletePengurusAction(item.id);
                            toast.success("Data dihapus.");
                          })
                        }
                      >
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
