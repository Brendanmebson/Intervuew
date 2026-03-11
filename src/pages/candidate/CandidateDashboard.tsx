import React from 'react';
import {
  Box, Typography, alpha, LinearProgress, Avatar,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SidebarNav from '../../components/layout/SidebarNav';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SoftCard from '../../components/common/SoftCard';
import ScoreRing from '../../components/common/ScoreRing';
import StatusBadge from '../../components/common/StatusBadge';
import GradientButton from '../../components/common/GradientButton';
import { useJobs } from '../../context/JobsContext';
import {
  Home, Assessment, Work, Settings, PlayCircle,
  CheckCircle, Schedule,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { label: 'Home', icon: <Home sx={{ fontSize: 18 }} />, path: '/candidate/dashboard' },
  { label: 'Applications', icon: <Work sx={{ fontSize: 18 }} />, path: '/candidate/applications' },
  { label: 'Reports', icon: <Assessment sx={{ fontSize: 18 }} />, path: '/candidate/reports' },
];
const bottomItems = [
  { label: 'Settings', icon: <Settings sx={{ fontSize: 18 }} />, path: '/candidate/settings' },
];

const CandidateDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentApplication } = useJobs();

  // Use real application from context, or fall back to mock
  const application = currentApplication ?? {
    jobTitle: 'Senior Frontend Engineer',
    company: 'Acme Corp',
    location: 'Remote',
    salary: '$120k – $160k',
    appliedAt: 'Jan 22, 2024',
    name: user?.name ?? '',
    email: '',
    jobId: '1',
  };

  const sidebar = <SidebarNav items={navItems} bottomItems={bottomItems} />;

  return (
    <DashboardLayout sidebar={sidebar}>
      <Box sx={{ mb: 5 }}>
        <Typography sx={{ color: '#8B8FA8', mb: 0.5 }}>Welcome back</Typography>
        <Typography variant="h3" sx={{ fontSize: '2rem' }}>
          {currentApplication?.name || user?.name}
        </Typography>
      </Box>

      {/* Application card */}
      <SoftCard sx={{ p: 4, mb: 3, display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
        <Box sx={{ flex: '1 1 240px' }}>
          <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
            <Avatar sx={{ width: 48, height: 48, fontSize: '1.25rem', fontWeight: 700, bgcolor: alpha('#5B5DF6', 0.12), color: '#5B5DF6' }}>
              {application.company[0]}
            </Avatar>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: '1.0625rem' }}>{application.jobTitle}</Typography>
              <Typography variant="caption" sx={{ color: '#8B8FA8' }}>{application.company}</Typography>
            </Box>
          </Box>

          {/* Location & salary from the actual job */}
          <Box sx={{ display: 'flex', gap: 2, mb: 1.5, flexWrap: 'wrap' }}>
            <Typography variant="caption" sx={{ color: '#5A5E72' }}>📍 {application.location}</Typography>
            <Typography variant="caption" sx={{ color: '#5A5E72' }}>💰 {application.salary}</Typography>
          </Box>

          <StatusBadge status="interviewing" />
          <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#B0B3C6' }}>
            Applied {application.appliedAt}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 3 }}>
          <ScoreRing score={87} size={90} label="CV Score" />
          <ScoreRing score={82} size={90} label="Interview" />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, flex: '0 0 auto' }}>
          <GradientButton startIcon={<PlayCircle />} onClick={() => navigate('/prepper/interview')} size="small">
            Start Interview
          </GradientButton>
          <Button variant="outlined" size="small"
            sx={{ borderColor: alpha('#5B5DF6', 0.2), color: '#5B5DF6' }}
            onClick={() => navigate('/prepper/reports/1')}>
            View Report
          </Button>
        </Box>
      </SoftCard>

      {/* Timeline */}
      <SoftCard sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Application Timeline</Typography>
        {[
          { label: 'Application Submitted', done: true, date: application.appliedAt },
          { label: 'CV Reviewed by AI', done: true, date: application.appliedAt },
          { label: 'AI Interview Completed', done: false, date: 'Pending' },
          { label: 'Under Employer Review', done: false, date: 'In progress' },
          { label: 'Final Decision', done: false, date: 'Pending' },
        ].map((step, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, pb: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <Box sx={{
                width: 28, height: 28, borderRadius: '50%',
                bgcolor: step.done ? alpha('#22C55E', 0.1) : alpha('#5B5DF6', 0.08),
                border: `2px solid ${step.done ? '#22C55E' : alpha('#5B5DF6', 0.2)}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {step.done
                  ? <CheckCircle sx={{ fontSize: 14, color: '#22C55E' }} />
                  : <Schedule sx={{ fontSize: 14, color: alpha('#5B5DF6', 0.4) }} />
                }
              </Box>
              {i < 4 && <Box sx={{ width: 2, height: 24, bgcolor: alpha('#5B5DF6', 0.08), mt: 0.5 }} />}
            </Box>
            <Box sx={{ pt: 0.4 }}>
              <Typography sx={{ fontWeight: step.done ? 600 : 400, fontSize: '0.9rem', color: step.done ? '#0F1115' : '#8B8FA8' }}>
                {step.label}
              </Typography>
              <Typography variant="caption" sx={{ color: '#B0B3C6' }}>{step.date}</Typography>
            </Box>
          </Box>
        ))}
      </SoftCard>

      {/* Skill summary */}
      <SoftCard sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2.5 }}>Your Performance Summary</Typography>
        {[
          { label: 'Communication', score: 84 },
          { label: 'Clarity', score: 79 },
          { label: 'Technical Knowledge', score: 88 },
          { label: 'Confidence', score: 76 },
        ].map((d) => (
          <Box key={d.label} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography sx={{ flex: '0 0 160px', fontSize: '0.875rem', fontWeight: 500, color: '#5A5E72' }}>{d.label}</Typography>
            <LinearProgress variant="determinate" value={d.score} sx={{ flex: 1, height: 6, borderRadius: 99 }} />
            <Typography sx={{ flex: '0 0 32px', fontSize: '0.875rem', fontWeight: 700, textAlign: 'right' }}>{d.score}</Typography>
          </Box>
        ))}
      </SoftCard>
    </DashboardLayout>
  );
};

export default CandidateDashboard;