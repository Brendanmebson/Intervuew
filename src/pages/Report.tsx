import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '../components/Icons';
import { SoftCard, GradientButton, ScoreRing, CategoryBar, ScoreChip } from '../components/shared';
import { COLORS } from '../theme/theme';
import { ALL_SESSIONS, BREAKDOWN_BY_SESSION } from '../data/sessions';

const Report: React.FC = () => {
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnim(true), 300);
    return () => clearTimeout(t);
  }, [id]);

  // Reset animation when session changes
  useEffect(() => { setAnim(false); }, [id]);

  const session = ALL_SESSIONS.find(s => s.id === id) ?? ALL_SESSIONS[0];
  const breakdown = BREAKDOWN_BY_SESSION[session.id] ?? BREAKDOWN_BY_SESSION['1'];

  const strengths =
    session.score >= 88
      ? ['Excellent articulation of complex concepts', 'Strong narrative with measurable outcomes', 'Confident delivery with minimal filler words']
      : session.score >= 80
      ? ['Clear communication throughout', 'Good use of the STAR method', 'Demonstrated relevant experience']
      : ['Showed genuine enthusiasm for the role', 'Honest and reflective in responses', 'Adequate foundational knowledge'];

  const improvements =
    session.score >= 88
      ? ['Expand on stakeholder management examples', 'Provide more quantified metrics', 'Work on conciseness — some answers ran long']
      : session.score >= 80
      ? ['Add more specific data and numbers', 'Practice tighter answer structure', 'Include more cross-functional examples']
      : ['Strengthen examples with concrete outcomes', 'Work on structured response frameworks', 'Research industry benchmarks more deeply'];

  return (
    <Box sx={{ minHeight: '100vh', background: COLORS.bg, p: '32px 44px', maxWidth: 980, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '34px' }}>
        <Box>
          <Box
            component="button"
            onClick={() => nav(-1 as any)}
            sx={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: COLORS.textMuted, fontFamily: "'DM Sans',sans-serif", display: 'flex', alignItems: 'center', gap: '6px', mb: '8px', p: 0, '&:hover': { color: COLORS.text } }}
          >
            ← Back
          </Box>
          <Typography variant="h4" sx={{ fontSize: 25, mb: '4px' }}>Interview Report</Typography>
          <Typography sx={{ fontSize: 14, color: COLORS.textMuted }}>
            {session.role} · {session.date} · {session.duration}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* Session switcher */}
          <Box sx={{ display: 'flex', gap: '6px' }}>
            {ALL_SESSIONS.map(s => (
              <Box
                key={s.id}
                onClick={() => nav(`/report/${s.id}`)}
                sx={{
                  width: 32, height: 32, borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  background: s.id === session.id ? alpha(COLORS.indigo, 0.12) : 'transparent',
                  color: s.id === session.id ? COLORS.indigo : COLORS.textMuted,
                  border: s.id === session.id ? `1px solid ${alpha(COLORS.indigo, 0.25)}` : '1px solid transparent',
                  '&:hover': { background: alpha(COLORS.indigo, 0.07) },
                  transition: 'all 0.15s',
                }}
              >
                {s.id}
              </Box>
            ))}
          </Box>
          <GradientButton size="md" startIcon={<Icon name="download" size={14} color="white" />}>
            Download PDF
          </GradientButton>
        </Box>
      </Box>

      {/* Score + Breakdown */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '18px', mb: '18px' }}>
        <SoftCard sx={{ p: '34px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 210 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, letterSpacing: '0.07em', textTransform: 'uppercase', mb: '18px' }}>
            Overall Score
          </Typography>
          <ScoreRing score={session.score} animated={anim} />
          <Box sx={{
            mt: '14px', borderRadius: '20px', px: '14px', py: '5px', fontSize: 13, fontWeight: 700,
            background: alpha(session.score >= 88 ? COLORS.green : session.score >= 78 ? COLORS.amber : COLORS.red, 0.1),
            color: session.score >= 88 ? COLORS.green : session.score >= 78 ? COLORS.amber : COLORS.red,
          }}>
            {session.score >= 88 ? 'Excellent' : session.score >= 78 ? 'Good' : 'Needs Work'}
          </Box>
        </SoftCard>

        <SoftCard sx={{ p: '30px 34px' }}>
          <Typography variant="h6" sx={{ fontSize: 15, mb: '22px' }}>Category Breakdown</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '17px' }}>
            {breakdown.map((b, i) => (
              <CategoryBar key={i} label={b.label} score={b.score} color={b.color} animated={anim} delay={i * 0.1} />
            ))}
          </Box>
        </SoftCard>
      </Box>

      {/* Strengths + Improvements */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', mb: '18px' }}>
        {[
          { title: '💪 Strengths',      color: COLORS.green, bg: alpha(COLORS.green, 0.04), border: alpha(COLORS.green, 0.12), items: strengths },
          { title: '🎯 Areas to Improve', color: COLORS.amber, bg: alpha(COLORS.amber, 0.04), border: alpha(COLORS.amber, 0.12), items: improvements },
        ].map(s => (
          <SoftCard key={s.title} sx={{ p: '26px', background: s.bg, border: `1px solid ${s.border}` }}>
            <Typography variant="h6" sx={{ fontSize: 15, mb: '14px' }}>{s.title}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              {s.items.map((item, i) => (
                <Box key={i} sx={{ display: 'flex', gap: '9px', alignItems: 'flex-start' }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: s.color, mt: '6px', flexShrink: 0 }} />
                  <Typography sx={{ fontSize: 13, lineHeight: 1.6, color: COLORS.textMuted }}>{item}</Typography>
                </Box>
              ))}
            </Box>
          </SoftCard>
        ))}
      </Box>

      {/* Per-question breakdown */}
      <SoftCard sx={{ p: '28px 32px' }}>
        <Typography variant="h6" sx={{ fontSize: 15, mb: '20px' }}>Per-Question Breakdown</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {(session.questions ?? []).map((item, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex', gap: '16px', alignItems: 'flex-start', p: '16px',
                borderRadius: '14px', background: alpha(COLORS.indigo, 0.03),
                border: `1px solid ${alpha(COLORS.indigo, 0.06)}`,
              }}
            >
              <Box sx={{ width: 28, height: 28, borderRadius: '8px', background: alpha(COLORS.indigo, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: COLORS.indigo, flexShrink: 0 }}>
                {i + 1}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 600, mb: '4px' }}>{item.q}</Typography>
                <Typography sx={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.5 }}>{item.feedback}</Typography>
              </Box>
              <ScoreChip score={item.score} />
            </Box>
          ))}
        </Box>
      </SoftCard>
    </Box>
  );
};

export default Report;