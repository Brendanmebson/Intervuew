import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, alpha, ToggleButtonGroup,
  ToggleButton, InputAdornment, IconButton, Alert, Chip,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { UserRole } from '../../types';
import { Visibility, VisibilityOff, Psychology, Business, Person, WorkOutline } from '@mui/icons-material';
import GradientButton from '../../components/common/GradientButton';

interface LocationState {
  prefillEmail?: string;
  prefillRole?: UserRole;
  from?: string;
  jobTitle?: string;
  company?: string;
}

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Read state passed from CandidateApplyPage (or anywhere else)
  const state = (location.state as LocationState) ?? {};
  const comingFromApply = state.from === 'apply';

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [role, setRole] = useState<UserRole>(state.prefillRole ?? 'organization');
  const [email, setEmail] = useState(state.prefillEmail ?? 'demo@acme.com');
  const [password, setPassword] = useState('password');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    login(email, password, role);

    if (role === 'organization') {
      navigate('/org/dashboard');
    } else {
      // Prepper: go to their dashboard (which will show the pending interview)
      navigate('/prepper/dashboard');
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      bgcolor: '#F8F9FC', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background blobs */}
      <Box sx={{
        position: 'absolute', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(91, 94, 246, 0.72) 0%, transparent 70%)',
        top: '-200px', right: '-200px',
      }} />
      <Box sx={{
        position: 'absolute', width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(154, 143, 255, 0.81) 0%, transparent 70%)',
        bottom: '-150px', left: '-150px',
      }} />

      <Box sx={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 440, px: 3 }}>

        {/* Coming-from-apply context banner */}
        {comingFromApply && (
          <Box sx={{
            mb: 3, p: 2.5, borderRadius: 3,
            bgcolor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
            border: `1px solid ${alpha('#5B5DF6', 0.15)}`,
            display: 'flex', alignItems: 'center', gap: 2,
          }}>
            <Box sx={{
              width: 40, height: 40, borderRadius: 1.5, flexShrink: 0,
              background: 'linear-gradient(135deg, #5B5DF6, #9B8FFF)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <WorkOutline sx={{ color: '#fff', fontSize: 18 }} />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: '0.875rem', mb: 0.25 }}>
                Application received!
              </Typography>
              <Typography variant="caption" sx={{ color: '#5A5E72' }}>
                Sign in as <strong>Prepper</strong> to start your AI interview
                {state.jobTitle ? ` for ${state.jobTitle}` : ''}{state.company ? ` at ${state.company}` : ''}.
              </Typography>
            </Box>
          </Box>
        )}

        {/* Glass card */}
        <Box sx={{
          bgcolor: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px)',
          borderRadius: 4,
          border: `1px solid ${alpha('#5B5DF6', 0.1)}`,
          boxShadow: '0px 24px 64px rgba(91,93,246,0.1)',
          p: 4,
        }}>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Box sx={{
              width: 48, height: 48, borderRadius: 2.5, mx: 'auto', mb: 2,
              background: 'linear-gradient(135deg, #5B5DF6, #9B8FFF)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Psychology sx={{ color: '#fff', fontSize: 26 }} />
            </Box>
          </Box>

          <Typography variant="h4" sx={{ mb: 0.5, textAlign: 'center', fontSize: '1.375rem' }}>
            {mode === 'signin' ? 'Welcome back' : 'Create account'}
          </Typography>
          <Typography variant="body2" sx={{ color: '#8B8FA8', textAlign: 'center', mb: 2 }}>
            {mode === 'signin' ? 'Sign in to continue to Intervuew' : 'Start your free journey today'}
          </Typography>

          {/* Role Toggle */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="caption" sx={{ color: '#8B8FA8', fontWeight: 600, letterSpacing: '0.08em', mb: 1, display: 'block' }}>
              I AM A
            </Typography>
            <ToggleButtonGroup
              value={role}
              exclusive
              onChange={(_e, v) => v && setRole(v)}
              fullWidth
              sx={{
                '& .MuiToggleButton-root': {
                  borderRadius: '10px !important',
                  border: `1px solid ${alpha('#5B5DF6', 0.15)} !important`,
                  color: '#8B8FA8',
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  py: 1.25,
                  transition: 'all 200ms',
                  '&.Mui-selected': {
                    bgcolor: alpha('#5B5DF6', 0.08),
                    color: '#5B5DF6',
                    fontWeight: 600,
                    border: `1px solid ${alpha('#5B5DF6', 0.3)} !important`,
                  },
                },
                gap: 1,
              }}
            >
              <ToggleButton value="organization" disableRipple>
                <Business sx={{ fontSize: 16, mr: 1 }} />
                Organization
              </ToggleButton>
              <ToggleButton value="prepper" disableRipple>
                <Person sx={{ fontSize: 16, mr: 1 }} />
                Prepper
              </ToggleButton>
            </ToggleButtonGroup>

            {/* Show hint when coming from apply and prepper is selected */}
            {comingFromApply && role === 'prepper' && state.prefillEmail && (
              <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  label={`Signing in as ${state.prefillEmail}`}
                  size="small"
                  sx={{ bgcolor: alpha('#22C55E', 0.1), color: '#22C55E', fontWeight: 600, fontSize: '0.7rem', height: 22 }}
                />
              </Box>
            )}
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2, fontSize: '0.8125rem' }}>
              {error}
            </Alert>
          )}

          {mode === 'signup' && (
            <TextField
              label="Full Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
            />
          )}

          <TextField
            label="Email address"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Password"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} size="small" edge="end">
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <GradientButton fullWidth size="large" onClick={handleSubmit} sx={{ mb: 2.5, py: 1.5 }}>
            {mode === 'signin'
              ? comingFromApply && role === 'prepper'
                ? 'Sign In & Go to Dashboard'
                : 'Sign In'
              : 'Create Account'}
          </GradientButton>

          <Typography sx={{ textAlign: 'center', fontSize: '0.875rem', color: '#8B8FA8' }}>
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <Box
              component="span"
              sx={{ color: '#5B5DF6', fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </Box>
          </Typography>
        </Box>

        <Typography sx={{ textAlign: 'center', mt: 3, fontSize: '0.75rem', color: '#B0B3C6' }}>
          By continuing, you agree to our Terms & Privacy Policy
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthPage;