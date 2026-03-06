import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import SidebarLayout from '../components/SidebarLayout';
import { SoftCard, GradientButton } from '../components/shared';
import { COLORS } from '../theme/theme';

const Toggle: React.FC<{ value: boolean; onChange: (v: boolean) => void }> = ({ value, onChange }) => (
  <Box onClick={() => onChange(!value)} sx={{ width: 44, height: 24, borderRadius: 12, cursor: 'pointer', position: 'relative', background: value ? `linear-gradient(135deg,${COLORS.indigo},${COLORS.lavender})` : 'rgba(0,0,0,0.12)', transition: 'background 0.2s', flexShrink: 0 }}>
    <Box sx={{ position: 'absolute', top: 3, left: value ? 23 : 3, width: 18, height: 18, borderRadius: '50%', background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.2s cubic-bezier(0.4,0,0.2,1)' }} />
  </Box>
);

const Field: React.FC<{ label: string; value: string; onChange: (v: string) => void; placeholder?: string }> = ({ label, value, onChange, placeholder }) => (
  <Box>
    <Typography sx={{ fontSize: 12, fontWeight: 600, color: COLORS.textMuted, mb: '6px' }}>{label}</Typography>
    <Box component="input" value={value} onChange={(e: any) => onChange(e.target.value)} placeholder={placeholder}
      sx={{ width: '100%', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', padding: '10px 14px', fontSize: 14, fontFamily: "'DM Sans',sans-serif", background: COLORS.bg, color: COLORS.text, outline: 'none', '&:focus': { borderColor: COLORS.indigo, background: COLORS.white } }} />
  </Box>
);

const OrgSettings: React.FC = () => {
  const nav = useNavigate();
  const [orgName, setOrgName]     = useState('Acme Corp');
  const [orgEmail, setOrgEmail]   = useState('hiring@acmecorp.com');
  const [orgWebsite, setWebsite]  = useState('https://acmecorp.com');
  const [adminName, setAdminName] = useState('Jordan Smith');
  const [adminEmail, setAdminEmail] = useState('jordan@acmecorp.com');

  const [emailReports, setEmailReports]       = useState(true);
  const [slackNotifs, setSlackNotifs]         = useState(false);
  const [weeklyDigest, setWeeklyDigest]       = useState(true);
  const [autoSchedule, setAutoSchedule]       = useState(false);
  const [requireApproval, setRequireApproval] = useState(true);

  const [defaultMode, setDefaultMode] = useState<'Auto' | 'Manual'>('Auto');
  const [questions, setQuestions]     = useState('5');

  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  // Team members mock
  const team = [
    { name: 'Jordan Smith',  role: 'Admin',     initials: 'JS', color: COLORS.indigo },
    { name: 'Casey Brown',   role: 'Recruiter', initials: 'CB', color: COLORS.green },
    { name: 'Taylor Nguyen', role: 'Hiring Mgr', initials: 'TN', color: COLORS.amber },
  ];

  return (
    <SidebarLayout
      userLabel="Acme Corp"
      userSub="Business plan"
      userInitial="A"
      navItems={[
        { icon: 'home',      label: 'Overview',   to: '/org' },
        { icon: 'briefcase', label: 'Job Roles',  to: '/org/roles' },
        { icon: 'users',     label: 'Candidates', to: '/org/candidates' },
        { icon: 'mic',       label: 'Interviews', to: '/org/interviews' },
        { icon: 'chart',     label: 'Analytics',  to: '/org/analytics' },
        { icon: 'settings',  label: 'Settings',   active: true, to: '/org/settings' },
      ]}
    >
      <Box className="fade-up" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: '28px' }}>
        <Box>
          <Typography variant="h4" sx={{ fontSize: 25, mb: '4px' }}>Settings</Typography>
          <Typography sx={{ fontSize: 15, color: COLORS.textMuted }}>Manage your organization and hiring preferences</Typography>
        </Box>
        <GradientButton size="sm" onClick={handleSave} variant={saved ? 'success' as any : 'gradient'}>
          {saved ? '✓ Saved' : 'Save Changes'}
        </GradientButton>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* Organization */}
        <SoftCard className="fade-up-1" sx={{ p: '26px 28px' }}>
          <Typography variant="h6" sx={{ fontSize: 14, mb: '18px' }}>Organization</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <Field label="Organization Name" value={orgName}    onChange={setOrgName}    placeholder="Acme Corp" />
            <Field label="Billing Email"     value={orgEmail}   onChange={setOrgEmail}   placeholder="billing@company.com" />
            <Field label="Website"           value={orgWebsite} onChange={setWebsite}    placeholder="https://..." />
          </Box>
        </SoftCard>

        {/* Admin account */}
        <SoftCard className="fade-up-1" sx={{ p: '26px 28px' }}>
          <Typography variant="h6" sx={{ fontSize: 14, mb: '18px' }}>Admin Account</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Field label="Admin Name"  value={adminName}  onChange={setAdminName}  placeholder="Your name" />
            <Field label="Admin Email" value={adminEmail} onChange={setAdminEmail} placeholder="you@company.com" />
          </Box>
        </SoftCard>

        {/* Team members */}
        <SoftCard className="fade-up-2" sx={{ p: '26px 28px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '18px' }}>
            <Typography variant="h6" sx={{ fontSize: 14 }}>Team Members</Typography>
            <GradientButton size="sm" variant="ghost">+ Invite Member</GradientButton>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {team.map((m, i) => (
              <Box key={m.name} sx={{ display: 'flex', alignItems: 'center', gap: '12px', py: '13px', borderBottom: i < team.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                <Box sx={{ width: 36, height: 36, borderRadius: '50%', background: alpha(m.color, 0.15), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: m.color }}>
                  {m.initials}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{m.name}</Typography>
                  <Typography sx={{ fontSize: 12, color: COLORS.textMuted }}>{m.role}</Typography>
                </Box>
                <Box sx={{ background: alpha(m.color, 0.1), color: m.color, borderRadius: '20px', px: '10px', py: '3px', fontSize: 11, fontWeight: 700 }}>{m.role}</Box>
                <Typography sx={{ fontSize: 13, color: COLORS.textMuted, cursor: 'pointer', '&:hover': { color: COLORS.red } }}>Remove</Typography>
              </Box>
            ))}
          </Box>
        </SoftCard>

        {/* Interview defaults */}
        <SoftCard className="fade-up-2" sx={{ p: '26px 28px' }}>
          <Typography variant="h6" sx={{ fontSize: 14, mb: '18px' }}>Interview Defaults</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <Box>
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: COLORS.textMuted, mb: '8px' }}>Default Mode</Typography>
              <Box sx={{ display: 'flex', gap: '8px' }}>
                {(['Auto', 'Manual'] as const).map(m => (
                  <Box key={m} onClick={() => setDefaultMode(m)}
                    sx={{ flex: 1, px: '14px', py: '9px', borderRadius: '12px', cursor: 'pointer', textAlign: 'center', fontSize: 13, fontWeight: 600, transition: 'all 0.15s',
                      background: defaultMode === m ? alpha(COLORS.indigo, 0.1) : 'transparent',
                      color: defaultMode === m ? COLORS.indigo : COLORS.textMuted,
                      border: `1px solid ${defaultMode === m ? alpha(COLORS.indigo, 0.3) : 'rgba(0,0,0,0.08)'}` }}>
                    {m}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box>
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: COLORS.textMuted, mb: '8px' }}>Questions per Interview</Typography>
              <Box sx={{ display: 'flex', gap: '8px' }}>
                {['3', '5', '8', '10'].map(n => (
                  <Box key={n} onClick={() => setQuestions(n)}
                    sx={{ flex: 1, px: '8px', py: '9px', borderRadius: '10px', cursor: 'pointer', textAlign: 'center', fontSize: 13, fontWeight: 600, transition: 'all 0.15s',
                      background: questions === n ? alpha(COLORS.indigo, 0.1) : 'transparent',
                      color: questions === n ? COLORS.indigo : COLORS.textMuted,
                      border: `1px solid ${questions === n ? alpha(COLORS.indigo, 0.3) : 'rgba(0,0,0,0.08)'}` }}>
                    {n}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </SoftCard>

        {/* Notifications */}
        <SoftCard className="fade-up-3" sx={{ p: '26px 28px' }}>
          <Typography variant="h6" sx={{ fontSize: 14, mb: '18px' }}>Notifications</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { label: 'Email Reports',      sub: 'Send report to recruiter after each interview', val: emailReports,    set: setEmailReports },
              { label: 'Slack Notifications',sub: 'Post results to a Slack channel',               val: slackNotifs,     set: setSlackNotifs },
              { label: 'Weekly Digest',      sub: 'Summary of weekly hiring activity',             val: weeklyDigest,    set: setWeeklyDigest },
              { label: 'Auto-Schedule',      sub: 'Automatically schedule follow-up interviews',   val: autoSchedule,    set: setAutoSchedule },
              { label: 'Require Approval',   sub: 'Require admin approval before moving candidates',val: requireApproval,set: setRequireApproval },
            ].map((item, i, arr) => (
              <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: '14px', borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                <Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 600, mb: '2px' }}>{item.label}</Typography>
                  <Typography sx={{ fontSize: 12, color: COLORS.textMuted }}>{item.sub}</Typography>
                </Box>
                <Toggle value={item.val} onChange={item.set} />
              </Box>
            ))}
          </Box>
        </SoftCard>

        {/* Plan */}
        <SoftCard sx={{ p: '22px 26px', background: 'linear-gradient(135deg,#0F1115,#1a1d2e)', border: 'none' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em', mb: '4px' }}>Current Plan</Typography>
              <Typography sx={{ fontSize: 20, fontWeight: 700, color: 'white', mb: '4px' }}>Business</Typography>
              <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>5 seats · Unlimited interviews · Priority support</Typography>
            </Box>
            <GradientButton size="sm" onClick={() => nav('/pricing')}>Upgrade Plan</GradientButton>
          </Box>
        </SoftCard>

        {/* Danger */}
        <SoftCard sx={{ p: '22px 26px', border: `1px solid ${alpha(COLORS.red, 0.15)}`, background: alpha(COLORS.red, 0.02) }}>
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: COLORS.red, mb: '12px' }}>Danger Zone</Typography>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <GradientButton size="sm" variant="danger">Delete All Data</GradientButton>
            <GradientButton size="sm" variant="danger" onClick={() => nav('/login')}>Sign Out</GradientButton>
          </Box>
        </SoftCard>
      </Box>
    </SidebarLayout>
  );
};

export default OrgSettings;
