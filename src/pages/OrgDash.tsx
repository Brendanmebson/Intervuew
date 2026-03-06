import React from 'react';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import SidebarLayout from '../components/SidebarLayout';
import { SoftCard, GradientButton } from '../components/shared';
import { Icon } from '../components/Icons';
import { COLORS } from '../theme/theme';
import { CANDIDATES, JOB_ROLES, STATUS_COLORS } from '../data/orgData';

const OrgDash: React.FC = () => {
  const nav = useNavigate();

  const recentCandidates = CANDIDATES.slice(0, 4);
  const activeRoles = JOB_ROLES.filter(r => r.status === 'Active');
  const totalCandidates = CANDIDATES.length;
  const avgScore = Math.round(CANDIDATES.reduce((a, c) => a + c.score, 0) / CANDIDATES.length);
  const thisWeek = CANDIDATES.filter(c => c.date.includes('Mar') || c.date.includes('Feb 2')).length;

  return (
    <SidebarLayout
      userLabel="Acme Corp"
      userSub="Business plan"
      userInitial="A"
      navItems={[
        { icon: 'home',      label: 'Overview',    active: true,              to: '/org' },
        { icon: 'briefcase', label: 'Job Roles',                              to: '/org/roles' },
        { icon: 'users',     label: 'Candidates',                             to: '/org/candidates' },
        { icon: 'mic',       label: 'Interviews',                             to: '/org/interviews' },
        { icon: 'chart',     label: 'Analytics',                              to: '/org/analytics' },
        { icon: 'settings',  label: 'Settings',                               to: '/org/settings' },
      ]}
    >
      {/* Header */}
      <Box className="fade-up" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: '32px' }}>
        <Box>
          <Typography variant="h4" sx={{ fontSize: 25, mb: '4px' }}>Organization Dashboard</Typography>
          <Typography sx={{ fontSize: 15, color: COLORS.textMuted }}>Manage interviews, candidates, and analytics.</Typography>
        </Box>
        <GradientButton size="md" onClick={() => nav('/org/roles/new')}>+ Create Job Role</GradientButton>
      </Box>

      {/* Stats */}
      <Box className="fade-up-1" sx={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '13px', mb: '22px' }}>
        {[
          { label: 'Active Roles', val: activeRoles.length, color: COLORS.indigo,  to: '/org/roles' },
          { label: 'Candidates',   val: totalCandidates,    color: COLORS.purple,  to: '/org/candidates' },
          { label: 'This Week',    val: thisWeek,           color: COLORS.green,   to: '/org/interviews' },
          { label: 'Avg. Score',   val: avgScore,           color: COLORS.amber,   to: '/org/analytics' },
        ].map(c => (
          <SoftCard
            key={c.label}
            sx={{ p: '20px 22px', cursor: 'pointer' }}
            onClick={() => nav(c.to)}
          >
            <Typography sx={{ fontSize: 11, fontWeight: 600, color: COLORS.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', mb: '9px' }}>
              {c.label}
            </Typography>
            <Typography sx={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.04em', color: c.color, lineHeight: 1 }}>
              {c.val}
            </Typography>
          </SoftCard>
        ))}
      </Box>

      {/* Recent candidates table */}
      <SoftCard className="fade-up-2" sx={{ p: '26px', overflow: 'hidden', mb: '22px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '20px' }}>
          <Typography variant="h6" sx={{ fontSize: 15 }}>Recent Candidates</Typography>
          <Typography
            onClick={() => nav('/org/candidates')}
            sx={{ fontSize: 13, color: COLORS.indigo, cursor: 'pointer', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}
          >
            View all →
          </Typography>
        </Box>

        {/* Table header */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1.3fr', gap: '12px', pb: '11px', borderBottom: '1px solid rgba(0,0,0,0.06)', fontSize: 11, fontWeight: 700, color: COLORS.textLight, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {['Candidate', 'Role', 'Date', 'Score', 'Status'].map(h => <Box key={h}>{h}</Box>)}
        </Box>

        {recentCandidates.map((c, i) => (
          <Box
            key={c.id}
            onClick={() => nav(`/org/candidates/${c.id}`)}
            sx={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1.3fr', gap: '12px', py: '13px', borderBottom: i < recentCandidates.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none', alignItems: 'center', cursor: 'pointer', borderRadius: '8px', transition: 'background 0.15s', '&:hover': { background: alpha(COLORS.indigo, 0.03) } }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <Box sx={{ width: 30, height: 30, borderRadius: '50%', background: `hsl(${i * 70 + 200},70%,92%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: `hsl(${i * 70 + 200},60%,40%)`, flexShrink: 0 }}>
                {c.name[0]}
              </Box>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{c.name}</Typography>
            </Box>
            <Typography sx={{ fontSize: 13, color: COLORS.textMuted }}>{c.role}</Typography>
            <Typography sx={{ fontSize: 13, color: COLORS.textMuted, fontFamily: "'DM Mono',monospace" }}>{c.date}</Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 700, fontFamily: "'DM Mono',monospace" }}>{c.score}</Typography>
            <Box sx={{ background: alpha(STATUS_COLORS[c.status], 0.1), color: STATUS_COLORS[c.status], borderRadius: '20px', px: '12px', py: '3px', fontSize: 12, fontWeight: 700, display: 'inline-block' }}>
              {c.status}
            </Box>
          </Box>
        ))}
      </SoftCard>

      {/* Active job roles */}
      <Box className="fade-up-3">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '14px' }}>
          <Typography variant="h6" sx={{ fontSize: 15 }}>Active Job Roles</Typography>
          <Typography
            onClick={() => nav('/org/roles')}
            sx={{ fontSize: 13, color: COLORS.indigo, cursor: 'pointer', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}
          >
            Manage →
          </Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '13px' }}>
          {activeRoles.slice(0, 3).map((r) => (
            <SoftCard
              key={r.id}
              sx={{ p: '20px 22px', cursor: 'pointer' }}
              onClick={() => nav(`/org/roles/${r.id}`)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', mb: '12px' }}>
                <Box sx={{ width: 36, height: 36, borderRadius: '11px', background: alpha(COLORS.indigo, 0.08), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="briefcase" size={15} color={COLORS.indigo} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{r.title}</Typography>
                  <Typography sx={{ fontSize: 12, color: COLORS.textMuted }}>{r.dept}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography sx={{ fontSize: 11, fontWeight: 600, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', mb: '2px' }}>Candidates</Typography>
                  <Typography sx={{ fontSize: 20, fontWeight: 700, color: COLORS.indigo }}>{r.candidates}</Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography sx={{ fontSize: 11, fontWeight: 600, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', mb: '2px' }}>Avg Score</Typography>
                  <Typography sx={{ fontSize: 20, fontWeight: 700, color: COLORS.green }}>{r.avgScore}</Typography>
                </Box>
              </Box>
            </SoftCard>
          ))}
        </Box>
      </Box>
    </SidebarLayout>
  );
};

export default OrgDash;
