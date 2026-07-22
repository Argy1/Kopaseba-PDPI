import { KatalogForm } from "@/components/admin/KatalogForm";

export default function NewKatalogPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-2xl font-medium text-navy mb-1">Tambah Item Katalog</h1>
      <p className="text-sm text-muted-foreground mb-6">Isi detail produk mitra atau layanan unit usaha.</p>
      <KatalogForm />
    </div>
  );
}
