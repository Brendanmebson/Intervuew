import React from 'react';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icons';
import { SoftCard, GradientButton, OrbBackground, SectionLabel } from '../components/shared';
import { COLORS } from '../theme/theme';

const features = [
  { icon: 'mic',     title: 'Real-Time Voice AI',        color: COLORS.indigo,  desc: 'Sub-2 second AI responses with natural, multi-turn conversational flow. No awkward pauses, no scripted rails.', bullets: ['Wake-word detection','Adaptive follow-up questions','Interrupt handling'] },
  { icon: 'brain',   title: 'Multimodal Understanding',  color: COLORS.purple,  desc: 'Evaluates tone, pace, confidence, and coherence — not just keywords. A complete picture of every candidate.', bullets: ['Sentiment analysis','Filler-word tracking','Confidence scoring'] },
  { icon: 'chart',   title: 'Deep Analytics & Reports',  color: COLORS.blue,    desc: 'Per-question scoring, category breakdowns, and comparative benchmarks. From raw transcript to hiring decision in minutes.', bullets: ['PDF export','Team sharing','Historical trends'] },
  { icon: 'shield',  title: 'Structured & Bias-Free',    color: COLORS.green,   desc: 'The same rubric applied identically to every candidate. Standardised, defensible, auditable.', bullets: ['EEOC-aligned rubrics','Audit logs','Blind scoring option'] },
  { icon: 'zap',     title: 'Instant Transcription',     color: COLORS.amber,   desc: 'Real-time speech-to-text with speaker diarisation. Edit, search and share full transcripts automatically.', bullets: ['99.4% accuracy','40+ languages','Automatic summary'] },
  { icon: 'users',   title: 'Team Collaboration',        color: COLORS.pink,    desc: 'Invite reviewers, leave inline comments, and make hiring decisions together — all inside Intervuew.', bullets: ['Role-based access','Inline comments','Decision tracking'] },
  { icon: 'settings','title': 'Custom Question Banks',   color: COLORS.lavender,desc: 'Build role-specific libraries or let AI generate a bank from a job description. Mix-and-match Manual and Auto modes.', bullets: ['JD auto-import','Drag-and-drop builder','Version history'] },
  { icon: 'briefcase','title': 'ATS & HRIS Integrations',color: COLORS.indigo,  desc: 'Push candidate scores directly into Greenhouse, Lever, Workday, and 30+ other tools your team already uses.', bullets: ['One-click sync','Webhook support','Custom field mapping'] },
];

