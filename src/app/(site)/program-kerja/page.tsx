import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Program Kerja — Kopaseba",
  description: "Program kerja jangka pendek dan panjang KOPASEBA periode 2024–2027.",
};

export const dynamic = "force-dynamic";

export default async function ProgramKerjaPage() {
  const [jangkaPendek, jangkaPanjang, skemaBagiHasil, settings] = await Promise.all([
    prisma.listItem.findMany({ where: { section: "PROGRAM_JANGKA_PENDEK" }, orderBy: { urutan: "asc" } }),
    prisma.listItem.findMany({ where: { section: "PROGRAM_JANGKA_PANJANG" }, orderBy: { urutan: "asc" } }),
    prisma.listItem.findMany({ where: { section: "PROGRAM_SKEMA_BAGI_HASIL_POIN" }, orderBy: { urutan: "asc" } }),
    prisma.siteSettings.findUniqueOrThrow({ where: { id: 1 } }),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Program kerja"
        title="Arah kerja Kopaseba periode 2024–2027."
        description="Rencana jangka pendek dan panjang, beserta skema bagi hasil kerja sama sponsor."
      />

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-sky-light rounded-2xl p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky mb-4">
              Jangka pendek
            </p>
            <ul className="space-y-4 text-ink/75">
              {jangkaPendek.map((item) => (
                <li key={item.id} className="flex gap-3 leading-relaxed">
                  <span className="text-gold">—</span>
                  {item.teks}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-navy-light rounded-2xl p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky mb-4">
              Jangka panjang
            </p>
            <ul className="space-y-4 text-ink/75">
              {jangkaPanjang.map((item) => (
                <li key={item.id} className="flex gap-3 leading-relaxed">
                  <span className="text-gold">—</span>
                  {item.teks}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-ink/10 rounded-2xl p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky mb-4">
              {settings.programKerjaSkemaBagiHasilJudul}
            </p>
            <ul className="space-y-4 text-ink/75">
              {skemaBagiHasil.map((item) => (
                <li key={item.id} className="flex gap-3 leading-relaxed">
                  <span className="text-gold">—</span>
                  {item.teks}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-ink/10 rounded-2xl p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky mb-4">
              {settings.programKerjaPengembanganObatJudul}
            </p>
            <p className="text-ink/75 leading-relaxed">
              {settings.programKerjaPengembanganObatDeskripsi}
            </p>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Selanjutnya"
        title="Lihat unit usaha & mitra kerjasama yang berjalan."
        primary={{ label: "Lihat Unit Usaha & Mitra", href: "/unit-usaha" }}
        secondary={{ label: "Hubungi Kopaseba", href: "/kontak" }}
      />
    </>
  );
}
