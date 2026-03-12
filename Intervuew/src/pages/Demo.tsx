import React, { useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Icon } from '../components/Icons';
import { SoftCard, GradientButton, OrbBackground, SectionLabel } from '../components/shared';
import { COLORS, RADIUS } from '../theme/theme';

const inputSx = { '& .MuiOutlinedInput-root': { background: '#FAFAFA', borderRadius: RADIUS.input, fontSize: 14 }, '& .MuiInputLabel-root': { fontSize: 14, fontFamily: "'DM Sans',sans-serif" } };

const highlights = [
  { icon: 'zap',   title: 'See the AI in action',    desc: 'Watch a live interview from start to finish.' },
  { icon: 'chart', title: 'Explore the dashboard',   desc: 'We walk you through analytics and reports.' },
  { icon: 'users', title: 'Team setup walkthrough',  desc: 'See how to onboard your team in under 5 minutes.' },
];

const Demo: React.FC = () => {
  const [tab, setTab] = useState<'book' | 'watch'>('book');
  const [submitted, setSubmitted] = useState(false);

  return (
    <Box sx={{ pt: '64px' }}>
      {/* Hero */}
      <Box sx={{ position: 'relative', py: '80px', px: '48px', overflow: 'hidden', background: 'linear-gradient(180deg,rgba(91,93,246,0.04) 0%,transparent 100%)' }}>
        <Box className="dot-grid" sx={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
        <OrbBackground />
        <Box sx={{ maxWidth: 640, mx: 'auto', textAlign: 'center', position: 'relative' }}>
          <SectionLabel>See Intervuew Live</SectionLabel>
          <Typography variant="h1" sx={{ fontSize: 'clamp(36px,5vw,58px)', mb: '18px', letterSpacing: '-0.03em' }}>
            See it in action<br />
            <Box component="span" sx={{ background: `linear-gradient(135deg,${COLORS.indigo},${COLORS.lavender})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>before you commit.</Box>
          </Typography>
          <Typography sx={{ fontSize: 17, color: COLORS.textMuted, lineHeight: 1.7 }}>Book a 30-minute live walkthrough or watch the product tour at your own pace.</Typography>
        </Box>
      </Box>

      {/* Main */}
      <Box sx={{ maxWidth: 1060, mx: 'auto', px: '48px', pb: '80px' }}>
        {/* Tab switcher */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: '48px' }}>
          <Box sx={{ display: 'inline-flex', background: '#F3F4F6', borderRadius: '14px', p: '4px' }}>
{([['book','📅 Book live demo'],['watch','▶ Watch recording']] as ['book'|'watch',string][]).map(([v,l]) => (
                <Box key={v} component="button" onClick={() => setTab(v)} sx={{ px: '22px', py: '10px', border: 'none', borderRadius: '11px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", transition: 'all 0.2s', background: tab === v ? COLORS.indigo : 'transparent', color: tab === v ? 'white' : COLORS.textMuted }}>{l}</Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'start' }}>
          {/* Left: form or video */}
          {tab === 'book' ? (
            <SoftCard sx={{ p: '40px' }}>
              {submitted ? (
                <Box sx={{ textAlign: 'center', py: '24px' }}>
                  <Box sx={{ fontSize: 52, mb: '16px' }}>✅</Box>
                  <Typography variant="h5" sx={{ mb: '10px' }}>You're booked!</Typography>
                  <Typography sx={{ color: COLORS.textMuted, mb: '28px', lineHeight: 1.7 }}>Check your inbox for a calendar invite. We look forward to showing you around.</Typography>
                  <GradientButton variant="ghost" size="md" to="/">Back to home</GradientButton>
                </Box>
              ) : (
                <>
                  <Typography variant="h5" sx={{ mb: '6px' }}>Book a live demo</Typography>
                  <Typography sx={{ fontSize: 14, color: COLORS.textMuted, mb: '28px' }}>30 minutes with a product specialist. No sales pressure.</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <TextField label="First name" size="small" fullWidth sx={inputSx} />
                      <TextField label="Last name" size="small" fullWidth sx={inputSx} />
                    </Box>
                    <TextField label="Work email" type="email" size="small" fullWidth sx={inputSx} />
                    <TextField label="Company" size="small" fullWidth sx={inputSx} />
                    <TextField label="Team size" select SelectProps={{ native: true }} size="small" fullWidth sx={inputSx}>
                      {['1–10','11–50','51–200','201–1000','1000+'].map(o => <option key={o} value={o}>{o}</option>)}
                    </TextField>
                    <TextField label="What are you hoping to solve?" multiline rows={3} size="small" fullWidth sx={inputSx} />
                    <GradientButton fullWidth size="md" onClick={() => setSubmitted(true)}>Request my demo →</GradientButton>
                  </Box>
                </>
              )}
            </SoftCard>
          ) : (
            <SoftCard sx={{ p: '0', overflow: 'hidden' }}>
              <Box sx={{ background: 'linear-gradient(135deg,#0F1115,#1a1d2e)', aspectRatio: '16/9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', cursor: 'pointer', position: 'relative' }}>
                <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%,rgba(91,93,246,0.2) 0%,transparent 70%)' }} />
                <Box sx={{ width: 68, height: 68, borderRadius: '50%', background: `linear-gradient(135deg,${COLORS.indigo},${COLORS.lavender})`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: `0 0 40px ${alpha(COLORS.indigo, 0.5)}` }}>
                  <Icon name="play" size={26} color="white" />
                </Box>
                <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', position: 'relative' }}>Watch 4-minute product tour</Typography>
              </Box>
              <Box sx={{ p: '24px 28px' }}>
                <Typography variant="h6" sx={{ mb: '8px', fontSize: 16 }}>Full Product Walkthrough</Typography>
                <Typography sx={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.6 }}>See the complete interview workflow — from role setup to final report — in 4 minutes.</Typography>
              </Box>
            </SoftCard>
          )}

          {/* Right: highlights */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Typography variant="h6" sx={{ fontSize: 16, mb: '4px' }}>What you'll see</Typography>
            {highlights.map((h, i) => (
              <SoftCard key={i} sx={{ p: '20px 22px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <Box sx={{ width: 36, height: 36, borderRadius: '11px', background: alpha(COLORS.indigo, 0.08), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={h.icon} size={16} color={COLORS.indigo} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: 14, mb: '4px' }}>{h.title}</Typography>
                  <Typography sx={{ fontSize: 13, color: COLORS.textMuted }}>{h.desc}</Typography>
                </Box>
              </SoftCard>
            ))}
            <SoftCard sx={{ p: '24px', background: alpha(COLORS.indigo, 0.03), border: `1px solid ${alpha(COLORS.indigo, 0.12)}` }}>
              <Typography sx={{ fontWeight: 700, fontSize: 14, mb: '8px' }}>Prefer to start now?</Typography>
              <Typography sx={{ fontSize: 13, color: COLORS.textMuted, mb: '16px' }}>Free plan — no card needed. 5 interviews included.</Typography>
              <GradientButton size="sm" fullWidth to="/login">Start for free</GradientButton>
            </SoftCard>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Demo;
