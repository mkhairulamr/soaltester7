import { Clock, CheckCircle2 } from 'lucide-react';
import type { AppStage } from '../types/quiz';

interface HeaderProps {
  stage: AppStage;
  answeredCount?: number;
  totalQuestions?: number;
  remainingSeconds?: number;
  onRequestFinish?: () => void;
  onNavigateSection?: (sectionId: string) => void;
  onStartFocus?: () => void;
  onRetakeNew?: () => void;
}

export function formatDuration(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function Header({
  stage,
  answeredCount = 0,
  totalQuestions = 20,
  remainingSeconds = 0,
  onRequestFinish,
  onNavigateSection,
  onStartFocus,
  onRetakeNew,
}: HeaderProps) {
  const isLowTime = stage === 'exam' && remainingSeconds <= 300;

  return (
    <header className="no-print sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6">
        {/* Zone 1: Single-line brand wordmark */}
        <span className="font-display text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 sm:text-lg">
          Informatika VII
        </span>

        {/* Zone 2: Context links or concise live exam status */}
        {stage === 'start' && (
          <nav
            aria-label="Navigasi halaman awal"
            className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex"
          >
            <button
              type="button"
              onClick={() => onNavigateSection?.('tentang-ujian')}
              className="whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600"
            >
              Ketentuan
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection?.('kisi-kisi')}
              className="whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600"
            >
              Kisi-Kisi Materi
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection?.('identitas-siswa')}
              className="whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600"
            >
              Data Siswa
            </button>
          </nav>
        )}

        {stage === 'exam' && (
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <span className="hidden items-center gap-1.5 font-medium whitespace-nowrap shrink-0 sm:inline-flex">
              <CheckCircle2 className="h-4 w-4 text-sky-700" aria-hidden="true" />
              <span className="tabular-nums">
                Terjawab {answeredCount}/{totalQuestions}
              </span>
            </span>
            <span className="hidden text-slate-300 sm:inline" aria-hidden="true">
              ·
            </span>
            <span
              className={`inline-flex items-center gap-1.5 font-mono text-sm font-semibold tabular-nums whitespace-nowrap shrink-0 ${
                isLowTime ? 'text-amber-700' : 'text-slate-900'
              }`}
              aria-live="polite"
            >
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span>{formatDuration(remainingSeconds)}</span>
            </span>
          </div>
        )}

        {stage === 'result' && (
          <nav
            aria-label="Navigasi hasil ujian"
            className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex"
          >
            <button
              type="button"
              onClick={() => onNavigateSection?.('ringkasan-nilai')}
              className="whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 hover:underline underline-offset-4"
            >
              Ringkasan Nilai
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection?.('capaian-materi')}
              className="whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 hover:underline underline-offset-4"
            >
              Capaian Materi
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection?.('pembahasan-soal')}
              className="whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 hover:underline underline-offset-4"
            >
              Pembahasan
            </button>
          </nav>
        )}

        {/* Zone 3: Single primary CTA */}
        <div className="flex items-center shrink-0">
          {stage === 'start' && (
            <button
              type="button"
              onClick={onStartFocus}
              className="min-h-[40px] rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
            >
              Mulai Ujian
            </button>
          )}
          {stage === 'exam' && (
            <button
              type="button"
              onClick={onRequestFinish}
              className="min-h-[40px] rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              Selesai Ujian
            </button>
          )}
          {stage === 'result' && (
            <button
              type="button"
              onClick={onRetakeNew}
              className="min-h-[40px] rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
            >
              Paket Soal Baru
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
