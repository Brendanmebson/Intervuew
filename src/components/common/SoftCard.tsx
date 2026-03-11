import React from 'react';
import { Box, alpha } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

interface SoftCardProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  hover?: boolean;
  glass?: boolean;
  onClick?: () => void;
  padding?: number | string;
}

const SoftCard: React.FC<SoftCardProps> = ({
  children,
  sx,
  hover = false,
  glass = false,
  onClick,
  padding = 3,
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        borderRadius: 3,
        border: `1px solid ${alpha('#5B5DF6', 0.09)}`,
        background: glass
          ? 'rgba(255,255,255,0.7)'
          : '#FFFFFF',
        backdropFilter: glass ? 'blur(16px)' : 'none',
        boxShadow: '0px 10px 30px rgba(15,17,21,0.05)',
        padding,
        transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: onClick ? 'pointer' : 'default',
        ...(hover && {
          '&:hover': {
            boxShadow: '0px 16px 40px rgba(15,17,21,0.09)',
            transform: 'translateY(-2px)',
            borderColor: alpha('#5B5DF6', 0.18),
          },
        }),
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default SoftCard;
