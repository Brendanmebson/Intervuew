import React from 'react';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import SidebarLayout from '../components/SidebarLayout';
import { SoftCard, GradientButton } from '../components/shared';
import { Icon } from '../components/Icons';
import { COLORS } from '../theme/theme';
import { Candidate, CandidateStatus } from '../types';

const candidates: Candidate[] = [
  { id: '1', name: 'Sarah Chen',   role: 'Product Manager', date: 'Mar 1',  score: 91, status: 'Recommended' },
  { id: '2', name: 'Marcus Lee',   role: 'Senior Engineer', date: 'Feb 28', score: 84, status: 'Review' },
  { id: '3', name: 'Priya Sharma', role: 'UX Designer',     date: 'Feb 27', score: 77, status: 'Pending' },
  { id: '4', name: 'Tom Williams', role: 'Product Manager', date: 'Feb 26', score: 68, status: 'Declined' },
];
const statusColors: Record<CandidateStatus, string> = { Recommended: '#10B981', Review: '#F59E0B', Pending: '#6B7280', Declined: '#EF4444' };

const OrgDash: React.FC = () => {
  const nav = useNavigate();
  return (
    <SidebarLayout userLabel="Acme Corp" userSub="Business plan" userInitial="A" navItems={[
      { icon: 'home',      label: 'Overview',    active: true },
      { icon: 'briefcase', label: 'Job Roles' },
      { icon: 'users',     label: 'Candidates' },
      { icon: 'mic',       label: 'Interviews',  to: '/interview' },
      { icon: 'chart',     label: 'Analytics' },
      { icon: 'settings',  label: 'Settings' },
    ]}>
      <Box className="fade-up" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: '32px' }}>
        <Box>
          <Typography variant="h4" sx={{ fontSize: 25, mb: '4px' }}>Organization Dashboard</Typography>
          <Typography sx={{ fontSize: 15, color: COLORS.textMuted }}>Manage interviews, candidates, and analytics.</Typography>
        </Box>
        <GradientButton size="md">+ Create Job Role</GradientButton>
      </Box>
      <Box className="fade-up-1" sx={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '13px', mb: '22px' }}>
        {[
          { label: 'Active Roles', val: '7',  color: COLORS.indigo },
          { label: 'Candidates',   val: '43', color: COLORS.purple },
          { label: 'This Week',    val: '18', color: COLORS.green },
          { label: 'Avg. Score',   val: '81', color: COLORS.amber },
        ].map(c => (
          <SoftCard key={c.label} sx={{ p: '20px 22px' }}>
            <Typography sx={{ fontSize: 11, fontWeight: 600, color: COLORS.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', mb: '9px' }}>{c.label}</Typography>
            <Typography sx={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.04em', color: c.color, lineHeight: 1 }}>{c.val}</Typography>
          </SoftCard>
        ))}
      </Box>
      <SoftCard className="fade-up-2" sx={{ p: '26px', overflow: 'hidden', mb: '22px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '20px' }}>
          <Typography variant="h6" sx={{ fontSize: 15 }}>Recent Candidates</Typography>
          <Typography sx={{ fontSize: 13, color: COLORS.indigo, cursor: 'pointer', fontWeight: 600 }}>View all →</Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1.3fr', gap: '12px', pb: '11px', borderBottom: '1px solid rgba(0,0,0,0.06)', fontSize: 11, fontWeight: 700, color: COLORS.textLight, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {['Candidate','Role','Date','Score','Status'].map(h => <Box key={h}>{h}</Box>)}
        </Box>
        {candidates.map((c, i) => (
          <Box key={c.id} onClick={() => nav('/report')} sx={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1.3fr', gap: '12px', py: '13px', borderBottom: i < candidates.length-1 ? '1px solid rgba(0,0,0,0.04)' : 'none', alignItems: 'center', cursor: 'pointer', borderRadius: '8px', transition: 'background 0.15s ease', '&:hover': { background: alpha(COLORS.indigo, 0.03) } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <Box sx={{ width: 30, height: 30, borderRadius: '50%', background: `hsl(${i*70+200},70%,92%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: `hsl(${i*70+200},60%,40%)`, flexShrink: 0 }}>{c.name[0]}</Box>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{c.name}</Typography>
            </Box>
            <Typography sx={{ fontSize: 13, color: COLORS.textMuted }}>{c.role}</Typography>
            <Typography sx={{ fontSize: 13, color: COLORS.textMuted, fontFamily: "'DM Mono',monospace" }}>{c.date}</Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 700, fontFamily: "'DM Mono',monospace" }}>{c.score}</Typography>
            <Box sx={{ background: alpha(statusColors[c.status], 0.1), color: statusColors[c.status], borderRadius: '20px', px: '12px', py: '3px', fontSize: 12, fontWeight: 700, display: 'inline-block' }}>{c.status}</Box>
          </Box>
        ))}
      </SoftCard>
      <Box className="fade-up-3">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '14px' }}>
          <Typography variant="h6" sx={{ fontSize: 15 }}>Active Job Roles</Typography>
          <Typography sx={{ fontSize: 13, color: COLORS.indigo, cursor: 'pointer', fontWeight: 600 }}>Manage →</Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '13px' }}>
          {[
            { title: 'Product Manager', dept: 'Product',     candidates: 12, avgScore: 83 },
            { title: 'Senior Engineer', dept: 'Engineering', candidates: 18, avgScore: 79 },
            { title: 'UX Designer',     dept: 'Design',      candidates: 7,  avgScore: 88 },
          ].map((r, i) => (
            <SoftCard key={i} sx={{ p: '20px 22px', cursor: 'pointer' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', mb: '12px' }}>
                <Box sx={{ width: 36, height: 36, borderRadius: '11px', background: alpha(COLORS.indigo, 0.08), display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="briefcase" size={15} color={COLORS.indigo} /></Box>
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
