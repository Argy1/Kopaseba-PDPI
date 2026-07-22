import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { LegalitasTable } from "@/components/admin/LegalitasTable";

export default async function AdminLegalitasPage() {
  const items = await prisma.legalitasDoc.findMany({ orderBy: { urutan: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-medium text-navy mb-1">Legalitas</h1>
          <p className="text-sm text-muted-foreground">Dokumen legal resmi KOPASEBA.</p>
        </div>
        <Button nativeButton={false} render={<Link href="/admin/legalitas/new" />}>
          <Plus data-icon="inline-start" />
          Tambah Dokumen
        </Button>
      </div>
      <LegalitasTable items={items} />
    </div>
  );
}
