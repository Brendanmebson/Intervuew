import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import SidebarLayout from '../components/SidebarLayout';
import { SoftCard, GradientButton } from '../components/shared';
import { COLORS } from '../theme/theme';

const Toggle: React.FC<{ value: boolean; onChange: (v: boolean) => void }> = ({ value, onChange }) => (
  <Box
    onClick={() => onChange(!value)}
    sx={{
      width: 44, height: 24, borderRadius: 12, cursor: 'pointer', position: 'relative',
      background: value ? `linear-gradient(135deg,${COLORS.indigo},${COLORS.lavender})` : 'rgba(0,0,0,0.12)',
      transition: 'background 0.2s',
      flexShrink: 0,
    }}
  >
    <Box sx={{
      position: 'absolute', top: 3, left: value ? 23 : 3, width: 18, height: 18,
      borderRadius: '50%', background: 'white',
      boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
      transition: 'left 0.2s cubic-bezier(0.4,0,0.2,1)',
    }} />
  </Box>
);

const Field: React.FC<{ label: string; value: string; onChange: (v: string) => void; type?: string }> = ({ label, value, onChange, type = 'text' }) => (
  <Box>
    <Typography sx={{ fontSize: 12, fontWeight: 600, color: COLORS.textMuted, mb: '6px' }}>{label}</Typography>
    <Box
      component="input"
      type={type}
      value={value}
      onChange={(e: any) => onChange(e.target.value)}
      sx={{
        width: '100%', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px',
        padding: '10px 14px', fontSize: 14, fontFamily: "'DM Sans',sans-serif",
        background: COLORS.bg, color: COLORS.text, outline: 'none',
        transition: 'border-color 0.15s',
        '&:focus': { borderColor: COLORS.indigo, background: COLORS.white },
      }}
    />
  </Box>
);

