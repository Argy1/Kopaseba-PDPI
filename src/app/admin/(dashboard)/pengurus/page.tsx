import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { pengurusKategoriValues, pengurusKategoriLabel } from "@/lib/validation/pengurus";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PengurusTable } from "@/components/admin/PengurusTable";
import { StrukturTambahanForm } from "@/components/admin/StrukturTambahanForm";

export default async function AdminPengurusPage() {
  const [all, strukturTambahan] = await Promise.all([
    prisma.pengurus.findMany({ orderBy: [{ kategori: "asc" }, { urutan: "asc" }] }),
    prisma.strukturTambahan.findMany({ orderBy: { urutan: "asc" } }),
  ]);

  return (
    <div>
      <h1 className="font-serif text-2xl font-medium text-navy mb-1">Pengurus</h1>
      <p className="text-sm text-muted-foreground mb-6">Pimpinan, Dewan Pengawas, Anggota, dan Sekretariat.</p>

      <Tabs defaultValue={pengurusKategoriValues[0]}>
        <TabsList>
          {pengurusKategoriValues.map((k) => (
            <TabsTrigger key={k} value={k}>
              {pengurusKategoriLabel[k]}
            </TabsTrigger>
          ))}
        </TabsList>
        {pengurusKategoriValues.map((k) => {
          const items = all.filter((p) => p.kategori === k);
          return (
            <TabsContent key={k} value={k}>
              <div className="flex justify-end mb-4">
                <Button size="sm" nativeButton={false} render={<Link href={`/admin/pengurus/new?kategori=${k}`} />}>
                  <Plus data-icon="inline-start" />
                  Tambah {pengurusKategoriLabel[k]}
                </Button>
              </div>
              <PengurusTable kategori={k} items={items} />
            </TabsContent>
          );
        })}
      </Tabs>

      <div className="mt-12">
        <h2 className="font-serif text-xl font-medium text-navy mb-1">Struktur tata kelola lainnya</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Pengelola Koperasi, Dewan Penasehat, Perwakilan Kelompok Anggota — tampil di /pengurus.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {strukturTambahan.map((item) => (
            <StrukturTambahanForm key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
