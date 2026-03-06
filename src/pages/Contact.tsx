import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Icon } from '../components/Icons';
import { SoftCard, GradientButton, SectionLabel } from '../components/shared';
import { COLORS, RADIUS } from '../theme/theme';

const Contact: React.FC = () => {
  const nav = useNavigate();
  const [sent, setSent] = useState(false);
  const inputSx = { '& .MuiOutlinedInput-root': { background: '#FAFAFA', borderRadius: RADIUS.input, fontSize: 14 }, '& .MuiInputLabel-root': { fontSize: 14, fontFamily: "'DM Sans',sans-serif" } };

  return (
    <Box sx={{ minHeight: '100vh', background: COLORS.bg, paddingTop: '64px' }}>
      <Box sx={{ maxWidth: 1100, mx: 'auto', px: '48px', pt: '70px', pb: '72px', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '64px', alignItems: 'start' }}>
        <Box>
          <SectionLabel>Contact</SectionLabel>
          <Typography variant="h2" sx={{ fontSize: 'clamp(28px,3.5vw,44px)', mb: '16px' }}>Let's talk.</Typography>
          <Typography sx={{ fontSize: 16, lineHeight: 1.7, color: COLORS.textMuted, mb: '40px' }}>Whether you're evaluating Intervuew for your team, need help with your account, or just have a question — we're here.</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {[
              { icon: 'zap', label: 'Sales', desc: 'hello@intervuew.ai', sub: 'For plans, pricing, and enterprise enquiries' },
              { icon: 'shield', label: 'Support', desc: 'support@intervuew.ai', sub: 'Help with your account or technical issues' },
              { icon: 'users', label: 'Partnerships', desc: 'partners@intervuew.ai', sub: 'ATS integrations and referral programs' },
            ].map((c, i) => (
              <Box key={i} sx={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <Box sx={{ width: 40, height: 40, borderRadius: '12px', background: alpha(COLORS.indigo, 0.08), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={c.icon} size={18} color={COLORS.indigo} /></Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 14, mb: '2px' }}>{c.label}</Typography>
                  <Typography sx={{ fontSize: 14, color: COLORS.indigo, fontWeight: 500, mb: '2px' }}>{c.desc}</Typography>
                  <Typography sx={{ fontSize: 12, color: COLORS.textMuted }}>{c.sub}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box sx={{ mt: '40px', p: '22px', borderRadius: '16px', background: alpha(COLORS.indigo, 0.04), border: `1px solid ${alpha(COLORS.indigo, 0.1)}` }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600, mb: '6px' }}>⚡ Usually replies within 2 hours</Typography>
            <Typography sx={{ fontSize: 13, color: COLORS.textMuted }}>Monday – Friday, 9am – 6pm GMT. Enterprise customers get 24/7 support.</Typography>
          </Box>
        </Box>
        <SoftCard sx={{ p: '36px' }}>
          {sent ? (
            <Box sx={{ textAlign: 'center', py: '24px' }}>
              <Box sx={{ width: 64, height: 64, borderRadius: '50%', background: alpha(COLORS.green, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: '18px' }}><Icon name="check" size={28} color={COLORS.green} /></Box>
              <Typography variant="h5" sx={{ mb: '10px' }}>Message sent!</Typography>
              <Typography sx={{ fontSize: 14, color: COLORS.textMuted, mb: '24px' }}>We'll get back to you within a few hours.</Typography>
              <GradientButton variant="ghost" onClick={() => nav('/')} sx={{ mx: 'auto' }}>Back to home</GradientButton>
            </Box>
          ) : (
            <>
              <Typography variant="h5" sx={{ fontSize: 20, mb: '6px' }}>Send us a message</Typography>
              <Typography sx={{ fontSize: 14, color: COLORS.textMuted, mb: '26px' }}>We read every message and reply personally.</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <TextField label="First name" fullWidth size="small" sx={inputSx} />
                  <TextField label="Last name" fullWidth size="small" sx={inputSx} />
                </Box>
                <TextField label="Work email" type="email" fullWidth size="small" sx={inputSx} />
                <TextField label="Company" fullWidth size="small" sx={inputSx} />
                <Box>
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: COLORS.textMuted, mb: '6px' }}>Topic</Typography>
                  <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['Sales & Pricing','Support','Enterprise','Partnership','Other'].map(t => (
                      <Box key={t} component="button" sx={{ px: '12px', py: '6px', border: '1.5px solid rgba(0,0,0,0.1)', borderRadius: '10px', background: 'transparent', color: COLORS.textMuted, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", transition: 'all 0.15s', '&:hover': { borderColor: COLORS.indigo, color: COLORS.indigo } }}>{t}</Box>
                    ))}
                  </Box>
                </Box>
                <TextField label="Message" multiline rows={4} fullWidth size="small" sx={inputSx} />
                <GradientButton fullWidth size="md" onClick={() => setSent(true)} sx={{ py: '13px' }}>Send message →</GradientButton>
              </Box>
            </>
          )}
        </SoftCard>
      </Box>
    </Box>
  );
};

export default Contact;
