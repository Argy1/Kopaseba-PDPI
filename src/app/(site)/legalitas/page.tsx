import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import DocumentCard from "@/components/DocumentCard";
import CTASection from "@/components/CTASection";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Legalitas & Dokumen — Kopaseba",
  description: "Dokumen legal resmi KOPASEBA: Akta, SK Kemenkumham, dan AD/ART.",
};

export const dynamic = "force-dynamic";

export default async function LegalitasPage() {
  const legalitas = await prisma.legalitasDoc.findMany({ orderBy: { urutan: "asc" } });

  return (
    <>
      <PageHeader
        eyebrow="Legalitas & dokumen"
        title="Badan hukum resmi, tercatat di Kemenkumham RI."
        description="Dasar hukum pendirian dan kepengurusan KOPASEBA sebagai koperasi resmi Indonesia."
      />

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <Image
              src="/logo-koperasi-indonesia.png"
              alt="Lambang gerakan Koperasi Indonesia, tercantum pada kop surat resmi KOPASEBA"
              width={148}
              height={157}
              className="h-14 w-auto"
            />
            <p className="text-sm text-ink/50 leading-relaxed">
              KOPASEBA terdaftar sebagai bagian dari gerakan Koperasi Indonesia dan tunduk pada
              regulasi Kementerian Koperasi dan UKM RI.
            </p>
          </div>

          <div className="space-y-4">
            {legalitas.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
          <p className="text-sm text-ink/50 mt-8">
            Salinan dokumen dapat diminta melalui sekretariat Kopaseba.
          </p>

          <div className="mt-16 bg-navy-light rounded-2xl p-8">
            <h2 className="font-serif text-xl font-medium text-navy mb-4">
              Tata kelola &amp; pelaporan
            </h2>
            <ul className="space-y-2 text-sm text-ink/70">
              <li className="flex gap-3">
                <span className="text-gold">—</span>
                Pengurus melaporkan status organisasi dan usaha kepada Kementerian Koperasi dan
                UKM serta Pengurus Pusat PDPI sekurang-kurangnya setiap 6 bulan.
              </li>
              <li className="flex gap-3">
                <span className="text-gold">—</span>
                Tahun buku berjalan 1 Januari–31 Desember.
              </li>
              <li className="flex gap-3">
                <span className="text-gold">—</span>
                Neraca dan laporan laba-rugi tahunan wajib diaudit oleh kantor akuntan publik.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Selengkapnya"
        title="Kenali sejarah dan struktur organisasi Kopaseba."
        primary={{ label: "Baca Sejarah Kopaseba", href: "/tentang" }}
        secondary={{ label: "Lihat struktur organisasi", href: "/pengurus" }}
      />
    </>
  );
}
