import React, { useState } from 'react';
import {
  Box, Typography, Button, AppBar, Toolbar, alpha, Chip, IconButton
} from '@mui/material';
import { ContentCopy, OpenInNew } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SoftCard from '../../components/common/SoftCard';
import GradientButton from '../../components/common/GradientButton';
import {
  AutoAwesome, Psychology, RecordVoiceOver, Assessment,
  Speed, CheckCircleOutline, PlayArrow, ArrowForward,
  TrendingUp, Groups, WorkspacePremium,
} from '@mui/icons-material';

const HeroMockup = () => (
  <Box sx={{ position: 'relative', width: '100%', maxWidth: 480, mx: 'auto' }}>
    {/* Main card */}
    <SoftCard sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
        <Box sx={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg, #5B5DF6, #9B8FFF)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Psychology sx={{ color: '#fff', fontSize: 18 }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F1115' }}>AI Interview in Progress</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#22C55E', animation: 'pulse 2s infinite' }} />
            <Typography sx={{ fontSize: '0.7rem', color: '#22C55E', fontWeight: 600 }}>LIVE</Typography>
          </Box>
        </Box>
        <Box sx={{ ml: 'auto' }}>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#8B8FA8' }}>14:32</Typography>
        </Box>
      </Box>
      {/* Waveform */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2.5, height: 32 }}>
        {[3, 6, 9, 14, 8, 12, 5, 10, 16, 7, 11, 4, 9, 13, 6, 8, 11, 5].map((h, i) => (
          <Box key={i} sx={{
            width: 3, height: h * 2, borderRadius: 2,
            background: 'linear-gradient(180deg, #5B5DF6, #9B8FFF)',
            opacity: 0.6 + (i % 3) * 0.15,
          }} />
        ))}
      </Box>
      <Typography sx={{ fontSize: '0.8rem', color: '#5A5E72', mb: 1.5, lineHeight: 1.6 }}>
        "Tell me about your most challenging technical project and how you approached problem-solving..."
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {['Communication', 'Technical', 'Clarity'].map((tag) => (
          <Chip key={tag} label={tag} size="small" sx={{
            bgcolor: alpha('#5B5DF6', 0.08), color: '#5B5DF6',
            fontSize: '0.65rem', fontWeight: 600, height: 20,
          }} />
        ))}
      </Box>
    </SoftCard>

    {/* Floating score card */}
    <Box sx={{
      position: 'absolute', top: -20, right: -28,
      background: '#fff',
      border: `1px solid ${alpha('#5B5DF6', 0.12)}`,
      borderRadius: 1.5,
      p: 1.5,
      boxShadow: '0 8px 24px rgba(91,93,246,0.15)',
      minWidth: 120,
    }}>
      <Typography sx={{ fontSize: '0.65rem', color: '#8B8FA8', fontWeight: 600, mb: 0.5, letterSpacing: '0.08em' }}>
        AI SCORE
      </Typography>
      <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, color: '#5B5DF6', fontFamily: '"Sora", sans-serif', lineHeight: 1 }}>
        87
        <Typography component="span" sx={{ fontSize: '0.8rem', color: '#8B8FA8', fontWeight: 400 }}>/100</Typography>
      </Typography>
      <Box sx={{ mt: 1, width: '100%', height: 4, borderRadius: 99, bgcolor: alpha('#5B5DF6', 0.1), overflow: 'hidden' }}>
        <Box sx={{ width: '87%', height: '100%', borderRadius: 99, background: 'linear-gradient(90deg, #5B5DF6, #9B8FFF)' }} />
      </Box>
    </Box>

    {/* Floating transcript chip */}
    <Box sx={{
      position: 'absolute', bottom: -16, left: -20,
      background: '#fff',
      border: `1px solid ${alpha('#22C55E', 0.2)}`,
      borderRadius: 2,
      px: 1.5, py: 1,
      boxShadow: '0 6px 20px rgba(34,197,94,0.12)',
      display: 'flex', alignItems: 'center', gap: 1,
    }}>
      <RecordVoiceOver sx={{ fontSize: 14, color: '#22C55E' }} />
      <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: '#22C55E' }}>Transcribing live...</Typography>
    </Box>
  </Box>
);

