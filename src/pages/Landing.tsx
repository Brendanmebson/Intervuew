import React from 'react';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icons';
import { SoftCard, GlassCard, GradientButton, OrbBackground, SectionLabel, Logo } from '../components/shared';
import { COLORS } from '../theme/theme';

const Landing: React.FC = () => {
  const nav = useNavigate();
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <Box sx={{ minHeight: '100vh', overflowX: 'hidden' }}>
      {/* HERO */}
      <Box id="hero" component="section" sx={{ position: 'relative', pt: '120px', pb: '80px', overflow: 'hidden' }}>
        <Box className="dot-grid" sx={{ position: 'absolute', inset: 0, opacity: 0.55 }} />
        <OrbBackground />
        <Box sx={{ maxWidth: 1140, mx: 'auto', px: '48px', position: 'relative' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <Box className="fade-up">
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, background: alpha(COLORS.indigo, 0.08), border: `1px solid ${alpha(COLORS.indigo, 0.2)}`, borderRadius: '20px', px: '14px', py: '5px', mb: '26px', fontSize: 12, fontWeight: 600, color: COLORS.indigo, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: COLORS.indigo }} />Live AI Platform
              </Box>
              <Typography variant="h1" sx={{ fontSize: 'clamp(40px,4.8vw,64px)', mb: '20px' }}>
                AI Interviews<br />That{' '}
                <Box component="span" sx={{ background: `linear-gradient(135deg,${COLORS.indigo},${COLORS.lavender})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Think.</Box>
                <br />Listen. Score.
              </Typography>
              <Typography sx={{ fontSize: 18, lineHeight: 1.65, color: COLORS.textMuted, mb: '36px', maxWidth: 430 }}>
                Real-time multimodal AI conducting structured interviews fully inside your platform — no bias, no guesswork.
              </Typography>
              <Box sx={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <GradientButton size="lg" to="/login">Start Free Interview</GradientButton>
                <GradientButton variant="ghost" size="lg" to="/demo"
                  startIcon={<Box sx={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg,${COLORS.indigo},${COLORS.lavender})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="play" size={10} color="white" /></Box>}>
                  Watch Demo
                </GradientButton>
              </Box>
              <Box sx={{ mt: '36px', display: 'flex', gap: '28px' }}>
                {[['500+','Companies'],['98%','Accuracy'],['<2s','AI Response']].map(([n,l]) => (
                  <Box key={l}>
                    <Typography sx={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.03em' }}>{n}</Typography>
                    <Typography sx={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 500 }}>{l}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            {/* Hero collage */}
            <Box className="fade-up-1" sx={{ position: 'relative', height: 460 }}>
              <SoftCard sx={{ position: 'absolute', top: 20, left: 0, right: 0, overflow: 'hidden', p: 0 }}>
                <Box sx={{ background: 'linear-gradient(135deg,#0F1115,#161A22)', p: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', gap: '5px' }}>{['#FF5F57','#FEBC2E','#28C840'].map(c => <Box key={c} sx={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}</Box>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '6px', px: '10px', py: '4px', borderRadius: '20px', background: 'rgba(91,93,246,0.12)', color: COLORS.indigo, fontSize: 12, fontWeight: 600, fontFamily: "'DM Mono',monospace" }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: COLORS.indigo }} /> Speaking
                  </Box>
                </Box>
                <Box sx={{ background: '#0F1115', p: '28px 24px' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}>
                    <Box className="speaking-avatar" sx={{ width: 76, height: 76, borderRadius: '50%', background: `linear-gradient(135deg,${COLORS.indigo},${COLORS.lavender})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="brain" size={34} color="white" /></Box>
                    <Box sx={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: 36 }}>
                      {Array.from({ length: 14 }).map((_, i) => <Box key={i} className="waveform-bar" sx={{ animationDelay: `${i*0.07}s`, animationDuration: `${0.6+(i%3)*0.2}s` }} />)}
                    </Box>
                    <Box sx={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', p: '10px 16px', width: '100%', fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.55, fontStyle: 'italic', fontFamily: "'DM Mono',monospace" }}>
                      "Tell me about a time you led a cross-functional team through a challenging project..."
                    </Box>
                  </Box>
                </Box>
              </SoftCard>
              <GlassCard sx={{ position: 'absolute', bottom: 28, left: -22, p: '14px 18px', width: 158, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                <Typography sx={{ fontSize: 11, fontWeight: 600, color: COLORS.textMuted, mb: 1, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Score</Typography>
                <Typography sx={{ fontSize: 32, fontWeight: 700, color: COLORS.indigo, letterSpacing: '-0.04em', lineHeight: 1 }}>87<Box component="span" sx={{ fontSize: 15, color: COLORS.textLight }}>/100</Box></Typography>
                <Typography sx={{ fontSize: 12, color: COLORS.green, fontWeight: 600, mt: '4px' }}>↑ Excellent</Typography>
              </GlassCard>
              <GlassCard sx={{ position: 'absolute', top: 0, right: -12, p: '12px 16px', width: 148, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
                <Typography sx={{ fontSize: 11, fontWeight: 600, color: COLORS.textMuted, mb: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Progress</Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>3 / 8 Questions</Typography>
                <Box sx={{ mt: 1, height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.07)' }}>
                  <Box sx={{ width: '37%', height: '100%', borderRadius: 2, background: `linear-gradient(90deg,${COLORS.indigo},${COLORS.lavender})` }} />
                </Box>
              </GlassCard>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* PROBLEM */}
      <Box component="section" sx={{ py: '72px', px: '48px', maxWidth: 1140, mx: 'auto' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '56px', alignItems: 'start' }}>
          <Box>
            <SectionLabel>The Problem</SectionLabel>
            <Typography variant="h2" sx={{ fontSize: 'clamp(30px,3.2vw,46px)', mb: '18px' }}>
              Hiring is broken.<br /><Box component="span" sx={{ color: COLORS.textLight, fontWeight: 400 }}>We're fixing it.</Box>
            </Typography>
            <Typography sx={{ fontSize: 16, lineHeight: 1.7, color: COLORS.textMuted, maxWidth: 420 }}>Traditional interviews fail both sides — riddled with bias, inconsistency, and wasted time.</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
            {[
              { icon: 'shield', label: 'Interviewer Bias', desc: 'Interviewers unconsciously favor candidates similar to themselves.', color: COLORS.red },
              { icon: 'chart', label: 'Inconsistent Scoring', desc: 'No two interviews are evaluated the same way.', color: COLORS.amber },
              { icon: 'zap', label: 'Fragmented Tools', desc: 'Teams juggle Zoom, spreadsheets, and email — data gets lost.', color: COLORS.purple },
              { icon: 'clock', label: 'High Screening Cost', desc: 'Senior engineers spend hours on calls AI could handle instantly.', color: COLORS.blue },
            ].map((item, i) => (
              <SoftCard key={i} sx={{ p: '16px 20px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <Box sx={{ width: 36, height: 36, borderRadius: '10px', background: alpha(item.color, 0.08), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={item.icon} size={16} color={item.color} /></Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: 14, mb: '3px' }}>{item.label}</Typography>
                  <Typography sx={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.5 }}>{item.desc}</Typography>
                </Box>
              </SoftCard>
            ))}
          </Box>
        </Box>
      </Box>

      {/* HOW IT WORKS */}
      <Box id="features" component="section" sx={{ py: '56px', px: '48px', background: alpha(COLORS.indigo, 0.025), borderTop: `1px solid ${alpha(COLORS.indigo, 0.06)}`, borderBottom: `1px solid ${alpha(COLORS.indigo, 0.06)}` }}>
        <Box sx={{ maxWidth: 1140, mx: 'auto' }}>
          <Box sx={{ textAlign: 'center', mb: '46px' }}>
            <SectionLabel>How It Works</SectionLabel>
            <Typography variant="h2" sx={{ fontSize: 'clamp(26px,2.8vw,40px)' }}>Three steps to smarter hiring</Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: '14px' }}>
            <SoftCard dark sx={{ p: '38px 40px', color: 'white', cursor: 'default' }}>
              <Typography sx={{ fontSize: 12, fontWeight: 700, color: COLORS.lavender, letterSpacing: '0.1em', mb: '14px' }}>STEP 01</Typography>
              <Typography variant="h3" sx={{ fontSize: 24, color: 'white', mb: '12px' }}>Set Up Your Interview</Typography>
              <Typography sx={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', mb: '26px' }}>Choose your role, define required skills, and let AI generate a structured question set. Ready in 2 minutes.</Typography>
              <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['Custom Questions','Auto-Generated','Skill-Based','Manual Mode'].map(t => (
                  <Box key={t} sx={{ background: 'rgba(91,93,246,0.22)', border: '1px solid rgba(91,93,246,0.32)', borderRadius: '20px', px: '12px', py: '4px', fontSize: 12, fontWeight: 600, color: COLORS.lavender }}>{t}</Box>
                ))}
              </Box>
            </SoftCard>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { step: '02', title: 'AI Conducts the Interview', desc: 'The AI speaks, listens, and evaluates in real-time.', icon: 'brain', color: COLORS.indigo },
                { step: '03', title: 'Get Structured Reports', desc: 'Receive per-question scores, strengths, and analytics.', icon: 'chart', color: COLORS.green },
              ].map(c => (
                <SoftCard key={c.step} sx={{ p: '24px 26px', flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: '10px' }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 700, color: COLORS.textLight, letterSpacing: '0.1em' }}>STEP {c.step}</Typography>
                    <Box sx={{ width: 34, height: 34, borderRadius: '10px', background: alpha(c.color, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={c.icon} size={16} color={c.color} /></Box>
                  </Box>
                  <Typography variant="h6" sx={{ fontSize: 16, mb: '7px' }}>{c.title}</Typography>
                  <Typography sx={{ fontSize: 13, lineHeight: 1.6, color: COLORS.textMuted }}>{c.desc}</Typography>
                </SoftCard>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* FEATURES BENTO */}
      <Box component="section" sx={{ py: '72px', px: '48px', maxWidth: 1140, mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: '48px' }}>
          <SectionLabel>Features</SectionLabel>
          <Typography variant="h2" sx={{ fontSize: 'clamp(26px,2.8vw,40px)' }}>Everything you need, nothing you don't</Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
          {[
            { icon: 'mic', title: 'Real-Time Voice AI', desc: 'Sub-2s AI responses with natural conversational flow.', wide: true, color: COLORS.indigo },
            { icon: 'chart', title: 'Deep Analytics', desc: 'Per-question scoring, clarity, and benchmarks.', color: COLORS.purple },
            { icon: 'shield', title: 'Bias-Free Evaluation', desc: 'Standardized rubrics applied identically, every time.', color: COLORS.pink },
            { icon: 'zap', title: 'Instant Transcription', desc: 'Accurate speech-to-text with real-time processing.', color: COLORS.amber },
            { icon: 'users', title: 'Team Collaboration', desc: 'Share reports and make hiring decisions together.', color: COLORS.green },
          ].map((f, i) => (
            <SoftCard key={i} sx={{ p: '26px 28px', gridColumn: f.wide ? '1/span 2' : 'auto', display: 'flex', flexDirection: f.wide ? 'row' : 'column', gap: f.wide ? '22px' : '12px', alignItems: f.wide ? 'center' : 'flex-start', '&:hover': { borderColor: alpha(f.color, 0.16), boxShadow: `0 12px 40px ${alpha(f.color, 0.08)}` } }}>
              <Box sx={{ width: 44, height: 44, borderRadius: '13px', background: alpha(f.color, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={f.icon} size={20} color={f.color} /></Box>
              <Box>
                <Typography variant="h6" sx={{ fontSize: f.wide ? 19 : 15, mb: '6px' }}>{f.title}</Typography>
                <Typography sx={{ fontSize: 13, lineHeight: 1.6, color: COLORS.textMuted }}>{f.desc}</Typography>
              </Box>
            </SoftCard>
          ))}
        </Box>
      </Box>

      {/* FOR TEAMS */}
      <Box id="for-teams" component="section" sx={{ py: '80px', px: '48px', background: COLORS.dark }}>
        <Box sx={{ maxWidth: 1140, mx: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          <Box>
            <SectionLabel>For Teams</SectionLabel>
            <Typography variant="h2" sx={{ fontSize: 'clamp(26px,3vw,42px)', color: 'white', mb: '18px' }}>Built for hiring teams at every scale.</Typography>
            <Typography sx={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', mb: '32px' }}>From 5-person startups to enterprise recruiting ops — Intervuew adapts to your workflow, not the other way around.</Typography>
            <GradientButton size="lg" to="/for-teams">Explore Team Features →</GradientButton>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {[
              { icon: 'users', label: 'Multi-seat Access', desc: 'Invite your whole team' },
              { icon: 'chart', label: 'Shared Analytics', desc: 'Centralised candidate data' },
              { icon: 'shield', label: 'Role Permissions', desc: 'Granular access controls' },
              { icon: 'zap', label: 'ATS Integrations', desc: 'Works with your stack' },
            ].map((f, i) => (
              <SoftCard key={i} sx={{ p: '20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', '&:hover': { background: 'rgba(255,255,255,0.07)', transform: 'translateY(-2px)' } }}>
                <Box sx={{ width: 34, height: 34, borderRadius: '10px', background: alpha(COLORS.indigo, 0.2), display: 'flex', alignItems: 'center', justifyContent: 'center', mb: '12px' }}><Icon name={f.icon} size={16} color={COLORS.lavender} /></Box>
                <Typography sx={{ fontWeight: 600, fontSize: 13, color: 'white', mb: '4px' }}>{f.label}</Typography>
                <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{f.desc}</Typography>
              </SoftCard>
            ))}
          </Box>
        </Box>
      </Box>

      {/* PRICING */}
      <Box id="pricing" component="section" sx={{ py: '80px', px: '48px', maxWidth: 1140, mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: '52px' }}>
          <SectionLabel>Pricing</SectionLabel>
          <Typography variant="h2" sx={{ fontSize: 'clamp(26px,2.8vw,40px)', mb: '14px' }}>Simple, transparent pricing</Typography>
          <Typography sx={{ fontSize: 16, color: COLORS.textMuted }}>Start free. Scale as you grow.</Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', mb: '32px' }}>
          {[
            { plan: 'Free', price: '$0', sub: 'Forever free', features: ['5 interviews/month','AI scoring','Basic reports','1 seat'], cta: 'Get started', highlight: false },
            { plan: 'Pro', price: '$49', sub: 'per month', features: ['Unlimited interviews','Advanced analytics','Custom questions','5 seats','Priority support'], cta: 'Start Pro trial', highlight: true },
            { plan: 'Enterprise', price: 'Custom', sub: 'contact us', features: ['Unlimited everything','ATS integrations','SSO & SAML','Dedicated CSM','SLA guarantee'], cta: 'Contact sales', highlight: false },
          ].map(p => (
            <SoftCard key={p.plan} sx={{ p: '32px 28px', position: 'relative', border: p.highlight ? `2px solid ${COLORS.indigo}` : '1px solid rgba(0,0,0,0.04)', boxShadow: p.highlight ? `0 20px 60px ${alpha(COLORS.indigo, 0.15)}` : undefined }}>
              {p.highlight && <Box sx={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: `linear-gradient(135deg,${COLORS.indigo},${COLORS.lavender})`, borderRadius: '20px', px: '14px', py: '4px', fontSize: 11, fontWeight: 700, color: 'white', whiteSpace: 'nowrap' }}>MOST POPULAR</Box>}
              <Typography sx={{ fontSize: 12, fontWeight: 700, color: COLORS.textMuted, letterSpacing: '0.07em', textTransform: 'uppercase', mb: '8px' }}>{p.plan}</Typography>
              <Typography sx={{ fontSize: 42, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, mb: '4px' }}>{p.price}</Typography>
              <Typography sx={{ fontSize: 13, color: COLORS.textMuted, mb: '24px' }}>{p.sub}</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', mb: '28px' }}>
                {p.features.map(f => (
                  <Box key={f} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Box sx={{ width: 18, height: 18, borderRadius: '50%', background: alpha(COLORS.green, 0.12), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="check" size={11} color={COLORS.green} /></Box>
                    <Typography sx={{ fontSize: 13, color: COLORS.textMuted }}>{f}</Typography>
                  </Box>
                ))}
              </Box>
              <GradientButton fullWidth variant={p.highlight ? 'gradient' : 'ghost'} to={p.plan === 'Enterprise' ? '/contact' : '/login'}>{p.cta}</GradientButton>
            </SoftCard>
          ))}
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography onClick={() => nav('/pricing')} sx={{ fontSize: 14, color: COLORS.indigo, cursor: 'pointer', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}>View full pricing details →</Typography>
        </Box>
      </Box>

      {/* CTA */}
      <Box component="section" sx={{ mx: '48px', mb: '64px', borderRadius: '28px', background: 'linear-gradient(135deg,#0F1115 0%,#161A22 60%,#1a1d2e 100%)', p: '60px 48px', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: -80, right: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(91,93,246,0.3) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <Box sx={{ textAlign: 'center', position: 'relative' }}>
          <Typography variant="h2" sx={{ fontSize: 'clamp(30px,4vw,50px)', color: 'white', mb: '14px' }}>Ready to interview smarter?</Typography>
          <Typography sx={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', mb: '34px', maxWidth: 380, mx: 'auto' }}>Join 500+ companies using Intervuew to find better talent, faster.</Typography>
          <Box sx={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <GradientButton size="lg" to="/login">Start free — no card needed</GradientButton>
            <GradientButton variant="dark" size="lg" to="/demo">Book a demo</GradientButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Landing;
