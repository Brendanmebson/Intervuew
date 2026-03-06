import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import SidebarLayout from '../components/SidebarLayout';
import { SoftCard, ScoreChip, GradientButton } from '../components/shared';
import { Icon } from '../components/Icons';
import { COLORS } from '../theme/theme';
import { ALL_SESSIONS } from '../data/sessions';

type FilterMode = 'All' | 'Auto' | 'Manual';
type SortBy = 'date' | 'score';

const History: React.FC = () => {
  const nav = useNavigate();
  const [filter, setFilter] = useState<FilterMode>('All');
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [search, setSearch] = useState('');

  const filtered = ALL_SESSIONS
    .filter(s => filter === 'All' || s.mode === filter)
    .filter(s => s.role.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortBy === 'score' ? b.score - a.score : 0); // date order is default array order

  const bestScore = Math.max(...ALL_SESSIONS.map(s => s.score));
  const avgScore  = Math.round(ALL_SESSIONS.reduce((a, s) => a + s.score, 0) / ALL_SESSIONS.length);

  return (
    <SidebarLayout
      userLabel="Alex Johnson"
      userSub="Free plan"
      userInitial="A"
      navItems={[
        { icon: 'home',     label: 'Dashboard',      to: '/dashboard' },
        { icon: 'mic',      label: 'Start Interview', to: '/interview' },
        { icon: 'clock',    label: 'History',         active: true },
        { icon: 'chart',    label: 'Reports',         to: '/reports' },
        { icon: 'settings', label: 'Settings',        to: '/settings' },
      ]}
    >
      {/* Header */}
      <Box className="fade-up" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: '28px' }}>
        <Box>
          <Typography variant="h4" sx={{ fontSize: 25, mb: '4px' }}>Session History</Typography>
          <Typography sx={{ fontSize: 15, color: COLORS.textMuted }}>
            {ALL_SESSIONS.length} sessions completed
          </Typography>
        </Box>
        <GradientButton size="sm" to="/interview">+ New Session</GradientButton>
      </Box>

      {/* Summary stats */}
      <Box className="fade-up-1" sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', mb: '24px' }}>
        {[
          { label: 'Total Sessions', val: ALL_SESSIONS.length, color: COLORS.indigo },
          { label: 'Average Score',  val: avgScore,            color: COLORS.green },
          { label: 'Best Score',     val: bestScore,           color: COLORS.amber },
        ].map(s => (
          <SoftCard key={s.label} sx={{ p: '22px 24px' }}>
            <Typography sx={{ fontSize: 11, fontWeight: 600, color: COLORS.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', mb: '8px' }}>
              {s.label}
            </Typography>
            <Typography sx={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.04em', color: s.color, lineHeight: 1 }}>
              {s.val}
            </Typography>
          </SoftCard>
        ))}
      </Box>

      {/* Filters + Search */}
      <Box className="fade-up-2" sx={{ display: 'flex', gap: '12px', alignItems: 'center', mb: '18px', flexWrap: 'wrap' }}>
        {/* Search */}
        <Box sx={{ flex: 1, minWidth: 200, position: 'relative' }}>
          <Box sx={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <Icon name="search" size={14} color={COLORS.textLight} />
          </Box>
          <Box
            component="input"
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            placeholder="Search by role..."
            sx={{
              width: '100%', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px',
              padding: '10px 14px 10px 36px', fontSize: 14, fontFamily: "'DM Sans',sans-serif",
              background: COLORS.white, color: COLORS.text, outline: 'none',
              '&:focus': { borderColor: COLORS.indigo },
            }}
          />
        </Box>

        {/* Mode filter */}
        <Box sx={{ display: 'flex', background: COLORS.white, borderRadius: '12px', border: '1px solid rgba(0,0,0,0.07)', overflow: 'hidden' }}>
          {(['All', 'Auto', 'Manual'] as FilterMode[]).map(f => (
            <Box
              key={f}
              onClick={() => setFilter(f)}
              sx={{
                px: '16px', py: '10px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                background: filter === f ? alpha(COLORS.indigo, 0.1) : 'transparent',
                color: filter === f ? COLORS.indigo : COLORS.textMuted,
                transition: 'all 0.15s',
                '&:hover': { color: COLORS.indigo },
              }}
            >
              {f}
            </Box>
          ))}
        </Box>

        {/* Sort */}
        <Box sx={{ display: 'flex', background: COLORS.white, borderRadius: '12px', border: '1px solid rgba(0,0,0,0.07)', overflow: 'hidden' }}>
          {([['date', 'Recent'], ['score', 'Score']] as [SortBy, string][]).map(([val, label]) => (
            <Box
              key={val}
              onClick={() => setSortBy(val)}
              sx={{
                px: '14px', py: '10px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                background: sortBy === val ? alpha(COLORS.indigo, 0.1) : 'transparent',
                color: sortBy === val ? COLORS.indigo : COLORS.textMuted,
                transition: 'all 0.15s',
              }}
            >
              {label}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Session list */}
      <Box className="fade-up-3" sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.length === 0 ? (
          <SoftCard sx={{ p: '48px', textAlign: 'center' }}>
            <Typography sx={{ color: COLORS.textMuted, fontSize: 15 }}>No sessions match your search.</Typography>
          </SoftCard>
        ) : (
          filtered.map(s => (
            <SoftCard
              key={s.id}
              sx={{ p: '20px 24px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px' }}
              onClick={() => nav(`/report/${s.id}`)}
            >
              {/* Icon */}
              <Box sx={{ width: 42, height: 42, borderRadius: '13px', background: alpha(COLORS.indigo, 0.08), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="briefcase" size={18} color={COLORS.indigo} />
              </Box>

              {/* Info */}
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 600, fontSize: 15, mb: '3px' }}>{s.role}</Typography>
                <Typography sx={{ fontSize: 12, color: COLORS.textMuted }}>
                  {s.date} · {s.duration} · {s.mode} mode
                </Typography>
              </Box>

              {/* Questions count */}
              <Box sx={{ textAlign: 'center', minWidth: 60 }}>
                <Typography sx={{ fontSize: 18, fontWeight: 700, color: COLORS.text }}>
                  {s.questions?.length ?? 0}
                </Typography>
                <Typography sx={{ fontSize: 11, color: COLORS.textMuted }}>questions</Typography>
              </Box>

              {/* Score */}
              <ScoreChip score={s.score} />

              {/* Arrow */}
              <Box sx={{ color: COLORS.textLight, fontSize: 18, ml: '4px' }}>→</Box>
            </SoftCard>
          ))
        )}
      </Box>
    </SidebarLayout>
  );
};

export default History;