import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Typography, Button, alpha, LinearProgress,
  IconButton, Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Stop, Psychology } from '@mui/icons-material';
import { useJobs } from '../../context/JobsContext';

const DEFAULT_QUESTIONS = [
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
      <Box key={i} sx={{
        width: 3, borderRadius: 99, bgcolor: '#5B5DF6',
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
      }} />
    ))}
  </Box>
);

const AIAvatar: React.FC<{ state: InterviewState }> = ({ state }) => {
  const isSpeaking = state === 'speaking';
  const isThinking = state === 'thinking';
  return (
    <Box sx={{ position: 'relative', width: 140, height: 140 }}>
      {isSpeaking && (
        <Box sx={{
          position: 'absolute', inset: -12, borderRadius: '50%',
          border: `2px solid ${alpha('#5B5DF6', 0.25)}`,
          animation: 'avatar-glow 1.5s ease-in-out infinite',
          '@keyframes avatar-glow': {
            '0%, 100%': { transform: 'scale(1)', opacity: 0.5 },
            '50%': { transform: 'scale(1.08)', opacity: 0.15 },
          },
        }} />
      )}
      {isSpeaking && (
        <Box sx={{
          position: 'absolute', inset: -6, borderRadius: '50%',
          border: `1.5px solid ${alpha('#5B5DF6', 0.3)}`,
          animation: 'avatar-glow 1.5s ease-in-out infinite 0.2s',
        }} />
      )}
      <Box sx={{
        width: 140, height: 140, borderRadius: '50%',
        background: isSpeaking
          ? 'linear-gradient(135deg, #5B5DF6 0%, #9B8FFF 100%)'
          : isThinking
            ? 'linear-gradient(135deg, #374151 0%, #6B7280 100%)'
            : 'linear-gradient(135deg, #4042D4 0%, #5B5DF6 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: isSpeaking ? `0 0 40px ${alpha('#5B5DF6', 0.5)}` : '0 16px 48px rgba(91,93,246,0.3)',
        transition: 'all 400ms ease-in-out',
        animation: isThinking ? 'shimmer 1.5s ease-in-out infinite' : 'none',
        '@keyframes shimmer': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.7 } },
      }}>
        <Psychology sx={{ fontSize: 56, color: 'rgba(255,255,255,0.9)' }} />
      </Box>
    </Box>
  );
};

const LiveInterviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentApplication, getJobById, markInterviewDone } = useJobs();

  const job = currentApplication ? getJobById(currentApplication.jobId) : undefined;

  const INTERVIEW_QUESTIONS: string[] = (() => {
    if (job?.questionMode === 'custom' && job.questions && job.questions.length > 0) {
      return job.questions;
    }
    if (job) {
      return [
        `Tell me about your background and why you're interested in the ${job.title} role at ${job.company}.`,
        `This role requires ${job.qualifications[0] ?? 'strong technical skills'}. Can you walk me through your experience with that?`,
        'Describe a challenging project you worked on and how you overcame the obstacles.',
        `${job.qualifications[1] ? `How have you applied ${job.qualifications[1]} in a real-world project?` : 'How do you approach problem-solving when requirements are unclear?'}`,
        `Where do you see yourself in 5 years, and how does the ${job.title} role fit into that vision?`,
      ];
    }
    return DEFAULT_QUESTIONS;
  })();

  const [interviewState, setInterviewState] = useState<InterviewState>('idle');
  const [currentQ, setCurrentQ] = useState(0);
  const [isMicOn, setIsMicOn] = useState(false);
  const [timer, setTimer] = useState(0);
  const [transcript, setTranscript] = useState<{ speaker: 'AI' | 'You'; text: string }[]>([]);
  const timerRef = useRef<number | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (interviewState !== 'idle' && interviewState !== 'completed') {
      timerRef.current = window.setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [interviewState]);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const startInterview = () => {
    setInterviewState('speaking');
    setTranscript([{ speaker: 'AI', text: INTERVIEW_QUESTIONS[0] }]);
  };

  const handleMicToggle = () => {
    if (!isMicOn) {
      setIsMicOn(true);
      setInterviewState('listening');
    } else {
      setIsMicOn(false);
      setInterviewState('thinking');
      setTimeout(() => {
        setTranscript((t) => [...t, {
          speaker: 'You',
          text: 'I have strong experience in this area and have applied these skills across multiple projects...',
        }]);
        setTimeout(() => {
          if (currentQ < INTERVIEW_QUESTIONS.length - 1) {
            const nextQ = currentQ + 1;
            setCurrentQ(nextQ);
            setInterviewState('speaking');
            setTranscript((t) => [...t, { speaker: 'AI', text: INTERVIEW_QUESTIONS[nextQ] }]);
          } else {
            // Mark as done so dashboard no longer shows pending card
            markInterviewDone();
            setInterviewState('completed');
          }
        }, 1500);
      }, 2000);
    }
  };

  const getStateLabel = () => {
    switch (interviewState) {
      case 'idle': return 'Ready to start';
      case 'speaking': return 'AI is speaking...';
      case 'listening': return 'Listening...';
      case 'thinking': return 'AI is thinking...';
      case 'completed': return 'Interview complete';
      default: return '';
    }
  };

  if (interviewState === 'completed') {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#0F1115', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center', px: 4 }}>
          <Box sx={{
            width: 80, height: 80, borderRadius: '50%', mx: 'auto', mb: 3,
            background: 'linear-gradient(135deg, #5B5DF6, #9B8FFF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Psychology sx={{ fontSize: 40, color: '#fff' }} />
          </Box>
          <Typography variant="h3" sx={{ color: '#fff', mb: 1 }}>Interview Complete!</Typography>
          {currentApplication && (
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', mb: 0.5, fontSize: '0.875rem' }}>
              {currentApplication.jobTitle} · {currentApplication.company}
            </Typography>
          )}
          <Typography sx={{ color: 'rgba(255,255,255,0.6)', mb: 4 }}>
            Your responses are being analyzed by the AI engine.
          </Typography>
          <Button
            variant="contained" size="large"
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
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        bgcolor: 'rgba(255,255,255,0.02)',
      }}>
        <Box>
          <Typography sx={{
            fontFamily: '"Sora", sans-serif', fontWeight: 800, fontSize: '1.125rem',
            background: 'linear-gradient(135deg, #5B5DF6 0%, #9B8FFF 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Intervuew
          </Typography>
          {currentApplication && (
            <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', mt: 0.25 }}>
              {currentApplication.jobTitle} · {currentApplication.company}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{
              width: 8, height: 8, borderRadius: '50%',
              bgcolor: interviewState === 'idle' ? '#8B8FA8' : '#22C55E',
              animation: interviewState !== 'idle' ? 'pulse 2s infinite' : 'none',
              '@keyframes pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.4 } },
            }} />
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
              size="small" startIcon={<Stop />}
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
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Center panel */}
        <Box sx={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', px: 4, py: 6,
        }}>
          <AIAvatar state={interviewState} />

          <Box sx={{ mt: 3.5, mb: 2, textAlign: 'center' }}>
            <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', fontWeight: 600, mb: 0.75 }}>
              {interviewState === 'speaking' ? 'AI INTERVIEWER' : interviewState === 'listening' ? 'RECORDING' : interviewState === 'thinking' ? 'PROCESSING' : 'READY'}
            </Typography>
            {interviewState !== 'idle' && (
              <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', maxWidth: 440, textAlign: 'center', lineHeight: 1.65 }}>
                {interviewState === 'speaking'
                  ? INTERVIEW_QUESTIONS[currentQ]
                  : interviewState === 'listening'
                    ? 'Your response is being recorded...'
                    : 'Analyzing your response...'}
              </Typography>
            )}
          </Box>

          <Box sx={{ mb: 4 }}>
            <Waveform active={interviewState === 'listening' || interviewState === 'speaking'} />
          </Box>

          {/* Progress */}
          <Box sx={{ width: '100%', maxWidth: 360, mb: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Progress</Typography>
              <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
                {currentQ + 1} / {INTERVIEW_QUESTIONS.length}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={((currentQ + (interviewState === 'completed' ? 1 : 0)) / INTERVIEW_QUESTIONS.length) * 100}
              sx={{
                height: 4, borderRadius: 99, bgcolor: 'rgba(255,255,255,0.08)',
                '& .MuiLinearProgress-bar': { background: 'linear-gradient(90deg, #5B5DF6, #9B8FFF)', borderRadius: 99 },
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
          {interviewState === 'idle' ? (
            <Button
              variant="contained" size="large" onClick={startInterview}
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
              disabled={interviewState === 'thinking' || interviewState === 'speaking'}
              sx={{
                width: 80, height: 80,
                bgcolor: isMicOn ? '#EF4444' : '#5B5DF6',
                color: '#fff',
                boxShadow: isMicOn
                  ? `0 0 0 12px ${alpha('#EF4444', 0.15)}, 0 4px 24px ${alpha('#EF4444', 0.4)}`
                  : `0 4px 24px ${alpha('#5B5DF6', 0.5)}`,
                '&:hover': { bgcolor: isMicOn ? '#DC2626' : '#4042D4', transform: 'scale(1.05)' },
                '&:disabled': { bgcolor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.2)' },
                transition: 'all 250ms',
              }}
            >
              {isMicOn ? <MicOff sx={{ fontSize: 32 }} /> : <Mic sx={{ fontSize: 32 }} />}
            </IconButton>
          )}
          <Typography sx={{ mt: 2, fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
            {interviewState === 'idle' ? '' : isMicOn ? 'Tap to stop recording' : interviewState === 'thinking' ? 'Processing...' : interviewState === 'speaking' ? 'Wait for the question' : 'Tap microphone to answer'}
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
            {currentApplication && (
              <Typography sx={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', mt: 0.5 }}>
                {currentApplication.jobTitle}
              </Typography>
            )}
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
                  <Typography sx={{
                    fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', mb: 0.75,
                    color: t.speaker === 'AI' ? '#5B5DF6' : '#9B8FFF',
                  }}>
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