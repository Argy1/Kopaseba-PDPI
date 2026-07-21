import PageHeader from "@/components/PageHeader";
import { programKerja } from "@/data/content";

export default function ProgramKerjaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Program kerja"
        title="Arah kerja Kopaseba periode 2024–2027."
      />

      <section className="max-w-4xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-6">
        <div className="bg-sky-light rounded-2xl p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky mb-4">
            Jangka pendek
          </p>
          <ul className="space-y-4 text-ink/75">
            {programKerja.jangkaPendek.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed">
                <span className="text-gold">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-navy-light rounded-2xl p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky mb-4">
            Jangka panjang
          </p>
          <ul className="space-y-4 text-ink/75">
            {programKerja.jangkaPanjang.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed">
                <span className="text-gold">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