const Features: React.FC = () => {
  const nav = useNavigate();
  return (
    <Box sx={{ pt: '64px' }}>
      {/* Hero */}
      <Box sx={{ position: 'relative', py: '90px', px: '48px', overflow: 'hidden', background: 'linear-gradient(180deg,rgba(91,93,246,0.04) 0%,transparent 100%)' }}>
        <Box className="dot-grid" sx={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
        <OrbBackground />
        <Box sx={{ maxWidth: 740, mx: 'auto', textAlign: 'center', position: 'relative' }}>
          <SectionLabel>Platform Features</SectionLabel>
          <Typography variant="h1" sx={{ fontSize: 'clamp(36px,5vw,62px)', mb: '20px', letterSpacing: '-0.03em' }}>
            Every tool your team needs.<br />
            <Box component="span" sx={{ background: `linear-gradient(135deg,${COLORS.indigo},${COLORS.lavender})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Nothing you don't.</Box>
          </Typography>
          <Typography sx={{ fontSize: 18, color: COLORS.textMuted, lineHeight: 1.7, mb: '40px', maxWidth: 520, mx: 'auto' }}>
            Intervuew combines real-time voice AI, deep analytics, and team collaboration into one platform designed for modern hiring.
          </Typography>
          <Box sx={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <GradientButton size="lg" to="/login">Start for free</GradientButton>
            <GradientButton variant="ghost" size="lg" to="/pricing">See pricing</GradientButton>
          </Box>
        </Box>
      </Box>

      {/* Feature grid */}
      <Box sx={{ maxWidth: 1140, mx: 'auto', px: '48px', py: '72px' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
          {features.map((f, i) => (
            <SoftCard key={i} sx={{ p: '30px', transition: 'transform 0.22s ease,box-shadow 0.22s ease,border-color 0.22s ease', border: `1px solid rgba(0,0,0,0.04)`, '&:hover': { borderColor: alpha(f.color, 0.2), boxShadow: `0 16px 50px ${alpha(f.color, 0.1)}`, transform: 'translateY(-4px)' } }}>
              <Box sx={{ width: 48, height: 48, borderRadius: '14px', background: alpha(f.color, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', mb: '18px' }}>
                <Icon name={f.icon} size={22} color={f.color} />
              </Box>
              <Typography variant="h6" sx={{ fontSize: 17, mb: '10px', letterSpacing: '-0.015em' }}>{f.title}</Typography>
              <Typography sx={{ fontSize: 13.5, lineHeight: 1.7, color: COLORS.textMuted, mb: '18px' }}>{f.desc}</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {f.bullets.map((b, bi) => (
                  <Box key={bi} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Box sx={{ width: 5, height: 5, borderRadius: '50%', background: f.color, flexShrink: 0 }} />
                    <Typography sx={{ fontSize: 12.5, color: COLORS.textMuted, fontWeight: 500 }}>{b}</Typography>
                  </Box>
                ))}
              </Box>
            </SoftCard>
          ))}
        </Box>
      </Box>

      {/* Comparison table */}
      <Box sx={{ background: alpha(COLORS.indigo, 0.025), borderTop: `1px solid ${alpha(COLORS.indigo, 0.07)}`, borderBottom: `1px solid ${alpha(COLORS.indigo, 0.07)}`, py: '72px', px: '48px' }}>
        <Box sx={{ maxWidth: 860, mx: 'auto' }}>
          <Box sx={{ textAlign: 'center', mb: '48px' }}>
            <SectionLabel>Why Intervuew</SectionLabel>
            <Typography variant="h2" sx={{ fontSize: 'clamp(26px,3vw,40px)' }}>See the difference</Typography>
          </Box>
          <SoftCard sx={{ overflow: 'hidden', p: 0 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', background: 'linear-gradient(135deg,#0F1115,#1a1d2e)', px: '28px', py: '18px' }}>
              <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Capability</Typography>
              {['Traditional', 'Intervuew'].map(h => (
                <Typography key={h} sx={{ fontSize: 13, fontWeight: 700, color: h === 'Intervuew' ? COLORS.lavender : 'rgba(255,255,255,0.4)', textAlign: 'center' }}>{h}</Typography>
              ))}
            </Box>
            {[
              ['Consistent scoring', false, true],
              ['Available 24/7', false, true],
              ['Bias-free evaluation', false, true],
              ['Instant transcript', false, true],
              ['Scalable to 1000s of candidates', false, true],
              ['Deep analytics per question', false, true],
              ['Human empathy & edge cases', true, '~'],
            ].map(([cap, trad, intv], i) => (
              <Box key={i} sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', px: '28px', py: '15px', borderTop: '1px solid rgba(0,0,0,0.05)', background: i % 2 === 0 ? 'white' : alpha(COLORS.indigo, 0.012) }}>
                <Typography sx={{ fontSize: 14, fontWeight: 500, color: COLORS.text }}>{cap as string}</Typography>
                {[trad, intv].map((v, vi) => (
                  <Box key={vi} sx={{ textAlign: 'center' }}>
                    {v === true ? <Box sx={{ display: 'inline-block', w: 20, h: 20, color: COLORS.green, fontSize: 16 }}>✓</Box>
                     : v === false ? <Box sx={{ display: 'inline-block', color: COLORS.red, fontSize: 16 }}>✕</Box>
                     : <Typography sx={{ fontSize: 13, color: COLORS.amber, fontWeight: 600 }}>Partial</Typography>}
                  </Box>
                ))}
              </Box>
            ))}
          </SoftCard>
        </Box>
      </Box>

      {/* CTA */}
      <Box sx={{ maxWidth: 1140, mx: 'auto', px: '48px', py: '80px', textAlign: 'center' }}>
        <Typography variant="h2" sx={{ fontSize: 'clamp(28px,3.5vw,46px)', mb: '16px' }}>Ready to modernise your hiring?</Typography>
        <Typography sx={{ fontSize: 16, color: COLORS.textMuted, mb: '36px' }}>Get started free — no credit card required.</Typography>
        <Box sx={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <GradientButton size="lg" to="/login">Start free trial</GradientButton>
          <GradientButton variant="ghost" size="lg" to="/demo">Book a demo</GradientButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Features;
