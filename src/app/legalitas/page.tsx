import PageHeader from "@/components/PageHeader";
import { legalitas } from "@/data/content";

export default function LegalitasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legalitas & dokumen"
        title="Badan hukum resmi, tercatat di Kemenkumham RI."
      />

      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-4">
          {legalitas.map((doc) => (
            <div
              key={doc.judul}
              className="flex items-start justify-between gap-6 bg-white border border-ink/10 rounded-2xl p-6"
            >
              <div>
                <h3 className="font-medium text-navy">{doc.judul}</h3>
                <p className="text-sm text-ink/60 mt-1 leading-relaxed">{doc.keterangan}</p>
              </div>
              <span className="text-xs text-ink/40 shrink-0 mt-1">Dokumen resmi</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-ink/50 mt-8">
          Salinan dokumen dapat diminta melalui sekretariat Kopaseba.
        </p>
      </section>
    </>
  );
}
