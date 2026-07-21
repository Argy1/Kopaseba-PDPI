import PageHeader from "@/components/PageHeader";
import { kontak } from "@/data/content";

export default function KontakPage() {
  return (
    <>
      <PageHeader eyebrow="Kontak" title="Hubungi sekretariat Kopaseba." />

      <section className="max-w-4xl mx-auto px-6 py-20 grid sm:grid-cols-2 gap-8">
        <div className="bg-sky-light rounded-2xl p-8">
          <h3 className="font-medium text-navy mb-2">Alamat sekretariat</h3>
          <p className="text-sm text-ink/70 leading-relaxed">{kontak.alamat}</p>
        </div>
        <div className="bg-sky-light rounded-2xl p-8">
          <h3 className="font-medium text-navy mb-2">Email</h3>
          <a href={`mailto:${kontak.email}`} className="text-sm text-navy hover:underline">
            {kontak.email}
          </a>
        </div>
      </section>
    </>
  );
}
