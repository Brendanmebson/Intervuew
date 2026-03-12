import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import SidebarLayout from '../components/SidebarLayout';
import { SoftCard, ScoreChip, CategoryBar, GradientButton } from '../components/shared';
import { Icon } from '../components/Icons';
import { COLORS } from '../theme/theme';
import { ALL_SESSIONS, BREAKDOWN_BY_SESSION } from '../data/sessions';

const Reports: React.FC = () => {
  const nav = useNavigate();
  const [anim, setAnim] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnim(true), 300); return () => clearTimeout(t); }, []);

  // Aggregate category scores across all sessions
  const allBreakdowns = Object.values(BREAKDOWN_BY_SESSION).flat();
  const categoryMap: Record<string, number[]> = {};
  allBreakdowns.forEach(b => {
    if (!categoryMap[b.label]) categoryMap[b.label] = [];
    categoryMap[b.label].push(b.score);
  });

  // Pick top recurring categories
  const aggregateCategories = [
    { label: 'Communication Clarity',  color: COLORS.indigo },
    { label: 'Problem Solving',        color: COLORS.green },
    { label: 'Technical Knowledge',    color: COLORS.lavender },
    { label: 'Leadership',             color: COLORS.amber },
    { label: 'Strategic Thinking',     color: COLORS.pink },
  ].map(c => ({
    ...c,
    score: Math.round(
      (categoryMap[c.label] ?? [80]).reduce((a, v) => a + v, 0) /
      (categoryMap[c.label]?.length || 1)
    ),
  }));

  const avgScore  = Math.round(ALL_SESSIONS.reduce((a, s) => a + s.score, 0) / ALL_SESSIONS.length);
  const bestScore = Math.max(...ALL_SESSIONS.map(s => s.score));
  const trend     = ALL_SESSIONS[0].score - ALL_SESSIONS[ALL_SESSIONS.length - 1].score;

  return (
    <SidebarLayout
      userLabel="Alex Johnson"
      userSub="Free plan"
      userInitial="A"
      navItems={[
        { icon: 'home',     label: 'Dashboard',      to: '/dashboard' },
        { icon: 'mic',      label: 'Start Interview', to: '/interview' },
        { icon: 'clock',    label: 'History',         to: '/history' },
        { icon: 'chart',    label: 'Reports',         active: true },
        { icon: 'settings', label: 'Settings',        to: '/settings' },
      ]}
    >
      {/* Header */}
      <Box className="fade-up" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: '28px' }}>
        <Box>
          <Typography variant="h4" sx={{ fontSize: 25, mb: '4px' }}>Analytics & Reports</Typography>
          <Typography sx={{ fontSize: 15, color: COLORS.textMuted }}>Performance overview across all sessions</Typography>
        </Box>
        <GradientButton size="sm" to="/interview">+ New Session</GradientButton>
      </Box>

      {/* Top stats */}
      <Box className="fade-up-1" sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', mb: '22px' }}>
        {[
          { label: 'Sessions',     val: ALL_SESSIONS.length, unit: '',    color: COLORS.indigo, sub: 'total completed' },
          { label: 'Average Score',val: avgScore,            unit: '',    color: COLORS.green,  sub: 'across all sessions' },
          { label: 'Best Score',   val: bestScore,           unit: '',    color: COLORS.amber,  sub: 'personal best' },
          { label: 'Trend',        val: trend > 0 ? `+${trend}` : trend, unit: 'pts', color: trend > 0 ? COLORS.green : COLORS.red, sub: 'vs. first session' },
        ].map(s => (
          <SoftCard key={s.label} sx={{ p: '22px 24px' }}>
            <Typography sx={{ fontSize: 11, fontWeight: 600, color: COLORS.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', mb: '8px' }}>
              {s.label}
            </Typography>
            <Typography sx={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.04em', color: s.color, lineHeight: 1, mb: '4px' }}>
              {s.val}{s.unit}
            </Typography>
            <Typography sx={{ fontSize: 12, color: COLORS.textMuted }}>{s.sub}</Typography>
          </SoftCard>
        ))}
      </Box>

      {/* Score progression + Category avg */}
      <Box className="fade-up-2" sx={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '18px', mb: '18px' }}>
        {/* Score over time (visual bar chart) */}
        <SoftCard sx={{ p: '28px 30px' }}>
          <Typography variant="h6" sx={{ fontSize: 15, mb: '22px' }}>Score Progression</Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: 120 }}>
            {[...ALL_SESSIONS].reverse().map((s, i) => {
              const h = (s.score / 100) * 110;
              const color = s.score >= 88 ? COLORS.green : s.score >= 78 ? COLORS.indigo : COLORS.amber;
              return (
                <Box
                  key={s.id}
                  onClick={() => nav(`/report/${s.id}`)}
                  sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                >
                  <Typography sx={{ fontSize: 11, fontWeight: 700, color }}>{s.score}</Typography>
                  <Box
                    sx={{
                      width: '100%', height: anim ? h : 4, borderRadius: '6px 6px 4px 4px',
                      background: `linear-gradient(180deg, ${color}, ${alpha(color, 0.5)})`,
                      transition: `height 0.9s cubic-bezier(0.4,0,0.2,1) ${i * 0.08}s`,
                      '&:hover': { filter: 'brightness(1.1)' },
                    }}
                  />
                  <Typography sx={{ fontSize: 10, color: COLORS.textMuted, textAlign: 'center', lineHeight: 1.2 }}>
                    {s.role.split(' ')[0]}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </SoftCard>

        {/* Average category breakdown */}
        <SoftCard sx={{ p: '28px 30px' }}>
          <Typography variant="h6" sx={{ fontSize: 15, mb: '22px' }}>Skill Averages</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {aggregateCategories.map((c, i) => (
              <CategoryBar key={i} label={c.label} score={c.score} color={c.color} animated={anim} delay={i * 0.08} />
            ))}
          </Box>
        </SoftCard>
      </Box>

      {/* All sessions list */}
      <Box className="fade-up-3">
        <Typography variant="h6" sx={{ fontSize: 15, mb: '14px' }}>All Sessions</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {ALL_SESSIONS.map(s => (
            <SoftCard
              key={s.id}
              sx={{ p: '18px 22px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px' }}
              onClick={() => nav(`/report/${s.id}`)}
            >
              <Box sx={{ width: 38, height: 38, borderRadius: '11px', background: alpha(COLORS.indigo, 0.08), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="briefcase" size={16} color={COLORS.indigo} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 600, fontSize: 14, mb: '2px' }}>{s.role}</Typography>
                <Typography sx={{ fontSize: 12, color: COLORS.textMuted }}>{s.date} · {s.duration}</Typography>
              </Box>
              <Box sx={{
                px: '10px', py: '3px', borderRadius: '20px', fontSize: 11, fontWeight: 600,
                background: alpha(s.mode === 'Auto' ? COLORS.indigo : COLORS.purple, 0.1),
                color: s.mode === 'Auto' ? COLORS.indigo : COLORS.purple,
              }}>
                {s.mode}
              </Box>
              <ScoreChip score={s.score} />
              <Typography sx={{ color: COLORS.textLight, fontSize: 16 }}>→</Typography>
            </SoftCard>
          ))}
        </Box>
      </Box>
    </SidebarLayout>
  );
};

export default Reports;