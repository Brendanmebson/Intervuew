import React, { useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LogoSVG } from '../components/Icons';
import { SoftCard, GradientButton, OrbBackground } from '../components/shared';
import { COLORS, RADIUS } from '../theme/theme';
import { UserRole } from '../types';

const Login: React.FC = () => {
  const nav = useNavigate();
  const [role, setRole] = useState<UserRole>('prepper');
  const [isSignup, setIsSignup] = useState(false);
  const inputSx = { '& .MuiOutlinedInput-root': { background: '#FAFAFA', borderRadius: RADIUS.input, fontSize: 14 }, '& .MuiInputLabel-root': { fontSize: 14, fontFamily: "'DM Sans',sans-serif" } };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <Box className="dot-grid" sx={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
      <OrbBackground />
      <SoftCard className="fade-up" sx={{ width: 416, p: '44px 42px', position: 'relative' }}>
        <Box sx={{ textAlign: 'center', mb: '34px' }}>
          <Box onClick={() => nav('/')} sx={{ cursor: 'pointer', display: 'inline-block' }}><LogoSVG size={40} /></Box>
          <Typography variant="h5" sx={{ mt: '13px', mb: '6px', fontSize: 23 }}>{isSignup ? 'Create your account' : 'Welcome back'}</Typography>
          <Typography sx={{ fontSize: 14, color: COLORS.textMuted }}>{isSignup ? 'Start your free interview journey' : 'Sign in to continue'}</Typography>
        </Box>
        <Box sx={{ display: 'flex', background: '#F3F4F6', borderRadius: '14px', p: '4px', mb: '26px' }}>
          {([['prepper','👤 Prepper'],['org','🏢 Organization']] as [UserRole, string][]).map(([v, l]) => (
            <Box key={v} component="button" onClick={() => setRole(v)} sx={{ flex: 1, py: '9px', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", borderRadius: '11px', fontSize: 13, fontWeight: 600, transition: 'all 0.2s', background: role === v ? 'white' : 'transparent', color: role === v ? COLORS.indigo : COLORS.textMuted, boxShadow: role === v ? '0 2px 8px rgba(0,0,0,0.08)' : 'none' }}>{l}</Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
          {isSignup && <TextField label="Full Name" fullWidth size="small" sx={inputSx} />}
          <TextField label="Email" type="email" fullWidth size="small" sx={inputSx} />
          <TextField label="Password" type="password" fullWidth size="small" sx={inputSx} />
          {role === 'org' && isSignup && <TextField label="Company Name" fullWidth size="small" sx={inputSx} />}
          <GradientButton fullWidth size="md" onClick={() => nav(role === 'prepper' ? '/dashboard' : '/org')} sx={{ mt: '4px', py: '13px' }}>
            {isSignup ? 'Create Account →' : 'Sign In →'}
          </GradientButton>
        </Box>
        <Typography sx={{ textAlign: 'center', fontSize: 13, color: COLORS.textMuted, mt: '20px' }}>
          {isSignup ? 'Already have an account?' : 'New to Intervuew?'}{' '}
          <Box component="span" onClick={() => setIsSignup(!isSignup)} sx={{ color: COLORS.indigo, cursor: 'pointer', fontWeight: 600 }}>{isSignup ? 'Sign in' : 'Create account'}</Box>
        </Typography>
      </SoftCard>
    </Box>
  );
};

export default Login;
