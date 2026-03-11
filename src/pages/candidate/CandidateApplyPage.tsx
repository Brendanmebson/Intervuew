import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, alpha,
  Chip, AppBar, Toolbar, LinearProgress,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import SoftCard from '../../components/common/SoftCard';
import GradientButton from '../../components/common/GradientButton';
import { useJobs } from '../../context/JobsContext';
import {
  Work, LocationOn, AttachMoney, CloudUpload,
  CheckCircle, Psychology, ArrowForward, ErrorOutline, Login,
} from '@mui/icons-material';

const CandidateApplyPage: React.FC = () => {
  const navigate = useNavigate();
  const { jobSlug } = useParams<{ jobSlug: string }>();
  const { getJobBySlug, setCurrentApplication } = useJobs();

  const job = jobSlug ? getJobBySlug(jobSlug) : undefined;

  const [step, setStep] = useState<'view' | 'apply' | 'submitted'>('view');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cvName, setCvName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setCvName(e.target.files[0].name);
  };

  const handleSubmit = () => {
    if (!job) return;
    setCurrentApplication({
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      appliedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      name,
      email,
      interviewDone: false,
    });
    setStep('submitted');
  };

  // ── Job not found ─────────────────────────────────────────────────────────
  if (!job) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#F8F9FC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <SoftCard sx={{ maxWidth: 440, width: '100%', mx: 3, p: 5, textAlign: 'center' }}>
          <Box sx={{
            width: 64, height: 64, borderRadius: '50%', mx: 'auto', mb: 2.5,
            bgcolor: alpha('#EF4444', 0.08), display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ErrorOutline sx={{ fontSize: 32, color: '#EF4444' }} />
          </Box>
          <Typography variant="h5" sx={{ mb: 1.5 }}>Job not found</Typography>
          <Typography sx={{ color: '#5A5E72', mb: 1, fontSize: '0.9rem' }}>
            This application link doesn't match any active job posting.
          </Typography>
          <Typography variant="caption" sx={{ color: '#B0B3C6', fontFamily: 'monospace', display: 'block', mb: 3 }}>
            /apply/{jobSlug}
          </Typography>
          <Button variant="outlined" onClick={() => navigate('/')} sx={{ borderColor: alpha('#5B5DF6', 0.2), color: '#5B5DF6' }}>
            Go to Homepage
          </Button>
        </SoftCard>
      </Box>
    );
  }

  // ── Submitted ─────────────────────────────────────────────────────────────
  if (step === 'submitted') {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#F8F9FC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <SoftCard sx={{ maxWidth: 520, width: '100%', mx: 3, p: 5, textAlign: 'center' }}>
          {/* Checkmark */}
          <Box sx={{
            width: 72, height: 72, borderRadius: '50%', mx: 'auto', mb: 2.5,
            background: 'linear-gradient(135deg, #5B5DF6, #9B8FFF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <CheckCircle sx={{ fontSize: 36, color: '#fff' }} />
          </Box>
          <Typography variant="h4" sx={{ mb: 1 }}>Application Submitted!</Typography>
          <Typography sx={{ color: '#5A5E72', mb: 0.5, fontWeight: 600 }}>{job.title}</Typography>
          <Typography sx={{ color: '#8B8FA8', fontSize: '0.875rem', mb: 3 }}>
            {job.company} · {job.location}
          </Typography>

          {/* AI screening result */}
          <Box sx={{
            p: 2.5, mb: 3, borderRadius: 2,
            bgcolor: alpha('#5B5DF6', 0.04),
            border: `1px solid ${alpha('#5B5DF6', 0.1)}`,
            textAlign: 'left',
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" sx={{ color: '#5B5DF6', fontWeight: 600 }}>AI Resume Review</Typography>
              <Typography variant="caption" sx={{ color: '#5B5DF6', fontWeight: 700 }}>87% match</Typography>
            </Box>
            <LinearProgress variant="determinate" value={87} sx={{ borderRadius: 99, mb: 1 }} />
            <Typography variant="caption" sx={{ color: '#8B8FA8' }}>
              Strong match — you're invited to the AI interview stage.
            </Typography>
          </Box>

          {/* Sign in nudge */}
          <Box sx={{
            p: 3, mb: 3, borderRadius: 2, textAlign: 'left',
            bgcolor: alpha('#22C55E', 0.03),
            border: `1px solid ${alpha('#22C55E', 0.15)}`,
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <Box sx={{
                width: 32, height: 32, borderRadius: 1.5, flexShrink: 0,
                background: 'linear-gradient(135deg, #5B5DF6, #9B8FFF)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Psychology sx={{ color: '#fff', fontSize: 16 }} />
              </Box>
              <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>Next: Start your AI Interview</Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#5A5E72', lineHeight: 1.7 }}>
              Sign in with <strong>{email}</strong> to access your candidate dashboard and begin the interview for <strong>{job.title}</strong>.
            </Typography>
          </Box>

          <GradientButton
            fullWidth
            size="large"
            endIcon={<Login />}
            onClick={() =>
              navigate('/auth', {
                state: {
                  prefillEmail: email,
                  prefillRole: 'prepper',
                  from: 'apply',
                  jobTitle: job.title,
                  company: job.company,
                },
              })
            }
            sx={{ py: 1.5 }}
          >
            Sign In to Start Interview
          </GradientButton>
          <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#B0B3C6' }}>
            Your application is saved. You can start the interview anytime from your dashboard.
          </Typography>
        </SoftCard>
      </Box>
    );
  }

  // ── View + Apply form ─────────────────────────────────────────────────────
  return (
    <Box sx={{ bgcolor: '#F8F9FC', minHeight: '100vh' }}>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <Toolbar sx={{ px: { xs: 3, md: 6 } }}>
          <Typography sx={{
            fontFamily: '"Sora", sans-serif', fontWeight: 800, fontSize: '1.125rem',
            background: 'linear-gradient(135deg, #5B5DF6 0%, #9B8FFF 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', flex: 1,
          }}>
            Intervuew
          </Typography>
          <Button variant="text" onClick={() => navigate('/auth')} sx={{ color: '#5A5E72', fontSize: '0.875rem' }}>
            Sign in
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ maxWidth: 860, mx: 'auto', px: 3, py: 6 }}>
        {step === 'view' && (
          <>
            <SoftCard sx={{ p: 4, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                  <Typography variant="overline" sx={{ color: '#5B5DF6', mb: 1, display: 'block' }}>{job.company}</Typography>
                  <Typography variant="h3" sx={{ mb: 1.5, fontSize: '1.875rem' }}>{job.title}</Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocationOn sx={{ fontSize: 16, color: '#8B8FA8' }} />
                      <Typography variant="body2" sx={{ color: '#5A5E72' }}>{job.location}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AttachMoney sx={{ fontSize: 16, color: '#8B8FA8' }} />
                      <Typography variant="body2" sx={{ color: '#5A5E72' }}>{job.salary}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Work sx={{ fontSize: 16, color: '#8B8FA8' }} />
                      <Typography variant="body2" sx={{ color: '#5A5E72' }}>Full-time</Typography>
                    </Box>
                  </Box>
                </Box>
                <GradientButton size="large" onClick={() => setStep('apply')} endIcon={<ArrowForward />}>
                  Apply Now
                </GradientButton>
              </Box>
            </SoftCard>

            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Box sx={{ flex: '2 1 400px' }}>
                <SoftCard sx={{ p: 3, mb: 2.5 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>About the Role</Typography>
                  <Typography sx={{ color: '#5A5E72', lineHeight: 1.8, mb: 3 }}>
                    {job.description || `We are looking for a talented ${job.title} to join our growing team.`}
                  </Typography>
                  {job.responsibilities.length > 0 && (
                    <>
                      <Typography variant="h6" sx={{ mb: 1.5 }}>Responsibilities</Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                        {job.responsibilities.map((r) => (
                          <Box key={r} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#5B5DF6', mt: 0.7, flexShrink: 0 }} />
                            <Typography variant="body2" sx={{ color: '#5A5E72' }}>{r}</Typography>
                          </Box>
                        ))}
                      </Box>
                    </>
                  )}
                  {job.qualifications.length > 0 && (
                    <>
                      <Typography variant="h6" sx={{ mb: 1.5 }}>Qualifications</Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {job.qualifications.map((q) => (
                          <Box key={q} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                            <CheckCircle sx={{ fontSize: 14, color: '#22C55E', mt: 0.3, flexShrink: 0 }} />
                            <Typography variant="body2" sx={{ color: '#5A5E72' }}>{q}</Typography>
                          </Box>
                        ))}
                      </Box>
                    </>
                  )}
                </SoftCard>
              </Box>
              <Box sx={{ flex: '1 1 220px' }}>
                <SoftCard sx={{ p: 3, mb: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Box sx={{ width: 36, height: 36, borderRadius: 1.5, background: 'linear-gradient(135deg, #5B5DF6, #9B8FFF)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Psychology sx={{ color: '#fff', fontSize: 18 }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.875rem' }}>AI Interview</Typography>
                      <Typography variant="caption" sx={{ color: '#8B8FA8' }}>After applying</Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#5A5E72', lineHeight: 1.7 }}>
                    {job.questionMode === 'custom'
                      ? `${job.questions?.length ?? 0} custom questions from the hiring team.`
                      : 'AI-generated questions tailored to this role.'}
                  </Typography>
                </SoftCard>
                {job.qualifications.length > 0 && (
                  <SoftCard sx={{ p: 2.5 }}>
                    <Typography variant="caption" sx={{ color: '#8B8FA8', display: 'block', mb: 1.5, fontWeight: 700, letterSpacing: '0.08em' }}>
                      REQUIRED SKILLS
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {job.qualifications.slice(0, 6).map((q) => (
                        <Chip key={q} label={q} size="small"
                          sx={{ bgcolor: alpha('#5B5DF6', 0.08), color: '#5B5DF6', fontSize: '0.7rem', fontWeight: 600, height: 22 }}
                        />
                      ))}
                    </Box>
                  </SoftCard>
                )}
              </Box>
            </Box>
          </>
        )}

        {step === 'apply' && (
          <Box sx={{ maxWidth: 560, mx: 'auto' }}>
            <Typography variant="h3" sx={{ mb: 0.5, fontSize: '1.875rem' }}>Apply for {job.title}</Typography>
            <Typography sx={{ color: '#8B8FA8', mb: 4 }}>{job.company} · {job.location}</Typography>
            <SoftCard sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>Your Information</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField label="Full Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                <TextField
                  label="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  helperText="Use the email you'll sign in with — your interview will be linked to it"
                />
                <TextField label="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5 }}>Upload CV / Resume</Typography>
                  <Box
                    component="label"
                    sx={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      gap: 1.5, p: 3.5, borderRadius: 2, cursor: 'pointer',
                      border: `2px dashed ${alpha('#5B5DF6', cvName ? 0.4 : 0.15)}`,
                      bgcolor: cvName ? alpha('#5B5DF6', 0.04) : '#FAFBFF',
                      transition: 'all 200ms',
                      '&:hover': { borderColor: alpha('#5B5DF6', 0.35), bgcolor: alpha('#5B5DF6', 0.03) },
                    }}
                  >
                    <input type="file" hidden accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                    {cvName ? (
                      <>
                        <CheckCircle sx={{ fontSize: 28, color: '#22C55E' }} />
                        <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#22C55E' }}>{cvName}</Typography>
                        <Typography variant="caption" sx={{ color: '#8B8FA8' }}>Click to change</Typography>
                      </>
                    ) : (
                      <>
                        <CloudUpload sx={{ fontSize: 28, color: '#B0B3C6' }} />
                        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem', color: '#5A5E72' }}>Click to upload your CV</Typography>
                        <Typography variant="caption" sx={{ color: '#B0B3C6' }}>PDF, DOC, DOCX up to 10MB</Typography>
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mt: 3.5 }}>
                <Button variant="outlined" onClick={() => setStep('view')} sx={{ borderColor: alpha('#5B5DF6', 0.2), color: '#5A5E72' }}>
                  Back
                </Button>
                <GradientButton fullWidth onClick={handleSubmit} disabled={!name || !email || !cvName}>
                  Submit Application
                </GradientButton>
              </Box>
            </SoftCard>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CandidateApplyPage;