export const i18n = {
  app: {
    title: 'Manajer Tiket Makan',
    description: 'Kelola tiket makan pasien secara efisien.',
  },
  header: {
    dashboard: 'Dasbor',
    faq: 'FAQ',
    guide: 'Panduan',
    logout: 'Keluar',
  },
  loginPage: {
    title: 'Manajer Tiket Makan',
    description: 'Silakan masuk untuk mengelola tiket makan pasien.',
  },
  authForm: {
    usernameLabel: 'Nama Pengguna',
    passwordLabel: 'Kata Sandi',
    errorTitle: 'Kesalahan',
    signingIn: 'Masuk...',
    signIn: 'Masuk',
  },
  ticketForm: {
    patientNameLabel: 'Nama Pasien',
    patientIdLabel: 'ID Pasien',
    roomLabel: 'Ruangan',
    birthDateLabel: 'Tanggal Lahir',
    dietLabel: 'Diet',
    mealTimeLabel: 'Waktu Makan',
    selectDietPlaceholder: 'Pilih atau ketik diet...',
    selectRoomPlaceholder: 'Pilih atau ketik ruangan...',
    selectMealTimePlaceholder: 'Pilih waktu makan',
    saving: 'Menyimpan...',
    saveChanges: 'Simpan perubahan',
    errorTitle: 'Kesalahan',
    genericError: 'Terjadi sebuah kesalahan.',
    successTitle: 'Sukses',
    ticketUpdatedSuccess: 'Tiket berhasil diperbarui.',
    ticketCreatedSuccess: 'Tiket berhasil dibuat.',
    validation: {
      patientNameRequired: 'Nama pasien harus diisi',
      patientIdRequired: 'ID pasien harus diisi',
      roomRequired: 'Ruangan harus diisi',
      dietRequired: 'Diet harus diisi',
      birthDateRequired: 'Tanggal lahir harus diisi',
      mealTimeRequired: 'Waktu makan harus diisi',
    },
    combobox: {
      noResult: 'Tidak ada hasil.',
      searchRoom: 'Cari atau input ruangan...',
      searchDiet: 'Cari atau input diet...',
    },
  },
  ticketManager: {
    cardTitle: 'Tiket Makan Pasien',
    searchPlaceholder: 'Cari berdasarkan nama atau ID...',
    roomFilterPlaceholder: 'Filter berdasarkan ruangan...',
    printPage: 'Cetak Halaman',
    addTicket: 'Tambah Tiket',
    editTicketTitle: 'Ubah Tiket',
    addTicketTitle: 'Tambah Tiket Baru',
    table: {
      patientName: 'Nama Pasien',
      room: 'Ruangan',
      diet: 'Diet',
      mealTime: 'Waktu Makan',
      date: 'Tanggal',
      actions: 'Aksi',
    },
    noTickets: 'Tidak ada tiket ditemukan.',
    printAction: 'Cetak',
    editAction: 'Ubah',
    deleteAction: 'Hapus',
    pagination: (currentPage: number, totalPages: number) =>
      `Halaman ${currentPage} dari ${totalPages}`,
    previousPage: 'Sebelumnya',
    nextPage: 'Selanjutnya',
    deleteDialog: {
      title: 'Apakah Anda yakin?',
      description:
        'Tindakan ini tidak dapat dibatalkan. Ini akan menghapus tiket makan secara permanen dari database.',
      cancel: 'Batal',
      confirm: 'Hapus',
    },
    deleteSuccess: 'Tiket berhasil dihapus.',
  },
  faqPage: {
    title: 'Pertanyaan yang Sering Diajukan (FAQ)',
    description: 'Temukan jawaban untuk pertanyaan umum di sini.',
    q1_title: 'Bagaimana cara menambahkan tiket baru?',
    q1_content:
      "Di halaman dasbor utama, klik tombol 'Tambah Tiket'. Isi formulir dengan detail pasien, diet, dan waktu makan, lalu klik 'Simpan perubahan'. Tiket baru akan langsung muncul di tabel.",
    q2_title: 'Bisakah saya mengedit atau menghapus tiket?',
    q2_content:
      "Tentu. Pada setiap baris tiket, Anda akan menemukan tombol 'Ubah' dan 'Hapus'. Tombol 'Ubah' akan membuka formulir yang sudah terisi data untuk diedit, sementara tombol 'Hapus' akan meminta konfirmasi sebelum menghapus tiket dari database.",
    q3_title: 'Bagaimana cara mencari dan memfilter tiket?',
    q3_content:
      "Gunakan kolom pencarian di atas tabel untuk mencari pasien berdasarkan nama atau ID. Anda juga dapat memfilter tiket berdasarkan ruangan atau tanggal spesifik menggunakan kolom filter yang tersedia. Saat mengisi formulir, kolom Ruangan dan Diet kini mendukung input manual (misal: 'Mawar 1') atau pemilihan dari daftar.",
    q4_title: 'Apakah data saya akan hilang jika saya menutup browser?',
    q4_content:
      'Tidak. Aplikasi ini sekarang menggunakan database SQLite untuk menyimpan semua data tiket dan pengguna. Data Anda akan tetap aman dan tersimpan bahkan jika server dimulai ulang atau Anda menutup browser.',
  },
  guidePage: {
    title: 'Panduan Pengguna',
    description:
      'Panduan langkah demi langkah untuk menggunakan aplikasi Manajer Tiket Makan.',
    step1_title: 'Langkah 1: Inisialisasi Database (Hanya Sekali)',
    step1_content:
      "Saat pertama kali menjalankan aplikasi, buka terminal di folder proyek dan jalankan perintah `npx prisma db push`. Perintah ini akan membuat file database `dev.db` dan menyiapkan tabel yang diperlukan. Anda hanya perlu melakukannya sekali.",
    step2_title: 'Langkah 2: Masuk ke Sistem',
    step2_content:
      "Buka aplikasi dan Anda akan disambut oleh halaman login. Gunakan kredensial standar (username 'admin' dan password 'password') untuk masuk ke dasbor utama.",
    step3_title: 'Langkah 3: Mengelola Tiket (Tambah, Ubah, Hapus)',
    step3_content:
      "Klik 'Tambah Tiket' untuk membuat tiket baru. Kolom Ruangan dan Diet sekarang memungkinkan Anda memilih dari daftar yang ada atau mengetikkan nilai baru secara manual (contoh: 'Mawar I'). Gunakan tombol 'Ubah' atau 'Hapus' pada tiket yang ada untuk mengelolanya. Semua perubahan akan disimpan ke database.",
    step4_title: 'Langkah 4: Mencetak Tiket',
    step4_content:
      "Anda memiliki opsi untuk mencetak tiket satu per satu dengan tombol 'Cetak' di setiap baris, atau mencetak semua tiket yang sedang ditampilkan di halaman dengan tombol 'Cetak Halaman' di atas tabel.",
  },
  pdf: {
    filename: 'tiket_makan.pdf',
  },
  actions: {
    auth: {
      usernameRequired: 'Nama pengguna harus minimal 3 karakter',
      passwordRequired: 'Kata sandi harus minimal 6 karakter',
      invalidCredentials: 'Nama pengguna atau kata sandi tidak valid',
    },
    tickets: {
      notFound: 'Tiket tidak ditemukan.',
      createFailed: 'Gagal membuat tiket.',
      updateFailed: 'Gagal memperbarui tiket.',
      deleteFailed: 'Gagal menghapus tiket.',
    },
  },
}
