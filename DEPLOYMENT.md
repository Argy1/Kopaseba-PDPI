# Deploy ke Hostinger

Panduan ini untuk deploy KOPASEBA (Next.js + Prisma + MySQL) ke **Hostinger Node.js
Web App Hosting** (paket Business atau Cloud Startup — bukan shared/PHP hosting
biasa, bukan VPS).

## 1. Prasyarat

- Kode sudah di-push ke repo GitHub (boleh privat).
- Paket hosting Hostinger yang mendukung **Node.js Web App** (Business hosting
  atau salah satu paket Cloud). Cek di hPanel bahwa opsi "Node.js" tersedia di
  menu Websites.
- Node.js **22.x** dipilih saat setup app (Next.js 16 butuh minimal Node 20.9;
  22.x adalah pilihan stabil paling aman, hindari 18.x).

## 2. Buat database MySQL

1. hPanel → **Databases → MySQL Databases** → buat database baru (mis. `kopaseba`)
   dan user dengan password kuat.
2. Catat: nama database, username, password, host (biasanya `localhost` karena
   Node app dan MySQL jalan di server yang sama).

## 3. Buat Node.js Web App

1. hPanel → **Websites → Add Website → Node.js Apps**.
2. Pilih **Import Git Repository**, hubungkan akun GitHub, pilih repo ini dan
   branch `main`.
3. Framework harusnya otomatis terdeteksi sebagai Next.js. Jika diminta
   konfigurasi manual:
   - **Build command**: `npm run build`
   - **Start command**: `npm run start`
   - **Node version**: 22.x
4. Jangan klik deploy dulu — isi environment variables terlebih dahulu (langkah 4).

## 4. Environment variables

Di pengaturan app Node.js di hPanel, tambahkan (lihat `.env.example` untuk
penjelasan tiap variabel):

| Variabel | Nilai |
|---|---|
| `DATABASE_URL` | `mysql://<user>:<password>@localhost:3306/<database>` dari langkah 2 |
| `AUTH_SECRET` | hasil `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` |
| `AUTH_URL` | URL situs production, mis. `https://kopaseba.or.id` |
| `ADMIN_SEED_EMAIL` | email login admin pertama |
| `ADMIN_SEED_PASSWORD` | password kuat untuk admin pertama |
| `SEED_TOKEN` | *(opsional, isi hanya jika SSH tidak tersedia — lihat langkah 6b)* |

Setelah menyimpan env vars, **restart app** dari hPanel agar terbaca.

## 5. Deploy pertama

1. Trigger deploy dari hPanel (atau otomatis terjadi setelah repo terhubung).
2. Build akan menjalankan `prisma generate && next build`.
3. Start akan menjalankan `prisma migrate deploy && next start` — ini otomatis
   membuat semua tabel di database yang masih kosong. Aman dijalankan berkali-kali
   (tidak akan mengulang migrasi yang sudah diterapkan).
4. Tunggu sampai status app "Running"/"Online" di hPanel.

## 6. Isi data awal (seed) — jalankan SEKALI saja

Database yang baru dibuat masih kosong (skema tabel sudah ada dari `migrate
deploy`, tapi belum ada data). Isi dengan salah satu cara berikut.

### 6a. Via SSH/Terminal (disarankan)

Jika paket Anda punya akses SSH/terminal (biasanya ada di hPanel → Advanced →
SSH Access atau tombol Terminal di halaman Node.js app):

```bash
cd domains/<domain-anda>/nodejs   # sesuaikan path sesuai yang tertera di hPanel
npm run db:seed
```

Cek output: harus muncul baris `✓ Admin user siap: ...` dan beberapa baris
`✓ ... di-seed.` lainnya.

### 6b. Fallback via HTTP (jika SSH tidak tersedia)

1. Set env var `SEED_TOKEN` ke nilai acak yang kuat (generate sama seperti
   `AUTH_SECRET`), simpan, restart app.
2. Buka `https://<domain-anda>/api/seed?token=<SEED_TOKEN-Anda>` di browser
   atau via `curl`. Responnya JSON berisi log tiap tabel yang di-seed.
3. **Setelah berhasil, hapus env var `SEED_TOKEN`** (atau kosongkan) dan restart
   app lagi — endpoint ini menolak berjalan tanpa token yang cocok, jadi
   menghapus token secara efektif menonaktifkannya.

Seed aman dijalankan berulang kali — tabel yang sudah terisi otomatis dilewati,
kecuali akun admin (upsert, tidak akan duplikat).

## 7. Smoke test

Setelah seed selesai, cek semua ini di browser:

- [ ] `/` — homepage tampil, foto pimpinan & teaser katalog muncul.
- [ ] `/katalog` — 3 produk mitra dari seed muncul, filter kategori & pencarian
      berfungsi.
- [ ] `/pengurus`, `/tentang`, `/legalitas`, `/program-kerja`, `/keanggotaan`,
      `/kontak`, `/unit-usaha` — semua tampil tanpa error, peta di `/kontak`
      muncul dan pin akurat.
- [ ] `/admin/login` — bisa login pakai `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD`.
- [ ] Setelah login, `/admin` menampilkan angka ringkasan yang benar (Katalog 3,
      Pengurus 38, dst).
- [ ] Buka tab/incognito baru, akses `/admin` tanpa login → harus redirect ke
      `/admin/login`.
- [ ] Coba tambah 1 item katalog baru lewat `/admin/katalog/new` dengan foto →
      cek muncul di `/katalog` tanpa perlu redeploy.
- [ ] **Segera ganti password admin** lewat `/admin/akun` (jangan pakai
      `ADMIN_SEED_PASSWORD` selamanya — mengganti env var itu setelah seed
      pertama TIDAK mengubah password akun yang sudah dibuat).

## Domain & SSL

Hubungkan domain kustom dan aktifkan SSL (Let's Encrypt gratis, biasanya
otomatis tersedia) lewat hPanel → Domains, terpisah dari langkah-langkah di
atas.

## Update konten setelahnya

Setelah deploy pertama ini, **semua konten** (katalog, pengurus & foto,
legalitas, program kerja, keanggotaan, tentang/sejarah, info kontak) diedit
lewat `/admin`, tidak perlu ubah kode atau redeploy lagi. Redeploy hanya
diperlukan untuk perubahan kode (desain, fitur baru, dll) — cukup push ke
branch `main` di GitHub, Hostinger akan build & deploy otomatis.
