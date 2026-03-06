import React from 'react';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import SidebarLayout from '../components/SidebarLayout';
import { SoftCard, GradientButton, ScoreChip } from '../components/shared';
import { Icon } from '../components/Icons';
import { COLORS } from '../theme/theme';
import { JOB_ROLES, CANDIDATES, STATUS_COLORS } from '../data/orgData';

const OrgRoleDetail: React.FC = () => {
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();
  const role = JOB_ROLES.find(r => r.id === id) ?? JOB_ROLES[0];
  const roleCandidates = CANDIDATES.filter(c => c.roleId === role.id);

  const statusColor = role.status === 'Active' ? COLORS.green : role.status === 'Paused' ? COLORS.amber : COLORS.textLight;

  return (
    <SidebarLayout
      userLabel="Acme Corp"
      userSub="Business plan"
      userInitial="A"
      navItems={[
        { icon: 'home',      label: 'Overview',   to: '/org' },
        { icon: 'briefcase', label: 'Job Roles',  active: true, to: '/org/roles' },
        { icon: 'users',     label: 'Candidates', to: '/org/candidates' },
        { icon: 'mic',       label: 'Interviews', to: '/org/interviews' },
        { icon: 'chart',     label: 'Analytics',  to: '/org/analytics' },
        { icon: 'settings',  label: 'Settings',   to: '/org/settings' },
      ]}
    >
      {/* Back + Header */}
      <Box className="fade-up" sx={{ mb: '28px' }}>
        <Box component="button" onClick={() => nav('/org/roles')}
          sx={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: COLORS.textMuted, fontFamily: "'DM Sans',sans-serif", display: 'flex', alignItems: 'center', gap: '6px', mb: '14px', p: 0, '&:hover': { color: COLORS.text } }}>
          ← Back to Roles
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Box sx={{ width: 52, height: 52, borderRadius: '15px', background: alpha(COLORS.indigo, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="briefcase" size={22} color={COLORS.indigo} />
            </Box>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', mb: '4px' }}>
                <Typography variant="h4" sx={{ fontSize: 24 }}>{role.title}</Typography>
                <Box sx={{ background: alpha(statusColor, 0.1), color: statusColor, borderRadius: '20px', px: '10px', py: '2px', fontSize: 11, fontWeight: 700 }}>
                  {role.status}
                </Box>
              </Box>
              <Typography sx={{ fontSize: 14, color: COLORS.textMuted }}>
                {role.dept} · {role.location} · {role.type} · Opened {role.openedDate}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <GradientButton size="sm" variant="ghost" onClick={() => nav('/org/interviews')}>
              View Interviews
            </GradientButton>
            <GradientButton size="sm" onClick={() => nav('/interview')}>
              Start Interview
            </GradientButton>
          </Box>
        </Box>
      </Box>

      {/* Stats */}
      <Box className="fade-up-1" sx={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '13px', mb: '22px' }}>
        {[
          { label: 'Candidates',   val: role.candidates,      color: COLORS.indigo },
          { label: 'Avg Score',    val: role.avgScore,        color: COLORS.green },
          { label: 'Interviews',   val: role.interviewCount,  color: COLORS.purple },
          { label: 'Recommended',  val: roleCandidates.filter(c => c.status === 'Recommended').length, color: COLORS.amber },
        ].map(s => (
          <SoftCard key={s.label} sx={{ p: '18px 22px' }}>
            <Typography sx={{ fontSize: 11, fontWeight: 600, color: COLORS.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', mb: '8px' }}>{s.label}</Typography>
            <Typography sx={{ fontSize: 32, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.val}</Typography>
          </SoftCard>
        ))}
      </Box>

      {/* Description + Skills */}
      <Box className="fade-up-2" sx={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '18px', mb: '22px' }}>
        <SoftCard sx={{ p: '26px 28px' }}>
          <Typography variant="h6" sx={{ fontSize: 14, mb: '12px' }}>Role Description</Typography>
          <Typography sx={{ fontSize: 14, lineHeight: 1.7, color: COLORS.textMuted, mb: '20px' }}>{role.description}</Typography>
          <Typography variant="h6" sx={{ fontSize: 13, mb: '10px', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Required Skills</Typography>
          <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {role.skills.map(s => (
              <Box key={s} sx={{ background: alpha(COLORS.indigo, 0.08), color: COLORS.indigo, borderRadius: '20px', px: '12px', py: '5px', fontSize: 13, fontWeight: 600 }}>{s}</Box>
            ))}
          </Box>
        </SoftCard>

        {/* Quick actions */}
        <SoftCard sx={{ p: '26px 28px' }}>
          <Typography variant="h6" sx={{ fontSize: 14, mb: '16px' }}>Quick Actions</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <GradientButton fullWidth onClick={() => nav('/interview')}>Start New Interview</GradientButton>
            <GradientButton fullWidth variant="ghost" onClick={() => nav('/org/candidates')}>View All Candidates</GradientButton>
            <GradientButton fullWidth variant="ghost" onClick={() => {}}>Edit Role Details</GradientButton>
            {role.status === 'Active'
              ? <GradientButton fullWidth variant="ghost" onClick={() => {}}>Pause Role</GradientButton>
              : <GradientButton fullWidth variant="ghost" onClick={() => {}}>Reactivate Role</GradientButton>
            }
          </Box>
        </SoftCard>
      </Box>

      {/* Candidates for this role */}
      <Box className="fade-up-3">
        <Typography variant="h6" sx={{ fontSize: 15, mb: '14px' }}>
          Candidates for {role.title}
          <Box component="span" sx={{ ml: '8px', fontSize: 13, fontWeight: 500, color: COLORS.textMuted }}>({roleCandidates.length})</Box>
        </Typography>

        {roleCandidates.length === 0 ? (
          <SoftCard sx={{ p: '48px', textAlign: 'center' }}>
            <Typography sx={{ color: COLORS.textMuted }}>No candidates yet. Start an interview to begin screening.</Typography>
            <Box sx={{ mt: '16px' }}>
              <GradientButton size="sm" onClick={() => nav('/interview')}>Start Interview</GradientButton>
            </Box>
          </SoftCard>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {roleCandidates.map((c, i) => (
              <SoftCard key={c.id} sx={{ p: '18px 24px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px' }} onClick={() => nav(`/org/candidates/${c.id}`)}>
                <Box sx={{ width: 38, height: 38, borderRadius: '50%', background: `hsl(${i * 90 + 200},70%,92%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: `hsl(${i * 90 + 200},60%,40%)`, flexShrink: 0 }}>
                  {c.name[0]}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: 14, mb: '2px' }}>{c.name}</Typography>
                  <Typography sx={{ fontSize: 12, color: COLORS.textMuted }}>{c.location} · {c.experience} exp · {c.date}</Typography>
                </Box>
                <Box sx={{ background: alpha(STATUS_COLORS[c.status], 0.1), color: STATUS_COLORS[c.status], borderRadius: '20px', px: '12px', py: '3px', fontSize: 12, fontWeight: 700 }}>
                  {c.status}
                </Box>
                <ScoreChip score={c.score} />
                <Typography sx={{ color: COLORS.textLight, fontSize: 16 }}>→</Typography>
              </SoftCard>
            ))}
          </Box>
        )}
      </Box>
    </SidebarLayout>
  );
};

export default OrgRoleDetail;
