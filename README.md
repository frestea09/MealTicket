# Manajer Tiket Makan (Meal Ticket Manager)

Ini adalah aplikasi web yang dibangun dengan Next.js untuk mengelola tiket makan pasien di rumah sakit atau fasilitas kesehatan. Aplikasi ini dirancang sebagai alat bantu untuk petugas gizi dalam membuat, melihat, memperbarui, menghapus, dan mencetak tiket makan secara efisien.

## Fitur Utama

- **Otentikasi Pengguna**: Sistem login sederhana untuk mengamankan akses ke dasbor.
- **Manajemen Tiket (CRUD)**:
  - **Tambah Tiket**: Membuat tiket makan baru untuk pasien.
  - **Lihat Tiket**: Menampilkan daftar semua tiket dalam bentuk tabel yang mudah dibaca.
  - **Ubah Tiket**: Mengedit detail tiket yang sudah ada.
  - **Hapus Tiket**: Menghapus tiket yang tidak lagi diperlukan.
- **Pencarian dan Filter**: Mencari tiket berdasarkan nama/ID pasien dan memfilter berdasarkan ruangan atau tanggal.
- **Input Fleksibel**: Kolom input untuk Diet dan Ruangan mendukung pemilihan dari daftar yang ada atau input manual.
- **Cetak Tiket**: Opsi untuk mencetak tiket satu per satu atau semua tiket yang ditampilkan dalam satu halaman.
- **Desain Responsif**: Antarmuka yang dapat diakses dengan baik di perangkat desktop maupun mobile.

## Teknologi yang Digunakan

- **Framework**: Next.js (dengan App Router)
- **Library UI**: React
- **Styling**: Tailwind CSS
- **Komponen**: ShadCN UI
- **AI**: Genkit (terintegrasi, siap untuk pengembangan fitur AI)

## Menjalankan Aplikasi

Untuk menjalankan aplikasi ini di lingkungan pengembangan, gunakan perintah berikut:

```bash
npm run dev
```

Aplikasi akan tersedia di `http://localhost:3000`.

## Kredensial Demo

Aplikasi ini menggunakan sistem data sementara untuk keperluan demonstrasi. Anda dapat masuk menggunakan kredensial berikut:

- **Username**: `admin`
- **Password**: `password`

**Penting**: Karena ini adalah versi demo, semua data (termasuk tiket yang Anda tambahkan atau ubah) akan kembali ke data awal setiap kali server aplikasi dimulai ulang. Tidak ada data yang disimpan secara permanen.
