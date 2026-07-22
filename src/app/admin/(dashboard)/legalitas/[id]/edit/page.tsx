import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { LegalitasForm } from "@/components/admin/LegalitasForm";

export default async function EditLegalitasPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.legalitasDoc.findUnique({ where: { id: Number(id) } });
  if (!item) notFound();

  return (
    <div className="max-w-xl">
      <h1 className="font-serif text-2xl font-medium text-navy mb-1">Edit Dokumen Legalitas</h1>
      <p className="text-sm text-muted-foreground mb-6">{item.judul}</p>
      <LegalitasForm initial={item} />
    </div>
  );
}
