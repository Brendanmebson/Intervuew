import React from 'react';
import { Chip } from '@mui/material';
import { alpha } from '@mui/material/styles';

type StatusType = 'applied' | 'screening' | 'interviewing' | 'reviewed' | 'hired' | 'rejected' | 'active' | 'paused' | 'closed' | 'completed';

interface StatusBadgeProps {
  status: StatusType;
  size?: 'small' | 'medium';
}

const statusConfig: Record<StatusType, { label: string; color: string; bg: string }> = {
  applied: { label: 'Applied', color: '#5B5DF6', bg: alpha('#5B5DF6', 0.1) },
  screening: { label: 'Screening', color: '#F59E0B', bg: alpha('#F59E0B', 0.1) },
  interviewing: { label: 'Interviewing', color: '#9B8FFF', bg: alpha('#9B8FFF', 0.1) },
  reviewed: { label: 'Reviewed', color: '#0EA5E9', bg: alpha('#0EA5E9', 0.1) },
  hired: { label: 'Hired', color: '#22C55E', bg: alpha('#22C55E', 0.1) },
  rejected: { label: 'Rejected', color: '#EF4444', bg: alpha('#EF4444', 0.1) },
  active: { label: 'Active', color: '#22C55E', bg: alpha('#22C55E', 0.1) },
  paused: { label: 'Paused', color: '#F59E0B', bg: alpha('#F59E0B', 0.1) },
  closed: { label: 'Closed', color: '#8B8FA8', bg: alpha('#8B8FA8', 0.1) },
  completed: { label: 'Completed', color: '#22C55E', bg: alpha('#22C55E', 0.1) },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'small' }) => {
  const config = statusConfig[status] || statusConfig.applied;
  return (
    <Chip
      label={config.label}
      size={size}
      sx={{
        backgroundColor: config.bg,
        color: config.color,
        fontWeight: 600,
        fontSize: size === 'small' ? '0.7rem' : '0.8rem',
        height: size === 'small' ? 24 : 28,
        borderRadius: '6px',
        border: `1px solid ${alpha(config.color, 0.2)}`,
        '& .MuiChip-label': { px: 1.5 },
      }}
    />
  );
};

export default StatusBadge;
