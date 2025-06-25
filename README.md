# Manajer Tiket Makan (Meal Ticket Manager)

Ini adalah aplikasi web yang dibangun dengan Next.js untuk mengelola tiket makan pasien di rumah sakit atau fasilitas kesehatan. Aplikasi ini dirancang sebagai alat bantu untuk petugas gizi dalam membuat, melihat, memperbarui, menghapus, dan mencetak tiket makan secara efisien.

## Fitur Utama

- **Otentikasi Pengguna**: Sistem login aman dengan kata sandi terenkripsi.
- **Database Persisten**: Menggunakan Prisma dan SQLite untuk memastikan data tidak hilang saat server dimulai ulang.
- **Manajemen Tiket (CRUD)**:
  - **Tambah Tiket**: Membuat tiket makan baru untuk pasien.
  - **Lihat Tiket**: Menampilkan daftar semua tiket dalam bentuk tabel yang mudah dibaca dengan paginasi.
  - **Ubah Tiket**: Mengedit detail tiket yang sudah ada.
  - **Hapus Tiket**: Menghapus tiket yang tidak lagi diperlukan dari database.
- **Pencarian dan Filter**: Mencari tiket berdasarkan nama/ID pasien dan memfilter berdasarkan ruangan atau tanggal.
- **Input Fleksibel**: Kolom input untuk Diet dan Ruangan mendukung pemilihan dari daftar yang ada atau input manual (misal: "Mawar I" atau "Diet Jantung").
- **Cetak Tiket**: Opsi untuk mencetak tiket satu per satu atau semua tiket yang ditampilkan dalam satu halaman.
- **Desain Responsif**: Antarmuka yang dapat diakses dengan baik di perangkat desktop maupun mobile.

## Teknologi yang Digunakan

- **Framework**: Next.js (dengan App Router)
- **Library UI**: React
- **Database ORM**: Prisma
- **Database**: SQLite
- **Styling**: Tailwind CSS
- **Komponen**: ShadCN UI
- **AI**: Genkit (terintegrasi, siap untuk pengembangan fitur AI)

## Menjalankan Aplikasi

1.  **Instal dependensi**:
    ```bash
    npm install
    ```
2.  **Inisialisasi Database (Hanya untuk pertama kali)**:
    Perintah ini akan membuat file database `dev.db` dan menerapkan skema Anda.
    ```bash
    npx prisma db push
    ```
3.  **Jalankan server pengembangan**:
    ```bash
    npm run dev
    ```

Aplikasi akan tersedia di `http://localhost:3000`.

## Kredensial Login

Aplikasi ini akan secara otomatis membuat pengguna admin jika belum ada. Anda dapat masuk menggunakan kredensial berikut:

- **Username**: `admin`
- **Password**: `password`

Data yang Anda buat akan tersimpan di dalam file `prisma/dev.db`.
