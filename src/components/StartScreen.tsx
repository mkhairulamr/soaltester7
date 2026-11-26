import { useState, type FormEvent, type RefObject } from 'react';
import { ArrowRight, BookOpen, CheckSquare, Clock, RotateCcw, Shuffle } from 'lucide-react';
import { EXAM_METADATA, QUESTION_BANK, TOPIC_ORDER } from '../data/questions';
import type { QuizSession, StudentInfo } from '../types/quiz';

interface StartScreenProps {
  savedSession: QuizSession | null;
  nameInputRef: RefObject<HTMLInputElement | null>;
  onStartNew: (student: StudentInfo) => void;
  onResumeSession: () => void;
  onDiscardSession: () => void;
}

const CLASS_PRESETS = ['VII', 'VII-A', 'VII-B', 'VII-C', 'VII-D'];

export function StartScreen({
  savedSession,
  nameInputRef,
  onStartNew,
  onResumeSession,
  onDiscardSession,
}: StartScreenProps) {
  const [name, setName] = useState(savedSession?.student.name ?? '');
  const [className, setClassName] = useState(savedSession?.student.className ?? 'VII');
  const [error, setError] = useState('');

  const topicCounts = TOPIC_ORDER.map((topic) => ({
    topic,
    count: QUESTION_BANK.filter((q) => q.topic === topic).length,
  }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedClass = className.trim();

    if (!trimmedName) {
      setError('Silakan masukkan nama lengkap kamu terlebih dahulu.');
      nameInputRef.current?.focus();
      return;
    }
    if (!trimmedClass) {
      setError('Silakan isi atau pilih kelas kamu.');
      return;
    }

    setError('');
    onStartNew({ name: trimmedName, className: trimmedClass });
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Institutional Masthead & Hero Split */}
      <section id="tentang-ujian" className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        {/* Left Column: Academic Info & Instructions */}
        <div className="flex flex-col justify-between lg:col-span-7">
          <div>
            <p className="text-xs font-medium text-slate-500">
              <span>{EXAM_METADATA.school}</span>
              <span className="mx-2" aria-hidden="true">
                ·
              </span>
              <span>NPSN {EXAM_METADATA.npsn}</span>
              <span className="mx-2" aria-hidden="true">
                ·
              </span>
              <span>{EXAM_METADATA.academicYear}</span>
            </p>

            <h1 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-slate-900 text-balance sm:text-4xl">
              {EXAM_METADATA.title}: {EXAM_METADATA.subject} {EXAM_METADATA.gradeLevel}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              Dari total {EXAM_METADATA.bankSize} soal pada bank soal resmi semester ganjil,
              sistem akan memilih dan menayangkan{' '}
              <strong className="font-semibold text-slate-900">
                {EXAM_METADATA.displayCount} soal pilihan ganda secara acak
              </strong>
              . Setelah selesai mengerjakan, kamu dapat langsung melihat nilai akhir, rincian jawaban
              benar dan salah, serta pembahasan lengkapnya.
            </p>

            {/* Clean metadata line */}
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600">
              <span>Guru Pengampu: {EXAM_METADATA.teacher}</span>
              <span aria-hidden="true" className="text-slate-300">
                ·
              </span>
              <span>Waktu: {EXAM_METADATA.durationMinutes} Menit</span>
              <span aria-hidden="true" className="text-slate-300">
                ·
              </span>
              <span>KKM: {EXAM_METADATA.passingScore}</span>
            </div>
          </div>

          {/* Kisi-Kisi Materi */}
          <div id="kisi-kisi" className="mt-8 border-t border-slate-200 pt-6">
            <h2 className="font-display text-base font-semibold text-slate-900">
              Cakupan Materi Bank Soal ({EXAM_METADATA.bankSize} Soal)
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {topicCounts.map((item, idx) => (
                <div
                  key={item.topic}
                  className="flex items-start justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      0{idx + 1}. {item.topic}
                    </p>
                  </div>
                  <span className="font-mono text-xs font-medium text-slate-500 tabular-nums whitespace-nowrap shrink-0 pt-0.5">
                    {item.count} soal
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Student Identity Card */}
        <div id="identitas-siswa" className="lg:col-span-5">
          <div className="flex h-full flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
            <div>
              <h2 className="font-display text-xl font-semibold text-slate-900">
                Identitas Peserta Ujian
              </h2>
              <p className="mt-1.5 text-sm text-slate-600">
                Isi nama lengkap dan kelas sebelum memulai pengerjaan soal.
              </p>

              {savedSession && (
                <div className="mt-5 rounded-lg border border-sky-200 bg-sky-50/70 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Sesi ujian tersimpan ditemukan
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    Peserta: <span className="font-medium text-slate-900">{savedSession.student.name}</span> ({savedSession.student.className})
                    <span className="mx-1.5" aria-hidden="true">
                      ·
                    </span>
                    <span className="tabular-nums">
                      {Object.keys(savedSession.answers).length}/{savedSession.questionIds.length} terjawab
                    </span>
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={onResumeSession}
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-sky-700 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-sky-800 whitespace-nowrap shrink-0"
                    >
                      <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                      Lanjutkan Ujian
                    </button>
                    <button
                      type="button"
                      onClick={onDiscardSession}
                      className="min-h-[40px] rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0"
                    >
                      Hapus Sesi
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
                <div>
                  <label
                    htmlFor="student-name"
                    className="block text-sm font-medium text-slate-800"
                  >
                    Nama Lengkap Siswa
                  </label>
                  <input
                    ref={nameInputRef}
                    id="student-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Contoh: Ahmad Zaki Pratama"
                    autoComplete="name"
                    className="mt-1.5 block min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:outline-2 focus:outline-sky-600/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="student-class"
                    className="block text-sm font-medium text-slate-800"
                  >
                    Kelas
                  </label>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {CLASS_PRESETS.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setClassName(preset)}
                        className={`min-h-[38px] rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                          className === preset
                            ? 'border-sky-700 bg-sky-50 text-sky-900'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                  <input
                    id="student-class"
                    type="text"
                    value={className}
                    onChange={(e) => {
                      setClassName(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Atau ketik kelas (misal: VII-Tahfidz)"
                    className="mt-2.5 block min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:outline-2 focus:outline-sky-600/20"
                  />
                </div>

                {error && (
                  <p role="alert" className="text-sm font-medium text-red-700">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-sky-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                >
                  <span>Mulai Kerjakan 20 Soal</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>
            </div>

            <p className="mt-6 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-500">
              Jawaban tersimpan otomatis selama pengerjaan. Pastikan menekan tombol{' '}
              <span className="font-medium text-slate-700">Selesai &amp; Lihat Hasil</span> setelah
              memeriksa seluruh soal.
            </p>
          </div>
        </div>
      </section>

      {/* 4-Column Key Exam Parameters Strip below hero split */}
      <section
        aria-label="Ringkasan pelaksanaan ujian"
        className="mt-10 grid grid-cols-2 gap-4 border-t border-slate-200 pt-8 lg:grid-cols-4"
      >
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <BookOpen className="h-4 w-4 text-sky-700" aria-hidden="true" />
            <span>Total Bank Soal</span>
          </div>
          <p className="mt-2 font-display text-2xl font-bold text-slate-900 tabular-nums">
            {EXAM_METADATA.bankSize} Soal
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Shuffle className="h-4 w-4 text-sky-700" aria-hidden="true" />
            <span>Ditayangkan per Sesi</span>
          </div>
          <p className="mt-2 font-display text-2xl font-bold text-slate-900 tabular-nums">
            {EXAM_METADATA.displayCount} Soal Acak
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Clock className="h-4 w-4 text-sky-700" aria-hidden="true" />
            <span>Durasi Ujian</span>
          </div>
          <p className="mt-2 font-display text-2xl font-bold text-slate-900 tabular-nums">
            {EXAM_METADATA.durationMinutes} Menit
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <CheckSquare className="h-4 w-4 text-sky-700" aria-hidden="true" />
            <span>Evaluasi Akhir</span>
          </div>
          <p className="mt-2 font-display text-2xl font-bold text-slate-900">
            Nilai &amp; Pembahasan
          </p>
        </div>
      </section>
    </main>
  );
}
