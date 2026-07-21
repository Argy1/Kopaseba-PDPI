import Link from "next/link";
import PersonPhoto from "@/components/PersonPhoto";
import {
  mitraKerjasama,
  pimpinanUtama,
  programKerja,
} from "@/data/content";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <svg
          className="breathe-motif absolute -top-10 -right-24 pointer-events-none"
          width="620"
          height="620"
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

        <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-24 relative">
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

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-ink/10 pt-10">
            <div>
              <p className="font-serif text-3xl text-navy">2011</p>
              <p className="text-sm text-ink/60 mt-1">Tahun berdiri</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-navy">34+</p>
              <p className="text-sm text-ink/60 mt-1">Pengurus &amp; pengawas aktif</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-navy">2024–27</p>
              <p className="text-sm text-ink/60 mt-1">Periode kepengurusan berjalan</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-navy">Badan hukum</p>
              <p className="text-sm text-ink/60 mt-1">Terdaftar resmi Kemenkumham RI</p>
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
              <div key={p.jabatan}>
                <PersonPhoto />
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
                {programKerja.jangkaPendek.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-gold">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-paper rounded-2xl p-8 border border-ink/10">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky mb-3">
                Jangka panjang
              </p>
              <ul className="space-y-3 text-ink/75">
                {programKerja.jangkaPanjang.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-gold">—</span>
                    {item}
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

      {/* MITRA */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-gold-dark font-semibold tracking-widest text-xs uppercase mb-4">
          Mitra kerjasama berjalan
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-medium text-navy max-w-xl">
          Produk co-marketing bersama mitra strategis.
        </h2>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {mitraKerjasama.map((m) => (
            <div key={m.produk} className="bg-white rounded-2xl p-8 border border-ink/10">
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

      {/* CTA KEANGGOTAAN */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="bg-navy rounded-3xl px-8 md:px-16 py-16 text-center relative overflow-hidden">
          <svg
            className="absolute -bottom-16 -left-16 opacity-10"
            width="300"
            height="300"
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle cx="100" cy="100" r="95" stroke="#F7F6F2" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="70" stroke="#F7F6F2" strokeWidth="0.5" />
          </svg>
          <p className="text-gold font-semibold tracking-widest text-xs uppercase mb-4 relative">
            Keanggotaan
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-paper max-w-2xl mx-auto relative">
            Setiap dokter spesialis paru anggota PDPI berhak bergabung.
          </h2>
          <p className="text-paper/75 mt-5 max-w-xl mx-auto relative">
            Lengkapi formulir keanggotaan, lunasi simpanan pokok, dan jadilah
            bagian dari kesejahteraan bersama.
          </p>
          <Link
            href="/keanggotaan"
            className="inline-block mt-8 bg-gold text-white px-8 py-3.5 rounded-full font-medium hover:bg-gold-dark transition relative"
          >
            Ajukan Keanggotaan
          </Link>
        </div>
      </section>
    </>
  );
}
