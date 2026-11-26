export type OptionKey = 'A' | 'B' | 'C' | 'D';

export type TopicCategory =
  | 'Berpikir Komputasional'
  | 'Pemrograman Visual & Scratch'
  | 'Analisis Data & Lembar Kerja'
  | 'Literasi Informasi & Mesin Pencari';

export interface Question {
  id: number;
  topic: TopicCategory;
  prompt: string;
  options: Record<OptionKey, string>;
  answer: OptionKey;
  explanation: string;
}

export interface StudentInfo {
  name: string;
  className: string;
}

export interface QuizSession {
  student: StudentInfo;
  questionIds: number[];
  answers: Record<number, OptionKey>;
  flaggedIds: number[];
  currentIndex: number;
  startedAt: number;
  durationSeconds: number;
}

export interface TopicSummary {
  topic: TopicCategory;
  total: number;
  correct: number;
}

export interface QuizResult {
  student: StudentInfo;
  questionIds: number[];
  answers: Record<number, OptionKey>;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  score: number;
  durationUsedSeconds: number;
  completedAt: number;
  topicSummaries: TopicSummary[];
}

export type AppStage = 'start' | 'exam' | 'result';
