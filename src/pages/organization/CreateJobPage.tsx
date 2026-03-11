import React, { useState } from 'react';
import {
  Box, Typography, TextField, ToggleButtonGroup, ToggleButton,
  Button, Chip, alpha, Stepper, Step, StepLabel, Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SidebarNav from '../../components/layout/SidebarNav';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SoftCard from '../../components/common/SoftCard';
import GradientButton from '../../components/common/GradientButton';
import { useJobs } from '../../context/JobsContext';
import {
  Dashboard, Work, People, Analytics, Settings, HelpOutline,
  AutoAwesome, Edit, Add, Delete, CheckCircle, ArrowBack,
  ContentCopy, Link,
} from '@mui/icons-material';

const navItems = [
  { label: 'Dashboard', icon: <Dashboard sx={{ fontSize: 18 }} />, path: '/org/dashboard' },
  { label: 'Jobs', icon: <Work sx={{ fontSize: 18 }} />, path: '/org/jobs' },
  { label: 'Candidates', icon: <People sx={{ fontSize: 18 }} />, path: '/org/candidates' },
  { label: 'Analytics', icon: <Analytics sx={{ fontSize: 18 }} />, path: '/org/analytics' },
];
const bottomItems = [
  { label: 'Settings', icon: <Settings sx={{ fontSize: 18 }} />, path: '/org/settings' },
  { label: 'Help', icon: <HelpOutline sx={{ fontSize: 18 }} />, path: '/org/help' },
];

const steps = ['Job Details', 'Requirements', 'Interview Setup', 'Review'];

const slugify = (str: string) =>
  str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'new-job';

const CreateJobPage: React.FC = () => {
  const navigate = useNavigate();
  const { addJob } = useJobs();

  const [step, setStep] = useState(0);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [description, setDescription] = useState('');
  const [qualifications, setQualifications] = useState<string[]>([]);
  const [qualInput, setQualInput] = useState('');
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [respInput, setRespInput] = useState('');
  const [questionMode, setQuestionMode] = useState<'ai' | 'custom'>('ai');
  const [customQuestions, setCustomQuestions] = useState<string[]>([]);
  const [qInput, setQInput] = useState('');
  const [created, setCreated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [publishedSlug, setPublishedSlug] = useState('');

  const addTag = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    val: string,
    setVal: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    if (val.trim() && !list.includes(val.trim())) {
      setList([...list, val.trim()]);
      setVal('');
    }
  };

  const handlePublish = () => {
    const slug = slugify(title);
    const applicationLink = `/apply/${slug}-${Date.now().toString(36)}`;

    const newJob = {
      id: Date.now().toString(),
      title: title || 'Untitled Job',
      company: 'Acme Corp',
      location: location || 'Remote',
      salary:
        salaryMin && salaryMax
          ? `$${salaryMin} – $${salaryMax}`
          : salaryMin
          ? `From $${salaryMin}`
          : '—',
      description,
      responsibilities,
      qualifications,
      questionMode,
      ...(questionMode === 'custom' ? { questions: customQuestions } : {}),
      applicationLink,
      createdAt: new Date().toISOString().split('T')[0],
      applicants: 0,
      status: 'active' as const,
    };

    addJob(newJob);
    setPublishedSlug(applicationLink);
    setCreated(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://intervuew.io${publishedSlug}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sidebar = <SidebarNav items={navItems} bottomItems={bottomItems} />;

  if (created) {
    return (
      <DashboardLayout sidebar={sidebar}>
        <Box sx={{ maxWidth: 560, mx: 'auto', mt: 10, textAlign: 'center' }}>
          <Box sx={{
            width: 80, height: 80, borderRadius: '50%', mx: 'auto', mb: 3,
            bgcolor: alpha('#22C55E', 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <CheckCircle sx={{ fontSize: 40, color: '#22C55E' }} />
          </Box>
          <Typography variant="h3" sx={{ mb: 1.5, fontSize: '1.875rem' }}>Job Created!</Typography>
          <Typography sx={{ color: '#5A5E72', mb: 4 }}>
            Your job posting is live. Share the unique link to start receiving applications.
          </Typography>

          <SoftCard sx={{ p: 3, mb: 4, textAlign: 'left' }}>
            <Typography variant="caption" sx={{ color: '#8B8FA8', fontWeight: 700, letterSpacing: '0.08em', display: 'block', mb: 1.5 }}>
              APPLICATION LINK
            </Typography>
            <Box sx={{
              display: 'flex', alignItems: 'center', gap: 1,
              px: 2, py: 1.25, borderRadius: 1.5,
              bgcolor: alpha('#5B5DF6', 0.06),
              border: `1px solid ${alpha('#5B5DF6', 0.15)}`,
            }}>
              <Link sx={{ fontSize: 16, color: '#5B5DF6', flexShrink: 0 }} />
              <Typography sx={{
                flex: 1, fontSize: '0.82rem', fontWeight: 600, color: '#5B5DF6',
                wordBreak: 'break-all', fontFamily: 'monospace',
              }}>
                intervuew.io{publishedSlug}
              </Typography>
              <Button
                size="small"
                startIcon={copied ? <CheckCircle sx={{ fontSize: 14 }} /> : <ContentCopy sx={{ fontSize: 14 }} />}
                onClick={handleCopy}
                sx={{ color: copied ? '#22C55E' : '#9B8FFF', fontWeight: 700, flexShrink: 0, whiteSpace: 'nowrap' }}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </Box>
          </SoftCard>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <GradientButton onClick={() => navigate('/org/jobs')}>View All Jobs</GradientButton>
            <Button
              variant="outlined"
              onClick={() => { setCreated(false); setStep(0); setTitle(''); setLocation(''); setSalaryMin(''); setSalaryMax(''); setDescription(''); setQualifications([]); setResponsibilities([]); setCustomQuestions([]); }}
              sx={{ borderColor: alpha('#5B5DF6', 0.2), color: '#5B5DF6' }}
            >
              Create Another
            </Button>
          </Box>
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout sidebar={sidebar}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 5 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/org/jobs')} sx={{ color: '#8B8FA8' }}>
          Back
        </Button>
        <Box>
          <Typography variant="overline" sx={{ color: '#8B8FA8', display: 'block' }}>NEW POSTING</Typography>
          <Typography variant="h3" sx={{ fontSize: '2rem' }}>Create Job</Typography>
        </Box>
      </Box>

      <Stepper activeStep={step} sx={{ mb: 5, maxWidth: 640 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel sx={{
              '& .MuiStepLabel-label': { fontSize: '0.8125rem', fontWeight: 500 },
              '& .MuiStepIcon-root.Mui-active': { color: '#5B5DF6' },
              '& .MuiStepIcon-root.Mui-completed': { color: '#5B5DF6' },
            }}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ maxWidth: 720 }}>
        {/* Step 0: Job Details */}
        {step === 0 && (
          <SoftCard sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>Job Details</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField label="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth placeholder="e.g. Senior Frontend Engineer" />
              <TextField label="Location" value={location} onChange={(e) => setLocation(e.target.value)} fullWidth placeholder="e.g. Remote, New York, NY" />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField label="Min Salary" value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} fullWidth placeholder="e.g. 80,000" />
                <TextField label="Max Salary" value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)} fullWidth placeholder="e.g. 120,000" />
              </Box>
              <TextField
                label="Job Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth multiline rows={5}
                placeholder="Describe the role, company culture, and what you're looking for..."
              />
            </Box>
          </SoftCard>
        )}

        {/* Step 1: Requirements */}
        {step === 1 && (
          <SoftCard sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>Requirements & Responsibilities</Typography>
            <Box sx={{ mb: 3.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5, color: '#0F1115' }}>Qualifications</Typography>
              <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
                <TextField size="small" value={qualInput} onChange={(e) => setQualInput(e.target.value)}
                  placeholder="e.g. 5+ years of React"
                  onKeyDown={(e) => e.key === 'Enter' && addTag(qualifications, setQualifications, qualInput, setQualInput)}
                  sx={{ flex: 1 }} />
                <Button variant="outlined" size="small" startIcon={<Add />}
                  onClick={() => addTag(qualifications, setQualifications, qualInput, setQualInput)}
                  sx={{ borderColor: alpha('#5B5DF6', 0.2), color: '#5B5DF6', whiteSpace: 'nowrap' }}>Add</Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {qualifications.map((q) => (
                  <Chip key={q} label={q} size="small"
                    onDelete={() => setQualifications(qualifications.filter((x) => x !== q))}
                    deleteIcon={<Delete sx={{ fontSize: '14px !important' }} />}
                    sx={{ bgcolor: alpha('#5B5DF6', 0.08), color: '#5B5DF6', fontWeight: 500 }} />
                ))}
              </Box>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5, color: '#0F1115' }}>Responsibilities</Typography>
              <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
                <TextField size="small" value={respInput} onChange={(e) => setRespInput(e.target.value)}
                  placeholder="e.g. Build and maintain React apps"
                  onKeyDown={(e) => e.key === 'Enter' && addTag(responsibilities, setResponsibilities, respInput, setRespInput)}
                  sx={{ flex: 1 }} />
                <Button variant="outlined" size="small" startIcon={<Add />}
                  onClick={() => addTag(responsibilities, setResponsibilities, respInput, setRespInput)}
                  sx={{ borderColor: alpha('#5B5DF6', 0.2), color: '#5B5DF6', whiteSpace: 'nowrap' }}>Add</Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {responsibilities.map((r) => (
                  <Chip key={r} label={r} size="small"
                    onDelete={() => setResponsibilities(responsibilities.filter((x) => x !== r))}
                    deleteIcon={<Delete sx={{ fontSize: '14px !important' }} />}
                    sx={{ bgcolor: alpha('#22C55E', 0.08), color: '#22C55E', fontWeight: 500 }} />
                ))}
              </Box>
            </Box>
          </SoftCard>
        )}

        {/* Step 2: Interview Setup */}
        {step === 2 && (
          <SoftCard sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>Interview Configuration</Typography>
            <Typography variant="body2" sx={{ color: '#8B8FA8', mb: 3.5 }}>Choose how the AI will conduct interviews for this role.</Typography>
            <ToggleButtonGroup
              value={questionMode} exclusive
              onChange={(_e, v) => v && setQuestionMode(v)}
              sx={{
                mb: 3.5, width: '100%', gap: 2,
                '& .MuiToggleButton-root': {
                  flex: 1, borderRadius: '14px !important', border: `1px solid ${alpha('#5B5DF6', 0.15)} !important`,
                  py: 2, flexDirection: 'column', gap: 1, textTransform: 'none',
                  '&.Mui-selected': { bgcolor: alpha('#5B5DF6', 0.06), borderColor: `${alpha('#5B5DF6', 0.35)} !important`, color: '#5B5DF6' },
                },
              }}
            >
              <ToggleButton value="ai">
                <AutoAwesome />
                <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem' }}>AI Generated</Typography>
                <Typography sx={{ fontSize: '0.75rem', color: '#8B8FA8' }}>AI creates smart questions based on the role</Typography>
              </ToggleButton>
              <ToggleButton value="custom">
                <Edit />
                <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem' }}>Custom Questions</Typography>
                <Typography sx={{ fontSize: '0.75rem', color: '#8B8FA8' }}>Define your own interview questions</Typography>
              </ToggleButton>
            </ToggleButtonGroup>

            {questionMode === 'custom' && (
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5 }}>Interview Questions</Typography>
                <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
                  <TextField size="small" value={qInput} onChange={(e) => setQInput(e.target.value)}
                    placeholder="e.g. Tell me about your design process"
                    onKeyDown={(e) => e.key === 'Enter' && addTag(customQuestions, setCustomQuestions, qInput, setQInput)}
                    sx={{ flex: 1 }} />
                  <Button variant="outlined" size="small" startIcon={<Add />}
                    onClick={() => addTag(customQuestions, setCustomQuestions, qInput, setQInput)}
                    sx={{ borderColor: alpha('#5B5DF6', 0.2), color: '#5B5DF6', whiteSpace: 'nowrap' }}>Add</Button>
                </Box>
                {customQuestions.map((q, i) => (
                  <Box key={q} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1.25, borderBottom: `1px solid ${alpha('#5B5DF6', 0.06)}` }}>
                    <Typography sx={{ fontSize: '0.8rem', color: '#5B5DF6', fontWeight: 700, minWidth: 20 }}>{i + 1}.</Typography>
                    <Typography sx={{ flex: 1, fontSize: '0.875rem' }}>{q}</Typography>
                    <Button size="small" onClick={() => setCustomQuestions(customQuestions.filter((x) => x !== q))} sx={{ color: '#EF4444', minWidth: 0, p: 0.5 }}>
                      <Delete sx={{ fontSize: 16 }} />
                    </Button>
                  </Box>
                ))}
              </Box>
            )}
            {questionMode === 'ai' && (
              <Alert severity="info" sx={{ bgcolor: alpha('#5B5DF6', 0.06), color: '#5B5DF6', border: `1px solid ${alpha('#5B5DF6', 0.15)}` }}>
                The AI will generate tailored questions based on the job title, description, and required qualifications.
              </Alert>
            )}
          </SoftCard>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <SoftCard sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>Review & Publish</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { label: 'Job Title', value: title || '—' },
                { label: 'Location', value: location || '—' },
                { label: 'Salary', value: salaryMin && salaryMax ? `$${salaryMin} – $${salaryMax}` : '—' },
                { label: 'Interview Mode', value: questionMode === 'ai' ? 'AI Generated Questions' : `Custom (${customQuestions.length} questions)` },
                { label: 'Qualifications', value: `${qualifications.length} added` },
                { label: 'Responsibilities', value: `${responsibilities.length} added` },
              ].map((row) => (
                <Box key={row.label} sx={{ display: 'flex', justifyContent: 'space-between', py: 1.25, borderBottom: `1px solid ${alpha('#5B5DF6', 0.06)}` }}>
                  <Typography variant="body2" sx={{ color: '#8B8FA8', fontWeight: 500 }}>{row.label}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#0F1115' }}>{row.value}</Typography>
                </Box>
              ))}
            </Box>
          </SoftCard>
        )}

        {/* Navigation */}
        <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
          {step > 0 && (
            <Button variant="outlined" onClick={() => setStep(step - 1)} sx={{ borderColor: alpha('#5B5DF6', 0.2), color: '#5A5E72' }}>
              Previous
            </Button>
          )}
          {step < 3 ? (
            <GradientButton onClick={() => setStep(step + 1)}>Continue</GradientButton>
          ) : (
            <GradientButton onClick={handlePublish}>Publish Job</GradientButton>
          )}
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default CreateJobPage;