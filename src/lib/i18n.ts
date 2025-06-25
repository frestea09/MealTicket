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
    selectDietPlaceholder: 'Pilih diet',
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
        'Tindakan ini tidak dapat dibatalkan. Ini akan menghapus tiket makan secara permanen.',
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
      'Klik tombol "Tambah Tiket" di halaman dasbor. Isi semua kolom yang diperlukan pada formulir yang muncul, lalu klik "Simpan perubahan".',
    q2_title: 'Bisakah saya mengubah tiket yang sudah dibuat?',
    q2_content:
      'Ya, Anda bisa. Di baris tiket yang ingin diubah, klik tombol "Ubah". Formulir akan terisi dengan data yang ada. Lakukan perubahan yang diperlukan dan simpan.',
    q3_title: 'Bagaimana cara mencetak tiket?',
    q3_content:
      'Anda dapat mencetak satu tiket dengan mengklik tombol "Cetak" di baris tiket tersebut, atau mencetak semua tiket di halaman saat ini dengan mengklik tombol "Cetak Halaman" di atas tabel.',
    q4_title: 'Apakah data yang saya masukkan aman?',
    q4_content:
      'Aplikasi ini menggunakan sesi aman untuk otentikasi. Namun, karena ini adalah versi demonstrasi, data tiket disimpan secara lokal di server dan akan direset saat server dimulai ulang.',
  },
  guidePage: {
    title: 'Panduan Pengguna',
    description:
      'Panduan langkah demi langkah untuk menggunakan aplikasi Manajer Tiket Makan.',
    step1_title: 'Langkah 1: Masuk ke Aplikasi',
    step1_content:
      'Gunakan nama pengguna "admin" dan kata sandi "password" untuk masuk ke sistem.',
    step2_title: 'Langkah 2: Mengelola Tiket',
    step2_content:
      'Setelah masuk, Anda akan melihat dasbor utama. Di sini Anda dapat mencari, memfilter, menambah, mengubah, menghapus, dan mencetak tiket makan pasien.',
    step3_title: 'Langkah 3: Menambah Tiket Baru',
    step3_content:
      'Klik tombol "Tambah Tiket". Sebuah dialog akan muncul. Isi informasi pasien dan detail makanan, lalu simpan.',
    step4_title: 'Langkah 4: Keluar',
    step4_content:
      'Setelah selesai, klik ikon keluar di pojok kanan atas untuk keluar dari sesi Anda dengan aman.',
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
