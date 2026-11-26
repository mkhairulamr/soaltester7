import type { Question, TopicCategory } from '../types/quiz';

export const EXAM_METADATA = {
  foundation: 'Yayasan Bunayya Lhokseumawe',
  school: 'SMPIT Bunayya Lhokseumawe',
  npsn: '69965416',
  address: 'Jl. Tgk. Di Lhokseumawe Lr. Hj. Fatimah, Uteun Bayi, Lhokseumawe',
  title: 'Asesmen Akhir Semester Ganjil',
  academicYear: 'Tahun Ajaran 2026/2027',
  subject: 'Informatika',
  gradeLevel: 'Kelas VII (Tujuh)',
  teacher: 'M. Khairul A., S.Pd., Gr.',
  durationMinutes: 60,
  bankSize: 40,
  displayCount: 20,
  passingScore: 75,
} as const;

export const TOPIC_ORDER: TopicCategory[] = [
  'Berpikir Komputasional',
  'Pemrograman Visual & Scratch',
  'Analisis Data & Lembar Kerja',
  'Literasi Informasi & Mesin Pencari',
];

export const QUESTION_BANK: Question[] = [
  {
    id: 1,
    topic: 'Berpikir Komputasional',
    prompt: 'Berpikir komputasional adalah cara berpikir untuk ....',
    options: {
      A: 'bermain komputer',
      B: 'menyelesaikan persoalan yang penyelesaiannya dapat dikembangkan untuk dilakukan komputer',
      C: 'memperbaiki komputer',
      D: 'membuat komputer menjadi manusia',
    },
    answer: 'B',
    explanation:
      'Berpikir komputasional adalah pendekatan pemecahan persoalan yang efisien dan dapat dieksekusi mesin.',
  },
  {
    id: 2,
    topic: 'Berpikir Komputasional',
    prompt: 'Salah satu fondasi berpikir komputasional adalah ....',
    options: {
      A: 'menggambar',
      B: 'mengetik',
      C: 'dekomposisi',
      D: 'mencetak',
    },
    answer: 'C',
    explanation:
      'Empat pilar berpikir komputasional meliputi Dekomposisi, Pengenalan Pola, Abstraksi, dan Algoritma.',
  },
  {
    id: 3,
    topic: 'Berpikir Komputasional',
    prompt: 'Dekomposisi adalah ....',
    options: {
      A: 'menggabungkan semua masalah menjadi satu',
      B: 'membagi masalah kompleks menjadi masalah yang lebih kecil',
      C: 'menghapus masalah',
      D: 'mengabaikan masalah',
    },
    answer: 'B',
    explanation:
      'Dekomposisi memecah masalah besar menjadi sub-masalah sederhana agar lebih mudah diselesaikan.',
  },
  {
    id: 4,
    topic: 'Berpikir Komputasional',
    prompt:
      'Menyaring bagian penting dari suatu permasalahan dan mengabaikan bagian yang tidak penting disebut ....',
    options: {
      A: 'abstraksi',
      B: 'algoritma',
      C: 'iterasi',
      D: 'debugging',
    },
    answer: 'A',
    explanation:
      'Abstraksi menyaring detail esensial dan mengeliminasi informasi yang tidak relevan.',
  },
  {
    id: 5,
    topic: 'Berpikir Komputasional',
    prompt: 'Algoritma merupakan ....',
    options: {
      A: 'kumpulan gambar',
      B: 'langkah-langkah terstruktur untuk melakukan suatu pekerjaan',
      C: 'perangkat keras komputer',
      D: 'jaringan internet',
    },
    answer: 'B',
    explanation:
      'Algoritma adalah langkah logis berurutan untuk menyelesaikan tugas.',
  },
  {
    id: 6,
    topic: 'Berpikir Komputasional',
    prompt: 'Contoh algoritma dalam kehidupan sehari-hari adalah ....',
    options: {
      A: 'langkah-langkah memasak mi instan',
      B: 'menonton televisi',
      C: 'mendengarkan musik',
      D: 'melihat gambar',
    },
    answer: 'A',
    explanation:
      'Instruksi memasak mi instan memiliki tahapan berurutan yang pasti.',
  },
  {
    id: 7,
    topic: 'Berpikir Komputasional',
    prompt: 'Solusi yang baik dalam Informatika pada umumnya diusahakan agar ....',
    options: {
      A: 'rumit dan panjang',
      B: 'efisien dan efektif',
      C: 'mahal dan sulit',
      D: 'lambat tetapi aman',
    },
    answer: 'B',
    explanation:
      'Solusi komputasi harus dirancang efisien (hemat waktu/memori) dan efektif (tepat sasaran).',
  },
  {
    id: 8,
    topic: 'Berpikir Komputasional',
    prompt: 'Data yang disusun dalam bentuk daftar dalam Informatika sering disebut ....',
    options: {
      A: 'list',
      B: 'sound',
      C: 'sprite',
      D: 'stage',
    },
    answer: 'A',
    explanation:
      'List adalah struktur data bertipe daftar elemen berurutan.',
  },
  {
    id: 9,
    topic: 'Pemrograman Visual & Scratch',
    prompt: 'Pemrograman visual memungkinkan pengguna membuat program dengan cara ....',
    options: {
      A: 'menyusun elemen visual/blok',
      B: 'menggambar di kertas',
      C: 'mengetik surat',
      D: 'mencetak dokumen',
    },
    answer: 'A',
    explanation:
      'Visual programming menggunakan drag-and-drop blok kode grafis.',
  },
  {
    id: 10,
    topic: 'Pemrograman Visual & Scratch',
    prompt: 'Aplikasi pemrograman visual yang dipelajari dalam buku adalah ....',
    options: {
      A: 'Excel',
      B: 'Word',
      C: 'Scratch',
      D: 'Paint',
    },
    answer: 'C',
    explanation:
      'Scratch dikembangkan MIT untuk pembelajaran koding visual yang ramah siswa.',
  },
  {
    id: 11,
    topic: 'Pemrograman Visual & Scratch',
    prompt: 'Dalam Scratch, objek yang digunakan dalam sebuah proyek disebut ....',
    options: {
      A: 'worksheet',
      B: 'sprite',
      C: 'cell',
      D: 'formula',
    },
    answer: 'B',
    explanation:
      'Sprite adalah karakter atau objek visual utama di Scratch.',
  },
  {
    id: 12,
    topic: 'Pemrograman Visual & Scratch',
    prompt: 'Backdrop pada Scratch digunakan sebagai ....',
    options: {
      A: 'latar gambar',
      B: 'tempat menyimpan rumus',
      C: 'pengolah data',
      D: 'alat mencetak',
    },
    answer: 'A',
    explanation:
      'Backdrop adalah latar belakang visual panggung (stage) proyek Scratch.',
  },
  {
    id: 13,
    topic: 'Pemrograman Visual & Scratch',
    prompt: 'Blok Motion pada Scratch digunakan untuk ....',
    options: {
      A: 'mengolah angka',
      B: 'membuat pergerakan sprite',
      C: 'membuat tabel',
      D: 'mencari informasi',
    },
    answer: 'B',
    explanation:
      'Blok Motion menggerakkan sprite (maju, berputar, berpindah koordinat X/Y).',
  },
  {
    id: 14,
    topic: 'Pemrograman Visual & Scratch',
    prompt: 'Perintah yang digunakan untuk menjalankan suatu perintah secara berulang disebut ....',
    options: {
      A: 'looping/pengulangan',
      B: 'printing',
      C: 'saving',
      D: 'copying',
    },
    answer: 'A',
    explanation:
      'Looping mengulang sekumpulan aksi tanpa perlu menulis ulang instruksi secara manual.',
  },
  {
    id: 15,
    topic: 'Analisis Data & Lembar Kerja',
    prompt: 'Data adalah ....',
    options: {
      A: 'fakta atau keterangan yang dapat dikumpulkan dan dianalisis',
      B: 'hanya gambar',
      C: 'hanya suara',
      D: 'hanya angka',
    },
    answer: 'A',
    explanation:
      'Data adalah sekumpulan fakta mentah atau keterangan yang dapat dikumpulkan dan dianalisis.',
  },
  {
    id: 16,
    topic: 'Analisis Data & Lembar Kerja',
    prompt: 'Data yang dinyatakan dalam bentuk angka disebut data ....',
    options: {
      A: 'kualitatif',
      B: 'kuantitatif',
      C: 'visual',
      D: 'digital',
    },
    answer: 'B',
    explanation:
      'Data kuantitatif berkenaan dengan besaran jumlah atau angka.',
  },
  {
    id: 17,
    topic: 'Analisis Data & Lembar Kerja',
    prompt: 'Contoh data kuantitatif adalah ....',
    options: {
      A: 'warna rambut',
      B: 'pendapat siswa',
      C: 'tinggi badan',
      D: 'jenis olahraga favorit',
    },
    answer: 'C',
    explanation:
      'Tinggi badan diukur dengan angka pasti (misalnya 155 cm).',
  },
  {
    id: 18,
    topic: 'Analisis Data & Lembar Kerja',
    prompt: 'Contoh data kualitatif adalah ....',
    options: {
      A: 'berat badan',
      B: 'tinggi badan',
      C: 'nilai ujian',
      D: 'warna mata',
    },
    answer: 'D',
    explanation:
      'Warna mata bersifat deskriptif dan kategoris (misalnya cokelat, hitam), bukan angka.',
  },
  {
    id: 19,
    topic: 'Analisis Data & Lembar Kerja',
    prompt: 'Data yang telah diolah sehingga mempunyai makna dapat menjadi ....',
    options: {
      A: 'informasi',
      B: 'perangkat keras',
      C: 'program',
      D: 'jaringan',
    },
    answer: 'A',
    explanation:
      'Data yang bermakna setelah diproses dan diorganisasi menjadi informasi.',
  },
  {
    id: 20,
    topic: 'Analisis Data & Lembar Kerja',
    prompt: 'Salah satu perangkat yang dapat digunakan untuk mengumpulkan data foto adalah ....',
    options: {
      A: 'kamera',
      B: 'keyboard saja',
      C: 'speaker',
      D: 'printer',
    },
    answer: 'A',
    explanation:
      'Kamera merupakan peranti masukan visual untuk merekam data berupa foto.',
  },
  {
    id: 21,
    topic: 'Analisis Data & Lembar Kerja',
    prompt: 'Data yang disajikan dalam bentuk tabel dapat dibuat menjadi ....',
    options: {
      A: 'grafik',
      B: 'kabel',
      C: 'keyboard',
      D: 'folder',
    },
    answer: 'A',
    explanation:
      'Tabel data dapat divisualisasikan menjadi grafik untuk melihat pola atau tren dengan mudah.',
  },
  {
    id: 22,
    topic: 'Analisis Data & Lembar Kerja',
    prompt: 'Perangkat pengolah lembar kerja menggunakan kumpulan baris dan kolom yang disebut ....',
    options: {
      A: 'worksheet',
      B: 'sprite',
      C: 'backdrop',
      D: 'browser',
    },
    answer: 'A',
    explanation:
      'Worksheet adalah lembar kerja berpetak kisi (baris dan kolom) pada aplikasi spreadsheet.',
  },
  {
    id: 23,
    topic: 'Analisis Data & Lembar Kerja',
    prompt: 'Pertemuan antara baris dan kolom pada worksheet disebut ....',
    options: {
      A: 'range',
      B: 'cell',
      C: 'workbook',
      D: 'ribbon',
    },
    answer: 'B',
    explanation:
      'Pertemuan satu baris dan satu kolom dinamakan sel (cell).',
  },
  {
    id: 24,
    topic: 'Analisis Data & Lembar Kerja',
    prompt: 'Kumpulan beberapa cell disebut ....',
    options: {
      A: 'range',
      B: 'formula bar',
      C: 'workbook',
      D: 'menu',
    },
    answer: 'A',
    explanation:
      'Range merupakan kumpulan beberapa sel terpilih dalam lembar kerja.',
  },
  {
    id: 25,
    topic: 'Analisis Data & Lembar Kerja',
    prompt: 'Pada alamat cell D3, huruf D menunjukkan ....',
    options: {
      A: 'baris',
      B: 'kolom',
      C: 'worksheet',
      D: 'halaman',
    },
    answer: 'B',
    explanation:
      'Huruf pada alamat sel menandakan nama kolom (vertikal).',
  },
  {
    id: 26,
    topic: 'Analisis Data & Lembar Kerja',
    prompt: 'Pada alamat cell D3, angka 3 menunjukkan ....',
    options: {
      A: 'kolom',
      B: 'baris',
      C: 'workbook',
      D: 'range',
    },
    answer: 'B',
    explanation:
      'Angka pada alamat sel menandakan nomor baris (horizontal).',
  },
  {
    id: 27,
    topic: 'Analisis Data & Lembar Kerja',
    prompt: 'Fungsi Freeze Panes digunakan untuk ....',
    options: {
      A: 'menghapus data',
      B: 'membuat baris atau kolom tertentu tetap terlihat saat melakukan scroll',
      C: 'mencetak data',
      D: 'membuat akun',
    },
    answer: 'B',
    explanation:
      'Freeze Panes membekukan baris/kolom tertentu agar tetap terlihat dan tidak tersembunyi saat di-scroll.',
  },
  {
    id: 28,
    topic: 'Literasi Informasi & Mesin Pencari',
    prompt: 'Literasi informasi adalah kemampuan untuk ....',
    options: {
      A: 'mengakses, menilai, mengevaluasi, dan menggunakan informasi secara efektif',
      B: 'bermain game sepanjang hari',
      C: 'membuat komputer',
      D: 'memperbaiki jaringan listrik',
    },
    answer: 'A',
    explanation:
      'Literasi informasi melibatkan kemampuan kritis dalam mencari, menilai, mengevaluasi, dan memakai informasi.',
  },
  {
    id: 29,
    topic: 'Literasi Informasi & Mesin Pencari',
    prompt: 'Data yang telah diatur atau diolah sehingga memiliki makna disebut ....',
    options: {
      A: 'informasi',
      B: 'hardware',
      C: 'algoritma',
      D: 'aplikasi',
    },
    answer: 'A',
    explanation:
      'Informasi adalah data yang telah diorganisasi dan memiliki nilai guna atau makna.',
  },
  {
    id: 30,
    topic: 'Literasi Informasi & Mesin Pencari',
    prompt: 'Salah satu tempat untuk memperoleh informasi di internet adalah ....',
    options: {
      A: 'mesin pencari',
      B: 'kalkulator',
      C: 'printer',
      D: 'keyboard',
    },
    answer: 'A',
    explanation:
      'Mesin pencari (search engine) menelusuri miliaran konten dan halaman di web untuk menemukan informasi.',
  },
  {
    id: 31,
    topic: 'Literasi Informasi & Mesin Pencari',
    prompt: 'Contoh mesin pencari adalah ....',
    options: {
      A: 'Google',
      B: 'Excel',
      C: 'Scratch',
      D: 'PowerPoint',
    },
    answer: 'A',
    explanation:
      'Google Search adalah salah satu mesin pencari paling populer di internet.',
  },
  {
    id: 32,
    topic: 'Literasi Informasi & Mesin Pencari',
    prompt: 'Agar hasil pencarian lebih sesuai dengan kebutuhan, kita perlu menggunakan ....',
    options: {
      A: 'kata kunci yang relevan',
      B: 'kata secara acak',
      C: 'angka sebanyak-banyaknya',
      D: 'gambar tanpa keterangan',
    },
    answer: 'A',
    explanation:
      'Kata kunci (keyword) yang spesifik dan relevan mempersempit serta menyaring hasil pencarian.',
  },
  {
    id: 33,
    topic: 'Literasi Informasi & Mesin Pencari',
    prompt: 'Mesin pencari bekerja melalui beberapa proses, yaitu ....',
    options: {
      A: 'crawling, indexing, dan ranking',
      B: 'typing, printing, dan scanning',
      C: 'copying, pasting, dan deleting',
      D: 'drawing, coloring, dan saving',
    },
    answer: 'A',
    explanation:
      'Tahapan kerja mesin pencari secara berurutan adalah Crawling (menjelajah), Indexing (mengindeks), dan Ranking (memeringkat).',
  },
  {
    id: 34,
    topic: 'Literasi Informasi & Mesin Pencari',
    prompt: 'Proses mesin pencari menjelajahi halaman web disebut ....',
    options: {
      A: 'ranking',
      B: 'indexing',
      C: 'crawling',
      D: 'printing',
    },
    answer: 'C',
    explanation:
      'Crawling adalah aktivitas penelusuran halaman dan tautan web oleh bot mesin pencari.',
  },
  {
    id: 35,
    topic: 'Literasi Informasi & Mesin Pencari',
    prompt: 'Proses menyimpan informasi hasil crawling ke dalam database disebut ....',
    options: {
      A: 'indexing',
      B: 'browsing',
      C: 'chatting',
      D: 'downloading',
    },
    answer: 'A',
    explanation:
      'Indexing menyusun dan menyimpan kata serta konten halaman web ke basis data pencarian.',
  },
  {
    id: 36,
    topic: 'Literasi Informasi & Mesin Pencari',
    prompt: 'Proses menentukan peringkat halaman web berdasarkan berbagai faktor disebut ....',
    options: {
      A: 'crawling',
      B: 'ranking',
      C: 'editing',
      D: 'uploading',
    },
    answer: 'B',
    explanation:
      'Ranking mengurutkan hasil pencarian dari yang paling relevan hingga kurang relevan.',
  },
  {
    id: 37,
    topic: 'Literasi Informasi & Mesin Pencari',
    prompt: 'Informasi yang dapat dipercaya sebaiknya berasal dari sumber yang ....',
    options: {
      A: 'kredibel',
      B: 'tidak dikenal',
      C: 'tidak jelas',
      D: 'tidak memiliki sumber',
    },
    answer: 'A',
    explanation:
      'Sumber kredibel memiliki reputasi valid, akurat, dan dapat dipertanggungjawabkan.',
  },
  {
    id: 38,
    topic: 'Literasi Informasi & Mesin Pencari',
    prompt: 'Pernyataan yang dapat dibuktikan kebenarannya disebut ....',
    options: {
      A: 'opini',
      B: 'fakta',
      C: 'hoaks',
      D: 'komentar',
    },
    answer: 'B',
    explanation:
      'Fakta didasarkan pada data objektif dan bukti nyata yang teruji kebenarannya.',
  },
  {
    id: 39,
    topic: 'Literasi Informasi & Mesin Pencari',
    prompt: 'Pernyataan yang berisi pendapat atau pandangan seseorang disebut ....',
    options: {
      A: 'fakta',
      B: 'opini',
      C: 'data mentah',
      D: 'indeks',
    },
    answer: 'B',
    explanation:
      'Opini mencerminkan gagasan atau penilaian subjektif seseorang.',
  },
  {
    id: 40,
    topic: 'Literasi Informasi & Mesin Pencari',
    prompt: 'Informasi palsu atau berita bohong disebut ....',
    options: {
      A: 'fakta',
      B: 'opini',
      C: 'hoaks',
      D: 'data',
    },
    answer: 'C',
    explanation:
      'Hoaks adalah informasi palsu atau berita bohong yang disamarkan seolah-olah benar.',
  },
];

export const QUESTION_BY_ID: Record<number, Question> = Object.fromEntries(
  QUESTION_BANK.map((q) => [q.id, q])
);

/**
 * Memilih sejumlah soal secara acak (Fisher-Yates shuffle) dari bank 40 soal.
 */
export function selectRandomQuestionIds(count: number = EXAM_METADATA.displayCount): number[] {
  const ids = QUESTION_BANK.map((q) => q.id);
  for (let i = ids.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids.slice(0, Math.min(count, ids.length));
}
