export type InterviewStatus = 'listening' | 'thinking' | 'speaking' | 'idle';
export type UserRole = 'prepper' | 'org';

export interface Candidate {
  id: string; name: string; role: string;
  date: string; score: number; status: CandidateStatus;
}
export type CandidateStatus = 'Recommended' | 'Review' | 'Pending' | 'Declined';
export interface TranscriptEntry { who: 'AI' | 'You'; text: string; }
export interface ScoreCategory { label: string; score: number; color: string; }
export interface NavItem {
  icon: string; label: string; active?: boolean;
  onClick?: () => void; to?: string;
}

export interface Session {
  id: string;
  role: string;
  date: string;
  duration: string;
  score: number;
  mode: 'Auto' | 'Manual';
  questions?: QuestionResult[];
}

export interface QuestionResult {
  q: string;
  score: number;
  feedback: string;
}

export interface ScoreCategory {
  label: string;
  score: number;
  color: string;
}