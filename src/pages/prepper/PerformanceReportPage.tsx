import React from 'react';
import {
  Box, Typography, alpha, LinearProgress, Button, Divider, Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SidebarNav from '../../components/layout/SidebarNav';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SoftCard from '../../components/common/SoftCard';
import ScoreRing from '../../components/common/ScoreRing';
import GradientButton from '../../components/common/GradientButton';
import {
  Home, PlayCircle, Assessment, History, Settings,
  Download, ArrowBack, CheckCircle, TrendingUp, Replay,
} from '@mui/icons-material';

const navItems = [
  { label: 'Home', icon: <Home sx={{ fontSize: 18 }} />, path: '/prepper/dashboard' },
  { label: 'Reports', icon: <Assessment sx={{ fontSize: 18 }} />, path: '/prepper/reports' },
  { label: 'History', icon: <History sx={{ fontSize: 18 }} />, path: '/prepper/history' },
];
const bottomItems = [
  { label: 'Settings', icon: <Settings sx={{ fontSize: 18 }} />, path: '/prepper/settings' },
];

const dimensions = [
  { key: 'communication', label: 'Communication', score: 84, icon: '💬' },
  { key: 'clarity', label: 'Clarity', score: 79, icon: '🎯' },
  { key: 'technical', label: 'Technical Knowledge', score: 88, icon: '⚙️' },
  { key: 'confidence', label: 'Confidence', score: 76, icon: '✨' },
];

const feedback = [
  { type: 'strength', text: 'Strong technical vocabulary and domain knowledge demonstrated throughout.' },
  { type: 'strength', text: 'Clear and concise responses to behavioral questions.' },
  { type: 'strength', text: 'Good use of specific examples to support answers.' },
  { type: 'improve', text: 'Answers occasionally ran long — practice keeping responses to 2 minutes.' },
  { type: 'improve', text: 'Could improve eye contact and physical presence in video sessions.' },
];

const PerformanceReportPage: React.FC = () => {
  const navigate = useNavigate();

  const overallScore = Math.round(dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length);

  const sidebar = <SidebarNav items={navItems} bottomItems={bottomItems} />;

  return (
    <DashboardLayout sidebar={sidebar}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 5 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/prepper/dashboard')} sx={{ color: '#8B8FA8' }}>
          Back
        </Button>
      </Box>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="overline" sx={{ color: '#8B8FA8', display: 'block', mb: 0.5 }}>SESSION REPORT</Typography>
          <Typography variant="h3" sx={{ fontSize: '2rem', mb: 0.5 }}>Performance Analysis</Typography>
          <Typography sx={{ color: '#8B8FA8', fontSize: '0.875rem' }}>Senior Frontend Engineer · Jan 22, 2024 · 18 minutes</Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<Download />}
          sx={{ borderColor: alpha('#5B5DF6', 0.2), color: '#5B5DF6' }}
        >
          Download PDF
        </Button>
      </Box>

      {/* Hero score + breakdown */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        {/* Overall score */}
        <SoftCard sx={{
          flex: '0 0 auto', p: 4, textAlign: 'center',
          background: 'linear-gradient(135deg, #5B5DF6 0%, #9B8FFF 100%)',
          border: 'none', minWidth: 200,
        }}>
          <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', mb: 2 }}>
            OVERALL SCORE
          </Typography>
          <ScoreRing score={overallScore} size={130} color="#fff" />
          <Box sx={{ mt: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, justifyContent: 'center' }}>
              <TrendingUp sx={{ fontSize: 14, color: '#DCFCE7' }} />
              <Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
                +8 vs last session
              </Typography>
            </Box>
          </Box>
        </SoftCard>

        {/* Dimension breakdown */}
        <SoftCard sx={{ flex: '1 1 300px', p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>Dimension Breakdown</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {dimensions.map((d) => (
              <Box key={d.key}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontSize: '0.875rem' }}>{d.icon}</Typography>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>{d.label}</Typography>
                  </Box>
                  <Typography sx={{ fontWeight: 800, fontFamily: '"Sora", sans-serif', fontSize: '1.125rem', color: '#0F1115' }}>
                    {d.score}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={d.score}
                  sx={{ height: 7, borderRadius: 99 }}
                />
              </Box>
            ))}
          </Box>
        </SoftCard>
      </Box>

      {/* Feedback + next steps */}
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        <SoftCard sx={{ flex: '2 1 360px', p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2.5 }}>AI Feedback</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {feedback.map((f, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2, borderRadius: 2,
                bgcolor: f.type === 'strength' ? alpha('#22C55E', 0.05) : alpha('#F59E0B', 0.05),
                border: `1px solid ${f.type === 'strength' ? alpha('#22C55E', 0.12) : alpha('#F59E0B', 0.12)}`,
              }}>
                <CheckCircle sx={{
                  fontSize: 16, mt: 0.2, flexShrink: 0,
                  color: f.type === 'strength' ? '#22C55E' : '#F59E0B',
                  transform: f.type === 'improve' ? 'rotate(180deg)' : 'none',
                }} />
                <Typography variant="body2" sx={{ color: '#5A5E72', lineHeight: 1.65 }}>{f.text}</Typography>
              </Box>
            ))}
          </Box>
        </SoftCard>

        <SoftCard sx={{ flex: '1 1 220px', p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2.5 }}>Quick Stats</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { label: 'Questions answered', value: '5 / 5' },
              { label: 'Avg. response length', value: '2m 8s' },
              { label: 'Filler words used', value: '12' },
              { label: 'Pace (wpm)', value: '142' },
              { label: 'Questions with examples', value: '4 / 5' },
            ].map((s) => (
              <Box key={s.label} sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: `1px solid ${alpha('#5B5DF6', 0.06)}` }}>
                <Typography variant="body2" sx={{ color: '#8B8FA8' }}>{s.label}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>{s.value}</Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 2.5 }} />


        </SoftCard>
      </Box>
    </DashboardLayout>
  );
};

export default PerformanceReportPage;
