import { readFileSync } from "node:fs";
import path from "node:path";
import bcrypt from "bcryptjs";
import type { PrismaClient } from "@/generated/prisma/client";
import type { ListSection } from "@/generated/prisma/enums";

const PUBLIC_DIR = path.join(process.cwd(), "public");

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function mediaFromPublicFile(
  prisma: PrismaClient,
  relPath: string,
  mimeType: string,
  alt: string
) {
  const filePath = path.join(PUBLIC_DIR, relPath);
  const buffer = readFileSync(filePath);
  const media = await prisma.media.create({
    data: {
      filename: path.basename(relPath),
      mimeType,
      size: buffer.byteLength,
      alt,
      data: new Uint8Array(buffer),
    },
  });
  return media.id;
}

async function seedAdmin(prisma: PrismaClient, log: (msg: string) => void) {
  const email = process.env.ADMIN_SEED_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;
  if (!email || !password) {
    throw new Error("ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD belum diset.");
  }
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Admin",
      passwordHash: await bcrypt.hash(password, 10),
    },
  });
  log(`✓ Admin user siap: ${email}`);
}

async function seedPengurus(prisma: PrismaClient, log: (msg: string) => void) {
  if ((await prisma.pengurus.count()) > 0) {
    log("- Pengurus sudah ada data, skip.");
    return;
  }

  const ketuaFotoId = await mediaFromPublicFile(
    prisma,
    "ketua-kopaseba.jpg",
    "image/jpeg",
    "Dr. Erlang Samoedro, Sp.P(K), FISR"
  );
  const sekretarisFotoId = await mediaFromPublicFile(
    prisma,
    "sekretaris-kopaseba.png",
    "image/png",
    "Dr. Hario Baskoro, Ph.D, Sp.P(K)"
  );
  const bendaharaFotoId = await mediaFromPublicFile(
    prisma,
    "bendahara-kopaseba.webp",
    "image/webp",
    "Dr. Cut Yulia Indah Sari, Sp.P"
  );

  await prisma.pengurus.createMany({
    data: [
      { kategori: "PIMPINAN", nama: "Dr. Erlang Samoedro, Sp.P(K), FISR", jabatan: "Ketua", fotoMediaId: ketuaFotoId, urutan: 0 },
      { kategori: "PIMPINAN", nama: "Dr. Hario Baskoro, Ph.D, Sp.P(K)", jabatan: "Sekretaris", fotoMediaId: sekretarisFotoId, urutan: 1 },
      { kategori: "PIMPINAN", nama: "Dr. Cut Yulia Indah Sari, Sp.P", jabatan: "Bendahara", fotoMediaId: bendaharaFotoId, urutan: 2 },

      { kategori: "DEWAN_PENGAWAS", nama: "Prof. DR. Dr. Agus Dwi Susanto, Sp.P(K), FISR, FAPSR", urutan: 0 },
      { kategori: "DEWAN_PENGAWAS", nama: "Dr. Arif Santoso, Sp.P(K), Ph.D", urutan: 1 },
      { kategori: "DEWAN_PENGAWAS", nama: "DR. Dr. Mukhtar Ikhsan, Sp.P(K), MARS", urutan: 2 },
      { kategori: "DEWAN_PENGAWAS", nama: "DR. Dr. Try Agus Yuarsa, Sp.P(K), FISR, FAPSR, MARS, MH", urutan: 3 },

      { kategori: "ANGGOTA", nama: "Dr. Ferry Dwi Kurniawan, Ph.D, Sp.P(K)", urutan: 0 },
      { kategori: "ANGGOTA", nama: "Dr. Hariman Alamsyah, Sp.P(K)", urutan: 1 },
      { kategori: "ANGGOTA", nama: "Dr. Deddy Herman, Sp.P(K), FISR, FAPSR", urutan: 2 },
      { kategori: "ANGGOTA", nama: "Dr. Adrianison, Sp.P(K)", urutan: 3 },
      { kategori: "ANGGOTA", nama: "Dr. Antonius Sianturi, Sp.P, FISR", urutan: 4 },
      { kategori: "ANGGOTA", nama: "Dr. Rahadi Widodo, Sp.P(K), FISR", urutan: 5 },
      { kategori: "ANGGOTA", nama: "Dr. Nova Indriani, Sp.P(K)", urutan: 6 },
      { kategori: "ANGGOTA", nama: "Dr. Vemi Fitria, Sp.P", urutan: 7 },
      { kategori: "ANGGOTA", nama: "DR. Dr. Anna Rozaliyani, M.Biomed, Sp.P(K)", urutan: 8 },
      { kategori: "ANGGOTA", nama: "Dr. Koko Harnoko, Sp.P, FISR", urutan: 9 },
      { kategori: "ANGGOTA", nama: "Dr. Rita Kesuma, Sp.P", urutan: 10 },
      { kategori: "ANGGOTA", nama: "Dr. Lusi S. Nursilawati, Sp.P", urutan: 11 },
      { kategori: "ANGGOTA", nama: "Dr. Syarifudin, Sp.P", urutan: 12 },
      { kategori: "ANGGOTA", nama: "Dr. Sofyan Budi Raharjo, Sp.P(K), FISR", urutan: 13 },
      { kategori: "ANGGOTA", nama: "Dr. Farih Raharjo, Sp.P(K)", urutan: 14 },
      { kategori: "ANGGOTA", nama: "Dr. Yuni Iswanti Raharja, Sp.P", urutan: 15 },
      { kategori: "ANGGOTA", nama: "Dr. Arief Bakhtiar, Sp.P(K)", urutan: 16 },
      { kategori: "ANGGOTA", nama: "Dr. Ungky Agus Setyawan, Sp.P(K)", urutan: 17 },
      { kategori: "ANGGOTA", nama: "Dr. Ida Ayu Jasminarti, Sp.P(K)", urutan: 18 },
      { kategori: "ANGGOTA", nama: "Dr. Slamet Tjahjono, Sp.P", urutan: 19 },
      { kategori: "ANGGOTA", nama: "Dr. Nikson Eduard Faot, Sp.P", urutan: 20 },
      { kategori: "ANGGOTA", nama: "Dr. Dwi Handoko, Sp.P(K)", urutan: 21 },
      { kategori: "ANGGOTA", nama: "Dr. Hendra Sihombing, Sp.P, FISR", urutan: 22 },
      { kategori: "ANGGOTA", nama: "Dr. Isa Anshori, Sp.P(K)", urutan: 23 },
      { kategori: "ANGGOTA", nama: "Dr. Maurits Silalahi, Sp.P(K), FISR", urutan: 24 },
      { kategori: "ANGGOTA", nama: "Dr. Efraim K. Biring, Sp.P", urutan: 25 },
      { kategori: "ANGGOTA", nama: "Dr. Ari Prabowo, Sp.P", urutan: 26 },
      { kategori: "ANGGOTA", nama: "Dr. M. Zukri Antuke, Sp.P", urutan: 27 },

      { kategori: "SEKRETARIAT", nama: "Aris Darsono, AMD", urutan: 0 },
      { kategori: "SEKRETARIAT", nama: "Arlita Rahmenia Puspitadewi, S.Ak", urutan: 1 },
    ],
  });
  log("✓ Pengurus (38 baris + 3 foto) di-seed.");
}

