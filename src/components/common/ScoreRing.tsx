import React from 'react';
import { Box, Typography } from '@mui/material';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  color?: string;
}

const ScoreRing: React.FC<ScoreRingProps> = ({
  score,
  size = 120,
  strokeWidth = 8,
  label,
  color = '#5B5DF6',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 85) return '#22C55E';
    if (s >= 70) return '#5B5DF6';
    if (s >= 55) return '#F59E0B';
    return '#EF4444';
  };

  const ringColor = color !== '#5B5DF6' ? color : getColor(score);

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(91,93,246,0.1)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </svg>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: size > 100 ? '1.75rem' : '1.25rem',
              fontWeight: 700,
              fontFamily: '"Sora", sans-serif',
              color: ringColor,
              lineHeight: 1,
            }}
          >
            {score}
          </Typography>
          <Typography sx={{ fontSize: '0.65rem', color: '#8B8FA8', fontWeight: 500 }}>/ 100</Typography>
        </Box>
      </Box>
      {label && (
        <Typography
          variant="caption"
          sx={{ mt: 1, color: '#5A5E72', fontWeight: 500, textAlign: 'center' }}
        >
          {label}
        </Typography>
      )}
    </Box>
  );
};

export default ScoreRing;
