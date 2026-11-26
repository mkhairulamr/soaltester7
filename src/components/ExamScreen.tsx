import { useEffect } from 'react';
import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  Send,
} from 'lucide-react';
import { QUESTION_BY_ID } from '../data/questions';
import type { OptionKey, QuizSession } from '../types/quiz';
import { formatDuration } from './Header';

interface ExamScreenProps {
  session: QuizSession;
  remainingSeconds: number;
  isConfirmOpen: boolean;
  onSelectAnswer: (questionId: number, option: OptionKey) => void;
  onToggleFlag: (questionId: number) => void;
  onChangeIndex: (index: number) => void;
  onOpenConfirm: () => void;
  onCloseConfirm: () => void;
  onSubmitExam: () => void;
}

const OPTION_KEYS: OptionKey[] = ['A', 'B', 'C', 'D'];

export function ExamScreen({
  session,
  remainingSeconds,
  isConfirmOpen,
  onSelectAnswer,
  onToggleFlag,
  onChangeIndex,
  onOpenConfirm,
  onCloseConfirm,
  onSubmitExam,
}: ExamScreenProps) {
  const total = session.questionIds.length;
  const currentQuestionId = session.questionIds[session.currentIndex];
  const currentQuestion = QUESTION_BY_ID[currentQuestionId];
  const selectedOption = session.answers[currentQuestionId];
  const isFlagged = session.flaggedIds.includes(currentQuestionId);

  const answeredCount = Object.keys(session.answers).length;
  const unansweredCount = total - answeredCount;
  const flaggedCount = session.flaggedIds.length;
  const progressPercent = Math.round((answeredCount / total) * 100);
  const isLowTime = remainingSeconds <= 300;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isConfirmOpen) {
        if (e.key === 'Escape') {
          onCloseConfirm();
        }
        return;
      }

      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      const upper = e.key.toUpperCase();
      if (upper === 'A' || upper === 'B' || upper === 'C' || upper === 'D') {
        onSelectAnswer(currentQuestionId, upper as OptionKey);
      } else if (e.key === '1') {
        onSelectAnswer(currentQuestionId, 'A');
      } else if (e.key === '2') {
        onSelectAnswer(currentQuestionId, 'B');
      } else if (e.key === '3') {
        onSelectAnswer(currentQuestionId, 'C');
      } else if (e.key === '4') {
        onSelectAnswer(currentQuestionId, 'D');
      } else if (e.key === 'ArrowRight' && session.currentIndex < total - 1) {
        onChangeIndex(session.currentIndex + 1);
      } else if (e.key === 'ArrowLeft' && session.currentIndex > 0) {
        onChangeIndex(session.currentIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    currentQuestionId,
    isConfirmOpen,
    onChangeIndex,
    onCloseConfirm,
    onSelectAnswer,
    session.currentIndex,
    total,
  ]);

  if (!currentQuestion) {
    return null;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Student & Exam strip */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="text-sm text-slate-600">
          <span className="font-semibold text-slate-900">{session.student.name}</span>
          <span className="mx-2 text-slate-300" aria-hidden="true">
            ·
          </span>
          <span>Kelas {session.student.className}</span>
        </div>
        <div className="text-xs font-medium text-slate-500">
          <span>Informatika VII</span>
          <span className="mx-2 text-slate-300" aria-hidden="true">
            ·
          </span>
          <span className="tabular-nums">20 Soal Acak dari 40 Bank Soal</span>
        </div>
      </div>

      {/* Two-Zone Exam Workspace */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Left/Main Zone: Active Question Card */}
        <section
          aria-label={`Soal nomor ${session.currentIndex + 1}`}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs sm:p-8 lg:col-span-8"
        >
          {/* Question Header Metadata (Zero Pill Discipline) */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <p className="text-sm font-medium text-slate-500">
              <span className="font-semibold text-slate-900 tabular-nums">
                Soal {String(session.currentIndex + 1).padStart(2, '0')} dari {total}
              </span>
              <span className="mx-2 text-slate-300" aria-hidden="true">
                ·
              </span>
              <span>{currentQuestion.topic}</span>
            </p>

            <button
              type="button"
              onClick={() => onToggleFlag(currentQuestionId)}
              aria-pressed={isFlagged}
              className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                isFlagged
                  ? 'border-amber-500 bg-amber-50 text-amber-900'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              <Flag
                className={`h-3.5 w-3.5 ${isFlagged ? 'fill-amber-500 text-amber-700' : ''}`}
                aria-hidden="true"
              />
              <span>{isFlagged ? 'Ditandai Ragu-ragu' : 'Tandai Ragu-ragu'}</span>
            </button>
          </div>

          {/* Question Prompt */}
          <h1 className="mt-6 font-display text-lg font-semibold leading-relaxed text-slate-900 text-balance sm:text-xl">
            {currentQuestion.prompt}
          </h1>

          {/* Options A-D */}
          <div className="mt-6 space-y-3" role="radiogroup" aria-label="Pilihan jawaban">
            {OPTION_KEYS.map((key) => {
              const isSelected = selectedOption === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => onSelectAnswer(currentQuestionId, key)}
                  className={`group flex min-h-[54px] w-full items-start gap-3.5 rounded-xl border p-3.5 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 sm:items-center sm:p-4 ${
                    isSelected
                      ? 'border-sky-700 bg-sky-50/80 text-slate-900'
                      : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border font-mono text-sm font-semibold transition-colors ${
                      isSelected
                        ? 'border-sky-700 bg-sky-700 text-white'
                        : 'border-slate-300 bg-slate-50 text-slate-700 group-hover:border-slate-400'
                    }`}
                  >
                    {key}
                  </span>

                  <span className="flex-1 text-sm leading-relaxed font-medium sm:text-base">
                    {currentQuestion.options[key]}
                  </span>

                  {isSelected && (
                    <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-sky-800 whitespace-nowrap">
                      <Check className="h-4 w-4 text-sky-700" aria-hidden="true" />
                      <span className="hidden sm:inline">Dipilih</span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Question Navigation Footer */}
          <div className="mt-8 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={() => onChangeIndex(session.currentIndex - 1)}
              disabled={session.currentIndex === 0}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 whitespace-nowrap shrink-0"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              <span>Sebelumnya</span>
            </button>

            {session.currentIndex < total - 1 ? (
              <button
                type="button"
                onClick={() => onChangeIndex(session.currentIndex + 1)}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-sky-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-800 whitespace-nowrap shrink-0"
              >
                <span>Berikutnya</span>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenConfirm}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800 whitespace-nowrap shrink-0"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                <span>Selesai &amp; Lihat Hasil</span>
              </button>
            )}
          </div>

          <p className="mt-4 hidden text-xs text-slate-400 sm:block">
            Pintasan papan ketik: tekan A–D untuk memilih jawaban, panah kiri/kanan untuk berpindah soal.
          </p>
        </section>

        {/* Right Zone: Timer, Progress & 20-Number Navigator */}
        <aside className="space-y-4 lg:col-span-4">
          {/* Timer & Progress Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-slate-500">Sisa Waktu Pengerjaan</p>
                <p
                  className={`mt-1 font-mono text-2xl font-semibold tabular-nums ${
                    isLowTime ? 'text-amber-700' : 'text-slate-900'
                  }`}
                >
                  {formatDuration(remainingSeconds)}
                </p>
              </div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
                  isLowTime
                    ? 'border-amber-300 bg-amber-50 text-amber-700'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <Clock className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>

            {isLowTime && (
              <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-amber-800">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Waktu kurang dari 5 menit. Segera periksa jawaban kamu.</span>
              </p>
            )}

            <div className="mt-4 border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                <span>Progres Terjawab</span>
                <span className="font-mono tabular-nums text-slate-900">
                  {answeredCount}/{total} ({progressPercent}%)
                </span>
              </div>
              <div
                className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
                aria-valuenow={answeredCount}
                aria-valuemin={0}
                aria-valuemax={total}
              >
                <div
                  className="h-full rounded-full bg-sky-700 transition-all duration-200"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* 20-Number Navigator Grid */}
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-sm font-semibold text-slate-900">
                Navigasi Soal (1–{total})
              </h2>
              {flaggedCount > 0 && (
                <span className="text-xs font-medium text-amber-800 tabular-nums">
                  {flaggedCount} ragu-ragu
                </span>
              )}
            </div>

            <div className="mt-3.5 grid grid-cols-5 gap-2">
              {session.questionIds.map((qId, idx) => {
                const isCurrent = idx === session.currentIndex;
                const isAnswered = Boolean(session.answers[qId]);
                const isItemFlagged = session.flaggedIds.includes(qId);

                let buttonStyle =
                  'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50';
                if (isItemFlagged) {
                  buttonStyle =
                    'border-amber-500 bg-amber-50 text-amber-900 hover:bg-amber-100/80';
                } else if (isAnswered) {
                  buttonStyle =
                    'border-sky-700 bg-sky-700 text-white hover:bg-sky-800';
                }

                return (
                  <button
                    key={qId}
                    type="button"
                    onClick={() => onChangeIndex(idx)}
                    aria-label={`Soal nomor ${idx + 1}${isAnswered ? ', sudah dijawab' : ', belum dijawab'}${isItemFlagged ? ', ditandai ragu-ragu' : ''}`}
                    aria-current={isCurrent ? 'step' : undefined}
                    className={`relative flex min-h-[42px] items-center justify-center rounded-lg border font-mono text-sm font-semibold tabular-nums transition-colors ${buttonStyle} ${
                      isCurrent ? 'ring-2 ring-slate-900 ring-offset-2' : ''
                    }`}
                  >
                    <span>{idx + 1}</span>
                    {isItemFlagged && (
                      <Flag
                        className="absolute top-1 right-1 h-2.5 w-2.5 fill-amber-600 text-amber-700"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Accessible Legend (not hue-only) */}
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3.5 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded border border-sky-700 bg-sky-700 text-[10px] text-white">
                  ✓
                </span>
                <span>Terjawab</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded border border-amber-500 bg-amber-50 text-amber-800">
                  <Flag className="h-2.5 w-2.5 fill-amber-500" aria-hidden="true" />
                </span>
                <span>Ragu</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-4 w-4 rounded border border-slate-300 bg-white" />
                <span>Kosong</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenConfirm}
              className="mt-5 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              <span>Kumpulkan Jawaban</span>
            </button>
          </div>
        </aside>
      </div>

      {/* Confirmation Modal */}
      {isConfirmOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-submit-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs"
        >
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
            <h2
              id="confirm-submit-title"
              className="font-display text-lg font-bold text-slate-900"
            >
              Kumpulkan Jawaban Sekarang?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Setelah dikumpulkan, jawaban tidak dapat diubah lagi dan hasil nilai kamu akan
              langsung ditampilkan.
            </p>

            <div className="mt-4 space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Soal terjawab</span>
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  {answeredCount} dari {total}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Belum dijawab</span>
                <span
                  className={`font-mono font-semibold tabular-nums ${
                    unansweredCount > 0 ? 'text-amber-700' : 'text-slate-900'
                  }`}
                >
                  {unansweredCount} soal
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Ditandai ragu-ragu</span>
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  {flaggedCount} soal
                </span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <p className="mt-3 flex items-start gap-2 text-xs font-medium text-amber-800">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  Masih ada {unansweredCount} soal yang belum diisi. Kamu bisa kembali memeriksa
                  atau langsung mengumpulkan.
                </span>
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={onCloseConfirm}
                className="min-h-[42px] rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 whitespace-nowrap"
              >
                Kembali Periksa
              </button>
              <button
                type="button"
                onClick={onSubmitExam}
                className="min-h-[42px] rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-800 whitespace-nowrap"
              >
                Ya, Kumpulkan &amp; Lihat Nilai
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
