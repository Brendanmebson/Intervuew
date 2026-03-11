import React from 'react';
import {
  Box, Typography, alpha, LinearProgress,
  Avatar, IconButton, Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SidebarNav from '../../components/layout/SidebarNav';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SoftCard from '../../components/common/SoftCard';
import StatusBadge from '../../components/common/StatusBadge';
import GradientButton from '../../components/common/GradientButton';
import { useJobs } from '../../context/JobsContext';
import { mockCandidates, mockAnalytics } from '../../utils/mockData';
import {
  Dashboard, Work, People, Analytics, Settings, HelpOutline,
  Add, TrendingUp, Visibility, ArrowUpward,
} from '@mui/icons-material';

const navItems = [
  { label: 'Dashboard', icon: <Dashboard sx={{ fontSize: 18 }} />, path: '/org/dashboard' },
  { label: 'Jobs', icon: <Work sx={{ fontSize: 18 }} />, path: '/org/jobs' },
  { label: 'Candidates', icon: <People sx={{ fontSize: 18 }} />, path: '/org/candidates' },
  { label: 'Analytics', icon: <Analytics sx={{ fontSize: 18 }} />, path: '/org/analytics' },
];

const bottomItems = [
  { label: 'Settings', icon: <Settings sx={{ fontSize: 18 }} />, path: '/org/settings' },
  { label: 'Help', icon: <HelpOutline sx={{ fontSize: 18 }} />, path: '/org/help' },
];

const OrgDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { jobs } = useJobs();

  // Derive live metrics from jobs
  const totalApplicants = jobs.reduce((sum, j) => sum + j.applicants, 0);
  const activeJobs = jobs.filter((j) => j.status === 'active').length;

  const metricCards = [
    { label: 'Total Applications', value: String(totalApplicants), change: '+18%', up: true, color: '#5B5DF6' },
    { label: 'Active Jobs', value: String(activeJobs), change: `+${jobs.length - 2 > 0 ? jobs.length - 2 : 0} new`, up: true, color: '#22C55E' },
    { label: 'Avg. Score', value: '76', change: '+3pts', up: true, color: '#9B8FFF' },
    { label: 'Hire Rate', value: '12%', change: '-2%', up: false, color: '#F59E0B' },
  ];

  const sidebar = <SidebarNav items={navItems} bottomItems={bottomItems} />;

  return (
    <DashboardLayout sidebar={sidebar}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 5 }}>
        <Box>
          <Typography variant="overline" sx={{ color: '#8B8FA8', mb: 0.5, display: 'block' }}>Welcome back</Typography>
          <Typography variant="h3" sx={{ fontSize: '2rem' }}>Hiring Dashboard</Typography>
        </Box>
        <GradientButton startIcon={<Add />} onClick={() => navigate('/org/jobs/new')}>
          New Job Posting
        </GradientButton>
      </Box>

      {/* Metrics Row */}
      <Box sx={{ display: 'flex', gap: 2.5, mb: 4, flexWrap: 'wrap' }}>
        {metricCards.map((m) => (
          <SoftCard key={m.label} sx={{ flex: '1 1 140px', p: 2.5 }}>
            <Typography variant="caption" sx={{ color: '#8B8FA8', fontWeight: 600, letterSpacing: '0.06em', display: 'block', mb: 1.5 }}>
              {m.label.toUpperCase()}
            </Typography>
            <Typography sx={{ fontSize: '2rem', fontWeight: 800, fontFamily: '"Sora", sans-serif', color: '#0F1115', lineHeight: 1, mb: 1 }}>
              {m.value}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ArrowUpward sx={{ fontSize: 12, color: m.up ? '#22C55E' : '#EF4444', transform: m.up ? 'none' : 'rotate(180deg)' }} />
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: m.up ? '#22C55E' : '#EF4444' }}>{m.change}</Typography>
              <Typography sx={{ fontSize: '0.7rem', color: '#B0B3C6', ml: 0.5 }}>vs last week</Typography>
            </Box>
          </SoftCard>
        ))}
      </Box>

      {/* Main content */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        {/* Active Jobs — live from context */}
        <Box sx={{ flex: '1 1 320px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
            <Typography variant="h5" sx={{ fontSize: '1.125rem' }}>
              Active Jobs
              <Box component="span" sx={{ ml: 1, fontSize: '0.8rem', color: '#8B8FA8', fontWeight: 400 }}>
                ({jobs.length})
              </Box>
            </Typography>
            <Typography
              sx={{ fontSize: '0.8125rem', color: '#5B5DF6', fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
              onClick={() => navigate('/org/jobs')}
            >
              View all
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {jobs.slice(0, 4).map((job) => (
              <SoftCard key={job.id} hover sx={{ p: 2.5, cursor: 'pointer' }} onClick={() => navigate(`/org/jobs/${job.id}`)}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem', mb: 0.25 }}>{job.title}</Typography>
                    <Typography variant="caption" sx={{ color: '#8B8FA8' }}>{job.location} · {job.salary}</Typography>
                  </Box>
                  <StatusBadge status={job.status} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box>
                    <Typography sx={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: '"Sora", sans-serif', color: '#5B5DF6', lineHeight: 1 }}>
                      {job.applicants}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#8B8FA8' }}>Applicants</Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <LinearProgress variant="determinate" value={Math.min((job.applicants / 60) * 100, 100)} sx={{ height: 5, borderRadius: 99 }} />
                  </Box>
                </Box>
              </SoftCard>
            ))}
            {jobs.length === 0 && (
              <SoftCard sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#8B8FA8', mb: 2 }}>No jobs yet</Typography>
                <GradientButton size="small" startIcon={<Add />} onClick={() => navigate('/org/jobs/new')}>
                  Create First Job
                </GradientButton>
              </SoftCard>
            )}
          </Box>
        </Box>

        {/* Weekly Activity chart */}
        <SoftCard sx={{ flex: '1 1 260px', p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2.5, fontSize: '1.125rem' }}>Weekly Activity</Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end', height: 100, mb: 2 }}>
            {mockAnalytics.weeklyData.map((d) => (
              <Box key={d.day} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{
                  width: '100%', borderRadius: '4px 4px 0 0',
                  background: 'linear-gradient(180deg, #5B5DF6, #9B8FFF)',
                  height: (d.applications / 35) * 80,
                  transition: 'all 300ms',
                  '&:hover': { opacity: 0.8 },
                }} />
                <Typography sx={{ fontSize: '0.6rem', color: '#B0B3C6' }}>{d.day}</Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 3, borderTop: `1px solid ${alpha('#5B5DF6', 0.08)}`, pt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: 'linear-gradient(135deg, #5B5DF6, #9B8FFF)' }} />
              <Typography variant="caption" sx={{ color: '#8B8FA8' }}>Applications</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <TrendingUp sx={{ fontSize: 14, color: '#22C55E' }} />
              <Typography variant="caption" sx={{ color: '#22C55E', fontWeight: 600 }}>+18% this week</Typography>
            </Box>
          </Box>
        </SoftCard>
      </Box>

      {/* Candidate Pipeline */}
      <SoftCard sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" sx={{ fontSize: '1.125rem' }}>Recent Candidates</Typography>
          <Typography
            sx={{ fontSize: '0.8125rem', color: '#5B5DF6', fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            onClick={() => navigate('/org/candidates')}
          >
            View all
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', px: 2, pb: 1.5, gap: 2 }}>
            {['Candidate', 'Role', 'CV Score', 'Interview Score', 'Status', ''].map((h, i) => (
              <Typography key={i} variant="caption" sx={{
                color: '#B0B3C6', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                flex: i === 0 ? 2 : i === 5 ? '0 0 40px' : 1,
              }}>
                {h}
              </Typography>
            ))}
          </Box>
          {mockCandidates.map((c) => (
            <Box
              key={c.id}
              sx={{
                display: 'flex', alignItems: 'center', gap: 2,
                px: 2, py: 1.5, borderRadius: 2, cursor: 'pointer',
                transition: 'all 180ms',
                '&:hover': { bgcolor: alpha('#5B5DF6', 0.04) },
              }}
              onClick={() => navigate(`/org/candidates/${c.id}`)}
            >
              <Box sx={{ flex: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar sx={{ width: 32, height: 32, fontSize: '0.75rem' }}>{c.name[0]}</Avatar>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{c.name}</Typography>
                  <Typography variant="caption" sx={{ color: '#8B8FA8' }}>{c.email}</Typography>
                </Box>
              </Box>
              <Typography sx={{ flex: 1, fontSize: '0.8125rem', color: '#5A5E72' }} noWrap>{c.jobTitle}</Typography>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LinearProgress variant="determinate" value={c.cvScore} sx={{ flex: 1, height: 4 }} />
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#0F1115', minWidth: 28 }}>{c.cvScore}</Typography>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LinearProgress variant="determinate" value={c.interviewScore} sx={{ flex: 1, height: 4 }} />
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#0F1115', minWidth: 28 }}>{c.interviewScore}</Typography>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <StatusBadge status={c.status} />
              </Box>
              <Box sx={{ flex: '0 0 40px', display: 'flex', justifyContent: 'flex-end' }}>
                <Tooltip title="View profile">
                  <IconButton size="small" sx={{ color: '#8B8FA8', '&:hover': { color: '#5B5DF6' } }}>
                    <Visibility sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          ))}
        </Box>
      </SoftCard>
    </DashboardLayout>
  );
};

export default OrgDashboard;