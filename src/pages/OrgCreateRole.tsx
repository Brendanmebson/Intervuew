import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import SidebarLayout from '../components/SidebarLayout';
import { SoftCard, GradientButton } from '../components/shared';
import { COLORS } from '../theme/theme';

const Field: React.FC<{ label: string; value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean; rows?: number }> = ({ label, value, onChange, placeholder, multiline, rows = 4 }) => (
  <Box>
    <Typography sx={{ fontSize: 12, fontWeight: 600, color: COLORS.textMuted, mb: '6px' }}>{label}</Typography>
    {multiline ? (
      <Box component="textarea" value={value} onChange={(e: any) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        sx={{ width: '100%', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', padding: '10px 14px', fontSize: 14, fontFamily: "'DM Sans',sans-serif", background: COLORS.bg, color: COLORS.text, outline: 'none', resize: 'vertical', '&:focus': { borderColor: COLORS.indigo, background: COLORS.white } }} />
    ) : (
      <Box component="input" value={value} onChange={(e: any) => onChange(e.target.value)} placeholder={placeholder}
        sx={{ width: '100%', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', padding: '10px 14px', fontSize: 14, fontFamily: "'DM Sans',sans-serif", background: COLORS.bg, color: COLORS.text, outline: 'none', '&:focus': { borderColor: COLORS.indigo, background: COLORS.white } }} />
    )}
  </Box>
);

const OrgCreateRole: React.FC = () => {
  const nav = useNavigate();
  const [title, setTitle]           = useState('');
  const [dept, setDept]             = useState('');
  const [location, setLocation]     = useState('');
  const [type, setType]             = useState<'Full-time' | 'Contract' | 'Part-time'>('Full-time');
  const [description, setDesc]      = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills]         = useState<string[]>([]);
  const [mode, setMode]             = useState<'Auto' | 'Manual'>('Auto');
  const [questions, setQuestions]   = useState('5');
  const [saved, setSaved]           = useState(false);

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) setSkills(prev => [...prev, s]);
    setSkillInput('');
  };

  const handleCreate = () => {
    setSaved(true);
    setTimeout(() => nav('/org/roles'), 1200);
  };

  return (
    <SidebarLayout
      userLabel="Acme Corp"
      userSub="Business plan"
      userInitial="A"
      navItems={[
        { icon: 'home',      label: 'Overview',   to: '/org' },
        { icon: 'briefcase', label: 'Job Roles',  active: true, to: '/org/roles' },
        { icon: 'users',     label: 'Candidates', to: '/org/candidates' },
        { icon: 'mic',       label: 'Interviews', to: '/org/interviews' },
        { icon: 'chart',     label: 'Analytics',  to: '/org/analytics' },
        { icon: 'settings',  label: 'Settings',   to: '/org/settings' },
      ]}
    >
      <Box className="fade-up" sx={{ mb: '28px' }}>
        <Box component="button" onClick={() => nav('/org/roles')}
          sx={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: COLORS.textMuted, fontFamily: "'DM Sans',sans-serif", display: 'flex', alignItems: 'center', gap: '6px', mb: '14px', p: 0, '&:hover': { color: COLORS.text } }}>
          ← Back to Roles
        </Box>
        <Typography variant="h4" sx={{ fontSize: 25, mb: '4px' }}>Create Job Role</Typography>
        <Typography sx={{ fontSize: 15, color: COLORS.textMuted }}>Set up the role and AI will generate tailored interview questions.</Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', alignItems: 'start' }}>
        {/* Left col */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <SoftCard className="fade-up-1" sx={{ p: '26px 28px' }}>
            <Typography variant="h6" sx={{ fontSize: 14, mb: '18px' }}>Role Details</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Field label="Job Title" value={title} onChange={setTitle} placeholder="e.g. Senior Product Manager" />
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <Field label="Department" value={dept} onChange={setDept} placeholder="e.g. Product" />
                <Field label="Location" value={location} onChange={setLocation} placeholder="e.g. Remote" />
              </Box>
              {/* Type selector */}
              <Box>
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: COLORS.textMuted, mb: '8px' }}>Employment Type</Typography>
                <Box sx={{ display: 'flex', gap: '8px' }}>
                  {(['Full-time', 'Contract', 'Part-time'] as const).map(t => (
                    <Box key={t} onClick={() => setType(t)}
                      sx={{ flex: 1, px: '12px', py: '9px', borderRadius: '12px', cursor: 'pointer', textAlign: 'center', fontSize: 13, fontWeight: 600, transition: 'all 0.15s',
                        background: type === t ? alpha(COLORS.indigo, 0.1) : 'transparent',
                        color: type === t ? COLORS.indigo : COLORS.textMuted,
                        border: `1px solid ${type === t ? alpha(COLORS.indigo, 0.3) : 'rgba(0,0,0,0.08)'}` }}>
                      {t}
                    </Box>
                  ))}
                </Box>
              </Box>
              <Field label="Role Description" value={description} onChange={setDesc} placeholder="Describe the responsibilities, team, and impact of this role..." multiline rows={4} />
            </Box>
          </SoftCard>

          <SoftCard className="fade-up-2" sx={{ p: '26px 28px' }}>
            <Typography variant="h6" sx={{ fontSize: 14, mb: '18px' }}>Required Skills</Typography>
            <Box sx={{ display: 'flex', gap: '8px', mb: '12px' }}>
              <Box component="input" value={skillInput} onChange={(e: any) => setSkillInput(e.target.value)}
                onKeyDown={(e: any) => e.key === 'Enter' && addSkill()}
                placeholder="Type a skill and press Enter..."
                sx={{ flex: 1, border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', padding: '10px 14px', fontSize: 14, fontFamily: "'DM Sans',sans-serif", background: COLORS.bg, color: COLORS.text, outline: 'none', '&:focus': { borderColor: COLORS.indigo } }} />
              <GradientButton size="sm" onClick={addSkill}>Add</GradientButton>
            </Box>
            <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {skills.map(s => (
                <Box key={s} sx={{ display: 'flex', alignItems: 'center', gap: '6px', background: alpha(COLORS.indigo, 0.08), color: COLORS.indigo, borderRadius: '20px', px: '12px', py: '5px', fontSize: 13, fontWeight: 600 }}>
                  {s}
                  <Box onClick={() => setSkills(prev => prev.filter(x => x !== s))} sx={{ cursor: 'pointer', opacity: 0.6, '&:hover': { opacity: 1 }, fontSize: 16, lineHeight: 1 }}>×</Box>
                </Box>
              ))}
              {skills.length === 0 && (
                <Typography sx={{ fontSize: 13, color: COLORS.textMuted }}>No skills added yet.</Typography>
              )}
            </Box>
          </SoftCard>
        </Box>

        {/* Right col */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <SoftCard className="fade-up-1" sx={{ p: '26px 28px' }}>
            <Typography variant="h6" sx={{ fontSize: 14, mb: '18px' }}>Interview Settings</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Box>
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: COLORS.textMuted, mb: '8px' }}>Interview Mode</Typography>
                <Box sx={{ display: 'flex', gap: '8px' }}>
                  {(['Auto', 'Manual'] as const).map(m => (
                    <Box key={m} onClick={() => setMode(m)}
                      sx={{ flex: 1, px: '14px', py: '10px', borderRadius: '12px', cursor: 'pointer', textAlign: 'center', fontSize: 13, fontWeight: 600, transition: 'all 0.15s',
                        background: mode === m ? alpha(COLORS.indigo, 0.1) : 'transparent',
                        color: mode === m ? COLORS.indigo : COLORS.textMuted,
                        border: `1px solid ${mode === m ? alpha(COLORS.indigo, 0.3) : 'rgba(0,0,0,0.08)'}` }}>
                      {m}
                    </Box>
                  ))}
                </Box>
                <Typography sx={{ fontSize: 12, color: COLORS.textMuted, mt: '6px' }}>
                  {mode === 'Auto' ? 'AI generates and asks questions automatically.' : 'You select specific questions manually.'}
                </Typography>
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

          {/* Preview */}
          <SoftCard sx={{ p: '22px 24px', background: alpha(COLORS.indigo, 0.03), border: `1px solid ${alpha(COLORS.indigo, 0.1)}` }}>
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: COLORS.indigo, textTransform: 'uppercase', letterSpacing: '0.06em', mb: '12px' }}>Preview</Typography>
            <Typography sx={{ fontSize: 18, fontWeight: 700, mb: '4px' }}>{title || 'Role Title'}</Typography>
            <Typography sx={{ fontSize: 13, color: COLORS.textMuted, mb: '10px' }}>{dept || 'Department'} · {location || 'Location'} · {type}</Typography>
            <Box sx={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {skills.slice(0, 4).map(s => (
                <Box key={s} sx={{ background: alpha(COLORS.indigo, 0.1), color: COLORS.indigo, borderRadius: '20px', px: '10px', py: '3px', fontSize: 11, fontWeight: 600 }}>{s}</Box>
              ))}
            </Box>
          </SoftCard>

          <GradientButton fullWidth size="lg" onClick={handleCreate}>
            {saved ? '✓ Role Created!' : 'Create Role'}
          </GradientButton>
          <GradientButton fullWidth variant="ghost" onClick={() => nav('/org/roles')}>Cancel</GradientButton>
        </Box>
      </Box>
    </SidebarLayout>
  );
};

export default OrgCreateRole;
