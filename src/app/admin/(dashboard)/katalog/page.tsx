import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { KatalogTable } from "@/components/admin/KatalogTable";

export default async function AdminKatalogPage() {
  const items = await prisma.katalogItem.findMany({
    orderBy: [{ kategori: "asc" }, { urutan: "asc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-medium text-navy mb-1">Katalog</h1>
          <p className="text-sm text-muted-foreground">Produk mitra kerja sama dan layanan unit usaha.</p>
        </div>
        <Button nativeButton={false} render={<Link href="/admin/katalog/new" />}>
          <Plus data-icon="inline-start" />
          Tambah Item
        </Button>
      </div>

      <KatalogTable
        items={items.map((i) => ({
          id: i.id,
          kategori: i.kategori,
          nama: i.nama,
          mitraNama: i.mitraNama,
          harga: i.harga ? i.harga.toString() : null,
          tampilkanHarga: i.tampilkanHarga,
          published: i.published,
        }))}
      />
    </div>
  );
}
