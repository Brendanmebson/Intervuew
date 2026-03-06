import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icons';
import { SoftCard, GradientButton, OrbBackground, SectionLabel } from '../components/shared';
import { COLORS } from '../theme/theme';

const plans = [
  {
    name: 'Free', monthlyPrice: 0, annualPrice: 0, sub: 'Perfect for trying it out',
    features: ['5 interviews / month','AI scoring & transcript','Basic PDF report','1 seat','Email support'],
    missing: ['Custom question banks','Team sharing','ATS integrations','Advanced analytics'],
    cta: 'Get started free', highlight: false,
  },
  {
    name: 'Pro', monthlyPrice: 49, annualPrice: 39, sub: 'For growing teams',
    features: ['Unlimited interviews','Advanced analytics','Custom question banks','5 seats','Team sharing & comments','Priority support','PDF & CSV export'],
    missing: ['ATS integrations','SSO / SAML','Dedicated CSM'],
    cta: 'Start Pro trial', highlight: true,
  },
  {
    name: 'Enterprise', monthlyPrice: null, annualPrice: null, sub: 'For large organisations',
    features: ['Unlimited everything','ATS & HRIS integrations','SSO / SAML / SCIM','Unlimited seats','Dedicated CSM','SLA guarantee','Custom data retention','On-prem option'],
    missing: [],
    cta: 'Contact sales', highlight: false,
  },
];

const faqs = [
  { q: 'Can I change plans at any time?', a: 'Yes. Upgrades take effect immediately; downgrades apply at the end of your billing period.' },
  { q: 'What counts as an interview?', a: 'A completed interview session. Abandoned sessions (under 2 minutes) are not counted.' },
  { q: 'Is there a free trial for Pro?', a: 'Yes — 14 days, no credit card required. All Pro features unlocked from day one.' },
  { q: 'Do you offer discounts for nonprofits?', a: 'We offer 40% off all paid plans for registered nonprofits and educational institutions. Contact us.' },
  { q: 'Where is data stored?', a: 'All data is stored in the EU by default (AWS eu-west-1). US and APAC regions available on Enterprise.' },
  { q: 'What ATS systems do you integrate with?', a: 'Greenhouse, Lever, Workday, BambooHR, Teamtailor, SmartRecruiters, and 30+ more. Custom webhooks on Enterprise.' },
];