async function seedUnitUsahaPillar(prisma: PrismaClient, log: (msg: string) => void) {
  if ((await prisma.unitUsahaPillar.count()) > 0) {
    log("- Unit Usaha Pillar sudah ada data, skip.");
    return;
  }
  await prisma.unitUsahaPillar.createMany({
    data: [
      {
        judul: "Farmasi & produk kesehatan",
        deskripsi:
          "Perancangan, produksi, distribusi, hingga ekspor-impor obat dan produk kesehatan bagi anggota dan masyarakat.",
        urutan: 0,
      },
      {
        judul: "Fasilitas layanan kesehatan",
        deskripsi: "Perancangan, pendirian, dan pengoperasian rumah sakit, apotek, serta laboratorium klinik.",
        urutan: 1,
      },
      {
        judul: "Kerja sama strategis",
        deskripsi:
          "Kolaborasi saling menguntungkan dengan pemerintah, BUMN/BUMD, dan mitra swasta di bidang kesehatan.",
        urutan: 2,
      },
    ],
  });
  log("✓ Unit Usaha Pillar di-seed.");
}

async function seedKatalog(prisma: PrismaClient, log: (msg: string) => void) {
  if ((await prisma.katalogItem.count()) > 0) {
    log("- Katalog sudah ada data, skip.");
    return;
  }
  const mitraKerjasama = [
    {
      mitra: "PT Novel Pharmaceutical",
      produk: "Freventil",
      deskripsi: "Salmeterol & Fluticasone 25/125 mcg. Tersedia di wilayah Sumatera & Jawa.",
    },
    {
      mitra: "PT Dexa Medica",
      produk: "Avigan & Stimuno Plus",
      deskripsi: "Favipiravir (anti-influenza) dan suplemen daya tahan tubuh. Tersedia di seluruh Indonesia.",
    },
    {
      mitra: "PT HMS",
      produk: "Hiperbarik Chamber",
      deskripsi: "Alat terapi oksigen hiperbarik, tipe single/double lock, pengadaan seluruh provinsi.",
    },
  ];
  await prisma.katalogItem.createMany({
    data: mitraKerjasama.map((m, i) => ({
      kategori: "PRODUK_MITRA" as const,
      nama: m.produk,
      slug: slugify(m.produk),
      mitraNama: m.mitra,
      ringkasan: m.deskripsi,
      deskripsi: m.deskripsi,
      tampilkanHarga: false,
      published: true,
      urutan: i,
    })),
  });
  log("✓ Katalog (3 produk mitra) di-seed. Kategori LAYANAN_UNIT_USAHA sengaja dikosongkan.");
}

