import { useMemo, useState } from 'react';
import {
  Award,
  CheckCircle2,
  Home,
  MinusCircle,
  Printer,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { EXAM_METADATA, QUESTION_BY_ID } from '../data/questions';
import type { OptionKey, QuizResult } from '../types/quiz';

interface ResultScreenProps {
  result: QuizResult;
  onRetakeNew: () => void;
  onBackToStart: () => void;
}

type ReviewFilter = 'all' | 'correct' | 'incorrect';

const OPTION_KEYS: OptionKey[] = ['A', 'B', 'C', 'D'];

function formatUsedTime(seconds: number): string {
  const safe = Math.max(0, Math.round(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  if (mins === 0) return `${secs} detik`;
  return `${mins} menit ${secs} detik`;
}

function getPredicate(score: number): {
  label: string;
  passed: boolean;
  description: string;
} {
  if (score >= 90) {
    return {
      label: 'Lulus KKM · Istimewa',
      passed: true,
      description: 'Penguasaan materi Informatika Semester Ganjil sangat baik.',
    };
  }
  if (score >= EXAM_METADATA.passingScore) {
    return {
      label: 'Lulus KKM · Baik',
      passed: true,
      description: 'Nilai sudah melampaui batas ketuntasan minimal (KKM 75).',
    };
  }
  if (score >= 60) {
    return {
      label: 'Belum Tuntas · Cukup',
      passed: false,
      description: 'Pelajari kembali pembahasan soal di bawah lalu coba paket soal baru.',
    };
  }
  return {
    label: 'Belum Tuntas · Perlu Pendalaman',
    passed: false,
    description: 'Perhatikan pembahasan tiap materi di bawah dan ulangi latihan secara berkala.',
  };
}

export function ResultScreen({
  result,
  onRetakeNew,
  onBackToStart,
}: ResultScreenProps) {
  const [filter, setFilter] = useState<ReviewFilter>('all');

  const predicate = getPredicate(result.score);
  const completedDateStr = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(result.completedAt));

  const reviewItems = useMemo(() => {
    return result.questionIds.map((qId, idx) => {
      const question = QUESTION_BY_ID[qId];
      const studentAnswer = result.answers[qId];
      const isCorrect = studentAnswer === question.answer;
      const isUnanswered = !studentAnswer;
      return {
        displayNumber: idx + 1,
        question,
        studentAnswer,
        isCorrect,
        isUnanswered,
      };
    });
  }, [result.answers, result.questionIds]);

  const filteredItems = useMemo(() => {
    if (filter === 'correct') {
      return reviewItems.filter((item) => item.isCorrect);
    }
    if (filter === 'incorrect') {
      return reviewItems.filter((item) => !item.isCorrect);
    }
    return reviewItems;
  }, [filter, reviewItems]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Top Action & Score Banner */}
      <section
        id="ringkasan-nilai"
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8"
      >
        <div className="flex flex-col justify-between gap-6 border-b border-slate-100 pb-6 lg:flex-row lg:items-start">
          <div>
            <p className="text-xs font-medium text-slate-500">
              <span>{EXAM_METADATA.school}</span>
              <span className="mx-2" aria-hidden="true">
                ·
              </span>
              <span>{EXAM_METADATA.title}</span>
              <span className="mx-2" aria-hidden="true">
                ·
              </span>
              <span>{completedDateStr}</span>
            </p>
            <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Hasil Evaluasi: {result.student.name}
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Kelas {result.student.className}
              <span className="mx-2 text-slate-300" aria-hidden="true">
                ·
              </span>
              Mata Pelajaran {EXAM_METADATA.subject}
              <span className="mx-2 text-slate-300" aria-hidden="true">
                ·
              </span>
              Guru: {EXAM_METADATA.teacher}
            </p>
          </div>

          <div className="no-print flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 whitespace-nowrap"
            >
              <Printer className="h-4 w-4" aria-hidden="true" />
              <span>Cetak Hasil</span>
            </button>
            <button
              type="button"
              onClick={onRetakeNew}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-800 whitespace-nowrap"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>Kerjakan 20 Soal Baru</span>
            </button>
            <button
              type="button"
              onClick={onBackToStart}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 whitespace-nowrap"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              <span>Halaman Awal</span>
            </button>
          </div>
        </div>

        {/* Dominant Focal Score + Breakdown */}
        <div className="mt-6 grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
          <div className="flex items-center gap-5 lg:col-span-5">
            <div
              className={`flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-xl border ${
                predicate.passed
                  ? 'border-emerald-200 bg-emerald-50/80 text-emerald-900'
                  : 'border-amber-200 bg-amber-50/80 text-amber-900'
              }`}
            >
              <span className="text-xs font-medium opacity-80">Nilai Akhir</span>
              <span className="font-display text-4xl font-bold tabular-nums">
                {result.score}
              </span>
            </div>

            <div>
              <div
                className={`inline-flex items-center gap-1.5 text-sm font-bold ${
                  predicate.passed ? 'text-emerald-800' : 'text-amber-800'
                }`}
              >
                <Award className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{predicate.label}</span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {predicate.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-7">
            <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3.5">
              <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                <span>Jawaban Benar</span>
              </p>
              <p className="mt-1.5 font-display text-xl font-bold text-slate-900 tabular-nums">
                {result.correctCount} / {result.totalQuestions}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3.5">
              <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <XCircle className="h-3.5 w-3.5 text-red-700" aria-hidden="true" />
                <span>Jawaban Salah</span>
              </p>
              <p className="mt-1.5 font-display text-xl font-bold text-slate-900 tabular-nums">
                {result.wrongCount} soal
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3.5">
              <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <MinusCircle className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                <span>Tidak Dijawab</span>
              </p>
              <p className="mt-1.5 font-display text-xl font-bold text-slate-900 tabular-nums">
                {result.unansweredCount} soal
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3.5">
              <p className="text-xs font-medium text-slate-500">Durasi Pengerjaan</p>
              <p className="mt-1.5 font-display text-base font-bold text-slate-900 tabular-nums">
                {formatUsedTime(result.durationUsedSeconds)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Topic Mastery Breakdown */}
      <section id="capaian-materi" className="mt-8">
        <h2 className="font-display text-lg font-semibold text-slate-900">
          Capaian per Materi Informatika
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {result.topicSummaries.map((summary) => {
            const pct =
              summary.total > 0 ? Math.round((summary.correct / summary.total) * 100) : 0;
            return (
              <div
                key={summary.topic}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <p className="text-sm font-semibold text-slate-900">{summary.topic}</p>
                {summary.total > 0 ? (
                  <>
                    <div className="mt-3 flex items-baseline justify-between text-xs">
                      <span className="font-mono font-semibold text-slate-800 tabular-nums">
                        {summary.correct}/{summary.total} benar
                      </span>
                      <span className="font-mono text-slate-500 tabular-nums">{pct}%</span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${
                          pct >= 75 ? 'bg-emerald-600' : pct >= 50 ? 'bg-sky-600' : 'bg-amber-600'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </>
                ) : (
                  <p className="mt-3 text-xs text-slate-500">
                    Tidak terpilih pada acakan sesi ini
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Filterable Answer Key & Explanation Review */}
      <section id="pembahasan-soal" className="mt-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-lg font-semibold text-slate-900">
              Kunci Jawaban &amp; Pembahasan ({result.totalQuestions} Soal)
            </h2>
            <p className="mt-0.5 text-sm text-slate-600">
              Tinjau kembali jawabanmu beserta pembahasan resmi pada tiap nomor.
            </p>
          </div>

          {/* Interactive Filter Tabs (Allowed Functional Segmented Control) */}
          <div
            role="tablist"
            aria-label="Filter pembahasan soal"
            className="no-print inline-flex items-center gap-1 self-start rounded-lg bg-slate-100 p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'all'}
              onClick={() => setFilter('all')}
              className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap tabular-nums ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({result.totalQuestions})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'correct'}
              onClick={() => setFilter('correct')}
              className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap tabular-nums ${
                filter === 'correct'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Benar ({result.correctCount})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'incorrect'}
              onClick={() => setFilter('incorrect')}
              className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap tabular-nums ${
                filter === 'incorrect'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Salah / Kosong ({result.wrongCount + result.unansweredCount})
            </button>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-sm font-medium text-slate-700">
              Tidak ada soal pada kategori filter ini.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            {filteredItems.map(({ displayNumber, question, studentAnswer, isCorrect, isUnanswered }) => (
              <article
                key={question.id}
                className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
              >
                {/* Top Meta Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <p className="text-xs font-medium text-slate-500">
                    <span className="font-semibold text-slate-900 tabular-nums">
                      Soal {String(displayNumber).padStart(2, '0')}
                    </span>
                    <span className="mx-2 text-slate-300" aria-hidden="true">
                      ·
                    </span>
                    <span>{question.topic}</span>
                    <span className="mx-2 text-slate-300" aria-hidden="true">
                      ·
                    </span>
                    <span className="font-mono tabular-nums">Bank Soal #{question.id}</span>
                  </p>

                  {isCorrect ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                      <CheckCircle2 className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                      <span>Benar</span>
                    </span>
                  ) : isUnanswered ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600">
                      <MinusCircle className="h-4 w-4 text-slate-500" aria-hidden="true" />
                      <span>Tidak Dijawab</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700">
                      <XCircle className="h-4 w-4 text-red-600" aria-hidden="true" />
                      <span>Salah</span>
                    </span>
                  )}
                </div>

                {/* Question Prompt */}
                <h3 className="mt-4 font-display text-base font-semibold leading-relaxed text-slate-900">
                  {question.prompt}
                </h3>

                {/* Options List */}
                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {OPTION_KEYS.map((key) => {
                    const isKeyAnswer = question.answer === key;
                    const isStudentChoice = studentAnswer === key;

                    let cardClass = 'border-slate-200 bg-slate-50/40 text-slate-700';
                    if (isKeyAnswer) {
                      cardClass = 'border-emerald-300 bg-emerald-50/80 text-emerald-950';
                    } else if (isStudentChoice && !isKeyAnswer) {
                      cardClass = 'border-red-300 bg-red-50/80 text-red-950';
                    }

                    return (
                      <div
                        key={key}
                        className={`flex items-start justify-between gap-2 rounded-lg border px-3.5 py-2.5 text-sm ${cardClass}`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="font-mono text-xs font-bold pt-0.5">{key}.</span>
                          <span className="leading-snug">{question.options[key]}</span>
                        </div>
                        <div className="shrink-0 text-right text-[11px] font-bold">
                          {isKeyAnswer && (
                            <span className="block text-emerald-800 whitespace-nowrap">
                              Kunci
                            </span>
                          )}
                          {isStudentChoice && (
                            <span
                              className={`block whitespace-nowrap ${
                                isKeyAnswer ? 'text-emerald-700' : 'text-red-700'
                              }`}
                            >
                              Jawabanmu
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Official Explanation */}
                <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-700">
                  <span className="font-semibold text-slate-900">Pembahasan: </span>
                  <span>{question.explanation}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
