import React from 'react';
import {
  Box, Typography, alpha, LinearProgress, Chip, Button,
  Avatar, Divider,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import SidebarNav from '../../components/layout/SidebarNav';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SoftCard from '../../components/common/SoftCard';
import StatusBadge from '../../components/common/StatusBadge';
import ScoreRing from '../../components/common/ScoreRing';
import { mockCandidates } from '../../utils/mockData';
import {
  Dashboard, Work, People, Analytics, Settings, HelpOutline,
  ArrowBack, PlayCircle, TextSnippet, CheckCircle, Cancel,
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

const skillMetrics = [
  { key: 'communication', label: 'Communication' },
  { key: 'clarity', label: 'Clarity' },
  { key: 'technical', label: 'Technical' },
  { key: 'confidence', label: 'Confidence' },
];

const CandidateReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const candidate = mockCandidates.find((c) => c.id === id) || mockCandidates[0];

  const sidebar = <SidebarNav items={navItems} bottomItems={bottomItems} />;

  return (
    <DashboardLayout sidebar={sidebar}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 5 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/org/candidates')} sx={{ color: '#8B8FA8' }}>
          Back
        </Button>
      </Box>

      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 4, flexWrap: 'wrap', gap: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
          <Avatar sx={{ width: 64, height: 64, fontSize: '1.5rem', fontWeight: 700 }}>
            {candidate.name[0]}
          </Avatar>
          <Box>
            <Typography variant="h3" sx={{ fontSize: '1.75rem', mb: 0.5 }}>{candidate.name}</Typography>
            <Typography sx={{ color: '#8B8FA8', mb: 1 }}>{candidate.email} · Applied for <strong>{candidate.jobTitle}</strong></Typography>
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
              <StatusBadge status={candidate.status} />
              <Typography variant="caption" sx={{ color: '#B0B3C6' }}>Applied {candidate.appliedAt}</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Cancel />}
            sx={{ borderColor: alpha('#EF4444', 0.3), color: '#EF4444', '&:hover': { bgcolor: alpha('#EF4444', 0.05) } }}
          >
            Reject
          </Button>
          <Button
            variant="contained"
            startIcon={<CheckCircle />}
            sx={{ bgcolor: '#22C55E', '&:hover': { bgcolor: '#16A34A' }, boxShadow: `0 4px 14px ${alpha('#22C55E', 0.35)}` }}
          >
            Move to Hire
          </Button>
        </Box>
      </Box>

      {/* Top section: scores + metrics */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        {/* Score rings */}
        <SoftCard sx={{ display: 'flex', gap: 4, alignItems: 'center', p: 4, flex: '1 1 300px' }}>
          <ScoreRing score={candidate.cvScore} size={110} label="CV Score" />
          <Divider orientation="vertical" flexItem />
          <ScoreRing score={candidate.interviewScore} size={110} label="Interview Score" />
        </SoftCard>

        {/* Skill breakdown */}
        <SoftCard sx={{ flex: '2 1 340px', p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2.5 }}>Skill Breakdown</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {skillMetrics.map((m) => {
              const val = candidate[m.key as keyof typeof candidate] as number;
              return (
                <Box key={m.key} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography sx={{ flex: '0 0 120px', fontSize: '0.875rem', fontWeight: 500, color: '#5A5E72' }}>{m.label}</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={val}
                    sx={{ flex: 1, height: 7, borderRadius: 99 }}
                  />
                  <Typography sx={{ flex: '0 0 32px', fontSize: '0.875rem', fontWeight: 700, color: '#0F1115', textAlign: 'right' }}>
                    {val}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </SoftCard>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {/* Strengths & Weaknesses */}
        <SoftCard sx={{ flex: '1 1 280px', p: 3 }}>
          <Box sx={{ mb: 2.5 }}>
            <Typography variant="h6" sx={{ mb: 1.5 }}>Strengths</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {candidate.strengths.map((s) => (
                <Box key={s} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckCircle sx={{ fontSize: 14, color: '#22C55E', flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ color: '#5A5E72' }}>{s}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Divider />
          <Box sx={{ mt: 2.5 }}>
            <Typography variant="h6" sx={{ mb: 1.5 }}>Areas to Improve</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {candidate.weaknesses.map((w) => (
                <Box key={w} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ width: 14, height: 14, borderRadius: '50%', border: `2px solid ${alpha('#F59E0B', 0.5)}`, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ color: '#5A5E72' }}>{w}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </SoftCard>

        {/* Skills */}
        <SoftCard sx={{ flex: '1 1 200px', p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Skills</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {candidate.skills.map((s) => (
              <Chip key={s} label={s} sx={{
                bgcolor: alpha('#5B5DF6', 0.08), color: '#5B5DF6', fontWeight: 600, fontSize: '0.75rem',
              }} />
            ))}
          </Box>
        </SoftCard>

        {/* Recording / Transcript */}
        <SoftCard sx={{ flex: '2 1 380px', p: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2.5 }}>
            <Button
              startIcon={<PlayCircle />}
              variant="outlined"
              size="small"
              sx={{ borderColor: alpha('#5B5DF6', 0.2), color: '#5B5DF6' }}
            >
              Play Recording
            </Button>
            <Button
              startIcon={<TextSnippet />}
              variant="outlined"
              size="small"
              sx={{ borderColor: alpha('#5B5DF6', 0.2), color: '#5B5DF6' }}
            >
              Full Transcript
            </Button>
          </Box>
          <Typography variant="h6" sx={{ mb: 1.5 }}>Transcript Snippet</Typography>
          <Box sx={{
            bgcolor: '#F8F9FC', borderRadius: 2, p: 2,
            border: `1px solid ${alpha('#5B5DF6', 0.07)}`,
          }}>
            <Typography variant="body2" sx={{ color: '#5A5E72', lineHeight: 1.8, fontSize: '0.8125rem' }}>
              <Box component="span" sx={{ color: '#5B5DF6', fontWeight: 600 }}>AI: </Box>
              Tell me about your experience with TypeScript and how you've used it in production applications.
              <br /><br />
              <Box component="span" sx={{ color: '#0F1115', fontWeight: 600 }}>Candidate: </Box>
              I've been using TypeScript for about 4 years now. In my most recent role, we migrated a large React codebase from JavaScript to TypeScript, which improved our code quality significantly and reduced runtime errors by around 60%...
            </Typography>
          </Box>
        </SoftCard>
      </Box>
    </DashboardLayout>
  );
};

export default CandidateReviewPage;