async function seedStrukturTambahan(prisma: PrismaClient, log: (msg: string) => void) {
  if ((await prisma.strukturTambahan.count()) > 0) {
    log("- Struktur Tambahan sudah ada data, skip.");
    return;
  }
  await prisma.strukturTambahan.createMany({
    data: [
      {
        nama: "Pengelola Koperasi",
        babPasal: "AD Bab VIII",
        deskripsi:
          "Tenaga operasional yang diangkat melalui kontrak kerja oleh rapat pleno Pengurus dan Pengawas, bertugas menjalankan kegiatan usaha sehari-hari.",
        urutan: 0,
      },
      {
        nama: "Dewan Penasehat",
        babPasal: "AD Bab IX",
        deskripsi:
          "Dapat diangkat oleh Rapat Anggota dari kalangan anggota maupun non-anggota yang memiliki keahlian relevan, bersifat memberi nasihat, menerima honorarium (bukan gaji), dan tidak memiliki hak suara.",
        urutan: 1,
      },
      {
        nama: "Perwakilan Kelompok Anggota",
        babPasal: "ART",
        deskripsi:
          "Setiap Ketua Cabang PDPI otomatis menjadi Perwakilan Kelompok Anggota di wilayahnya, dengan 1 suara mewakili setiap 20 anggota.",
        urutan: 2,
      },
    ],
  });
  log("✓ Struktur Tambahan di-seed.");
}

async function seedLegalitas(prisma: PrismaClient, log: (msg: string) => void) {
  if ((await prisma.legalitasDoc.count()) > 0) {
    log("- Legalitas sudah ada data, skip.");
    return;
  }
  await prisma.legalitasDoc.createMany({
    data: [
      {
        judul: "Surat Keputusan Susunan Pengurus No. 001/SK-I/KOPASEBA/III/2024",
        keterangan: "Mengesahkan susunan pengurus masa bakti 2024–2027, ditetapkan di Jakarta 1 Maret 2024.",
        pasal: "AD Bab VI Pasal 11–18 (Pengurus), Bab VII Pasal 19–21 (Pengawas); ART Bab IV Pasal 13–21 (Pengurus)",
        urutan: 0,
      },
      {
        judul: "Akta Perubahan Koperasi",
        keterangan: "Notaris Arief Saadhy, S.H., M.Kn — No. 12, tanggal 17 November 2023.",
        urutan: 1,
      },
      {
        judul: "Keputusan Menteri Hukum dan HAM RI",
        keterangan:
          "No. AHU-0003144.AH.01.38 Tahun 2023, tanggal 08 Desember 2023 — pengesahan perubahan Anggaran Dasar.",
        catatan:
          'Dalam berkas Kemenkumham, koperasi ini juga tercatat dengan varian nama "Koperasi Jasa Paru Sejahtera Bahagia".',
        urutan: 2,
      },
      {
        judul: "Anggaran Dasar & Anggaran Rumah Tangga",
        keterangan: "Anggaran Dasar disahkan 8 September 2008, Anggaran Rumah Tangga direvisi pada Konferensi Kerja 2023.",
        urutan: 3,
      },
    ],
  });
  log("✓ Legalitas di-seed.");
}

