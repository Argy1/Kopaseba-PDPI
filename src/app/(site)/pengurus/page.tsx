import type { Metadata } from "next";
import PersonPhoto from "@/components/PersonPhoto";
import PageHeader from "@/components/PageHeader";
import IconBadge from "@/components/IconBadge";
import CTASection from "@/components/CTASection";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Struktur Organisasi — Kopaseba",
  description:
    "Susunan Dewan Pengawas, Pengurus, dan Sekretariat KOPASEBA masa bakti 2024–2027.",
};

export const dynamic = "force-dynamic";

export default async function PengurusPage() {
  const [pengurus, strukturTambahan] = await Promise.all([
    prisma.pengurus.findMany({ orderBy: [{ kategori: "asc" }, { urutan: "asc" }] }),
    prisma.strukturTambahan.findMany({ orderBy: { urutan: "asc" } }),
  ]);

  const pimpinanUtama = pengurus.filter((p) => p.kategori === "PIMPINAN");
  const dewanPengawas = pengurus.filter((p) => p.kategori === "DEWAN_PENGAWAS");
  const anggotaPengurus = pengurus.filter((p) => p.kategori === "ANGGOTA");
  const sekretariat = pengurus.filter((p) => p.kategori === "SEKRETARIAT");

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
            <div key={p.id}>
              <PersonPhoto src={p.fotoMediaId ? `/api/media/${p.fotoMediaId}` : null} alt={p.nama} tone="light" />
              <p className="font-medium mt-4 leading-snug text-ink">{p.nama}</p>
              <p className="text-sm text-gold-dark mt-0.5">{p.jabatan}</p>
            </div>
          ))}
        </div>

        <h2 className="font-serif text-2xl font-medium text-navy mb-3">Dewan pengawas</h2>
        <p className="text-sm text-ink/55 leading-relaxed mb-8 max-w-2xl">
          Ketua Pengurus PDPI Pusat dan Ketua Kolegium Pulmonologi Indonesia secara ex-officio
          otomatis menjadi anggota Dewan Pengawas, di luar daftar berikut.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-20">
          {dewanPengawas.map((p) => (
            <div
              key={p.id}
              className="bg-sky-light rounded-xl px-5 py-4 text-sm text-ink/80 font-medium"
            >
              {p.nama}
            </div>
          ))}
        </div>

        <h2 className="font-serif text-2xl font-medium text-navy mb-8">Anggota pengurus</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-20">
          {anggotaPengurus.map((p) => (
            <div
              key={p.id}
              className="bg-paper-dark rounded-xl px-5 py-3.5 text-sm text-ink/75"
            >
              {p.nama}
            </div>
          ))}
        </div>

        <h2 className="font-serif text-2xl font-medium text-navy mb-8">Sekretariat</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-20">
          {sekretariat.map((p) => (
            <div
              key={p.id}
              className="bg-sky-light rounded-xl px-5 py-4 text-sm text-ink/80 font-medium"
            >
              {p.nama}
            </div>
          ))}
        </div>

        <h2 className="font-serif text-2xl font-medium text-navy mb-3">
          Struktur tata kelola lainnya
        </h2>
        <p className="text-sm text-ink/55 leading-relaxed mb-8 max-w-2xl">
          Selain Pengurus dan Pengawas, Anggaran Dasar &amp; Anggaran Rumah Tangga mengatur
          beberapa perangkat organisasi berikut.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {strukturTambahan.map((role) => (
            <div key={role.id} className="bg-white rounded-2xl p-6 border border-ink/10">
              <IconBadge tone="gold">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8F701F" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="3.5" />
                  <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
                </svg>
              </IconBadge>
              <h3 className="font-medium text-navy mt-4">{role.nama}</h3>
              <p className="text-xs text-gold-dark uppercase tracking-wide mt-1">{role.babPasal}</p>
              <p className="text-sm text-ink/65 leading-relaxed mt-3">{role.deskripsi}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Selengkapnya"
        title="Lihat dasar hukum lengkap kepengurusan Kopaseba."
        primary={{ label: "Lihat Legalitas & Dokumen", href: "/legalitas" }}
        secondary={{ label: "Baca sejarah Kopaseba", href: "/tentang" }}
      />
    </>
  );
}