const Pricing: React.FC = () => {
  const nav = useNavigate();
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Box sx={{ pt: '64px' }}>
      {/* Hero */}
      <Box sx={{ position: 'relative', py: '80px', px: '48px', overflow: 'hidden', textAlign: 'center' }}>
        <Box className="dot-grid" sx={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
        <OrbBackground />
        <Box sx={{ position: 'relative' }}>
          <SectionLabel>Pricing</SectionLabel>
          <Typography variant="h1" sx={{ fontSize: 'clamp(36px,5vw,60px)', mb: '16px', letterSpacing: '-0.03em' }}>Simple, transparent pricing</Typography>
          <Typography sx={{ fontSize: 18, color: COLORS.textMuted, mb: '36px' }}>Start free. Scale when you're ready.</Typography>
          {/* Toggle */}
          <Box sx={{ display: 'inline-flex', background: '#F3F4F6', borderRadius: '14px', p: '4px' }}>
            {['Monthly', 'Annual'].map(m => (
              <Box key={m} component="button" onClick={() => setAnnual(m === 'Annual')} sx={{ px: '20px', py: '9px', border: 'none', borderRadius: '11px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", transition: 'all 0.2s', background: (m === 'Annual') === annual ? COLORS.indigo : 'transparent', color: (m === 'Annual') === annual ? 'white' : COLORS.textMuted }}>{m}{m === 'Annual' && <Box component="span" sx={{ ml: '6px', background: alpha(COLORS.green, 0.2), color: COLORS.green, fontSize: 10, fontWeight: 700, px: '6px', py: '2px', borderRadius: '6px' }}>-20%</Box>}</Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Plans */}
      <Box sx={{ maxWidth: 1060, mx: 'auto', px: '48px', pb: '72px' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
          {plans.map(p => (
            <SoftCard key={p.name} sx={{ p: '36px 30px', position: 'relative', border: p.highlight ? `2px solid ${COLORS.indigo}` : '1px solid rgba(0,0,0,0.06)', boxShadow: p.highlight ? `0 20px 60px ${alpha(COLORS.indigo, 0.15)}` : undefined }}>
              {p.highlight && (
                <Box sx={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: `linear-gradient(135deg,${COLORS.indigo},${COLORS.lavender})`, borderRadius: '20px', px: '16px', py: '5px', fontSize: 11, fontWeight: 700, color: 'white', whiteSpace: 'nowrap' }}>MOST POPULAR</Box>
              )}
              <Typography sx={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', mb: '8px' }}>{p.name}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '4px', mb: '6px' }}>
                {p.monthlyPrice !== null ? (
                  <>
                    <Typography sx={{ fontSize: 44, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1 }}>${annual ? p.annualPrice : p.monthlyPrice}</Typography>
                    <Typography sx={{ fontSize: 14, color: COLORS.textMuted }}>/mo</Typography>
                  </>
                ) : (
                  <Typography sx={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1 }}>Custom</Typography>
                )}
              </Box>
              <Typography sx={{ fontSize: 13, color: COLORS.textMuted, mb: '28px' }}>{p.sub}{annual && p.monthlyPrice !== null && p.monthlyPrice! > 0 && <Box component="span" sx={{ ml: '6px', color: COLORS.green, fontWeight: 600 }}>billed annually</Box>}</Typography>
              <GradientButton fullWidth variant={p.highlight ? 'gradient' : 'ghost'} onClick={() => nav(p.name === 'Enterprise' ? '/contact' : '/login')} sx={{ mb: '28px' }}>{p.cta}</GradientButton>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {p.features.map(f => (
                  <Box key={f} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Box sx={{ width: 18, height: 18, borderRadius: '50%', background: alpha(COLORS.green, 0.12), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="check" size={10} color={COLORS.green} /></Box>
                    <Typography sx={{ fontSize: 13, color: COLORS.textMuted }}>{f}</Typography>
                  </Box>
                ))}
                {p.missing.map(f => (
                  <Box key={f} sx={{ display: 'flex', gap: '8px', alignItems: 'center', opacity: 0.38 }}>
                    <Box sx={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Box sx={{ width: 8, height: 1.5, background: COLORS.textLight, borderRadius: 1 }} /></Box>
                    <Typography sx={{ fontSize: 13, color: COLORS.textLight }}>{f}</Typography>
                  </Box>
                ))}
              </Box>
            </SoftCard>
          ))}
        </Box>
      </Box>

      {/* FAQ */}
      <Box sx={{ background: alpha(COLORS.indigo, 0.025), borderTop: `1px solid ${alpha(COLORS.indigo, 0.07)}`, py: '72px', px: '48px' }}>
        <Box sx={{ maxWidth: 720, mx: 'auto' }}>
          <Box sx={{ textAlign: 'center', mb: '48px' }}>
            <SectionLabel>FAQ</SectionLabel>
            <Typography variant="h2" sx={{ fontSize: 'clamp(26px,3vw,38px)' }}>Common questions</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {faqs.map((f, i) => (
              <SoftCard key={i} sx={{ p: 0, overflow: 'hidden', cursor: 'pointer' }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <Box sx={{ px: '24px', py: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                  <Typography sx={{ fontWeight: 600, fontSize: 15 }}>{f.q}</Typography>
                  <Box sx={{ transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s ease', flexShrink: 0, fontSize: 20, color: COLORS.textMuted }}>+</Box>
                </Box>
                {openFaq === i && (
                  <Box sx={{ px: '24px', pb: '18px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    <Typography sx={{ fontSize: 14, lineHeight: 1.7, color: COLORS.textMuted, pt: '12px' }}>{f.a}</Typography>
                  </Box>
                )}
              </SoftCard>
            ))}
          </Box>
        </Box>
      </Box>

      {/* CTA */}
      <Box sx={{ maxWidth: 1140, mx: 'auto', px: '48px', py: '80px', textAlign: 'center' }}>
        <Typography variant="h2" sx={{ fontSize: 'clamp(28px,3.5vw,44px)', mb: '14px' }}>Start hiring smarter today</Typography>
        <Typography sx={{ fontSize: 16, color: COLORS.textMuted, mb: '36px' }}>Free forever plan. No credit card required.</Typography>
        <Box sx={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <GradientButton size="lg" to="/login">Get started free</GradientButton>
          <GradientButton variant="ghost" size="lg" to="/contact">Talk to sales</GradientButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Pricing;