async function seedSejarahTimeline(prisma: PrismaClient, log: (msg: string) => void) {
  if ((await prisma.sejarahTimeline.count()) > 0) {
    log("- Sejarah Timeline sudah ada data, skip.");
    return;
  }
  await prisma.sejarahTimeline.createMany({
    data: [
      {
        tahun: "2008",
        tanggal: "8 September 2008",
        judul: "Anggaran Dasar disahkan",
        deskripsi:
          "Anggaran Dasar koperasi ditetapkan di Jakarta, ditandatangani Prof. Dr. Faisal Yunus, Ph.D, Sp.P(K) (Ketua Pengurus) dan Dr. Prasenohadi, Ph.D, Sp.P (Sekretaris), berdomisili di Gedung Asma Lt. II, RS Persahabatan.",
        urutan: 0,
      },
      {
        tahun: "2011–2023",
        judul: "KOPASEBA berdiri",
        deskripsi:
          "KOPASEBA dibentuk dari kerja sama PDPI dengan PT Indofarma, menyusul regulasi yang menegaskan organisasi profesi tidak boleh mencari keuntungan lewat usaha niaga/jasa secara langsung. Ketua pertama: Dr. M. Arifin Nawas, Sp.P(K), masa bakti 2011–2023.",
        urutan: 1,
      },
      {
        tahun: "2023",
        tanggal: "27–30 September 2023",
        judul: "Konferensi Kerja XVII PDPI di Lampung",
        deskripsi:
          "Konferensi Kerja XVII PDPI beserta Pertemuan Pengurus Pusat dan Pengurus Cabang membahas dan menyusun ulang kepengurusan KOPASEBA.",
        urutan: 2,
      },
      {
        tahun: "2023",
        tanggal: "17 November – 8 Desember 2023",
        judul: "Akta perubahan & pengesahan Kemenkumham",
        deskripsi:
          "Akta Perubahan Koperasi diterbitkan Notaris Arief Saadhy, S.H., M.Kn, disusul pengesahan Kementerian Hukum dan HAM RI atas perubahan Anggaran Dasar.",
        urutan: 3,
      },
      {
        tahun: "2024–2027",
        tanggal: "1 Maret 2024",
        judul: "SK Susunan Pengurus baru",
        deskripsi:
          "Surat Keputusan No. 001/SK-I/KOPASEBA/III/2024 ditetapkan di Jakarta, mengesahkan susunan pengurus masa bakti 2024–2027 di bawah Ketua Dr. Erlang Samoedro, Sp.P(K), FISR.",
        urutan: 4,
      },
    ],
  });
  log("✓ Sejarah Timeline di-seed.");
}

