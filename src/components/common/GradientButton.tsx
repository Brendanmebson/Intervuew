import React from 'react';
import { Button, alpha } from '@mui/material';
import type { ButtonProps } from '@mui/material';

interface GradientButtonProps extends ButtonProps {
  glow?: boolean;
}

const GradientButton: React.FC<GradientButtonProps> = ({ glow = true, sx, children, ...props }) => {
  return (
    <Button
      variant="contained"
      {...props}
      sx={{
        background: 'linear-gradient(135deg, #5B5DF6 0%, #9B8FFF 100%)',
        boxShadow: glow ? `0 4px 14px ${alpha('#5B5DF6', 0.35)}` : 'none',
        color: '#fff',
        fontWeight: 600,
        '&:hover': {
          background: 'linear-gradient(135deg, #4042D4 0%, #8B7FEF 100%)',
          boxShadow: glow ? `0 6px 20px ${alpha('#5B5DF6', 0.45)}` : 'none',
          transform: 'translateY(-1px)',
        },
        '&:active': { transform: 'translateY(0)' },
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

export default GradientButton;
