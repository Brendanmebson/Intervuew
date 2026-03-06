import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { SoftCard, GradientButton, SectionLabel } from '../components/shared';
import { COLORS } from '../theme/theme';

const sections = [
  { title: '1. What We Collect', body: 'We collect information you provide directly (name, email, company), usage data (pages visited, features used), and interview session data (transcripts, scores, audio recordings where applicable). We do not collect data from passive browsing on public pages.' },
  { title: '2. How We Use Your Data', body: "We use your data to operate and improve the Intervuew platform, generate interview reports and analytics, send you product updates you've opted into, and comply with legal obligations. We do not sell your data to third parties." },
  { title: '3. Data Sharing', body: 'We share data with infrastructure providers (AWS, Vercel) under strict data processing agreements. We may share aggregated, anonymised benchmarking data. We will disclose data if required by law or to protect legal rights.' },
  { title: '4. Data Retention', body: 'Interview transcripts and reports are retained for 24 months by default. You can delete any session at any time from your dashboard. Account data is deleted within 30 days of account closure.' },
  { title: '5. Security', body: 'All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We are SOC 2 Type II certified and conduct annual penetration tests. Access to customer data is restricted to authorised personnel only.' },
  { title: '6. Your Rights (GDPR)', body: 'If you are in the EEA or UK, you have the right to access, correct, delete, or export your data at any time. To exercise these rights, email privacy@intervuew.ai. We will respond within 30 days.' },
  { title: '7. Cookies', body: 'We use essential cookies for authentication and session management. We use analytics cookies (Posthog) to understand product usage. You can opt out of analytics cookies via the cookie banner or your browser settings.' },
  { title: '8. Contact', body: 'For privacy-related questions, contact our Data Protection Officer at dpo@intervuew.ai or write to: Intervuew Ltd, 123 Tech Street, London, EC1A 1BB, United Kingdom.' },
];

const Privacy: React.FC = () => {
  const nav = useNavigate();
  return (
  <Box sx={{ minHeight: '100vh', pt: '64px', background: COLORS.bg }}>
    <Box sx={{ maxWidth: 800, mx: 'auto', px: '48px', pt: '48px', pb: '72px' }}>
      <SectionLabel>Legal</SectionLabel>
      <Typography variant="h1" sx={{ fontSize: 'clamp(32px,4vw,50px)', mb: '12px' }}>Privacy Policy</Typography>
      <Typography sx={{ fontSize: 14, color: COLORS.textMuted, mb: '48px' }}>Last updated: 1 March 2025 · Effective immediately</Typography>
      <Typography sx={{ fontSize: 16, lineHeight: 1.8, color: COLORS.textMuted, mb: '48px', p: '24px', borderRadius: '16px', background: alpha(COLORS.indigo, 0.04), border: `1px solid ${alpha(COLORS.indigo, 0.1)}` }}>
        Intervuew ("we", "our", "us") is committed to protecting your personal data. This policy explains what we collect, why, and how we keep it safe. If you have questions, email us at <Box component="span" sx={{ color: COLORS.indigo, fontWeight: 500 }}>privacy@intervuew.ai</Box>.
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {sections.map((s, i) => (
          <SoftCard key={i} sx={{ p: '28px 32px' }}>
            <Typography variant="h5" sx={{ fontSize: 17, mb: '10px' }}>{s.title}</Typography>
            <Typography sx={{ fontSize: 14, lineHeight: 1.8, color: COLORS.textMuted }}>{s.body}</Typography>
          </SoftCard>
        ))}
      </Box>
      <Box sx={{ mt: '48px', p: '24px', borderRadius: '16px', background: '#F3F4F6', textAlign: 'center' }}>
        <Typography sx={{ fontSize: 14, color: COLORS.textMuted, mb: '16px' }}>Questions about this policy?</Typography>
        <GradientButton variant="ghost" onClick={() => nav('/contact')} sx={{ mx: 'auto' }}>Contact our DPO</GradientButton>
      </Box>
    </Box>
  </Box>
);
}

export default Privacy;
