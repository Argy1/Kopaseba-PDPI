// Sitemap lengkap untuk Footer. Header (Navbar) sengaja punya daftar
// terpisah & lebih ringkas — lihat navPrimary di src/components/Navbar.tsx.
//
// Ini satu-satunya konten yang masih hardcode di kode: struktur navigasi
// adalah keputusan desain, bukan konten editorial, sehingga sengaja TIDAK
// dipindah ke dashboard admin (menghindari risiko admin salah-edit dan
// merusak navigasi situs). Semua konten lain (katalog, pengurus, legalitas,
// program kerja, keanggotaan, tentang, kontak) sudah dikelola lewat database
// via dashboard admin — lihat src/lib/prisma.ts dan src/app/admin/.
export const nav = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/tentang" },
  { label: "Struktur Organisasi", href: "/pengurus" },
  { label: "Unit Usaha & Mitra", href: "/unit-usaha" },
  { label: "Katalog", href: "/katalog" },
  { label: "Program Kerja", href: "/program-kerja" },
  { label: "Keanggotaan", href: "/keanggotaan" },
  { label: "Legalitas", href: "/legalitas" },
  { label: "Kontak", href: "/kontak" },
];
