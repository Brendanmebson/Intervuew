import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import SidebarLayout from '../components/SidebarLayout';
import { SoftCard, GradientButton, ScoreChip } from '../components/shared';
import { Icon } from '../components/Icons';
import { COLORS } from '../theme/theme';
import { CANDIDATES, JOB_ROLES } from '../data/orgData';

const OrgInterviews: React.FC = () => {
  const nav = useNavigate();
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Scheduled'>('All');

  // Build interview list from candidates
  const interviews = CANDIDATES.map((c, i) => ({
    id: c.id,
    candidateName: c.name,
    candidateId: c.id,
    role: c.role,
    date: c.date,
    score: c.score,
    status: 'Completed' as const,
    duration: ['18 min', '24 min', '31 min', '22 min', '28 min', '35 min', '26 min'][i % 7],
    mode: (i % 2 === 0 ? 'Auto' : 'Manual') as 'Auto' | 'Manual',
  }));

  // Add a couple scheduled
  const scheduled = [
    { id: 's1', candidateName: 'David Park', candidateId: 's1', role: 'Senior Engineer', date: 'Mar 8', score: 0, status: 'Scheduled' as const, duration: '—', mode: 'Auto' as const },
    { id: 's2', candidateName: 'Emma Torres', candidateId: 's2', role: 'Product Manager', date: 'Mar 10', score: 0, status: 'Scheduled' as const, duration: '—', mode: 'Auto' as const },
  ];

  const all = [...scheduled, ...interviews];
  const filtered = filter === 'All' ? all : all.filter(i => i.status === filter);

  return (
    <SidebarLayout
      userLabel="Acme Corp"
      userSub="Business plan"
      userInitial="A"
      navItems={[
        { icon: 'home',      label: 'Overview',   to: '/org' },
        { icon: 'briefcase', label: 'Job Roles',  to: '/org/roles' },
        { icon: 'users',     label: 'Candidates', to: '/org/candidates' },
        { icon: 'mic',       label: 'Interviews', active: true, to: '/org/interviews' },
        { icon: 'chart',     label: 'Analytics',  to: '/org/analytics' },
        { icon: 'settings',  label: 'Settings',   to: '/org/settings' },
      ]}
    >
      {/* Header */}
      <Box className="fade-up" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: '28px' }}>
        <Box>
          <Typography variant="h4" sx={{ fontSize: 25, mb: '4px' }}>Interviews</Typography>
          <Typography sx={{ fontSize: 15, color: COLORS.textMuted }}>{interviews.length} completed · {scheduled.length} scheduled</Typography>
        </Box>
        <GradientButton size="md" onClick={() => nav('/interview')}>+ Start Interview</GradientButton>
      </Box>

      {/* Stats */}
      <Box className="fade-up-1" sx={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '13px', mb: '22px' }}>
        {[
          { label: 'Total',      val: all.length,        color: COLORS.indigo },
          { label: 'Completed',  val: interviews.length, color: COLORS.green },
          { label: 'Scheduled',  val: scheduled.length,  color: COLORS.amber },
          { label: 'Avg Score',  val: Math.round(interviews.reduce((a, i) => a + i.score, 0) / interviews.length), color: COLORS.purple },
        ].map(s => (
          <SoftCard key={s.label} sx={{ p: '18px 22px' }}>
            <Typography sx={{ fontSize: 11, fontWeight: 600, color: COLORS.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', mb: '8px' }}>{s.label}</Typography>
            <Typography sx={{ fontSize: 32, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.val}</Typography>
          </SoftCard>
        ))}
      </Box>

      {/* Filter */}
      <Box className="fade-up-2" sx={{ display: 'flex', gap: '8px', mb: '18px' }}>
        {(['All', 'Completed', 'Scheduled'] as const).map(f => (
          <Box key={f} onClick={() => setFilter(f)}
            sx={{ px: '16px', py: '8px', borderRadius: '20px', cursor: 'pointer', fontSize: 13, fontWeight: 600, transition: 'all 0.15s',
              background: filter === f ? alpha(COLORS.indigo, 0.1) : COLORS.white,
              color: filter === f ? COLORS.indigo : COLORS.textMuted,
              border: `1px solid ${filter === f ? alpha(COLORS.indigo, 0.25) : 'rgba(0,0,0,0.07)'}` }}>
            {f}
          </Box>
        ))}
      </Box>

      {/* List */}
      <SoftCard className="fade-up-3" sx={{ overflow: 'hidden' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 1fr 0.5fr', gap: '12px', p: '12px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)', fontSize: 11, fontWeight: 700, color: COLORS.textLight, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {['Candidate', 'Role', 'Date', 'Duration', 'Mode', 'Score', ''].map(h => <Box key={h}>{h}</Box>)}
        </Box>
        {filtered.map((interview, i) => (
          <Box key={interview.id}
            onClick={() => interview.status === 'Completed' ? nav(`/org/candidates/${interview.candidateId}`) : null}
            sx={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 1fr 0.5fr', gap: '12px', p: '14px 24px', borderBottom: i < filtered.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none', alignItems: 'center', cursor: interview.status === 'Completed' ? 'pointer' : 'default', transition: 'background 0.15s', '&:hover': interview.status === 'Completed' ? { background: alpha(COLORS.indigo, 0.025) } : {} }}>
            {/* Candidate */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <Box sx={{ width: 30, height: 30, borderRadius: '50%', background: `hsl(${i * 60 + 180},65%,92%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: `hsl(${i * 60 + 180},55%,40%)`, flexShrink: 0 }}>
                {interview.candidateName[0]}
              </Box>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{interview.candidateName}</Typography>
            </Box>
            <Typography sx={{ fontSize: 13, color: COLORS.textMuted }}>{interview.role}</Typography>
            <Typography sx={{ fontSize: 13, color: COLORS.textMuted, fontFamily: "'DM Mono',monospace" }}>{interview.date}</Typography>
            <Typography sx={{ fontSize: 13, color: COLORS.textMuted }}>{interview.duration}</Typography>
            {/* Mode */}
            <Box sx={{ background: alpha(interview.mode === 'Auto' ? COLORS.indigo : COLORS.purple, 0.08), color: interview.mode === 'Auto' ? COLORS.indigo : COLORS.purple, borderRadius: '20px', px: '10px', py: '3px', fontSize: 11, fontWeight: 700, display: 'inline-block' }}>
              {interview.mode}
            </Box>
            {/* Score */}
            {interview.status === 'Completed' ? <ScoreChip score={interview.score} /> : (
              <Box sx={{ background: alpha(COLORS.amber, 0.1), color: COLORS.amber, borderRadius: '20px', px: '10px', py: '3px', fontSize: 11, fontWeight: 700, display: 'inline-block' }}>
                Scheduled
              </Box>
            )}
            {interview.status === 'Completed' && <Typography sx={{ color: COLORS.textLight, fontSize: 16 }}>→</Typography>}
          </Box>
        ))}
      </SoftCard>
    </SidebarLayout>
  );
};

export default OrgInterviews;
