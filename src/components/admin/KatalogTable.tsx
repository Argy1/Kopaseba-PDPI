"use client";

import { useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Pencil, Trash2, Package } from "lucide-react";
import { deleteKatalogAction, togglePublishedAction } from "@/lib/actions/katalog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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

type KatalogRow = {
  id: number;
  kategori: "PRODUK_MITRA" | "LAYANAN_UNIT_USAHA";
  nama: string;
  mitraNama: string | null;
  harga: string | null;
  tampilkanHarga: boolean;
  published: boolean;
};

export function KatalogTable({ items }: { items: KatalogRow[] }) {
  const [isPending, startTransition] = useTransition();

  if (items.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Package />
          </EmptyMedia>
          <EmptyTitle>Belum ada item katalog</EmptyTitle>
          <EmptyDescription>Tambahkan produk mitra atau layanan unit usaha pertama.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead>Kategori</TableHead>
          <TableHead>Harga</TableHead>
          <TableHead>Tayang</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">
              {item.nama}
              {item.mitraNama && <span className="block text-xs text-muted-foreground">{item.mitraNama}</span>}
            </TableCell>
            <TableCell>
              <Badge variant="secondary">
                {item.kategori === "PRODUK_MITRA" ? "Produk Mitra" : "Layanan Unit Usaha"}
              </Badge>
            </TableCell>
            <TableCell>
              {item.harga ? (
                <span>
                  Rp {Number(item.harga).toLocaleString("id-ID")}
                  {!item.tampilkanHarga && <span className="text-xs text-muted-foreground"> (tersembunyi)</span>}
                </span>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>
            <TableCell>
              <Switch
                checked={item.published}
                disabled={isPending}
                onCheckedChange={(checked) => {
                  startTransition(async () => {
                    await togglePublishedAction(item.id, checked);
                    toast.success(checked ? "Item ditayangkan." : "Item disembunyikan.");
                  });
                }}
              />
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  nativeButton={false}
                  render={<Link href={`/admin/katalog/${item.id}/edit`} />}
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
                      <AlertDialogDescription>
                        Tindakan ini tidak bisa dibatalkan. Item akan langsung hilang dari situs publik.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          startTransition(async () => {
                            await deleteKatalogAction(item.id);
                            toast.success("Item dihapus.");
                          });
                        }}
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
