import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Keanggotaan — Kopaseba",
  description:
    "Syarat, hak, kewajiban, dan prosedur pendaftaran anggota KOPASEBA bagi dokter spesialis paru anggota PDPI.",
};

export const dynamic = "force-dynamic";

export default async function KeanggotaanPage() {
  const [syaratAnggota, hakAnggota, kewajibanAnggota, prosedurPendaftaran, keanggotaanFAQ, settings] =
    await Promise.all([
      prisma.listItem.findMany({ where: { section: "SYARAT_ANGGOTA" }, orderBy: { urutan: "asc" } }),
      prisma.listItem.findMany({ where: { section: "HAK_ANGGOTA" }, orderBy: { urutan: "asc" } }),
      prisma.listItem.findMany({ where: { section: "KEWAJIBAN_ANGGOTA" }, orderBy: { urutan: "asc" } }),
      prisma.listItem.findMany({ where: { section: "PROSEDUR_PENDAFTARAN" }, orderBy: { urutan: "asc" } }),
      prisma.keanggotaanFAQ.findMany({ orderBy: { urutan: "asc" } }),
      prisma.siteSettings.findUniqueOrThrow({ where: { id: 1 } }),
    ]);

  return (
    <>
      <PageHeader
        eyebrow="Keanggotaan"
        title="Setiap dokter spesialis paru anggota PDPI berhak bergabung."
        description="Syarat, hak, kewajiban, dan prosedur pendaftaran anggota KOPASEBA."
      />

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto space-y-16">
          <div>
            <h2 className="font-serif text-2xl font-medium text-navy mb-4">Syarat keanggotaan</h2>
            <ul className="space-y-2 text-ink/70">
              {syaratAnggota.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <span className="text-gold">—</span>
                  {item.teks}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-serif text-2xl font-medium text-navy mb-4">Hak anggota</h2>
              <ul className="space-y-2 text-ink/70 text-sm">
                {hakAnggota.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    <span className="text-gold">—</span>
                    {item.teks}
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
                  <li key={item.id} className="flex gap-3">
                    <span className="text-gold">—</span>
                    {item.teks}
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
                <li key={item.id} className="flex gap-4">
                  <span className="font-serif text-gold-dark shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.teks}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-medium text-navy mb-4">
              Pertanyaan umum
            </h2>
            <div className="space-y-6">
              {keanggotaanFAQ.map((item) => (
                <div key={item.id}>
                  <p className="font-medium text-ink">{item.pertanyaan}</p>
                  <p className="text-sm text-ink/65 leading-relaxed mt-1.5">{item.jawaban}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Keanggotaan"
        title="Siap bergabung dengan Kopaseba?"
        description="Hubungi sekretariat untuk mendapatkan formulir pendaftaran anggota."
        primary={{ label: "Hubungi Sekretariat", href: `mailto:${settings.kontakEmail}` }}
        secondary={{ label: "Baca AD/ART lengkap", href: "/legalitas" }}
      />
    </>
  );
}
