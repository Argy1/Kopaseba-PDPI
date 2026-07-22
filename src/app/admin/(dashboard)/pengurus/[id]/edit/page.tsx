import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PengurusForm } from "@/components/admin/PengurusForm";

export default async function EditPengurusPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.pengurus.findUnique({ where: { id: Number(id) } });
  if (!item) notFound();

  return (
    <div className="max-w-lg">
      <h1 className="font-serif text-2xl font-medium text-navy mb-1">Edit Pengurus</h1>
      <p className="text-sm text-muted-foreground mb-6">{item.nama}</p>
      <PengurusForm initial={item} />
    </div>
  );
}
