import React from 'react';
import { Box } from '@mui/material';

interface DashboardLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ sidebar, children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8F9FC' }}>
      {sidebar}
      <Box
        component="main"
        sx={{
          flex: 1,
          ml: '240px',
          minHeight: '100vh',
          p: 4,
          maxWidth: 'calc(100vw - 240px)',
          overflowX: 'hidden',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
