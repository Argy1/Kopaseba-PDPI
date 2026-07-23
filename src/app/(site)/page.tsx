import Image from "next/image";
import Link from "next/link";
import PersonPhoto from "@/components/PersonPhoto";
import KatalogImage from "@/components/KatalogImage";
import CTASection from "@/components/CTASection";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [pimpinanUtama, jangkaPendek, jangkaPanjang, katalogTeaser] = await Promise.all([
    prisma.pengurus.findMany({ where: { kategori: "PIMPINAN" }, orderBy: { urutan: "asc" } }),
    prisma.listItem.findMany({ where: { section: "PROGRAM_JANGKA_PENDEK" }, orderBy: { urutan: "asc" } }),
    prisma.listItem.findMany({ where: { section: "PROGRAM_JANGKA_PANJANG" }, orderBy: { urutan: "asc" } }),
    prisma.katalogItem.findMany({ where: { published: true }, orderBy: { urutan: "asc" }, take: 3 }),
  ]);

  const ketua = pimpinanUtama.find((p) => p.jabatan === "Ketua");

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* WATERMARK LAMBANG KOPASEBA — pojok kanan atas */}
        <div
          aria-hidden
          className="pointer-events-none select-none absolute -top-10 -right-16 w-105 md:w-160 aspect-910/800 opacity-20 rotate-6"
          style={{
            maskImage: "radial-gradient(circle at 100% 0%, black 35%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(circle at 100% 0%, black 35%, transparent 78%)",
          }}
        >
          <Image src="/logo-kopaseba.jpeg" alt="" fill className="object-cover object-top" />
        </div>

        {/* WATERMARK LAMBANG KOPASEBA — pojok kiri bawah (penyeimbang) */}
        <div
          aria-hidden
          className="pointer-events-none select-none absolute -bottom-12 -left-16 w-70 md:w-110 aspect-910/800 opacity-15 -rotate-6 -scale-x-100"
          style={{
            maskImage: "radial-gradient(circle at 0% 100%, black 35%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(circle at 0% 100%, black 35%, transparent 78%)",
          }}
        >
          <Image src="/logo-kopaseba.jpeg" alt="" fill className="object-cover object-top" />
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-24 relative">
          <div className="flex flex-col lg:flex-row lg:items-center gap-14 lg:gap-16">
            <div className="max-w-2xl">
              <p className="text-gold-dark font-semibold tracking-widest text-xs uppercase mb-5">
                Koperasi Paru Sejahtera Bahagia
              </p>
              <h1 className="font-serif text-4xl md:text-6xl leading-[1.08] font-medium text-navy">
                Bernapas untuk sesama,
                <br /> tumbuh bersama koperasi.
              </h1>
              <p className="mt-6 text-lg text-ink/70 leading-relaxed max-w-xl">
                Wadah kesejahteraan ekonomi dan sosial bagi dokter spesialis paru
                se-Indonesia, di bawah naungan Perhimpunan Dokter Paru Indonesia
                (PDPI). Berdiri sejak 2011 atas asas kekeluargaan.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/keanggotaan"
                  className="bg-gold text-white px-7 py-3.5 rounded-full font-medium hover:bg-gold-dark transition"
                >
                  Cara Menjadi Anggota
                </Link>
                <Link
                  href="/tentang"
                  className="border border-ink/20 px-7 py-3.5 rounded-full font-medium hover:border-navy hover:text-navy transition"
                >
                  Pelajari Kopaseba →
                </Link>
              </div>
            </div>

            {/* FOTO UNGGULAN KETUA */}
            {ketua && (
              <div className="relative mx-auto lg:mx-0 shrink-0">
                <svg
                  className="breathe-motif absolute -top-16 -right-16 pointer-events-none opacity-80"
                  width="400"
                  height="400"
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

                {/* glow gradasi lembut di belakang */}
                <div className="absolute -inset-9 rounded-full bg-linear-to-br from-gold/45 via-sky/20 to-navy/45 blur-2xl" />

                {/* cincin gradasi + foto lingkaran */}
                <div className="relative w-68 h-68 md:w-84 md:h-84 rounded-full p-1.5 bg-linear-to-br from-gold via-sky to-navy shadow-xl shadow-navy/25">
                  <div className="w-full h-full rounded-full bg-paper p-2">
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-navy-light">
                      <Image
                        src="/ketua-kopaseba-hero.jpg"
                        alt={ketua.nama}
                        fill
                        className="object-cover object-[50%_12%]"
                        sizes="(min-width: 768px) 336px, 272px"
                        priority
                      />
                    </div>
                  </div>
                </div>

                <div className="relative mt-6 text-center">
                  <p className="font-serif text-base font-medium text-navy leading-snug">{ketua.nama}</p>
                  <p className="text-xs text-gold-dark uppercase tracking-wide mt-1">{ketua.jabatan} Kopaseba</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 border-t border-ink/10 pt-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 shrink-0 rounded-full bg-navy-light flex items-center justify-center">
                <span className="font-serif text-lg font-semibold text-navy">2011</span>
              </div>
              <p className="text-sm text-ink/60 leading-snug">Tahun berdiri</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 shrink-0 rounded-full bg-gold-light flex items-center justify-center">
                <span className="font-serif text-lg font-semibold text-gold-dark">34+</span>
              </div>
              <p className="text-sm text-ink/60 leading-snug">Pengurus &amp; pengawas aktif</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 shrink-0 rounded-full bg-sky-light flex items-center justify-center">
                <span className="font-serif text-base font-semibold text-sky">24–27</span>
              </div>
              <p className="text-sm text-ink/60 leading-snug">Periode kepengurusan 2024–2027</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 shrink-0 rounded-full bg-navy-light flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 12.5l5 5L20 7"
                    stroke="#14335C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-sm text-ink/60 leading-snug">Badan hukum terdaftar resmi Kemenkumham RI</p>
            </div>
          </div>
        </div>
      </section>

      {/* PIMPINAN */}
      <section className="bg-navy text-paper">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <p className="text-gold font-semibold tracking-widest text-xs uppercase mb-4">
            Pimpinan Kopaseba
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium max-w-xl">
            Ditopang oleh tiga pilar kepengurusan.
          </h2>

          <div className="mt-14 grid sm:grid-cols-3 gap-8">
            {pimpinanUtama.map((p) => (
              <div key={p.id}>
                <PersonPhoto src={p.fotoMediaId ? `/api/media/${p.fotoMediaId}` : null} alt={p.nama} />
                <p className="font-medium mt-4 leading-snug">{p.nama}</p>
                <p className="text-sm text-gold mt-0.5">{p.jabatan}</p>
              </div>
            ))}
          </div>
          <Link href="/pengurus" className="inline-block mt-10 text-gold font-medium hover:underline">
            Lihat susunan pengurus &amp; dewan pengawas lengkap →
          </Link>
        </div>
      </section>

      {/* TENTANG SINGKAT */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-2">
            <p className="text-gold-dark font-semibold tracking-widest text-xs uppercase mb-4">
              Sejarah singkat
            </p>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight font-medium text-navy">
              Dari kerja sama PDPI–Indofarma, menjadi koperasi mandiri.
            </h2>
          </div>
          <div className="md:col-span-3 space-y-6 text-ink/70 leading-relaxed">
            <p>
              KOPASEBA berawal dari kerja sama PDPI dengan PT Indofarma pada 2011.
              Ketika regulasi menegaskan organisasi profesi tidak boleh mencari
              keuntungan lewat usaha niaga/jasa secara langsung, PDPI membentuk
              KOPASEBA sebagai badan usaha tersendiri — dipimpin Ketua pertama
              Dr. M. Arifin Nawas, Sp.P(K), masa bakti 2011–2023.
            </p>
            <p>
              Koperasi berlandaskan Pancasila dan UUD 1945, dengan azas
              kekeluargaan. Seluruh anggota adalah dokter spesialis paru
              terdaftar PDPI, dikelola secara demokratis, dengan pembagian Sisa
              Hasil Usaha yang adil sebanding jasa masing-masing anggota.
            </p>
            <Link href="/tentang" className="inline-block text-navy font-medium mt-2 hover:underline">
              Selengkapnya tentang Kopaseba →
            </Link>
          </div>
        </div>
      </section>

      {/* PROGRAM KERJA */}
      <section className="bg-sky-light">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <p className="text-gold-dark font-semibold tracking-widest text-xs uppercase mb-4">
            Program kerja 2024–2027
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-navy max-w-xl">
            Arah kerja jangka pendek dan panjang.
          </h2>

          <div className="mt-14 grid md:grid-cols-2 gap-6">
            <div className="bg-paper rounded-2xl p-8 border border-ink/10">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky mb-3">
                Jangka pendek
              </p>
              <ul className="space-y-3 text-ink/75">
                {jangkaPendek.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    <span className="text-gold">—</span>
                    {item.teks}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-paper rounded-2xl p-8 border border-ink/10">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky mb-3">
                Jangka panjang
              </p>
              <ul className="space-y-3 text-ink/75">
                {jangkaPanjang.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    <span className="text-gold">—</span>
                    {item.teks}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link
            href="/program-kerja"
            className="inline-block mt-8 text-navy font-medium hover:underline"
          >
            Lihat detail program kerja →
          </Link>
        </div>
      </section>

      {/* KATALOG */}
      {katalogTeaser.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
            <div>
              <p className="text-gold-dark font-semibold tracking-widest text-xs uppercase mb-4">
                Katalog
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-navy max-w-xl">
                Produk mitra & layanan unit usaha Kopaseba.
              </h2>
            </div>
            <Link href="/katalog" className="text-navy font-medium hover:underline shrink-0">
              Lihat semua di Katalog →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {katalogTeaser.map((item) => (
              <Link
                key={item.id}
                href={`/katalog/${item.slug}`}
                className="bg-white rounded-2xl border border-ink/10 overflow-hidden hover:border-navy/40 transition-colors"
              >
                <div className="p-4 pb-0">
                  <KatalogImage mediaId={item.imageMediaId} alt={item.nama} />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky mb-2">
                    {item.mitraNama ?? (item.kategori === "PRODUK_MITRA" ? "Produk Mitra" : "Layanan Unit Usaha")}
                  </p>
                  <h3 className="font-serif text-lg font-medium text-navy mb-2">{item.nama}</h3>
                  <p className="text-sm text-ink/65 leading-relaxed line-clamp-3">{item.ringkasan}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA KEANGGOTAAN */}
      <CTASection
        eyebrow="Keanggotaan"
        title="Setiap dokter spesialis paru anggota PDPI berhak bergabung."
        description="Lengkapi formulir keanggotaan, lunasi simpanan pokok, dan jadilah bagian dari kesejahteraan bersama."
        primary={{ label: "Ajukan Keanggotaan", href: "/keanggotaan" }}
      />
    </>
  );
}
