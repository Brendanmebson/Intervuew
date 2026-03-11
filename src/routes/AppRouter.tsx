import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Public pages
import LandingPage from '../pages/public/LandingPage';
import AuthPage from '../pages/auth/AuthPage';
import CandidateApplyPage from '../pages/candidate/CandidateApplyPage';
import DemoPage from '../pages/public/DemoPage';

// Org pages
import OrgDashboard from '../pages/organization/OrgDashboard';
import JobsPage from '../pages/organization/JobsPage';
import CreateJobPage from '../pages/organization/CreateJobPage';
import CandidatesPage from '../pages/organization/CandidatesPage';
import CandidateReviewPage from '../pages/organization/CandidateReviewPage';

// Prepper pages
import PrepperDashboard from '../pages/prepper/PrepperDashboard';
import PerformanceReportPage from '../pages/prepper/PerformanceReportPage';

// Interview
import LiveInterviewPage from '../pages/interview/LiveInterviewPage';

// Candidate dashboard
import CandidateDashboard from '../pages/candidate/CandidateDashboard';

import { JobsProvider } from '../context/JobsContext';

const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  allowedRole?: 'organization' | 'prepper';
}> = ({ children, allowedRole }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  if (allowedRole && user?.role !== allowedRole) return <Navigate to="/" replace />;
  return <>{children}</>;
};

/**
 * Single JobsProvider wrapping ALL routes that need job/application state.
 * This includes PrepperDashboard so it can read currentApplication to show
 * the pending interview card.
 */
const JobsLayout: React.FC = () => (
  <JobsProvider>
    <Outlet />
  </JobsProvider>
);

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Purely public — no job data needed */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/demo" element={<DemoPage />} />
      <Route path="/auth" element={<AuthPage />} />

      {/* All routes that share a single JobsProvider instance */}
      <Route element={<JobsLayout />}>

        {/* Apply links: /apply/senior-frontend-engineer-acme */}
        <Route path="/apply/:jobSlug" element={<CandidateApplyPage />} />
        <Route path="/apply" element={<CandidateApplyPage />} />

        {/* Org routes */}
        <Route path="/org/dashboard" element={<ProtectedRoute allowedRole="organization"><OrgDashboard /></ProtectedRoute>} />
        <Route path="/org/jobs" element={<ProtectedRoute allowedRole="organization"><JobsPage /></ProtectedRoute>} />
        <Route path="/org/jobs/new" element={<ProtectedRoute allowedRole="organization"><CreateJobPage /></ProtectedRoute>} />
        <Route path="/org/jobs/:id" element={<ProtectedRoute allowedRole="organization"><JobsPage /></ProtectedRoute>} />
        <Route path="/org/candidates" element={<ProtectedRoute allowedRole="organization"><CandidatesPage /></ProtectedRoute>} />
        <Route path="/org/candidates/:id" element={<ProtectedRoute allowedRole="organization"><CandidateReviewPage /></ProtectedRoute>} />

        {/* Candidate dashboard */}
        <Route path="/candidate/dashboard" element={<ProtectedRoute><CandidateDashboard /></ProtectedRoute>} />

        {/* Prepper dashboard — needs currentApplication to show pending interview card */}
        <Route path="/prepper/dashboard" element={<ProtectedRoute allowedRole="prepper"><PrepperDashboard /></ProtectedRoute>} />

        {/* Interview — reads job + questions from context */}
        <Route path="/prepper/interview" element={<ProtectedRoute><LiveInterviewPage /></ProtectedRoute>} />
      </Route>

      {/* Reports don't need job context */}
      <Route path="/prepper/reports/:id" element={<ProtectedRoute allowedRole="prepper"><PerformanceReportPage /></ProtectedRoute>} />
      <Route path="/prepper/reports" element={<ProtectedRoute allowedRole="prepper"><PerformanceReportPage /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;