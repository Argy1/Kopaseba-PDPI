import { LegalitasForm } from "@/components/admin/LegalitasForm";

export default function NewLegalitasPage() {
  return (
    <div className="max-w-xl">
      <h1 className="font-serif text-2xl font-medium text-navy mb-1">Tambah Dokumen Legalitas</h1>
      <p className="text-sm text-muted-foreground mb-6">Isi detail dokumen legal.</p>
      <LegalitasForm />
    </div>
  );
}
