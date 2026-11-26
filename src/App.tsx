import { useCallback, useEffect, useRef, useState } from 'react';
import { ExamScreen } from './components/ExamScreen';
import { Header } from './components/Header';
import { ResultScreen } from './components/ResultScreen';
import { StartScreen } from './components/StartScreen';
import {
  EXAM_METADATA,
  QUESTION_BY_ID,
  selectRandomQuestionIds,
  TOPIC_ORDER,
} from './data/questions';
import type {
  AppStage,
  OptionKey,
  QuizResult,
  QuizSession,
  StudentInfo,
  TopicSummary,
} from './types/quiz';

const SESSION_STORAGE_KEY = 'bunayya_informatika_vii_session_v1';

function loadSavedSession(): QuizSession | null {
  try {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as QuizSession;
    if (
      !parsed ||
      !parsed.student?.name ||
      !Array.isArray(parsed.questionIds) ||
      parsed.questionIds.length === 0
    ) {
      return null;
    }
    const elapsed = Math.floor((Date.now() - parsed.startedAt) / 1000);
    if (elapsed >= parsed.durationSeconds) {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function saveSession(session: QuizSession | null) {
  try {
    if (!session) {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
    } else {
      window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    }
  } catch {
    // Ignore storage quota errors
  }
}

function calculateRemainingSeconds(session: QuizSession): number {
  const elapsed = Math.floor((Date.now() - session.startedAt) / 1000);
  return Math.max(0, session.durationSeconds - elapsed);
}

function buildResult(session: QuizSession): QuizResult {
  const totalQuestions = session.questionIds.length;
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  const topicMap: Record<string, { total: number; correct: number }> = Object.fromEntries(
    TOPIC_ORDER.map((t) => [t, { total: 0, correct: 0 }])
  );

  for (const qId of session.questionIds) {
    const question = QUESTION_BY_ID[qId];
    if (!question) continue;
    topicMap[question.topic].total += 1;

    const chosen = session.answers[qId];
    if (!chosen) {
      unansweredCount += 1;
    } else if (chosen === question.answer) {
      correctCount += 1;
      topicMap[question.topic].correct += 1;
    } else {
      wrongCount += 1;
    }
  }

  const topicSummaries: TopicSummary[] = TOPIC_ORDER.map((topic) => ({
    topic,
    total: topicMap[topic].total,
    correct: topicMap[topic].correct,
  }));

  const elapsedSeconds = Math.min(
    session.durationSeconds,
    Math.max(1, Math.floor((Date.now() - session.startedAt) / 1000))
  );

  return {
    student: session.student,
    questionIds: session.questionIds,
    answers: session.answers,
    totalQuestions,
    correctCount,
    wrongCount,
    unansweredCount,
    score: Math.round((correctCount / totalQuestions) * 100),
    durationUsedSeconds: elapsedSeconds,
    completedAt: Date.now(),
    topicSummaries,
  };
}

export default function App() {
  const [savedSession, setSavedSession] = useState<QuizSession | null>(() => loadSavedSession());
  const [stage, setStage] = useState<AppStage>('start');
  const [activeSession, setActiveSession] = useState<QuizSession | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(
    EXAM_METADATA.durationMinutes * 60
  );
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const createAndStartSession = useCallback((student: StudentInfo) => {
    const newSession: QuizSession = {
      student,
      questionIds: selectRandomQuestionIds(EXAM_METADATA.displayCount),
      answers: {},
      flaggedIds: [],
      currentIndex: 0,
      startedAt: Date.now(),
      durationSeconds: EXAM_METADATA.durationMinutes * 60,
    };
    saveSession(newSession);
    setSavedSession(null);
    setActiveSession(newSession);
    setResult(null);
    setRemainingSeconds(newSession.durationSeconds);
    setIsConfirmOpen(false);
    setStage('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleResumeSession = useCallback(() => {
    if (!savedSession) return;
    setActiveSession(savedSession);
    setRemainingSeconds(calculateRemainingSeconds(savedSession));
    setIsConfirmOpen(false);
    setStage('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [savedSession]);

  const handleDiscardSession = useCallback(() => {
    saveSession(null);
    setSavedSession(null);
  }, []);

  const handleSubmitExam = useCallback(() => {
    if (!activeSession) return;
    const computed = buildResult(activeSession);
    saveSession(null);
    setSavedSession(null);
    setIsConfirmOpen(false);
    setResult(computed);
    setActiveSession(null);
    setStage('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSession]);

  // Countdown timer loop during active exam
  useEffect(() => {
    if (stage !== 'exam' || !activeSession) return;

    const tick = () => {
      const left = calculateRemainingSeconds(activeSession);
      setRemainingSeconds(left);
      if (left <= 0) {
        handleSubmitExam();
      }
    };

    tick();
    const timerId = window.setInterval(tick, 1000);
    return () => window.clearInterval(timerId);
  }, [activeSession, handleSubmitExam, stage]);

  const handleSelectAnswer = useCallback((questionId: number, option: OptionKey) => {
    setActiveSession((prev) => {
      if (!prev) return prev;
      const next: QuizSession = {
        ...prev,
        answers: { ...prev.answers, [questionId]: option },
      };
      saveSession(next);
      return next;
    });
  }, []);

  const handleToggleFlag = useCallback((questionId: number) => {
    setActiveSession((prev) => {
      if (!prev) return prev;
      const exists = prev.flaggedIds.includes(questionId);
      const nextFlags = exists
        ? prev.flaggedIds.filter((id) => id !== questionId)
        : [...prev.flaggedIds, questionId];
      const next: QuizSession = {
        ...prev,
        flaggedIds: nextFlags,
      };
      saveSession(next);
      return next;
    });
  }, []);

  const handleChangeIndex = useCallback((index: number) => {
    setActiveSession((prev) => {
      if (!prev) return prev;
      const bounded = Math.max(0, Math.min(index, prev.questionIds.length - 1));
      const next: QuizSession = {
        ...prev,
        currentIndex: bounded,
      };
      saveSession(next);
      return next;
    });
  }, []);

  const handleRetakeNew = useCallback(() => {
    if (!result) return;
    createAndStartSession(result.student);
  }, [createAndStartSession, result]);

  const handleBackToStart = useCallback(() => {
    setResult(null);
    setActiveSession(null);
    setSavedSession(loadSavedSession());
    setStage('start');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigateSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleStartFocus = useCallback(() => {
    const el = document.getElementById('identitas-siswa');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 250);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] text-slate-900">
      <Header
        stage={stage}
        answeredCount={activeSession ? Object.keys(activeSession.answers).length : 0}
        totalQuestions={activeSession?.questionIds.length ?? EXAM_METADATA.displayCount}
        remainingSeconds={remainingSeconds}
        onRequestFinish={() => setIsConfirmOpen(true)}
        onNavigateSection={handleNavigateSection}
        onStartFocus={handleStartFocus}
        onRetakeNew={handleRetakeNew}
      />

      <div className="flex-1">
        {stage === 'start' && (
          <StartScreen
            savedSession={savedSession}
            nameInputRef={nameInputRef}
            onStartNew={createAndStartSession}
            onResumeSession={handleResumeSession}
            onDiscardSession={handleDiscardSession}
          />
        )}

        {stage === 'exam' && activeSession && (
          <ExamScreen
            session={activeSession}
            remainingSeconds={remainingSeconds}
            isConfirmOpen={isConfirmOpen}
            onSelectAnswer={handleSelectAnswer}
            onToggleFlag={handleToggleFlag}
            onChangeIndex={handleChangeIndex}
            onOpenConfirm={() => setIsConfirmOpen(true)}
            onCloseConfirm={() => setIsConfirmOpen(false)}
            onSubmitExam={handleSubmitExam}
          />
        )}

        {stage === 'result' && result && (
          <ResultScreen
            result={result}
            onRetakeNew={handleRetakeNew}
            onBackToStart={handleBackToStart}
          />
        )}
      </div>

      <footer className="no-print border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:px-6">
          <p>
            {EXAM_METADATA.school}
            <span className="mx-2 text-slate-300" aria-hidden="true">
              ·
            </span>
            {EXAM_METADATA.address}
          </p>
          <p>
            {EXAM_METADATA.subject} {EXAM_METADATA.gradeLevel}
            <span className="mx-2 text-slate-300" aria-hidden="true">
              ·
            </span>
            {EXAM_METADATA.academicYear}
          </p>
        </div>
      </footer>
    </div>
  );
}