const problems = [
  {
    icon: <Speed sx={{ fontSize: 20 }} />,
    title: 'Slow Screening',
    desc: 'Manually reviewing hundreds of applications takes weeks, delaying great hires.',
    color: '#F59E0B',
  },
  {
    icon: <Groups sx={{ fontSize: 20 }} />,
    title: 'Interview Bias',
    desc: 'Human interviewers unintentionally introduce inconsistency and unconscious bias.',
    color: '#EF4444',
  },
  {
    icon: <TrendingUp sx={{ fontSize: 20 }} />,
    title: 'Expensive Process',
    desc: 'Every mis-hire costs $15,000–$30,000 in lost productivity and rehiring costs.',
    color: '#9B8FFF',
  },
  {
    icon: <WorkspacePremium sx={{ fontSize: 20 }} />,
    title: 'Inconsistent Evaluation',
    desc: 'Different interviewers judge candidates differently, making comparison impossible.',
    color: '#5B5DF6',
  },
];

const features = [
  { icon: <Psychology />, title: 'AI Interview Engine', desc: 'Conducts intelligent, adaptive interviews that respond to candidate answers in real-time.' },
  { icon: <Assessment />, title: 'Resume Screening', desc: 'Automatically scores CVs against job requirements with 94% accuracy.' },
  { icon: <RecordVoiceOver />, title: 'Live Transcription', desc: 'Every word is captured, indexed, and made searchable instantly.' },
  { icon: <AutoAwesome />, title: 'AI Scoring', desc: 'Multi-dimensional scoring across communication, clarity, technical ability, and confidence.' },
  { icon: <CheckCircleOutline />, title: 'Interview Recordings', desc: 'Full recordings with synchronized transcripts available immediately after.' },
  { icon: <TrendingUp />, title: 'Performance Analytics', desc: 'Deep insights and candidate comparisons to make data-driven hiring decisions.' },
];

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <Box sx={{ bgcolor: '#F8F9FC', minHeight: '100vh' }}>
      {/* Navbar */}
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ px: { xs: 3, md: 6 }, maxWidth: 1280, mx: 'auto', width: '100%' }}>
          <Typography sx={{
            fontFamily: '"Sora", sans-serif', fontWeight: 800, fontSize: '1.25rem',
            background: 'linear-gradient(135deg, #5B5DF6 0%, #9B8FFF 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.03em', flex: 1,
          }}>
            Intervuew
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Button variant="text" onClick={() => navigate('/auth')} sx={{ color: '#5A5E72' }}>Sign in</Button>
            <GradientButton size="small" onClick={() => navigate('/auth')}>Get Started</GradientButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero */}
      <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 3, md: 6 }, pt: { xs: 5, md: 8 }, pb: { xs: 8, md: 14 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {/* Left */}
          <Box sx={{ flex: '1 1 460px', maxWidth: 560 }}>

            <Typography variant="h1" sx={{ mb: 2.5, fontSize: { xs: '2.5rem', md: '3.75rem' } }}>
              AI Interviews That{' '}
              <Box component="span" sx={{
                background: 'linear-gradient(135deg, #5B5DF6 0%, #9B8FFF 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Think. Listen. Score.</Box>
            </Typography>
            <Typography variant="body1" sx={{ color: '#5A5E72', mb: 4, fontSize: '1.125rem', maxWidth: 440 }}>
              Real-time AI conducting structured interviews and evaluating candidates automatically — so you hire better, faster.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <GradientButton size="large" onClick={() => navigate('/auth')} endIcon={<ArrowForward />}>
                Start Free Interview
              </GradientButton>
              <Button variant="outlined" size="large" onClick={() => navigate('/demo')} endIcon={<PlayArrow />}>
                Watch Demo
              </Button>
 
            </Box>
            <Box sx={{ display: 'flex', gap: 4, mt: 5 }}>
              {[{ n: '10k+', label: 'Interviews done' }, { n: '94%', label: 'Accuracy rate' }, { n: '3x', label: 'Faster hiring' }].map((s) => (
                <Box key={s.label}>
                  <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: '"Sora", sans-serif', color: '#0F1115' }}>{s.n}</Typography>
                  <Typography variant="caption" sx={{ color: '#8B8FA8' }}>{s.label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right */}
          <Box sx={{ flex: '1 1 380px', display: 'flex', justifyContent: 'center', position: 'relative', mt: { xs: 4, md: 0 } }}>
            {/* Background orb */}
            <Box sx={{
              position: 'absolute', width: 400, height: 400, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(91,93,246,0.12) 0%, transparent 70%)',
              top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
              animation: 'pulse 4s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { transform: 'translate(-50%,-50%) scale(1)', opacity: 0.6 },
                '50%': { transform: 'translate(-50%,-50%) scale(1.1)', opacity: 0.3 },
              },
            }} />
            <HeroMockup />
          </Box>
        </Box>
      </Box>

      {/* Problem Section */}
      <Box sx={{ bgcolor: '#FFFFFF', py: { xs: 8, md: 12 }, borderTop: `1px solid ${alpha('#5B5DF6', 0.07)}` }}>
        <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 3, md: 6 } }}>
          <Box sx={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <Box sx={{ flex: '1 1 360px', maxWidth: 440 }}>
              <Typography variant="overline" sx={{ color: '#5B5DF6', mb: 2, display: 'block' }}>The Problem</Typography>
              <Typography variant="h2" sx={{ mb: 2.5, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                Hiring is broken. We fixed it.
              </Typography>
              <Typography sx={{ color: '#5A5E72', lineHeight: 1.8, fontSize: '1rem' }}>
                Traditional hiring wastes thousands of hours on manual screening, introduces unconscious bias, and still produces inconsistent results. The average company spends 42 days and $4,700 per hire — most of it on inefficient manual processes that could be automated.
              </Typography>
            </Box>
            <Box sx={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {problems.map((p, i) => (
                <SoftCard key={i} hover sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2 ,borderRadius: 2}}>
                  <Box sx={{
                    width: 40, height: 40, borderRadius: 1.5, flexShrink: 0,
                    bgcolor: alpha(p.color, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: p.color,
                  }}>{p.icon}</Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem', mb: 0.5 }}>{p.title}</Typography>
                    <Typography variant="body2" sx={{ color: '#5A5E72' }}>{p.desc}</Typography>
                  </Box>
                </SoftCard>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* How it Works */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
  <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 3, md: 6 } }}>
    <Box sx={{ textAlign: 'center', mb: 8 }}>
      <Typography variant="overline" sx={{ color: '#5B5DF6', mb: 2, display: 'block' }}>How it Works</Typography>
      <Typography variant="h2" sx={{ fontSize: { xs: '1.875rem', md: '2.5rem' } }}>
        From posting to hiring in hours, not weeks
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
      {/* Step 01 — stacked: gradient card + generated link card */}
      <Box sx={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <SoftCard hover sx={{ p: 4, background: 'linear-gradient(135deg, #5B5DF6 0%, #9B8FFF 100%)', borderColor: 'transparent' }}>
          <Typography sx={{ fontSize: '3rem', fontWeight: 800, color: 'rgba(255,255,255,0.2)', fontFamily: '"Sora", sans-serif', lineHeight: 1, mb: 2 }}>01</Typography>
          <Typography variant="h4" sx={{ color: '#fff', mb: 1.5 }}>Create Your Job</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
            Post a role, define requirements, and choose AI-generated or custom interview questions. The platform generates a unique shareable application link instantly.
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Typography sx={{ color: 'white', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', mt: 4 }}>
              LINK GENERATED
            </Typography>
          </Box>
          <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.7rem', mb: 1 }}>
            Share with applicants:
          </Typography>
          <Box sx={{
            px: 1.5, py: 1, borderRadius: 1.5,
            bgcolor: alpha('#5B5DF6', 0.15),
            border: `1px solid ${alpha('#5B5DF6', 0.3)}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1,
          }}>
            <Typography sx={{
              color: 'white', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'monospace',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              intervuew.ai/apply/stripe-sr-eng-001
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
              <IconButton size="small" sx={{ color: '#9B8FFF', p: 0.5 }}>
                <ContentCopy sx={{ fontSize: 14 }} />
              </IconButton>
              <IconButton size="small" sx={{ color: '#9B8FFF', p: 0.5 }}>
                <OpenInNew sx={{ fontSize: 14 }} />
              </IconButton>
            </Box>
          </Box>
          </Typography>
        </SoftCard>

        {/* Generated link card */}

      </Box>

      {/* Steps 02 & 03 */}
      <Box sx={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column', gap: 3 }}>
        {[
          { n: '02', title: 'AI Screens Candidates', desc: 'Every application is evaluated instantly against your criteria. No more manual resume sifting.' },
          { n: '03', title: 'AI Conducts Interviews', desc: 'Candidates complete a fully automated interview. Recorded, transcribed, and scored automatically.' },
        ].map((step) => (
          <SoftCard key={step.n} hover sx={{ flex: 1, p: 3 }}>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, color: alpha('#5B5DF6', 0.15), fontFamily: '"Sora", sans-serif', lineHeight: 1, mb: 1.5 }}>{step.n}</Typography>
            <Typography variant="h5" sx={{ mb: 1 }}>{step.title}</Typography>
            <Typography variant="body2" sx={{ color: '#5A5E72', lineHeight: 1.7 }}>{step.desc}</Typography>
          </SoftCard>
        ))}
      </Box>
    </Box>
  </Box>
</Box>

      {/* Feature Grid */}
      <Box sx={{ bgcolor: '#FFFFFF', py: { xs: 8, md: 12 }, borderTop: `1px solid ${alpha('#5B5DF6', 0.07)}` }}>
        <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 3, md: 6 } }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="overline" sx={{ color: '#5B5DF6', mb: 2, display: 'block' }}>Platform Features</Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '1.875rem', md: '2.5rem' } }}>Everything you need to hire smarter</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5, borderRadius: 4 }}>
            {features.map((f, i) => (
              <SoftCard
                key={i}
                hover
                sx={{
                  flex: i === 0 ? '2 1 400px' : i === 3 ? '1.5 1 300px' : '1 1 200px',
                  p: 3,
                  cursor: 'default',
                  transform: hoveredFeature === i ? 'translateY(-4px)' : 'none',
                }}
                onClick={() => setHoveredFeature(i === hoveredFeature ? null : i)}
              >
                <Box sx={{
                  width: 44, height: 44, borderRadius: 2, mb: 2,
                  bgcolor: alpha('#5B5DF6', 0.08),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#5B5DF6',
                }}>{f.icon}</Box>
                <Typography variant="h6" sx={{ mb: 1 }}>{f.title}</Typography>
                <Typography variant="body2" sx={{ color: '#5A5E72', lineHeight: 1.7 }}>{f.desc}</Typography>
              </SoftCard>
            ))}
          </Box>
        </Box>
      </Box>

      {/* CTA */}
      <Box sx={{ py: { xs: 10, md: 16 }, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #5B5DF6 0%, #9B8FFF 60%, #C4B5FD 100%)',
        }} />
        <Box sx={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.07)' }} />
        <Box sx={{ position: 'absolute', bottom: -80, left: -80, width: 300, height: 300, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)' }} />
        <Box sx={{ position: 'relative', textAlign: 'center', maxWidth: 600, mx: 'auto', px: 3 }}>
          <Typography variant="h2" sx={{ color: '#fff', mb: 2, fontSize: { xs: '2rem', md: '2.75rem' } }}>
            Start Interviewing Smarter
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)', mb: 5, fontSize: '1.125rem' }}>
            Join thousands of companies using Intervuew to find the best talent, faster and more consistently.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/auth')}
              sx={{
                bgcolor: '#fff', color: 'white',
                fontWeight: 700,
                '&:hover': { bgcolor: '#F8F9FC', transform: 'translateY(-1px)' },
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              }}
            >
              Create Free Account
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<PlayArrow />}
              sx={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff', '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' } }}
            >
              See Demo
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
