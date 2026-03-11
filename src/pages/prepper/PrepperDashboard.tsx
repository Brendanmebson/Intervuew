import React from 'react';
import {
  Box, Typography, alpha, LinearProgress, Chip, Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SidebarNav from '../../components/layout/SidebarNav';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SoftCard from '../../components/common/SoftCard';
import GradientButton from '../../components/common/GradientButton';
import ScoreRing from '../../components/common/ScoreRing';
import { prepperSessions } from '../../utils/mockData';
import {
  Home, PlayCircle, Assessment, History, Settings,
  Whatshot, TrendingUp, EmojiEvents, ArrowForward,
  AccessTime, LocationOn, AttachMoney, Psychology,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { useJobs } from '../../context/JobsContext';

const navItems = [
  { label: 'Home', icon: <Home sx={{ fontSize: 18 }} />, path: '/prepper/dashboard' },
  { label: 'Reports', icon: <Assessment sx={{ fontSize: 18 }} />, path: '/prepper/reports' },
  { label: 'History', icon: <History sx={{ fontSize: 18 }} />, path: '/prepper/history' },
];
const bottomItems = [
  { label: 'Settings', icon: <Settings sx={{ fontSize: 18 }} />, path: '/prepper/settings' },
];

const PrepperDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentApplication } = useJobs();

  // Show the pending interview card when the application email matches the logged-in user's email
  // and the interview hasn't been done yet
  const hasPendingInterview =
    currentApplication &&
    !currentApplication.interviewDone &&
    (!user?.email || currentApplication.email.toLowerCase() === user.email.toLowerCase());

  const avgScore = Math.round(prepperSessions.reduce((s, p) => s + p.score, 0) / prepperSessions.length);

  const sidebar = <SidebarNav items={navItems} bottomItems={bottomItems} />;

  return (
    <DashboardLayout sidebar={sidebar}>
      {/* Greeting */}
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ color: '#8B8FA8', mb: 0.5 }}>
          {new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 17 ? 'Good afternoon' : 'Good evening'} 👋
        </Typography>
        <Typography variant="h3" sx={{ fontSize: '2rem' }}>
          Hey, {user?.name?.split(' ')[0]}
        </Typography>
      </Box>

      {/* ── Pending Interview Banner ─────────────────────────────────────────── */}
      {hasPendingInterview && (
        <SoftCard sx={{
          p: 0, mb: 3, overflow: 'hidden',
          border: `1.5px solid ${alpha('#5B5DF6', 0.2)}`,
          boxShadow: `0 4px 24px ${alpha('#5B5DF6', 0.1)}`,
        }}>
          {/* Top accent stripe */}
          <Box sx={{ height: 4, background: 'linear-gradient(90deg, #5B5DF6, #9B8FFF)' }} />
          <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
            {/* Icon */}
            <Box sx={{
              width: 56, height: 56, borderRadius: 2, flexShrink: 0,
              background: 'linear-gradient(135deg, #5B5DF6, #9B8FFF)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Psychology sx={{ color: '#fff', fontSize: 28 }} />
            </Box>

            {/* Info */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Chip
                  label="Pending Interview"
                  size="small"
                  sx={{
                    bgcolor: alpha('#F59E0B', 0.1), color: '#D97706',
                    fontWeight: 700, fontSize: '0.65rem', height: 20,
                    border: `1px solid ${alpha('#F59E0B', 0.25)}`,
                  }}
                />
              </Box>
              <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', mb: 0.5 }}>
                {currentApplication!.jobTitle}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Typography variant="caption" sx={{ color: '#8B8FA8', fontWeight: 600 }}>
                  {currentApplication!.company}
                </Typography>
                {currentApplication!.location && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LocationOn sx={{ fontSize: 12, color: '#B0B3C6' }} />
                    <Typography variant="caption" sx={{ color: '#8B8FA8' }}>{currentApplication!.location}</Typography>
                  </Box>
                )}
                {currentApplication!.salary && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AttachMoney sx={{ fontSize: 12, color: '#B0B3C6' }} />
                    <Typography variant="caption" sx={{ color: '#8B8FA8' }}>{currentApplication!.salary}</Typography>
                  </Box>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AccessTime sx={{ fontSize: 12, color: '#B0B3C6' }} />
                  <Typography variant="caption" sx={{ color: '#8B8FA8' }}>
                    Applied {currentApplication!.appliedAt}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* CTA */}
            <GradientButton
              endIcon={<ArrowForward />}
              onClick={() => navigate('/prepper/interview')}
              sx={{ flexShrink: 0, whiteSpace: 'nowrap' }}
            >
              Start Interview
            </GradientButton>
          </Box>
        </SoftCard>
      )}

      {/* ── Start interview hero card (shown when no pending application) ────── */}
      {!hasPendingInterview && (
        <SoftCard sx={{
          p: 5, mb: 3,
          background: 'linear-gradient(135deg, #5B5DF6 0%, #9B8FFF 50%, #C4B5FD 100%)',
          border: 'none',
          position: 'relative', overflow: 'hidden',
        }}>
          <Box sx={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.06)' }} />
          <Box sx={{ position: 'absolute', bottom: -40, right: 100, width: 160, height: 160, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.04)' }} />
          <Box sx={{ position: 'relative' }}>
            <Chip
              label="AI-Powered"
              size="small"
              sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#fff', fontWeight: 600, mb: 2, fontSize: '0.7rem', height: 24 }}
            />
            <Typography variant="h3" sx={{ color: '#fff', mb: 1.5, fontSize: { xs: '1.5rem', md: '2rem' } }}>
              Ready to practice?
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.8)', mb: 3.5, maxWidth: 420, lineHeight: 1.7 }}>
              Start an AI-powered mock interview. Get real-time feedback, scoring, and detailed analysis to improve your chances.
            </Typography>
            <GradientButton
              endIcon={<ArrowForward />}
              onClick={() => navigate('/prepper/interview')}
              sx={{
                bgcolor: '#fff', color: '#5B5DF6',
                background: '#fff',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                '&:hover': { background: '#F8F9FC', transform: 'translateY(-1px)', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' },
              }}
            >
              Start AI Interview
            </GradientButton>
          </Box>
        </SoftCard>
      )}

      {/* Stats row */}
      <Box sx={{ display: 'flex', gap: 2.5, mb: 3, flexWrap: 'wrap' }}>
        <SoftCard sx={{ flex: '1 1 140px', p: 2.5, textAlign: 'center' }}>
          <Whatshot sx={{ fontSize: 28, color: '#F59E0B', mb: 1 }} />
          <Typography sx={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: '"Sora", sans-serif', color: '#0F1115', lineHeight: 1 }}>
            7
          </Typography>
          <Typography variant="caption" sx={{ color: '#8B8FA8' }}>Day Streak</Typography>
        </SoftCard>
        <SoftCard sx={{ flex: '1 1 140px', p: 2.5, textAlign: 'center' }}>
          <PlayCircle sx={{ fontSize: 28, color: '#5B5DF6', mb: 1 }} />
          <Typography sx={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: '"Sora", sans-serif', color: '#0F1115', lineHeight: 1 }}>
            {prepperSessions.length}
          </Typography>
          <Typography variant="caption" sx={{ color: '#8B8FA8' }}>Sessions Done</Typography>
        </SoftCard>
        <SoftCard sx={{ flex: '1 1 140px', p: 2.5, textAlign: 'center' }}>
          <TrendingUp sx={{ fontSize: 28, color: '#22C55E', mb: 1 }} />
          <Typography sx={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: '"Sora", sans-serif', color: '#0F1115', lineHeight: 1 }}>
            +14
          </Typography>
          <Typography variant="caption" sx={{ color: '#8B8FA8' }}>Score Improvement</Typography>
        </SoftCard>
        <SoftCard sx={{ flex: '1 1 140px', p: 2.5, textAlign: 'center' }}>
          <EmojiEvents sx={{ fontSize: 28, color: '#9B8FFF', mb: 1 }} />
          <ScoreRing score={avgScore} size={64} />
          <Typography variant="caption" sx={{ color: '#8B8FA8', display: 'block', mt: 0.5 }}>Avg Score</Typography>
        </SoftCard>
      </Box>

      {/* Recent sessions */}
      <SoftCard sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
          <Typography variant="h5" sx={{ fontSize: '1.125rem' }}>Recent Sessions</Typography>
          <Typography
            sx={{ fontSize: '0.8125rem', color: '#5B5DF6', fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            onClick={() => navigate('/prepper/history')}
          >
            View all
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {prepperSessions.map((s) => (
            <Box
              key={s.id}
              sx={{
                display: 'flex', alignItems: 'center', gap: 2.5, p: 2, borderRadius: 2,
                cursor: 'pointer', transition: 'all 180ms',
                '&:hover': { bgcolor: alpha('#5B5DF6', 0.04) },
              }}
              onClick={() => navigate(`/prepper/reports/${s.id}`)}
            >
              <Box sx={{
                width: 40, height: 40, borderRadius: 2, flexShrink: 0,
                background: 'linear-gradient(135deg, #5B5DF6, #9B8FFF)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <PlayCircle sx={{ color: '#fff', fontSize: 18 }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', mb: 0.25 }}>{s.role}</Typography>
                <Typography variant="caption" sx={{ color: '#8B8FA8' }}>{s.date} · {s.duration}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <LinearProgress
                  variant="determinate"
                  value={s.score}
                  sx={{ width: 80, height: 5, borderRadius: 99 }}
                />
                <Typography sx={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F1115', minWidth: 28 }}>
                  {s.score}
                </Typography>
              </Box>
              <Chip
                label="Completed"
                size="small"
                sx={{ bgcolor: alpha('#22C55E', 0.1), color: '#22C55E', fontWeight: 600, fontSize: '0.7rem', height: 22 }}
              />
            </Box>
          ))}
        </Box>
      </SoftCard>
    </DashboardLayout>
  );
};

export default PrepperDashboard;