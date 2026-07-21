import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { mitraKerjasama, unitUsaha } from "@/data/content";

export default function UnitUsahaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Unit usaha & mitra"
        title="Tiga pilar usaha, dijalankan bersama mitra strategis."
        description="Usaha KOPASEBA berfokus di bidang kesehatan, sesuai Anggaran Dasar Bab III."
      />

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {unitUsaha.map((u) => (
            <div key={u.judul} className="bg-white rounded-2xl p-8 border border-ink/10">
              <h3 className="font-serif text-xl font-medium text-navy mb-2">{u.judul}</h3>
              <p className="text-sm text-ink/65 leading-relaxed">{u.deskripsi}</p>
            </div>
          ))}
        </div>

        <h2 className="font-serif text-2xl font-medium text-navy mb-8">
          Mitra kerjasama berjalan
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {mitraKerjasama.map((m) => (
            <div key={m.produk} className="bg-sky-light rounded-2xl p-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky mb-3">
                {m.mitra}
              </p>
              <h3 className="font-serif text-xl font-medium text-navy mb-2">{m.produk}</h3>
              <p className="text-sm text-ink/65 leading-relaxed mb-4">{m.deskripsi}</p>
              <Link href="/kontak" className="text-sm text-navy font-medium hover:underline">
                Hubungi Kopaseba untuk info →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
