import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import SidebarLayout from '../components/SidebarLayout';
import { SoftCard, CategoryBar } from '../components/shared';
import { COLORS } from '../theme/theme';
import { CANDIDATES, JOB_ROLES, STATUS_COLORS, CandidateStatus } from '../data/orgData';

const OrgAnalytics: React.FC = () => {
  const nav = useNavigate();
  const [anim, setAnim] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnim(true), 300); return () => clearTimeout(t); }, []);

  const totalCandidates = CANDIDATES.length;
  const avgScore = Math.round(CANDIDATES.reduce((a, c) => a + c.score, 0) / totalCandidates);
  const recommended = CANDIDATES.filter(c => c.status === 'Recommended').length;
  const conversionRate = Math.round((recommended / totalCandidates) * 100);

  // Score distribution buckets
  const buckets = [
    { label: '90–100', count: CANDIDATES.filter(c => c.score >= 90).length,             color: COLORS.green },
    { label: '80–89',  count: CANDIDATES.filter(c => c.score >= 80 && c.score < 90).length, color: COLORS.indigo },
    { label: '70–79',  count: CANDIDATES.filter(c => c.score >= 70 && c.score < 80).length, color: COLORS.amber },
    { label: '60–69',  count: CANDIDATES.filter(c => c.score < 70).length,              color: COLORS.red },
  ];
  const maxBucket = Math.max(...buckets.map(b => b.count));

  // Per-role analytics
  const roleStats = JOB_ROLES.map(r => {
    const roleCandidates = CANDIDATES.filter(c => c.roleId === r.id);
    return { ...r, total: roleCandidates.length, avg: r.avgScore };
  });

  // Status funnel
  const funnel: { label: CandidateStatus; val: number }[] = [
    { label: 'Pending',     val: CANDIDATES.filter(c => c.status === 'Pending').length },
    { label: 'Review',      val: CANDIDATES.filter(c => c.status === 'Review').length },
    { label: 'Recommended', val: CANDIDATES.filter(c => c.status === 'Recommended').length },
    { label: 'Declined',    val: CANDIDATES.filter(c => c.status === 'Declined').length },
  ];

  // Aggregate skill scores across all candidates
  const skillTotals: Record<string, number[]> = {};
  CANDIDATES.forEach(c => {
    c.breakdown.forEach(b => {
      if (!skillTotals[b.label]) skillTotals[b.label] = [];
      skillTotals[b.label].push(b.score);
    });
  });
  const topSkills = Object.entries(skillTotals)
    .map(([label, scores]) => ({ label, score: Math.round(scores.reduce((a, v) => a + v, 0) / scores.length) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  const skillColors = [COLORS.indigo, COLORS.green, COLORS.lavender, COLORS.amber, COLORS.pink];

  return (
    <SidebarLayout
      userLabel="Acme Corp"
      userSub="Business plan"
      userInitial="A"
      navItems={[
        { icon: 'home',      label: 'Overview',   to: '/org' },
        { icon: 'briefcase', label: 'Job Roles',  to: '/org/roles' },
        { icon: 'users',     label: 'Candidates', to: '/org/candidates' },
        { icon: 'mic',       label: 'Interviews', to: '/org/interviews' },
        { icon: 'chart',     label: 'Analytics',  active: true, to: '/org/analytics' },
        { icon: 'settings',  label: 'Settings',   to: '/org/settings' },
      ]}
    >
      <Box className="fade-up" sx={{ mb: '28px' }}>
        <Typography variant="h4" sx={{ fontSize: 25, mb: '4px' }}>Analytics</Typography>
        <Typography sx={{ fontSize: 15, color: COLORS.textMuted }}>Performance insights across all roles and candidates.</Typography>
      </Box>

      {/* Top KPIs */}
      <Box className="fade-up-1" sx={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '13px', mb: '22px' }}>
        {[
          { label: 'Total Interviewed',  val: totalCandidates,     unit: '',  color: COLORS.indigo, sub: 'all time' },
          { label: 'Average Score',      val: avgScore,             unit: '',  color: COLORS.green,  sub: 'across all roles' },
          { label: 'Recommended',        val: recommended,          unit: '',  color: COLORS.amber,  sub: 'candidates' },
          { label: 'Conversion Rate',    val: conversionRate,       unit: '%', color: COLORS.purple, sub: 'to recommended' },
        ].map(s => (
          <SoftCard key={s.label} sx={{ p: '20px 22px' }}>
            <Typography sx={{ fontSize: 11, fontWeight: 600, color: COLORS.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', mb: '8px' }}>{s.label}</Typography>
            <Typography sx={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.04em', color: s.color, lineHeight: 1, mb: '4px' }}>{s.val}{s.unit}</Typography>
            <Typography sx={{ fontSize: 12, color: COLORS.textMuted }}>{s.sub}</Typography>
          </SoftCard>
        ))}
      </Box>

      {/* Score distribution + Status funnel */}
      <Box className="fade-up-2" sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', mb: '18px' }}>
        {/* Score distribution */}
        <SoftCard sx={{ p: '26px 28px' }}>
          <Typography variant="h6" sx={{ fontSize: 15, mb: '20px' }}>Score Distribution</Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: 100, mb: '10px' }}>
            {buckets.map((b, i) => {
              const h = anim ? (b.count / (maxBucket || 1)) * 90 : 4;
              return (
                <Box key={b.label} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: b.color }}>{b.count}</Typography>
                  <Box sx={{ width: '100%', height: h, borderRadius: '6px 6px 4px 4px', background: `linear-gradient(180deg,${b.color},${alpha(b.color, 0.5)})`, transition: `height 0.8s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s` }} />
                  <Typography sx={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "'DM Mono',monospace" }}>{b.label}</Typography>
                </Box>
              );
            })}
          </Box>
        </SoftCard>

        {/* Candidate status funnel */}
        <SoftCard sx={{ p: '26px 28px' }}>
          <Typography variant="h6" sx={{ fontSize: 15, mb: '20px' }}>Candidate Funnel</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {funnel.map(f => (
              <Box key={f.label}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '5px' }}>
                  <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{f.label}</Typography>
                  <Typography sx={{ fontSize: 13, fontWeight: 700, color: STATUS_COLORS[f.label], fontFamily: "'DM Mono',monospace" }}>{f.val}</Typography>
                </Box>
                <Box sx={{ height: 7, borderRadius: 4, background: '#F3F4F6', overflow: 'hidden' }}>
                  <Box sx={{ width: anim ? `${(f.val / totalCandidates) * 100}%` : '0%', height: '100%', borderRadius: 4, background: STATUS_COLORS[f.label], transition: 'width 1s cubic-bezier(0.4,0,0.2,1)' }} />
                </Box>
              </Box>
            ))}
          </Box>
        </SoftCard>
      </Box>

      {/* Role performance + Top skills */}
      <Box className="fade-up-3" sx={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '18px' }}>
        {/* Role performance */}
        <SoftCard sx={{ p: '26px 28px' }}>
          <Typography variant="h6" sx={{ fontSize: 15, mb: '18px' }}>Performance by Role</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {roleStats.filter(r => r.total > 0).map((r, i, arr) => (
              <Box key={r.id} onClick={() => nav(`/org/roles/${r.id}`)}
                sx={{ display: 'flex', alignItems: 'center', gap: '14px', py: '13px', borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none', cursor: 'pointer', '&:hover': { background: alpha(COLORS.indigo, 0.02) }, borderRadius: '8px', px: '4px' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 600, mb: '2px' }}>{r.title}</Typography>
                  <Typography sx={{ fontSize: 12, color: COLORS.textMuted }}>{r.total} candidates · {r.dept}</Typography>
                </Box>
                {/* Mini bar */}
                <Box sx={{ width: 80 }}>
                  <Box sx={{ height: 5, borderRadius: 3, background: '#F3F4F6', overflow: 'hidden' }}>
                    <Box sx={{ width: anim ? `${r.avg}%` : '0%', height: '100%', borderRadius: 3, background: r.avg >= 85 ? COLORS.green : r.avg >= 75 ? COLORS.indigo : COLORS.amber, transition: `width 1s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s` }} />
                  </Box>
                </Box>
                <Typography sx={{ fontSize: 16, fontWeight: 700, color: r.avg >= 85 ? COLORS.green : r.avg >= 75 ? COLORS.indigo : COLORS.amber, minWidth: 28, textAlign: 'right', fontFamily: "'DM Mono',monospace" }}>
                  {r.avg}
                </Typography>
              </Box>
            ))}
          </Box>
        </SoftCard>

        {/* Top skills across all candidates */}
        <SoftCard sx={{ p: '26px 28px' }}>
          <Typography variant="h6" sx={{ fontSize: 15, mb: '20px' }}>Top Skill Scores</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {topSkills.map((s, i) => (
              <CategoryBar key={s.label} label={s.label} score={s.score} color={skillColors[i]} animated={anim} delay={i * 0.1} />
            ))}
          </Box>
        </SoftCard>
      </Box>
    </SidebarLayout>
  );
};

export default OrgAnalytics;
