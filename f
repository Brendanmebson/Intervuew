import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, alpha,
  Chip, Alert, AppBar, Toolbar, LinearProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SoftCard from '../../components/common/SoftCard';
import GradientButton from '../../components/common/GradientButton';
import { mockJobs } from '../../utils/mockData';
import {
  Work, LocationOn, AttachMoney, CloudUpload,
  CheckCircle, Psychology, ArrowForward,
} from '@mui/icons-material';

const CandidateApplyPage: React.FC = () => {
  const navigate = useNavigate();
  const job = mockJobs[0]; // demo job
  const [step, setStep] = useState<'view' | 'apply' | 'submitted'>('view');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cvName, setCvName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setCvName(e.target.files[0].name);
  };

  if (step === 'submitted') {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#F8F9FC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <SoftCard sx={{ maxWidth: 500, width: '100%', mx: 3, p: 5, textAlign: 'center' }}>
          <Box sx={{
            width: 72, height: 72, borderRadius: '50%', mx: 'auto', mb: 2.5,
            background: 'linear-gradient(135deg, #5B5DF6, #9B8FFF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <CheckCircle sx={{ fontSize: 36, color: '#fff' }} />
          </Box>
          <Typography variant="h4" sx={{ mb: 1.5 }}>Application Submitted!</Typography>
          <Typography sx={{ color: '#5A5E72', mb: 1.5 }}>
            Your CV is being analyzed by the AI engine. You'll receive your interview link shortly.
          </Typography>
          <Alert severity="info" sx={{ mb: 3, bgcolor: alpha('#5B5DF6', 0.06), color: '#5B5DF6', border: `1px solid ${alpha('#5B5DF6', 0.15)}`, borderRadius: 2, textAlign: 'left' }}>
            AI Resume Review in progress... This typically takes 30–60 seconds.
          </Alert>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" sx={{ color: '#8B8FA8' }}>Analyzing skills match...</Typography>
              <Typography variant="caption" sx={{ color: '#5B5DF6', fontWeight: 600 }}>87%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={87} />
          </Box>
          <GradientButton
            fullWidth
            endIcon={<ArrowForward />}
            onClick={() => navigate('/prepper/interview')}
          >
            Start AI Interview
          </GradientButton>
          <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#B0B3C6' }}>
            You can also start your interview later from your dashboard
          </Typography>
        </SoftCard>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#F8F9FC', minHeight: '100vh' }}>
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ px: { xs: 3, md: 6 } }}>
          <Typography sx={{
            fontFamily: '"Sora", sans-serif', fontWeight: 800, fontSize: '1.125rem',
            background: 'linear-gradient(135deg, #5B5DF6 0%, #9B8FFF 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            flex: 1,
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
            {/* Job header */}
            <SoftCard sx={{ p: 4, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                  <Typography variant="overline" sx={{ color: '#5B5DF6', mb: 1, display: 'block' }}>
                    {job.company}
                  </Typography>
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
                  <Typography sx={{ color: '#5A5E72', lineHeight: 1.8, mb: 3 }}>{job.description}</Typography>
                  <Typography variant="h6" sx={{ mb: 1.5 }}>Responsibilities</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                    {job.responsibilities.map((r) => (
                      <Box key={r} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#5B5DF6', mt: 0.7, flexShrink: 0 }} />
                        <Typography variant="body2" sx={{ color: '#5A5E72' }}>{r}</Typography>
                      </Box>
                    ))}
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1.5 }}>Qualifications</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {job.qualifications.map((q) => (
                      <Box key={q} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                        <CheckCircle sx={{ fontSize: 14, color: '#22C55E', mt: 0.3, flexShrink: 0 }} />
                        <Typography variant="body2" sx={{ color: '#5A5E72' }}>{q}</Typography>
                      </Box>
                    ))}
                  </Box>
                </SoftCard>
              </Box>

              {/* Sidebar */}
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
                    This role uses AI-powered interviews. After submitting your application, you'll complete a structured interview with our AI.
                  </Typography>
                </SoftCard>
                <SoftCard sx={{ p: 2.5 }}>
                  <Typography variant="caption" sx={{ color: '#8B8FA8', display: 'block', mb: 1.5, fontWeight: 700, letterSpacing: '0.08em' }}>
                    REQUIRED SKILLS
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {job.qualifications.slice(0, 6).map((q) => (
                      <Chip key={q} label={q} size="small" sx={{ bgcolor: alpha('#5B5DF6', 0.08), color: '#5B5DF6', fontSize: '0.7rem', fontWeight: 600, height: 22 }} />
                    ))}
                  </Box>
                </SoftCard>
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
                <TextField label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
                <TextField label="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth />

                {/* CV Upload */}
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
                        <Typography variant="caption" sx={{ color: '#8B8FA8' }}>Click to change file</Typography>
                      </>
                    ) : (
                      <>
                        <CloudUpload sx={{ fontSize: 28, color: '#B0B3C6' }} />
                        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem', color: '#5A5E72' }}>
                          Click to upload your CV
                        </Typography>
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
                <GradientButton
                  fullWidth
                  onClick={() => setStep('submitted')}
                  disabled={!name || !email || !cvName}
                >
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


import React from 'react';
import {
  Box, Typography, alpha, LinearProgress, Avatar,
  Chip, Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SidebarNav from '../../components/layout/SidebarNav';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SoftCard from '../../components/common/SoftCard';
import ScoreRing from '../../components/common/ScoreRing';
import StatusBadge from '../../components/common/StatusBadge';
import GradientButton from '../../components/common/GradientButton';
import {
  Home, Assessment, Work, Settings, PlayCircle,
  CheckCircle, Schedule,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { label: 'Home', icon: <Home sx={{ fontSize: 18 }} />, path: '/candidate/dashboard' },
  { label: 'Applications', icon: <Work sx={{ fontSize: 18 }} />, path: '/candidate/applications' },
  { label: 'Reports', icon: <Assessment sx={{ fontSize: 18 }} />, path: '/candidate/reports' },
];
const bottomItems = [
  { label: 'Settings', icon: <Settings sx={{ fontSize: 18 }} />, path: '/candidate/settings' },
];

const CandidateDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const application = {
    jobTitle: 'Senior Frontend Engineer',
    company: 'Acme Corp',
    status: 'interviewing' as const,
    cvScore: 87,
    interviewScore: 82,
    appliedAt: 'Jan 22, 2024',
  };

  const sidebar = <SidebarNav items={navItems} bottomItems={bottomItems} />;

  return (
    <DashboardLayout sidebar={sidebar}>
      <Box sx={{ mb: 5 }}>
        <Typography sx={{ color: '#8B8FA8', mb: 0.5 }}>Welcome back</Typography>
        <Typography variant="h3" sx={{ fontSize: '2rem' }}>{user?.name}</Typography>
      </Box>

      {/* Application card */}
      <SoftCard sx={{ p: 4, mb: 3, display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
        <Box sx={{ flex: '1 1 240px' }}>
          <Box sx={{ display: 'flex', gap: 1.5, mb: 2.5 }}>
            <Avatar sx={{ width: 48, height: 48, fontSize: '1.25rem', fontWeight: 700 }}>A</Avatar>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: '1.0625rem' }}>{application.jobTitle}</Typography>
              <Typography variant="caption" sx={{ color: '#8B8FA8' }}>{application.company}</Typography>
            </Box>
          </Box>
          <StatusBadge status={application.status} />
          <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#B0B3C6' }}>
            Applied {application.appliedAt}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 3 }}>
          <ScoreRing score={application.cvScore} size={90} label="CV Score" />
          <ScoreRing score={application.interviewScore} size={90} label="Interview" />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, flex: '0 0 auto' }}>
          <GradientButton startIcon={<PlayCircle />} onClick={() => navigate('/prepper/interview')} size="small">
            Start Interview
          </GradientButton>
          <Button variant="outlined" size="small" sx={{ borderColor: alpha('#5B5DF6', 0.2), color: '#5B5DF6' }}
            onClick={() => navigate('/prepper/reports/1')}>
            View Report
          </Button>
        </Box>
      </SoftCard>

      {/* Timeline */}
      <SoftCard sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Application Timeline</Typography>
        {[
          { label: 'Application Submitted', done: true, date: 'Jan 22, 2024' },
          { label: 'CV Reviewed by AI', done: true, date: 'Jan 22, 2024' },
          { label: 'AI Interview Completed', done: true, date: 'Jan 23, 2024' },
          { label: 'Under Employer Review', done: false, date: 'In progress' },
          { label: 'Final Decision', done: false, date: 'Pending' },
        ].map((step, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, pb: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <Box sx={{
                width: 28, height: 28, borderRadius: '50%',
                bgcolor: step.done ? alpha('#22C55E', 0.1) : alpha('#5B5DF6', 0.08),
                border: `2px solid ${step.done ? '#22C55E' : alpha('#5B5DF6', 0.2)}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {step.done
                  ? <CheckCircle sx={{ fontSize: 14, color: '#22C55E' }} />
                  : <Schedule sx={{ fontSize: 14, color: alpha('#5B5DF6', 0.4) }} />
                }
              </Box>
              {i < 4 && <Box sx={{ width: 2, height: 24, bgcolor: alpha('#5B5DF6', 0.08), mt: 0.5 }} />}
            </Box>
            <Box sx={{ pt: 0.4 }}>
              <Typography sx={{ fontWeight: step.done ? 600 : 400, fontSize: '0.9rem', color: step.done ? '#0F1115' : '#8B8FA8' }}>
                {step.label}
              </Typography>
              <Typography variant="caption" sx={{ color: '#B0B3C6' }}>{step.date}</Typography>
            </Box>
          </Box>
        ))}
      </SoftCard>

      {/* Skill summary */}
      <SoftCard sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2.5 }}>Your Performance Summary</Typography>
        {[
          { label: 'Communication', score: 84 },
          { label: 'Clarity', score: 79 },
          { label: 'Technical Knowledge', score: 88 },
          { label: 'Confidence', score: 76 },
        ].map((d) => (
          <Box key={d.label} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography sx={{ flex: '0 0 160px', fontSize: '0.875rem', fontWeight: 500, color: '#5A5E72' }}>{d.label}</Typography>
            <LinearProgress variant="determinate" value={d.score} sx={{ flex: 1, height: 6, borderRadius: 99 }} />
            <Typography sx={{ flex: '0 0 32px', fontSize: '0.875rem', fontWeight: 700, textAlign: 'right' }}>{d.score}</Typography>
          </Box>
        ))}
      </SoftCard>
    </DashboardLayout>
  );
};

export default CandidateDashboard;


import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Typography, Button, alpha, LinearProgress,
  IconButton, Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Mic, MicOff, Stop, Psychology,
} from '@mui/icons-material';

const INTERVIEW_QUESTIONS = [
  'Tell me about yourself and your professional background.',
  'What motivated you to apply for this particular role?',
  'Describe a challenging project you worked on and how you overcame obstacles.',
  'How do you approach problem-solving when you have limited information?',
  'Where do you see yourself in 5 years, and how does this role fit that vision?',
];

type InterviewState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'completed';

const Waveform: React.FC<{ active: boolean }> = ({ active }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: '3px', height: 40 }}>
    {Array.from({ length: 20 }).map((_, i) => (
      <Box
        key={i}
        sx={{
          width: 3,
          borderRadius: 99,
          bgcolor: '#5B5DF6',
          height: active ? `${20 + Math.sin((i * 0.8) + Date.now() / 200) * 16}px` : 4,
          opacity: active ? 0.7 + (i % 3) * 0.1 : 0.2,
          transition: active ? 'height 80ms ease-in-out' : 'height 300ms ease-in-out',
          animation: active ? `wave-${i % 5} 0.8s ease-in-out infinite alternate` : 'none',
          animationDelay: `${i * 40}ms`,
          '@keyframes wave-0': { from: { height: '8px' }, to: { height: '36px' } },
          '@keyframes wave-1': { from: { height: '12px' }, to: { height: '28px' } },
          '@keyframes wave-2': { from: { height: '16px' }, to: { height: '40px' } },
          '@keyframes wave-3': { from: { height: '10px' }, to: { height: '32px' } },
          '@keyframes wave-4': { from: { height: '6px' }, to: { height: '24px' } },
        }}
      />
    ))}
  </Box>
);

const AIAvatar: React.FC<{ state: InterviewState }> = ({ state }) => {
  const isSpeaking = state === 'speaking';
  const isThinking = state === 'thinking';

  return (
    <Box sx={{ position: 'relative', width: 140, height: 140 }}>
      {/* Outer glow ring */}
      {isSpeaking && (
        <Box sx={{
          position: 'absolute', inset: -12,
          borderRadius: '50%',
          border: `2px solid ${alpha('#5B5DF6', 0.25)}`,
          animation: 'avatar-glow 1.5s ease-in-out infinite',
          '@keyframes avatar-glow': {
            '0%, 100%': { transform: 'scale(1)', opacity: 0.5 },
            '50%': { transform: 'scale(1.08)', opacity: 0.15 },
          },
        }} />
      )}
      {/* Middle ring */}
      {isSpeaking && (
        <Box sx={{
          position: 'absolute', inset: -6,
          borderRadius: '50%',
          border: `1.5px solid ${alpha('#5B5DF6', 0.3)}`,
          animation: 'avatar-glow 1.5s ease-in-out infinite 0.2s',
        }} />
      )}
      {/* Main circle */}
      <Box sx={{
        width: 140, height: 140, borderRadius: '50%',
        background: isSpeaking
          ? 'linear-gradient(135deg, #5B5DF6 0%, #9B8FFF 100%)'
          : isThinking
            ? 'linear-gradient(135deg, #374151 0%, #6B7280 100%)'
            : 'linear-gradient(135deg, #4042D4 0%, #5B5DF6 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: isSpeaking
          ? `0 0 40px ${alpha('#5B5DF6', 0.5)}`
          : '0 16px 48px rgba(91,93,246,0.3)',
        transition: 'all 400ms ease-in-out',
        animation: isThinking ? 'shimmer 1.5s ease-in-out infinite' : 'none',
        '@keyframes shimmer': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
      }}>
        <Psychology sx={{ fontSize: 56, color: 'rgba(255,255,255,0.9)' }} />
      </Box>
    </Box>
  );
};

const LiveInterviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<InterviewState>('idle');
  const [currentQ, setCurrentQ] = useState(0);
  const [isMicOn, setIsMicOn] = useState(false);
  const [timer, setTimer] = useState(0);
  const [transcript, setTranscript] = useState<{ speaker: 'AI' | 'You'; text: string }[]>([]);
  const timerRef = useRef<number | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state !== 'idle' && state !== 'completed') {
      timerRef.current = window.setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [state]);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const startInterview = () => {
    setState('speaking');
    setTranscript([{ speaker: 'AI', text: INTERVIEW_QUESTIONS[0] }]);
  };

  const handleMicToggle = () => {
    if (!isMicOn) {
      setIsMicOn(true);
      setState('listening');
    } else {
      setIsMicOn(false);
      setState('thinking');
      // Simulate AI thinking then responding
      setTimeout(() => {
        const sampleResponses = [
          "That's a great point. Let me follow up with...",
          "Interesting perspective. Could you elaborate on...",
          "Thank you for sharing that. Here's my next question...",
        ];
        setTranscript((t) => [...t,
          { speaker: 'You', text: 'I have over 5 years of experience in frontend development, specializing in React and TypeScript...' },
        ]);
        setTimeout(() => {
          if (currentQ < INTERVIEW_QUESTIONS.length - 1) {
            const nextQ = currentQ + 1;
            setCurrentQ(nextQ);
            setState('speaking');
            setTranscript((t) => [...t, { speaker: 'AI', text: INTERVIEW_QUESTIONS[nextQ] }]);
          } else {
            setState('completed');
          }
        }, 1500);
      }, 2000);
    }
  };

  const getStateLabel = () => {
    switch (state) {
      case 'idle': return 'Ready to start';
      case 'speaking': return 'AI is speaking...';
      case 'listening': return 'Listening...';
      case 'thinking': return 'AI is thinking...';
      case 'completed': return 'Interview complete';
      default: return '';
    }
  };

  if (state === 'completed') {
    return (
      <Box sx={{
        minHeight: '100vh', bgcolor: '#0F1115', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Box sx={{ textAlign: 'center', px: 4 }}>
          <Box sx={{
            width: 80, height: 80, borderRadius: '50%', mx: 'auto', mb: 3,
            background: 'linear-gradient(135deg, #5B5DF6, #9B8FFF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Psychology sx={{ fontSize: 40, color: '#fff' }} />
          </Box>
          <Typography variant="h3" sx={{ color: '#fff', mb: 1.5 }}>Interview Complete!</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.6)', mb: 4 }}>Your responses are being analyzed by the AI engine.</Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/prepper/reports/1')}
            sx={{
              background: 'linear-gradient(135deg, #5B5DF6, #9B8FFF)',
              boxShadow: `0 4px 20px ${alpha('#5B5DF6', 0.5)}`,
            }}
          >
            View Performance Report
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0F1115', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        px: 4, py: 2.5,
        borderBottom: `1px solid rgba(255,255,255,0.06)`,
        bgcolor: 'rgba(255,255,255,0.02)',
      }}>
        <Typography sx={{
          fontFamily: '"Sora", sans-serif', fontWeight: 800, fontSize: '1.125rem',
          background: 'linear-gradient(135deg, #5B5DF6 0%, #9B8FFF 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Intervuew
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: state === 'idle' ? '#8B8FA8' : '#22C55E', animation: state !== 'idle' ? 'pulse 2s infinite' : 'none', '@keyframes pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.4 } } }} />
            <Typography sx={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
              {getStateLabel()}
            </Typography>
          </Box>
          <Box sx={{
            px: 2.5, py: 0.75, borderRadius: 99,
            bgcolor: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <Typography sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, fontSize: '0.9375rem', color: '#fff', letterSpacing: '0.04em' }}>
              {formatTime(timer)}
            </Typography>
          </Box>
          <Tooltip title="End session">
            <Button
              size="small"
              startIcon={<Stop />}
              onClick={() => navigate('/prepper/dashboard')}
              sx={{
                color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 99, px: 2,
                '&:hover': { bgcolor: alpha('#EF4444', 0.15), color: '#EF4444', borderColor: alpha('#EF4444', 0.3) },
              }}
            >
              End
            </Button>
          </Tooltip>
        </Box>
      </Box>

      {/* Main area */}
      <Box sx={{ flex: 1, display: 'flex', gap: 0, overflow: 'hidden' }}>
        {/* Center panel */}
        <Box sx={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', px: 4, py: 6,
        }}>
          {/* AI Avatar */}
          <AIAvatar state={state} />

          {/* State label */}
          <Box sx={{ mt: 3.5, mb: 2, textAlign: 'center' }}>
            <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', fontWeight: 600, mb: 0.75 }}>
              {state === 'speaking' ? 'AI INTERVIEWER' : state === 'listening' ? 'RECORDING' : state === 'thinking' ? 'PROCESSING' : 'READY'}
            </Typography>
            {state !== 'idle' && (
              <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', maxWidth: 440, textAlign: 'center', lineHeight: 1.65 }}>
                {state === 'speaking' || state === 'idle'
                  ? INTERVIEW_QUESTIONS[currentQ]
                  : state === 'listening'
                    ? 'Your response is being recorded...'
                    : 'Analyzing your response...'}
              </Typography>
            )}
          </Box>

          {/* Waveform */}
          <Box sx={{ mb: 4 }}>
            <Waveform active={state === 'listening' || state === 'speaking'} />
          </Box>

          {/* Question progress */}
          <Box sx={{ width: '100%', maxWidth: 360, mb: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
                Progress
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
                {currentQ + 1} / {INTERVIEW_QUESTIONS.length}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={((currentQ + (state === 'completed' ? 1 : 0)) / INTERVIEW_QUESTIONS.length) * 100}
              sx={{
                height: 4, borderRadius: 99,
                bgcolor: 'rgba(255,255,255,0.08)',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(90deg, #5B5DF6, #9B8FFF)',
                  borderRadius: 99,
                },
              }}
            />
            <Box sx={{ display: 'flex', gap: 1, mt: 1.5, justifyContent: 'center' }}>
              {INTERVIEW_QUESTIONS.map((_, i) => (
                <Box key={i} sx={{
                  width: 8, height: 8, borderRadius: '50%',
                  bgcolor: i < currentQ ? '#5B5DF6' : i === currentQ ? '#9B8FFF' : 'rgba(255,255,255,0.1)',
                  transition: 'all 300ms',
                }} />
              ))}
            </Box>
          </Box>

          {/* Controls */}
          {state === 'idle' ? (
            <Button
              variant="contained"
              size="large"
              onClick={startInterview}
              sx={{
                background: 'linear-gradient(135deg, #5B5DF6, #9B8FFF)',
                boxShadow: `0 4px 24px ${alpha('#5B5DF6', 0.5)}`,
                px: 5, py: 1.75, fontSize: '1rem', fontWeight: 600, borderRadius: 99,
                '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 8px 32px ${alpha('#5B5DF6', 0.6)}` },
              }}
            >
              Begin Interview
            </Button>
          ) : (
            <IconButton
              onClick={handleMicToggle}
              disabled={state === 'thinking' || state === 'speaking'}
              sx={{
                width: 80, height: 80,
                bgcolor: isMicOn ? '#EF4444' : '#5B5DF6',
                color: '#fff',
                boxShadow: isMicOn
                  ? `0 0 0 12px ${alpha('#EF4444', 0.15)}, 0 4px 24px ${alpha('#EF4444', 0.4)}`
                  : `0 4px 24px ${alpha('#5B5DF6', 0.5)}`,
                '&:hover': {
                  bgcolor: isMicOn ? '#DC2626' : '#4042D4',
                  transform: 'scale(1.05)',
                },
                '&:disabled': { bgcolor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.2)' },
                transition: 'all 250ms',
              }}
            >
              {isMicOn ? <MicOff sx={{ fontSize: 32 }} /> : <Mic sx={{ fontSize: 32 }} />}
            </IconButton>
          )}
          <Typography sx={{ mt: 2, fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
            {state === 'idle' ? '' : isMicOn ? 'Tap to stop recording' : state === 'thinking' ? 'Processing...' : state === 'speaking' ? 'Wait for the question' : 'Tap microphone to answer'}
          </Typography>
        </Box>

        {/* Right panel: transcript */}
        <Box sx={{
          width: 320, borderLeft: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', flexDirection: 'column',
          bgcolor: 'rgba(255,255,255,0.02)',
        }}>
          <Box sx={{ px: 3, py: 2.5, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)' }}>
              LIVE TRANSCRIPT
            </Typography>
          </Box>
          <Box
            ref={transcriptRef}
            sx={{ flex: 1, overflowY: 'auto', px: 3, py: 2.5, display: 'flex', flexDirection: 'column', gap: 2.5 }}
          >
            {transcript.length === 0 ? (
              <Typography sx={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.2)', textAlign: 'center', mt: 4 }}>
                Transcript will appear here...
              </Typography>
            ) : (
              transcript.map((t, i) => (
                <Box key={i}>
                  <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', mb: 0.75,
                    color: t.speaker === 'AI' ? '#5B5DF6' : '#9B8FFF' }}>
                    {t.speaker === 'AI' ? 'AI INTERVIEWER' : 'YOU'}
                  </Typography>
                  <Typography sx={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65 }}>
                    {t.text}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LiveInterviewPage;



based on ehat the company generated link, let the connect be info and interfview everthing, basically let everything corresponde withe the link job