async function seedKeanggotaanFAQ(prisma: PrismaClient, log: (msg: string) => void) {
  if ((await prisma.keanggotaanFAQ.count()) > 0) {
    log("- Keanggotaan FAQ sudah ada data, skip.");
    return;
  }
  await prisma.keanggotaanFAQ.createMany({
    data: [
      {
        pertanyaan: "Apakah ada simpanan wajib bulanan?",
        jawaban:
          "Tidak. Simpanan wajib sementara tidak diberlakukan karena KOPASEBA bukan merupakan koperasi simpan pinjam. Anggota cukup melunasi simpanan pokok saat mendaftar.",
        urutan: 0,
      },
      {
        pertanyaan: "Bagaimana Sisa Hasil Usaha (SHU) dibagikan?",
        jawaban:
          "SHU dibagikan ke tujuh kategori: anggota, kelompok anggota, dana cadangan, kegiatan Kolegium Pulmonologi Indonesia, dana advokasi anggota, dana sosial, serta pengurus dan pengawas.",
        urutan: 1,
      },
      {
        pertanyaan: "Dari mana sumber modal koperasi?",
        jawaban:
          "Modal sendiri (simpanan pokok, simpanan wajib, dana cadangan, hibah), modal pinjaman (anggota, koperasi lain, bank/lembaga keuangan, obligasi/surat hutang, sumber sah lainnya), serta modal penyertaan.",
        urutan: 2,
      },
      {
        pertanyaan: "Bagaimana pengawasan dan pelaporan keuangan dijalankan?",
        jawaban:
          "Pengurus wajib melaporkan status organisasi dan usaha kepada Kementerian Koperasi dan UKM serta Pengurus Pusat PDPI sekurang-kurangnya setiap 6 bulan. Tahun buku berjalan 1 Januari–31 Desember, dan neraca/laba-rugi tahunan wajib diaudit oleh kantor akuntan publik.",
        urutan: 3,
      },
    ],
  });
  log("✓ Keanggotaan FAQ di-seed.");
}

async function seedListItems(prisma: PrismaClient, log: (msg: string) => void) {
  if ((await prisma.listItem.count()) > 0) {
    log("- ListItem sudah ada data, skip.");
    return;
  }

  const sections: Record<ListSection, string[]> = {
    SYARAT_ANGGOTA: [
      "Dokter Spesialis Paru, yang terdaftar sebagai anggota PDPI.",
      "Mempunyai kemampuan penuh untuk melakukan tindakan hukum (tidak dalam perwalian, dsb), bertempat tinggal di seluruh wilayah Republik Indonesia.",
      "Telah menyatakan kesanggupan tertulis untuk melunasi simpanan pokok.",
      "Telah menyetujui anggaran dasar, anggaran rumah tangga, dan peraturan-peraturan koperasi yang berlaku.",
    ],
    HAK_ANGGOTA: [
      "Menghadiri, menyatakan pendapat, dan memberikan suara dalam rapat anggota melalui Perwakilan Kelompok Anggota.",
      "Memilih dan/atau dipilih menjadi anggota pengurus atau pengawas.",
      "Mengemukakan pendapat dan saran kepada pengurus di luar rapat anggota.",
      "Mendapatkan pelayanan yang sama antar sesama anggota.",
      "Meminta keterangan mengenai perkembangan koperasi.",
      "Mendapatkan bagian sisa hasil usaha sesuai jasa usaha masing-masing anggota.",
    ],
    KEWAJIBAN_ANGGOTA: [
      "Mematuhi anggaran dasar, anggaran rumah tangga, peraturan koperasi, dan keputusan rapat anggota.",
      "Membayar simpanan pokok dan simpanan lainnya yang diputuskan rapat anggota.",
      "Aktif berpartisipasi dalam kegiatan usaha yang diselenggarakan koperasi.",
      "Mengembangkan dan memelihara kebersamaan berdasarkan azas kekeluargaan.",
      "Menanggung kerugian koperasi secara proporsional.",
    ],
    PROSEDUR_PENDAFTARAN: [
      "Pemohon harus terdaftar sebagai anggota PDPI.",
      "Mengisi formulir permohonan menjadi anggota KOPASEBA.",
      "Menyatakan kesanggupan tunduk pada AD/ART dan peraturan koperasi.",
      "Melunasi simpanan pokok sebesar Rp 100.000.",
      "Pengurus memberi jawaban tertulis selambat-lambatnya 1 bulan setelah permohonan diterima.",
      "Anggota yang diterima mendapatkan Kartu Tanda Anggota KOPASEBA.",
    ],
    LANDASAN_PRINSIP: [
      "Keanggotaan adalah seluruh anggota PDPI.",
      "Pengelolaan dilakukan secara demokratis.",
      "Pembagian Sisa Hasil Usaha (SHU) dilakukan secara adil sebanding dengan besarnya jasa usaha masing-masing anggota.",
      "Pemberian balas jasa yang terbatas terhadap modal.",
      "Kemandirian.",
      "Pendidikan perkoperasian bagi anggota.",
      "Kerjasama antar koperasi.",
    ],
    FUNGSI_PERAN: [
      "Membangun dan mengembangkan potensi dan kemampuan anggota khususnya, dan masyarakat pada umumnya, untuk meningkatkan kesejahteraan ekonomi dan sosial.",
      "Berperan aktif mempertinggi kualitas kehidupan masyarakat.",
      "Memperkokoh perekonomian rakyat sebagai dasar kekuatan dan ketahanan perekonomian nasional.",
      "Mewujudkan perekonomian nasional atas azas kekeluargaan dan demokrasi ekonomi.",
    ],
    PROGRAM_JANGKA_PENDEK: [
      "Kerja sama co-marketing obat bersama mitra farmasi.",
      "Kerja sama co-marketing alat kesehatan.",
    ],
    PROGRAM_JANGKA_PANJANG: [
      "Pengembangan obat baru (batuk, asma, PPOK, kanker) bersama mitra sponsor.",
      "Perluasan unit usaha lain di bidang kesehatan.",
    ],
    PROGRAM_SKEMA_BAGI_HASIL_POIN: [
      "40% untuk Pusat, 60% untuk Cabang dari hasil kerja sama sponsor.",
      "Porsi Cabang dibagi menurut persentase penjualan tiap wilayah.",
      "Distribusi dilakukan satu kali per tahun, setelah tutup buku.",
      "Komisi individu anggota dihitung terpisah dan tidak memengaruhi skema ini.",
    ],
  };

  for (const [section, items] of Object.entries(sections) as [ListSection, string[]][]) {
    await prisma.listItem.createMany({
      data: items.map((teks, i) => ({ section, teks, urutan: i })),
    });
  }
  log("✓ ListItem (9 section) di-seed.");
}

