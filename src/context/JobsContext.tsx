import React, { createContext, useContext, useState } from 'react';
import type { Job } from '../types';
import { mockJobs } from '../utils/mockData';

export interface CandidateApplication {
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  salary: string;
  appliedAt: string;
  name: string;
  email: string;
  interviewDone?: boolean;
}

interface JobsContextValue {
  jobs: Job[];
  addJob: (job: Job) => void;
  currentApplication: CandidateApplication | null;
  setCurrentApplication: (app: CandidateApplication) => void;
  markInterviewDone: () => void;
  getJobBySlug: (slug: string) => Job | undefined;
  getJobById: (id: string) => Job | undefined;
}

// ─── Storage keys ─────────────────────────────────────────────────────────────
const LS_JOBS_KEY = 'intervuew_jobs';
const SS_APP_KEY = 'intervuew_current_application';

// IDs of mock jobs — never persisted, always loaded from source
const MOCK_IDS = new Set(mockJobs.map((j) => j.id));

// ─── localStorage helpers ─────────────────────────────────────────────────────

/** Read user-created jobs from localStorage and merge with mockJobs. */
function loadJobs(): Job[] {
  try {
    const raw = localStorage.getItem(LS_JOBS_KEY);
    const userJobs: Job[] = raw ? JSON.parse(raw) : [];
    // User jobs first (newest), then mock jobs
    return [...userJobs, ...mockJobs];
  } catch {
    return [...mockJobs];
  }
}

/**
 * Write user-created jobs to localStorage immediately (synchronous).
 * We accept the full merged jobs array and filter out mock IDs before saving.
 */
function persistJobs(jobs: Job[]) {
  try {
    const userJobs = jobs.filter((j) => !MOCK_IDS.has(j.id));
    localStorage.setItem(LS_JOBS_KEY, JSON.stringify(userJobs));
  } catch {
    // localStorage unavailable — silently ignore
  }
}

// ─── sessionStorage helpers ───────────────────────────────────────────────────

function loadApplication(): CandidateApplication | null {
  try {
    const raw = sessionStorage.getItem(SS_APP_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function persistApplication(app: CandidateApplication | null) {
  try {
    if (app) {
      sessionStorage.setItem(SS_APP_KEY, JSON.stringify(app));
    } else {
      sessionStorage.removeItem(SS_APP_KEY);
    }
  } catch {
    // ignore
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const JobsContext = createContext<JobsContextValue | null>(null);

export const JobsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>(() => loadJobs());
  const [currentApplication, setCurrentApplicationState] = useState<CandidateApplication | null>(
    () => loadApplication(),
  );

  /**
   * Add a new user-created job.
   * We write to localStorage SYNCHRONOUSLY here — not via useEffect —
   * to avoid the race where useEffect fires with stale state on the
   * very first render and overwrites the saved data.
   */
  const addJob = (job: Job) => {
    setJobs((prev) => {
      const next = [job, ...prev];
      persistJobs(next);   // ← synchronous, inside the updater
      return next;
    });
  };

  const setCurrentApplication = (app: CandidateApplication) => {
    setCurrentApplicationState(app);
    persistApplication(app);
  };

  const markInterviewDone = () => {
    setCurrentApplicationState((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, interviewDone: true };
      persistApplication(updated);
      return updated;
    });
  };

  // slug = :jobSlug from the URL → must equal the part after "/apply/"
  const getJobBySlug = (slug: string): Job | undefined =>
    jobs.find((j) => j.applicationLink === `/apply/${slug}`);

  const getJobById = (id: string): Job | undefined =>
    jobs.find((j) => j.id === id);

  return (
    <JobsContext.Provider
      value={{
        jobs,
        addJob,
        currentApplication,
        setCurrentApplication,
        markInterviewDone,
        getJobBySlug,
        getJobById,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => {
  const ctx = useContext(JobsContext);
  if (!ctx) throw new Error('useJobs must be used inside JobsProvider');
  return ctx;
};