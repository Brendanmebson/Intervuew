import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Stepper, Step, StepLabel,
  alpha, Chip, LinearProgress, Avatar, IconButton,
} from '@mui/material';
import {
  ArrowBack, ArrowForward, Psychology, Assessment,
  RecordVoiceOver, CheckCircleOutline, TrendingUp,
  PlayArrow, Pause, ContentCopy, OpenInNew,
  Person, Work, Star, ThumbUp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SoftCard from '../../components/common/SoftCard';
import GradientButton from '../../components/common/GradientButton';

// ─── Step 1: Create a Job ────────────────────────────────────────────────────
const StepCreateJob = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {/* Left: Form preview */}
      <Box sx={{ flex: '1 1 340px' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Create Your Job Post</Typography>
        <Typography sx={{ color: '#5A5E72', mb: 3, fontSize: '0.95rem' }}>
          Fill in the role details and Intervuew generates a custom AI interview and a shareable application link — instantly.
        </Typography>
        <SoftCard sx={{ p: 3 }}>
          {/* Simulated form */}
          {[
            { label: 'Job Title', value: 'Senior Software Engineer' },
            { label: 'Company', value: 'Stripe' },
            { label: 'Experience', value: '5+ years' },
          ].map((f) => (
            <Box key={f.label} sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#8B8FA8', mb: 0.5, letterSpacing: '0.06em' }}>
                {f.label.toUpperCase()}
              </Typography>
              <Box sx={{
                p: '10px 14px', borderRadius: 1.5, bgcolor: alpha('#5B5DF6', 0.04),
                border: `1px solid ${alpha('#5B5DF6', 0.1)}`,
                fontSize: '0.9rem', color: '#0F1115', fontWeight: 500,
              }}>
                {f.value}
              </Box>
            </Box>
          ))}
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#8B8FA8', mb: 0.5, letterSpacing: '0.06em' }}>
              INTERVIEW TYPE
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {['AI-Generated', 'Custom'].map((t, i) => (
                <Box key={t} sx={{
                  px: 2, py: 0.75, borderRadius: 1.5, fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                  bgcolor: i === 0 ? '#5B5DF6' : 'transparent',
                  color: i === 0 ? '#fff' : '#8B8FA8',
                  border: `1px solid ${i === 0 ? '#5B5DF6' : alpha('#5B5DF6', 0.15)}`,
                }}>{t}</Box>
              ))}
            </Box>
          </Box>
        </SoftCard>
      </Box>

      {/* Right: Generated link */}
      <Box sx={{ flex: '1 1 300px' }}>
        <SoftCard sx={{
          p: 3,
          background: 'linear-gradient(135deg, #0F1115 0%, #1A1D2E 100%)',
          borderColor: alpha('#5B5DF6', 0.3),
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#22C55E' }} />
            <Typography sx={{ color: '#22C55E', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em' }}>
              LINK GENERATED
            </Typography>
          </Box>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', mb: 1 }}>
            Share this with applicants:
          </Typography>
          <Box sx={{
            p: 1.5, borderRadius: 1.5,
            bgcolor: alpha('#5B5DF6', 0.15),
            border: `1px solid ${alpha('#5B5DF6', 0.3)}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 2,
          }}>
            <Typography sx={{ color: '#9B8FFF', fontSize: '0.8rem', fontWeight: 600, fontFamily: 'monospace' }}>
              intervuew.ai/apply/stripe-sr-eng-001
            </Typography>
            <IconButton size="small" onClick={handleCopy} sx={{ color: copied ? '#22C55E' : '#9B8FFF', p: 0.5 }}>
              {copied ? <CheckCircleOutline sx={{ fontSize: 16 }} /> : <ContentCopy sx={{ fontSize: 16 }} />}
            </IconButton>
          </Box>
          <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', mb: 2 }}>
            Or embed on your careers page:
          </Typography>
          <Box sx={{
            p: 1.5, borderRadius: 1.5,
            bgcolor: 'rgba(255,255,255,0.04)',
            border: `1px solid rgba(255,255,255,0.08)`,
            fontFamily: 'monospace', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)',
            lineHeight: 1.6,
          }}>
            {'<iframe src="intervuew.ai/embed/'}
            <Box component="span" sx={{ color: '#9B8FFF' }}>stripe-sr-eng-001</Box>
            {'" />'}
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mt: 2.5 }}>
            <Box sx={{ textAlign: 'center', flex: 1 }}>
              <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.25rem' }}>0</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>Applicants</Typography>
            </Box>
            <Box sx={{ textAlign: 'center', flex: 1 }}>
              <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.25rem' }}>24h</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>Active</Typography>
            </Box>
            <Box sx={{ textAlign: 'center', flex: 1 }}>
              <Typography sx={{ color: '#22C55E', fontWeight: 800, fontSize: '1.25rem' }}>Live</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>Status</Typography>
            </Box>
          </Box>
        </SoftCard>

        <SoftCard sx={{ p: 2.5, mt: 2 }}>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1.5 }}>AI-Generated Questions</Typography>
          {[
            'Walk me through a system you designed at scale.',
            'How do you approach debugging an unknown codebase?',
            'Describe a time you disagreed with your tech lead.',
          ].map((q, i) => (
            <Box key={i} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'flex-start' }}>
              <Box sx={{
                width: 18, height: 18, borderRadius: '50%', flexShrink: 0, mt: 0.25,
                bgcolor: alpha('#5B5DF6', 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Typography sx={{ fontSize: '0.6rem', fontWeight: 800, color: '#5B5DF6' }}>{i + 1}</Typography>
              </Box>
              <Typography sx={{ fontSize: '0.8rem', color: '#5A5E72', lineHeight: 1.5 }}>{q}</Typography>
            </Box>
          ))}
        </SoftCard>
      </Box>
    </Box>
  );
};

// ─── Step 2: AI Screens ──────────────────────────────────────────────────────
const candidates = [
  { name: 'Sarah Chen', role: 'Ex-Google, 7yrs', score: 94, tags: ['Strong', 'Top Pick'], avatar: 'SC', color: '#22C55E' },
  { name: 'Marcus Webb', role: 'Startup CTO, 6yrs', score: 81, tags: ['Good Fit'], avatar: 'MW', color: '#5B5DF6' },
  { name: 'Priya Nair', role: 'FAANG, 5yrs', score: 78, tags: ['Technical'], avatar: 'PN', color: '#9B8FFF' },
  { name: 'James Okonkwo', role: 'Fintech Lead, 8yrs', score: 72, tags: ['Experience'], avatar: 'JO', color: '#F59E0B' },
];

const StepScreening = () => {
  const [selected, setSelected] = useState(0);
  const c = candidates[selected];

  return (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
      <Box sx={{ flex: '0 0 220px' }}>
        <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#8B8FA8', letterSpacing: '0.08em', mb: 1.5 }}>
          APPLICANTS (47)
        </Typography>
        {candidates.map((c, i) => (
          <SoftCard
            key={i}
            onClick={() => setSelected(i)}
            sx={{
              p: 1.5, mb: 1.5, cursor: 'pointer',
              border: selected === i ? `1.5px solid #5B5DF6` : undefined,
              bgcolor: selected === i ? alpha('#5B5DF6', 0.04) : '#fff',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: alpha(c.color, 0.15), color: c.color, fontSize: '0.7rem', fontWeight: 700 }}>
                {c.avatar}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F1115' }}>{c.name}</Typography>
                <Typography sx={{ fontSize: '0.7rem', color: '#8B8FA8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.role}</Typography>
              </Box>
              <Box sx={{
                width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `conic-gradient(${c.color} ${c.score}%, ${alpha(c.color, 0.1)} 0)`,
                position: 'relative',
              }}>
                <Box sx={{ width: 26, height: 26, borderRadius: '50%', bgcolor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography sx={{ fontSize: '0.6rem', fontWeight: 800, color: c.color }}>{c.score}</Typography>
                </Box>
              </Box>
            </Box>
          </SoftCard>
        ))}
      </Box>

      <Box sx={{ flex: '1 1 300px' }}>
        <SoftCard sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Avatar sx={{ width: 48, height: 48, bgcolor: alpha(c.color, 0.15), color: c.color, fontWeight: 700 }}>{c.avatar}</Avatar>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>{c.name}</Typography>
              <Typography sx={{ color: '#8B8FA8', fontSize: '0.82rem' }}>{c.role}</Typography>
            </Box>
            <Box sx={{ ml: 'auto', textAlign: 'right' }}>
              <Typography sx={{ fontSize: '2rem', fontWeight: 800, color: c.color, lineHeight: 1 }}>{c.score}</Typography>
              <Typography sx={{ fontSize: '0.7rem', color: '#8B8FA8' }}>AI Score</Typography>
            </Box>
          </Box>

          {[
            { label: 'Technical Skills', val: c.score - 2 },
            { label: 'Communication', val: c.score + 3 > 100 ? 97 : c.score + 3 },
            { label: 'Experience Match', val: c.score - 8 },
            { label: 'Culture Fit', val: c.score - 5 },
          ].map((d) => (
            <Box key={d.label} sx={{ mb: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography sx={{ fontSize: '0.8rem', color: '#5A5E72' }}>{d.label}</Typography>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F1115' }}>{d.val}%</Typography>
              </Box>
              <LinearProgress
                variant="determinate" value={d.val}
                sx={{
                  height: 6, borderRadius: 99, bgcolor: alpha(c.color, 0.1),
                  '& .MuiLinearProgress-bar': { borderRadius: 99, bgcolor: c.color },
                }}
              />
            </Box>
          ))}

          <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
            {c.tags.map((t) => (
              <Chip key={t} label={t} size="small" sx={{ bgcolor: alpha(c.color, 0.1), color: c.color, fontWeight: 700, fontSize: '0.7rem' }} />
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5, mt: 2.5 }}>
            <Button variant="contained" size="small" sx={{ flex: 1, bgcolor: '#5B5DF6', fontWeight: 700 }}>
              Advance to Interview
            </Button>
            <Button variant="outlined" size="small" sx={{ borderColor: alpha('#EF4444', 0.3), color: '#EF4444' }}>
              Reject
            </Button>
          </Box>
        </SoftCard>
      </Box>
    </Box>
  );
};

// ─── Step 3: AI Interview ────────────────────────────────────────────────────
const InterviewTranscript = [
  { speaker: 'AI', text: 'Walk me through a system you designed at scale. What were the key architectural decisions?' },
  { speaker: 'Sarah', text: "At Google, I led the redesign of our notification service handling 2B events/day. The core decision was moving from a monolithic fanout to a tiered pub-sub architecture..." },
  { speaker: 'AI', text: 'How did you handle backpressure when downstream services were overwhelmed?' },
  { speaker: 'Sarah', text: "We implemented adaptive rate limiting with exponential backoff plus a priority queue for critical notifications. I also added circuit breakers at each service boundary..." },
];

const StepInterview = () => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(42);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (playing) {
      interval = setInterval(() => {
        setProgress((p) => (p >= 100 ? 42 : p + 0.5));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [playing]);

  return (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
      <Box sx={{ flex: '1 1 340px' }}>
        <SoftCard sx={{ p: 3, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box sx={{
              width: 10, height: 10, borderRadius: '50%', bgcolor: '#EF4444',
              boxShadow: '0 0 0 3px rgba(239,68,68,0.2)',
              animation: 'pulse 1.5s infinite',
              '@keyframes pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.5 } },
            }} />
            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>Live Interview — Sarah Chen</Typography>
          </Box>

          {/* Waveform */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, height: 40, mb: 2 }}>
            {Array.from({ length: 30 }).map((_, i) => {
              const heights = [4, 8, 14, 20, 12, 18, 6, 16, 10, 22, 8, 18, 14, 6, 20, 10, 16, 8, 12, 18, 4, 14, 20, 8, 16, 10, 22, 6, 18, 12];
              return (
                <Box key={i} sx={{
                  width: 3, height: heights[i] ?? 8,
                  borderRadius: 2,
                  background: i < progress / 3.33
                    ? 'linear-gradient(180deg, #5B5DF6, #9B8FFF)'
                    : alpha('#5B5DF6', 0.15),
                  transition: 'background 0.1s',
                }} />
              );
            })}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton onClick={() => setPlaying(!playing)} size="small" sx={{
              bgcolor: '#5B5DF6', color: '#fff', width: 36, height: 36,
              '&:hover': { bgcolor: '#4A4CE0' },
            }}>
              {playing ? <Pause sx={{ fontSize: 18 }} /> : <PlayArrow sx={{ fontSize: 18 }} />}
            </IconButton>
            <Box sx={{ flex: 1 }}>
              <LinearProgress variant="determinate" value={progress} sx={{
                height: 4, borderRadius: 99, bgcolor: alpha('#5B5DF6', 0.1),
                '& .MuiLinearProgress-bar': { bgcolor: '#5B5DF6' },
              }} />
            </Box>
            <Typography sx={{ fontSize: '0.75rem', color: '#8B8FA8', fontVariantNumeric: 'tabular-nums' }}>
              {Math.floor(progress * 0.24)}:{String(Math.floor((progress * 14.4) % 60)).padStart(2, '0')}
            </Typography>
          </Box>
        </SoftCard>

        {/* Live transcript */}
        <SoftCard sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <RecordVoiceOver sx={{ fontSize: 16, color: '#22C55E' }} />
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#22C55E', letterSpacing: '0.08em' }}>LIVE TRANSCRIPT</Typography>
          </Box>
          {InterviewTranscript.map((t, i) => (
            <Box key={i} sx={{ mb: 1.5 }}>
              <Typography sx={{
                fontSize: '0.7rem', fontWeight: 700, mb: 0.5,
                color: t.speaker === 'AI' ? '#5B5DF6' : '#0F1115',
              }}>
                {t.speaker === 'AI' ? '🤖 Intervuew AI' : '👤 Sarah'}
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', color: '#5A5E72', lineHeight: 1.6 }}>{t.text}</Typography>
            </Box>
          ))}
        </SoftCard>
      </Box>

      {/* Real-time scores */}
      <Box sx={{ flex: '0 0 200px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#8B8FA8', letterSpacing: '0.08em' }}>LIVE SCORING</Typography>
        {[
          { label: 'Communication', score: 91, color: '#22C55E' },
          { label: 'Technical Depth', score: 88, color: '#5B5DF6' },
          { label: 'Clarity', score: 85, color: '#9B8FFF' },
          { label: 'Confidence', score: 79, color: '#F59E0B' },
        ].map((s) => (
          <SoftCard key={s.label} sx={{ p: 2, textAlign: 'center' }}>
            <Box sx={{
              width: 60, height: 60, borderRadius: '50%', mx: 'auto', mb: 1,
              background: `conic-gradient(${s.color} ${s.score}%, ${alpha(s.color, 0.1)} 0)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <Box sx={{
                width: 46, height: 46, borderRadius: '50%', bgcolor: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: s.color }}>{s.score}</Typography>
              </Box>
            </Box>
            <Typography sx={{ fontSize: '0.75rem', color: '#5A5E72', fontWeight: 600 }}>{s.label}</Typography>
          </SoftCard>
        ))}
      </Box>
    </Box>
  );
};

// ─── Step 4: Analytics ───────────────────────────────────────────────────────
const StepAnalytics = () => (
  <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
    <Box sx={{ flex: '1 1 300px' }}>
      <SoftCard sx={{ p: 3, mb: 2 }}>
        <Typography sx={{ fontWeight: 700, mb: 2 }}>Candidate Comparison</Typography>
        {[
          { name: 'Sarah Chen', score: 94, color: '#22C55E', rank: 1 },
          { name: 'Marcus Webb', score: 81, color: '#5B5DF6', rank: 2 },
          { name: 'Priya Nair', score: 78, color: '#9B8FFF', rank: 3 },
          { name: 'James Okonkwo', score: 72, color: '#F59E0B', rank: 4 },
        ].map((c) => (
          <Box key={c.name} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
            <Box sx={{
              width: 24, height: 24, borderRadius: '50%',
              bgcolor: c.rank === 1 ? '#5B5DF6' : alpha('#5B5DF6', 0.08),
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {c.rank === 1 ? <Star sx={{ fontSize: 14, color: '#fff' }} /> :
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#8B8FA8' }}>{c.rank}</Typography>}
            </Box>
            <Typography sx={{ flex: 1, fontSize: '0.85rem', fontWeight: 600 }}>{c.name}</Typography>
            <Box sx={{ flex: 2 }}>
              <LinearProgress variant="determinate" value={c.score} sx={{
                height: 8, borderRadius: 99, bgcolor: alpha(c.color, 0.1),
                '& .MuiLinearProgress-bar': { bgcolor: c.color, borderRadius: 99 },
              }} />
            </Box>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 800, color: c.color, minWidth: 32, textAlign: 'right' }}>
              {c.score}
            </Typography>
          </Box>
        ))}
      </SoftCard>

      <SoftCard sx={{ p: 3, background: 'linear-gradient(135deg, #5B5DF6 0%, #9B8FFF 100%)', borderColor: 'transparent' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <ThumbUp sx={{ color: '#fff', fontSize: 20 }} />
          <Typography sx={{ color: '#fff', fontWeight: 700 }}>AI Recommendation</Typography>
        </Box>
        <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.875rem', lineHeight: 1.6 }}>
          <strong>Sarah Chen</strong> is the top candidate with a 94/100 score. Her system design experience at Google directly matches your requirements. Recommend proceeding to final round.
        </Typography>
        <Button variant="contained" fullWidth sx={{ mt: 2, bgcolor: '#fff', color: '#5B5DF6', fontWeight: 700 }}>
          Send Offer Letter
        </Button>
      </SoftCard>
    </Box>

    <Box sx={{ flex: '0 0 200px', display: 'flex', flexDirection: 'column', gap: 2 }}>
      {[
        { label: 'Time Saved', value: '47 hrs', icon: <TrendingUp />, color: '#22C55E' },
        { label: 'Cost Saved', value: '$3,200', icon: <Work />, color: '#5B5DF6' },
        { label: 'Applicants', value: '47', icon: <Person />, color: '#9B8FFF' },
        { label: 'Interviewed', value: '12', icon: <Psychology />, color: '#F59E0B' },
      ].map((s) => (
        <SoftCard key={s.label} sx={{ p: 2.5, textAlign: 'center' }}>
          <Box sx={{
            width: 40, height: 40, borderRadius: 2, mx: 'auto', mb: 1,
            bgcolor: alpha(s.color, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: s.color,
          }}>
            {s.icon}
          </Box>
          <Typography sx={{ fontWeight: 800, fontSize: '1.25rem', color: '#0F1115' }}>{s.value}</Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#8B8FA8' }}>{s.label}</Typography>
        </SoftCard>
      ))}
    </Box>
  </Box>
);

// ─── Main Demo Page ──────────────────────────────────────────────────────────
const steps = [
  { label: 'Create Job', icon: <Work />, component: <StepCreateJob /> },
  { label: 'AI Screening', icon: <Assessment />, component: <StepScreening /> },
  { label: 'AI Interview', icon: <Psychology />, component: <StepInterview /> },
  { label: 'Analytics', icon: <TrendingUp />, component: <StepAnalytics /> },
];

const DemoPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Box sx={{ bgcolor: '#F8F9FC', minHeight: '100vh' }}>
      {/* Top bar */}
      <Box sx={{
        position: 'sticky', top: 0, zIndex: 100,
        bgcolor: 'rgba(248,249,252,0.9)', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${alpha('#5B5DF6', 0.08)}`,
        px: { xs: 2, md: 6 }, py: 1.5,
        display: 'flex', alignItems: 'center', gap: 2,
      }}>
        <IconButton onClick={() => navigate(-1)} size="small">
          <ArrowBack sx={{ fontSize: 20, color: '#5A5E72' }} />
        </IconButton>
        <Typography sx={{
          fontFamily: '"Sora", sans-serif', fontWeight: 800, fontSize: '1.1rem',
          background: 'linear-gradient(135deg, #5B5DF6 0%, #9B8FFF 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Intervuew
        </Typography>
        <Chip label="Interactive Demo" size="small" sx={{ bgcolor: alpha('#5B5DF6', 0.08), color: '#5B5DF6', fontWeight: 600 }} />
        <Box sx={{ ml: 'auto' }}>
          <GradientButton size="small" onClick={() => navigate('/auth')}>
            Get Started Free
          </GradientButton>
        </Box>
      </Box>

      {/* Header */}
      <Box sx={{ textAlign: 'center', pt: { xs: 5, md: 7 }, pb: 3, px: 3 }}>
        <Typography variant="overline" sx={{ color: '#5B5DF6', display: 'block', mb: 1 }}>Product Demo</Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5, fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
          See how Intervuew works
        </Typography>
        <Typography sx={{ color: '#5A5E72', maxWidth: 500, mx: 'auto', fontSize: '1rem' }}>
          Walk through a real hiring workflow — from job creation to final offer — in under 2 minutes.
        </Typography>
      </Box>

      {/* Stepper */}
      <Box sx={{ maxWidth: 700, mx: 'auto', px: 3, mb: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((s, i) => (
            <Step key={s.label} onClick={() => setActiveStep(i)} sx={{ cursor: 'pointer' }}>
              <StepLabel
                StepIconProps={{
                  sx: {
                    '&.Mui-active': { color: '#5B5DF6' },
                    '&.Mui-completed': { color: '#22C55E' },
                  },
                }}
              >
                <Typography sx={{ fontSize: '0.75rem', fontWeight: activeStep === i ? 700 : 400 }}>{s.label}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Step Content */}
      <Box sx={{ maxWidth: 1100, mx: 'auto', px: { xs: 2, md: 4 }, pb: 8 }}>
        <Box sx={{ mb: 3, minHeight: 400 }}>
          {steps[activeStep].component}
        </Box>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
            disabled={activeStep === 0}
            sx={{ color: '#5A5E72' }}
          >
            Previous
          </Button>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {steps.map((_, i) => (
              <Box key={i} onClick={() => setActiveStep(i)} sx={{
                width: i === activeStep ? 24 : 8, height: 8, borderRadius: 99,
                bgcolor: i === activeStep ? '#5B5DF6' : alpha('#5B5DF6', 0.2),
                cursor: 'pointer', transition: 'all 0.3s',
              }} />
            ))}
          </Box>
          {activeStep < steps.length - 1 ? (
            <Button
              endIcon={<ArrowForward />}
              onClick={() => setActiveStep((s) => Math.min(steps.length - 1, s + 1))}
              sx={{ color: '#5B5DF6', fontWeight: 700 }}
            >
              Next
            </Button>
          ) : (
            <GradientButton onClick={() => navigate('/auth')} endIcon={<ArrowForward />}>
              Start Free Trial
            </GradientButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DemoPage;