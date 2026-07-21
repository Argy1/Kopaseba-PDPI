import PageHeader from "@/components/PageHeader";
import {
  hakAnggota,
  kewajibanAnggota,
  prosedurPendaftaran,
  syaratAnggota,
} from "@/data/content";

export default function KeanggotaanPage() {
  return (
    <>
      <PageHeader
        eyebrow="Keanggotaan"
        title="Setiap dokter spesialis paru anggota PDPI berhak bergabung."
        description="Syarat, hak, kewajiban, dan prosedur pendaftaran anggota KOPASEBA."
      />

      <section className="max-w-4xl mx-auto px-6 py-20 space-y-16">
        <div>
          <h2 className="font-serif text-2xl font-medium text-navy mb-4">Syarat keanggotaan</h2>
          <ul className="space-y-2 text-ink/70">
            {syaratAnggota.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-gold">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-serif text-2xl font-medium text-navy mb-4">Hak anggota</h2>
            <ul className="space-y-2 text-ink/70 text-sm">
              {hakAnggota.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-gold">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-medium text-navy mb-4">
              Kewajiban anggota
            </h2>
            <ul className="space-y-2 text-ink/70 text-sm">
              {kewajibanAnggota.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-gold">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-medium text-navy mb-4">
            Prosedur pendaftaran
          </h2>
          <ol className="space-y-3 text-ink/70">
            {prosedurPendaftaran.map((item, i) => (
              <li key={item} className="flex gap-4">
                <span className="font-serif text-gold-dark shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-navy rounded-3xl px-8 py-12 text-center">
          <h3 className="font-serif text-2xl text-paper font-medium mb-3">
            Siap bergabung dengan Kopaseba?
          </h3>
          <p className="text-paper/70 mb-6 max-w-md mx-auto text-sm">
            Hubungi sekretariat untuk mendapatkan formulir pendaftaran anggota.
          </p>
          <a
            href="mailto:kopaseba@yahoo.com"
            className="inline-block bg-gold text-white px-7 py-3 rounded-full font-medium hover:bg-gold-dark transition"
          >
            Hubungi Sekretariat
          </a>
        </div>
      </section>
    </>
  );
}
