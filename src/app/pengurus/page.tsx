import PersonPhoto from "@/components/PersonPhoto";
import PageHeader from "@/components/PageHeader";
import {
  anggotaPengurus,
  dewanPengawas,
  pimpinanUtama,
  sekretariat,
} from "@/data/content";

export default function PengurusPage() {
  return (
    <>
      <PageHeader
        eyebrow="Struktur organisasi"
        title="Susunan pengurus masa bakti 2024–2027."
        description="Berdasarkan Surat Keputusan No. 001/SK-I/KOPASEBA/III/2024, ditetapkan di Jakarta pada 1 Maret 2024."
      />

      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-serif text-2xl font-medium text-navy mb-8">Pengurus inti</h2>
        <div className="grid sm:grid-cols-3 gap-8 mb-20">
          {pimpinanUtama.map((p) => (
            <div key={p.jabatan}>
              <PersonPhoto tone="light" />
              <p className="font-medium mt-4 leading-snug text-ink">{p.nama}</p>
              <p className="text-sm text-gold-dark mt-0.5">{p.jabatan}</p>
            </div>
          ))}
        </div>

        <h2 className="font-serif text-2xl font-medium text-navy mb-8">Dewan pengawas</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-20">
          {dewanPengawas.map((nama) => (
            <div
              key={nama}
              className="bg-sky-light rounded-xl px-5 py-4 text-sm text-ink/80 font-medium"
            >
              {nama}
            </div>
          ))}
        </div>

        <h2 className="font-serif text-2xl font-medium text-navy mb-8">Anggota pengurus</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-20">
          {anggotaPengurus.map((nama) => (
            <div
              key={nama}
              className="bg-paper-dark rounded-xl px-5 py-3.5 text-sm text-ink/75"
            >
              {nama}
            </div>
          ))}
        </div>

        <h2 className="font-serif text-2xl font-medium text-navy mb-8">Sekretariat</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {sekretariat.map((nama) => (
            <div
              key={nama}
              className="bg-sky-light rounded-xl px-5 py-4 text-sm text-ink/80 font-medium"
            >
              {nama}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
