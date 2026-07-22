import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import IconBadge from "@/components/IconBadge";
import CTASection from "@/components/CTASection";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Unit Usaha & Mitra — Kopaseba",
  description:
    "Tiga pilar usaha KOPASEBA di bidang kesehatan dan mitra kerjasama yang berjalan.",
};

const ikonUnit = [
  // Farmasi & produk kesehatan
  <svg key="0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8F701F" strokeWidth="1.5">
    <rect x="4" y="4" width="7" height="16" rx="3.5" transform="rotate(-45 7.5 12)" />
    <path d="M7 15l4-4" />
  </svg>,
  // Fasilitas layanan kesehatan
  <svg key="1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8F701F" strokeWidth="1.5">
    <path d="M4 21V9l8-5 8 5v12" />
    <path d="M9 21v-6h6v6" />
    <path d="M10 9h4M12 7v4" strokeLinecap="round" />
  </svg>,
  // Kerja sama strategis
  <svg key="2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8F701F" strokeWidth="1.5">
    <circle cx="7" cy="8" r="2.5" />
    <circle cx="17" cy="8" r="2.5" />
    <path d="M3 20c0-3 2-5 4-5s4 2 4 5" />
    <path d="M13 20c0-3 2-5 4-5s4 2 4 5" />
  </svg>,
];

export const dynamic = "force-dynamic";

export default async function UnitUsahaPage() {
  const pillars = await prisma.unitUsahaPillar.findMany({ orderBy: { urutan: "asc" } });

  return (
    <>
      <PageHeader
        eyebrow="Unit usaha & mitra"
        title="Tiga pilar usaha, dijalankan bersama mitra strategis."
        description="Usaha KOPASEBA berfokus di bidang kesehatan, sesuai Anggaran Dasar Bab III."
      />

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((u, i) => (
            <div key={u.id} className="bg-white rounded-2xl p-8 border border-ink/10">
              <IconBadge tone="gold">{ikonUnit[i]}</IconBadge>
              <h3 className="font-serif text-xl font-medium text-navy mt-5 mb-2">{u.judul}</h3>
              <p className="text-sm text-ink/65 leading-relaxed">{u.deskripsi}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Selanjutnya"
        title="Lihat produk mitra & layanan lengkap di Katalog Kopaseba."
        primary={{ label: "Lihat Katalog", href: "/katalog" }}
        secondary={{ label: "Lihat Program Kerja", href: "/program-kerja" }}
      />
    </>
  );
}
