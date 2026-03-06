import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Icon, LogoSVG } from '../components/Icons';
import { StatusBadge, WaveformVisualizer } from '../components/shared';
import { COLORS } from '../theme/theme';
import { InterviewStatus, TranscriptEntry } from '../types';

const Interview: React.FC = () => {
  const nav = useNavigate();
  const [status, setStatus] = useState<InterviewStatus>('speaking');
  const [timer, setTimer] = useState(0);
  const [micActive, setMicActive] = useState(false);
  const [qIdx, setQIdx] = useState(2);
  const totalQ = 8;
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([
    { who: 'AI',  text: "Hello! I'll be conducting your structured interview today. Are you ready to begin?" },
    { who: 'You', text: 'Yes, absolutely ready.' },
    { who: 'AI',  text: 'Great. Tell me about a challenging project you led and what the outcome was.' },
  ]);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => { const t = setInterval(() => setTimer(p => p + 1), 1000); return () => clearInterval(t); }, []);
  useEffect(() => { if (transcriptRef.current) transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight; }, [transcript]);

  const fmt = (s: number) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  const handleMic = () => {
    if (!micActive) { setMicActive(true); setStatus('listening'); }
    else {
      setMicActive(false); setStatus('thinking');
      setTimeout(() => {
        setStatus('speaking');
        setTranscript(p => [...p, { who: 'You', text: "I led a complete redesign of our data pipeline that cut processing time by 60%, delivered two weeks early." }]);
        setTimeout(() => {
          setTranscript(p => [...p, { who: 'AI', text: 'Excellent result. What were the main technical challenges you encountered during that redesign?' }]);
          setQIdx(q => Math.min(q + 1, totalQ));
        }, 1600);
      }, 1400);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#0F1115', color: 'white', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ px: '28px', py: '14px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Box onClick={() => nav('/')} sx={{ cursor: 'pointer' }}><LogoSVG size={26} /></Box>
          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'white' }}>Senior Product Manager</Typography>
            <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.38)' }}>Live Session</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Typography sx={{ fontFamily: "'DM Mono',monospace", fontSize: 20, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.05em' }}>{fmt(timer)}</Typography>
          <StatusBadge status={status} />
          <Box component="button" onClick={() => nav('/report')} sx={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: COLORS.red, borderRadius: '12px', px: '16px', py: '8px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", '&:hover': { background: 'rgba(239,68,68,0.2)' } }}>
            End Session
          </Box>
        </Box>
      </Box>
      <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 310px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: '36px' }}>
          <Box sx={{ position: 'relative', mb: '28px' }}>
            {status === 'speaking' && (
              <>
                <Box sx={{ position: 'absolute', inset: -20, borderRadius: '50%', border: '2px solid rgba(91,93,246,0.3)', animation: 'pulse-ring 2s ease-out infinite' }} />
                <Box sx={{ position: 'absolute', inset: -10, borderRadius: '50%', border: '1px solid rgba(91,93,246,0.18)', animation: 'pulse-ring 2s ease-out 0.5s infinite' }} />
              </>
            )}
            <Box className={status === 'speaking' ? 'speaking-avatar' : ''} sx={{ width: 116, height: 116, borderRadius: '50%', background: `linear-gradient(135deg,${COLORS.indigo},${COLORS.lavender})`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'box-shadow 0.5s ease' }}>
              <Icon name="brain" size={50} color="white" />
            </Box>
          </Box>
          <WaveformVisualizer active={micActive || status === 'speaking'} bars={18} />
          <Box component="button" onClick={handleMic} sx={{ mt: '32px', width: 70, height: 70, borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: micActive ? 'linear-gradient(135deg,#EF4444,#F87171)' : `linear-gradient(135deg,${COLORS.indigo},${COLORS.lavender})`, boxShadow: micActive ? '0 0 30px rgba(239,68,68,0.4)' : '0 0 20px rgba(91,93,246,0.3)', transition: 'all 0.25s ease', '&:hover': { transform: 'scale(1.07)' } }}>
            <Icon name="mic" size={26} color="white" />
          </Box>
          <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', mt: '11px', fontWeight: 500 }}>{micActive ? 'Tap to stop' : 'Tap to speak'}</Typography>
          <Box sx={{ mt: '38px', width: '100%', maxWidth: 380 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '9px' }}>
              <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', fontWeight: 500 }}>Progress</Typography>
              <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.58)', fontWeight: 600, fontFamily: "'DM Mono',monospace" }}>{qIdx} / {totalQ}</Typography>
            </Box>
            <Box sx={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.08)' }}>
              <Box sx={{ width: `${(qIdx/totalQ)*100}%`, height: '100%', borderRadius: 2, background: `linear-gradient(90deg,${COLORS.indigo},${COLORS.lavender})`, transition: 'width 0.5s ease' }} />
            </Box>
            <Box sx={{ display: 'flex', gap: '4px', mt: '12px' }}>
              {Array.from({ length: totalQ }).map((_, i) => (
                <Box key={i} sx={{ flex: 1, height: 3, borderRadius: 2, background: i < qIdx ? `linear-gradient(90deg,${COLORS.indigo},${COLORS.lavender})` : 'rgba(255,255,255,0.08)', transition: 'background 0.4s ease' }} />
              ))}
            </Box>
          </Box>
        </Box>
        <Box sx={{ background: 'rgba(255,255,255,0.025)', borderLeft: '1px solid rgba(255,255,255,0.06)', p: '22px 18px', display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', mb: '18px' }}>Live Transcript</Typography>
          <Box ref={transcriptRef} sx={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {transcript.map((t, i) => (
              <Box key={i} sx={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: t.who === 'You' ? 'flex-end' : 'flex-start' }}>
                <Typography sx={{ fontSize: 10, fontWeight: 700, color: t.who === 'You' ? COLORS.lavender : 'rgba(255,255,255,0.28)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>{t.who}</Typography>
                <Box sx={{ background: t.who === 'You' ? 'rgba(91,93,246,0.2)' : 'rgba(255,255,255,0.055)', border: `1px solid ${t.who === 'You' ? 'rgba(91,93,246,0.28)' : 'rgba(255,255,255,0.05)'}`, borderRadius: '13px', p: '9px 13px', fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', maxWidth: '92%' }}>{t.text}</Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Interview;
