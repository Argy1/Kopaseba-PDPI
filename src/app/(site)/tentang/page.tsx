import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Timeline from "@/components/Timeline";
import CTASection from "@/components/CTASection";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Tentang Kami — Kopaseba",
  description:
    "Sejarah, landasan, azas, dan tujuan Koperasi Paru Sejahtera Bahagia (KOPASEBA).",
};

export const dynamic = "force-dynamic";

export default async function TentangPage() {
  const [sejarahTimeline, fungsiPeran, settings] = await Promise.all([
    prisma.sejarahTimeline.findMany({ orderBy: { urutan: "asc" } }),
    prisma.listItem.findMany({ where: { section: "FUNGSI_PERAN" }, orderBy: { urutan: "asc" } }),
    prisma.siteSettings.findUniqueOrThrow({ where: { id: 1 } }),
  ]);
  const landasanPrinsip = await prisma.listItem.findMany({
    where: { section: "LANDASAN_PRINSIP" },
    orderBy: { urutan: "asc" },
  });

  return (
    <>
      <PageHeader
        eyebrow="Tentang Kopaseba"
        title="Koperasi serba usaha, berlandaskan kekeluargaan."
        description="Mengenal sejarah, landasan, dan tujuan Koperasi Paru Sejahtera Bahagia."
      />

      <section className="relative overflow-hidden">
        <svg
          className="breathe-motif absolute -top-16 -right-20 pointer-events-none"
          width="480"
          height="480"
          viewBox="0 0 200 200"
          fill="none"
        >
          <path
            d="M100 20c-25 18-38 44-38 68a38 38 0 0076 0c0-24-13-50-38-68z"
            stroke="#14335C"
            strokeWidth="1"
          />
          <path
            d="M100 20c25 18 38 44 38 68a38 38 0 01-76 0"
            stroke="#14335C"
            strokeWidth="1"
          />
          <path d="M100 88v70" stroke="#14335C" strokeWidth="1" />
          <circle cx="100" cy="100" r="95" stroke="#B8923F" strokeWidth="0.5" />
        </svg>

        <div className="max-w-6xl mx-auto px-6 pt-20 pb-16 relative">
          <div className="max-w-3xl">
            <h2 className="font-serif text-2xl font-medium text-navy mb-8">Sejarah</h2>
          </div>
          <div className="max-w-3xl">
            <Timeline entries={sejarahTimeline} />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="max-w-3xl mx-auto space-y-16">
          <div>
            <h2 className="font-serif text-2xl font-medium text-navy mb-4">
              Landasan, azas &amp; prinsip
            </h2>
            <p className="text-ink/70 leading-relaxed mb-4">
              {settings.landasan} {settings.asas} Koperasi melaksanakan prinsip:
            </p>
            <ul className="space-y-2 text-ink/70">
              {landasanPrinsip.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <span className="text-gold">—</span>
                  {item.teks}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-medium text-navy mb-4">
              Fungsi, peran &amp; tujuan
            </h2>
            <p className="text-ink/70 leading-relaxed mb-4">
              Koperasi bertujuan{" "}
              {settings.tujuanKoperasi.charAt(0).toLowerCase() + settings.tujuanKoperasi.slice(1)}
            </p>
            <ul className="space-y-2 text-ink/70">
              {fungsiPeran.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <span className="text-gold">—</span>
                  {item.teks}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Selengkapnya"
        title="Kenali susunan pengurus dan dasar hukum Kopaseba."
        primary={{ label: "Lihat Struktur Organisasi", href: "/pengurus" }}
        secondary={{ label: "Baca legalitas & dokumen", href: "/legalitas" }}
      />
    </>
  );
}