const Settings: React.FC = () => {
  const nav = useNavigate();

  // Profile state
  const [name, setName]   = useState('Alex Johnson');
  const [email, setEmail] = useState('alex@example.com');
  const [role, setRole]   = useState('Product Manager');

  // Notification prefs
  const [emailReports, setEmailReports]   = useState(true);
  const [sessionReminders, setReminders] = useState(false);
  const [weeklyDigest, setWeekly]        = useState(true);

  // Interview prefs
  const [defaultMode, setDefaultMode]   = useState<'Auto' | 'Manual'>('Auto');
  const [questionCount, setQuestionCount] = useState('5');
  const [difficulty, setDifficulty]       = useState<'Easy' | 'Medium' | 'Hard'>('Medium');

  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <SidebarLayout
      userLabel={name}
      userSub="Free plan"
      userInitial={name[0]}
      navItems={[
        { icon: 'home',     label: 'Dashboard',      to: '/dashboard' },
        { icon: 'mic',      label: 'Start Interview', to: '/interview' },
        { icon: 'clock',    label: 'History',         to: '/history' },
        { icon: 'chart',    label: 'Reports',         to: '/reports' },
        { icon: 'settings', label: 'Settings',        active: true },
      ]}
    >
      {/* Header */}
      <Box className="fade-up" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: '28px' }}>
        <Box>
          <Typography variant="h4" sx={{ fontSize: 25, mb: '4px' }}>Settings</Typography>
          <Typography sx={{ fontSize: 15, color: COLORS.textMuted }}>Manage your account and preferences</Typography>
        </Box>
        <GradientButton size="sm" onClick={handleSave} variant={saved ? 'success' as any : 'gradient'}>
          {saved ? '✓ Saved' : 'Save Changes'}
        </GradientButton>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* Profile */}
        <SoftCard className="fade-up-1" sx={{ p: '28px 30px' }}>
          <Typography variant="h6" sx={{ fontSize: 15, mb: '20px' }}>Profile</Typography>
          <Box sx={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
            {/* Avatar */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <Box sx={{
                width: 72, height: 72, borderRadius: '50%',
                background: `linear-gradient(135deg,${COLORS.indigo},${COLORS.lavender})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, fontWeight: 700, color: 'white',
              }}>
                {name[0]}
              </Box>
              <Typography sx={{ fontSize: 12, color: COLORS.indigo, cursor: 'pointer', fontWeight: 600 }}>
                Change photo
              </Typography>
            </Box>
            {/* Fields */}
            <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Field label="Full Name"        value={name}  onChange={setName} />
              <Field label="Email"            value={email} onChange={setEmail} type="email" />
              <Field label="Current Role"     value={role}  onChange={setRole} />
              <Box>
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: COLORS.textMuted, mb: '6px' }}>Plan</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Box sx={{ px: '12px', py: '8px', borderRadius: '12px', background: alpha(COLORS.indigo, 0.08), fontSize: 13, fontWeight: 600, color: COLORS.indigo }}>
                    Free Plan
                  </Box>
                  <Typography
                    onClick={() => nav('/pricing')}
                    sx={{ fontSize: 13, color: COLORS.indigo, cursor: 'pointer', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}
                  >
                    Upgrade →
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </SoftCard>

        {/* Interview Preferences */}
        <SoftCard className="fade-up-2" sx={{ p: '28px 30px' }}>
          <Typography variant="h6" sx={{ fontSize: 15, mb: '20px' }}>Interview Preferences</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            {/* Default mode */}
            <Box>
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: COLORS.textMuted, mb: '8px' }}>Default Mode</Typography>
              <Box sx={{ display: 'flex', gap: '8px' }}>
                {(['Auto', 'Manual'] as const).map(m => (
                  <Box
                    key={m}
                    onClick={() => setDefaultMode(m)}
                    sx={{
                      flex: 1, px: '14px', py: '9px', borderRadius: '12px', cursor: 'pointer',
                      textAlign: 'center', fontSize: 13, fontWeight: 600,
                      background: defaultMode === m ? alpha(COLORS.indigo, 0.1) : 'transparent',
                      color: defaultMode === m ? COLORS.indigo : COLORS.textMuted,
                      border: `1px solid ${defaultMode === m ? alpha(COLORS.indigo, 0.3) : 'rgba(0,0,0,0.08)'}`,
                      transition: 'all 0.15s',
                    }}
                  >
                    {m}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Question count */}
            <Box>
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: COLORS.textMuted, mb: '8px' }}>Questions per Session</Typography>
              <Box sx={{ display: 'flex', gap: '6px' }}>
                {['3', '5', '8', '10'].map(n => (
                  <Box
                    key={n}
                    onClick={() => setQuestionCount(n)}
                    sx={{
                      flex: 1, px: '8px', py: '9px', borderRadius: '10px', cursor: 'pointer',
                      textAlign: 'center', fontSize: 13, fontWeight: 600,
                      background: questionCount === n ? alpha(COLORS.indigo, 0.1) : 'transparent',
                      color: questionCount === n ? COLORS.indigo : COLORS.textMuted,
                      border: `1px solid ${questionCount === n ? alpha(COLORS.indigo, 0.3) : 'rgba(0,0,0,0.08)'}`,
                      transition: 'all 0.15s',
                    }}
                  >
                    {n}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Difficulty */}
            <Box>
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: COLORS.textMuted, mb: '8px' }}>Difficulty</Typography>
              <Box sx={{ display: 'flex', gap: '6px' }}>
                {(['Easy', 'Medium', 'Hard'] as const).map(d => {
                  const color = d === 'Easy' ? COLORS.green : d === 'Medium' ? COLORS.amber : COLORS.red;
                  return (
                    <Box
                      key={d}
                      onClick={() => setDifficulty(d)}
                      sx={{
                        flex: 1, px: '8px', py: '9px', borderRadius: '10px', cursor: 'pointer',
                        textAlign: 'center', fontSize: 12, fontWeight: 600,
                        background: difficulty === d ? alpha(color, 0.1) : 'transparent',
                        color: difficulty === d ? color : COLORS.textMuted,
                        border: `1px solid ${difficulty === d ? alpha(color, 0.3) : 'rgba(0,0,0,0.08)'}`,
                        transition: 'all 0.15s',
                      }}
                    >
                      {d}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </SoftCard>

        {/* Notifications */}
        <SoftCard className="fade-up-3" sx={{ p: '28px 30px' }}>
          <Typography variant="h6" sx={{ fontSize: 15, mb: '20px' }}>Notifications</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
            {[
              { label: 'Email Reports',      sub: 'Receive a report after each session',       val: emailReports,    set: setEmailReports },
              { label: 'Session Reminders',  sub: 'Get reminded to practice daily',            val: sessionReminders,set: setReminders },
              { label: 'Weekly Digest',      sub: 'Summary of your weekly performance',        val: weeklyDigest,    set: setWeekly },
            ].map((item, i, arr) => (
              <Box
                key={item.label}
                sx={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  py: '16px',
                  borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 600, mb: '2px' }}>{item.label}</Typography>
                  <Typography sx={{ fontSize: 12, color: COLORS.textMuted }}>{item.sub}</Typography>
                </Box>
                <Toggle value={item.val} onChange={item.set} />
              </Box>
            ))}
          </Box>
        </SoftCard>

        {/* Danger zone */}
        <SoftCard sx={{ p: '24px 30px', border: `1px solid ${alpha(COLORS.red, 0.15)}`, background: alpha(COLORS.red, 0.02) }}>
          <Typography variant="h6" sx={{ fontSize: 14, mb: '14px', color: COLORS.red }}>Danger Zone</Typography>
          <Box sx={{ display: 'flex', gap: '12px' }}>
            <GradientButton size="sm" variant="danger" onClick={() => {}}>Delete All Sessions</GradientButton>
            <GradientButton size="sm" variant="danger" onClick={() => nav('/login')}>Sign Out</GradientButton>
          </Box>
        </SoftCard>
      </Box>
    </SidebarLayout>
  );
};

export default Settings;