async function seedSiteSettings(prisma: PrismaClient, log: (msg: string) => void) {
  const existing = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  if (existing) {
    log("- SiteSettings sudah ada, skip.");
    return;
  }
  const alamat =
    "Rumah PDPI, Jl. Cipinang Baru Bunder No. 19, RT 006 RW 001, Kel. Cipinang, Kec. Pulogadung, Jakarta Timur, DKI Jakarta";
  await prisma.siteSettings.create({
    data: {
      id: 1,
      kontakAlamat: alamat,
      kontakEmail: "kopaseba@yahoo.com",
      kontakMapEmbedUrl:
        "https://www.google.com/maps?q=" +
        encodeURIComponent(
          "Rumah PDPI, Jl. Cipinang Baru Bunder No. 19, Cipinang, Pulogadung, Jakarta Timur, DKI Jakarta"
        ) +
        "&output=embed",
      landasan: "Koperasi berlandaskan Pancasila dan Undang-Undang Dasar 1945.",
      asas: "Koperasi berazaskan kekeluargaan.",
      tujuanKoperasi: "Mewujudkan kesejahteraan anggota dan kelangsungan hidup organisasi profesi PDPI.",
      programKerjaSkemaBagiHasilJudul: "Skema bagi hasil kerja sama sponsor",
      programKerjaPengembanganObatJudul: "Pengembangan obat baru",
      programKerjaPengembanganObatDeskripsi:
        "Riset dan pengembangan obat batuk, asma, PPOK, dan kanker paru bersama mitra sponsor, mengacu pada preseden pengembangan Proris (Ibuprofen) oleh IDAI.",
    },
  });
  log("✓ SiteSettings di-seed.");
}

export async function runSeed(prisma: PrismaClient, log: (msg: string) => void = console.log) {
  await seedAdmin(prisma, log);
  await seedPengurus(prisma, log);
  await seedUnitUsahaPillar(prisma, log);
  await seedKatalog(prisma, log);
  await seedStrukturTambahan(prisma, log);
  await seedLegalitas(prisma, log);
  await seedSejarahTimeline(prisma, log);
  await seedKeanggotaanFAQ(prisma, log);
  await seedListItems(prisma, log);
  await seedSiteSettings(prisma, log);
}
