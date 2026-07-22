import { pengurusKategoriValues } from "@/lib/validation/pengurus";
import { PengurusForm } from "@/components/admin/PengurusForm";

export default async function NewPengurusPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>;
}) {
  const { kategori } = await searchParams;
  const defaultKategori = pengurusKategoriValues.find((k) => k === kategori);

  return (
    <div className="max-w-lg">
      <h1 className="font-serif text-2xl font-medium text-navy mb-1">Tambah Pengurus</h1>
      <p className="text-sm text-muted-foreground mb-6">Isi data pengurus baru.</p>
      <PengurusForm defaultKategori={defaultKategori} />
    </div>
  );
}
