import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { KatalogForm } from "@/components/admin/KatalogForm";

export default async function EditKatalogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.katalogItem.findUnique({ where: { id: Number(id) } });
  if (!item) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-2xl font-medium text-navy mb-1">Edit Item Katalog</h1>
      <p className="text-sm text-muted-foreground mb-6">{item.nama}</p>
      <KatalogForm
        initial={{
          id: item.id,
          kategori: item.kategori,
          nama: item.nama,
          slug: item.slug,
          mitraNama: item.mitraNama,
          ringkasan: item.ringkasan,
          deskripsi: item.deskripsi,
          komposisi: item.komposisi,
          wilayahKetersediaan: item.wilayahKetersediaan,
          harga: item.harga ? item.harga.toString() : null,
          tampilkanHarga: item.tampilkanHarga,
          published: item.published,
          urutan: item.urutan,
          imageMediaId: item.imageMediaId,
        }}
      />
    </div>
  );
}
