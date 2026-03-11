export type UserRole = 'prepper' | 'organization';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  questionMode: 'ai' | 'custom';
  questions?: string[];
  applicationLink: string;
  createdAt: string;
  applicants: number;
  status: 'active' | 'paused' | 'closed';
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  jobId: string;
  jobTitle: string;
  cvScore: number;
  interviewScore: number;
  status: 'applied' | 'screening' | 'interviewing' | 'reviewed' | 'hired' | 'rejected';
  appliedAt: string;
  strengths: string[];
  weaknesses: string[];
  skills: string[];
  communication: number;
  clarity: number;
  technical: number;
  confidence: number;
  recording?: string;
  transcript?: string;
}

export interface InterviewSession {
  id: string;
  candidateId: string;
  jobId: string;
  status: 'waiting' | 'active' | 'thinking' | 'completed';
  currentQuestion: number;
  totalQuestions: number;
  questions: string[];
  transcript: string[];
  duration: number;
  score?: number;
}

export interface AnalyticsData {
  totalApplications: number;
  interviewsCompleted: number;
  avgScore: number;
  hireRate: number;
  weeklyData: { day: string; applications: number; interviews: number }[];
}
