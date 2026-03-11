import React from 'react';
import {
  Box, List, ListItemButton, ListItemIcon, ListItemText,
  Typography, Divider, Avatar, alpha,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface SidebarNavProps {
  items: NavItem[];
  bottomItems?: NavItem[];
}

const SidebarNav: React.FC<SidebarNavProps> = ({ items, bottomItems = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <Box
      sx={{
        width: 240,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#FFFFFF',
        borderRight: `1px solid ${alpha('#5B5DF6', 0.08)}`,
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 100,
        py: 2,
      }}
    >
      {/* Logo */}
      <Box sx={{ px: 3, pb: 3 }}>
        <Typography
          sx={{
            fontFamily: '"Sora", sans-serif',
            fontWeight: 800,
            fontSize: '1.375rem',
            background: 'linear-gradient(135deg, #5B5DF6 0%, #9B8FFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.03em',
          }}
        >
          Intervuew
        </Typography>
        <Typography variant="caption" sx={{ color: '#8B8FA8', letterSpacing: '0.08em', fontWeight: 500 }}>
          {user?.role === 'organization' ? 'EMPLOYER PORTAL' : 'PREP STUDIO'}
        </Typography>
      </Box>

      <Divider sx={{ mx: 2 }} />

      {/* Main Nav */}
      <List sx={{ px: 1.5, pt: 2, flex: 1 }}>
        {items.map((item) => {
          const active = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          return (
            <ListItemButton
              key={item.path}
              selected={active}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: '10px',
                mb: 0.5,
                py: 1.25,
                px: 1.5,
                '&.Mui-selected': {
                  bgcolor: alpha('#5B5DF6', 0.08),
                  '& .MuiListItemText-primary': {
                    color: '#5B5DF6',
                    fontWeight: 600,
                  },
                  '& .MuiListItemIcon-root': { color: '#5B5DF6' },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: active ? '#5B5DF6' : '#8B8FA8' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: active ? 600 : 500,
                  color: active ? '#5B5DF6' : '#5A5E72',
                  fontFamily: '"DM Sans", sans-serif',
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      {/* Bottom Items + User */}
      <Box>
        {bottomItems.length > 0 && (
          <>
            <Divider sx={{ mx: 2, mb: 1 }} />
            <List sx={{ px: 1.5 }}>
              {bottomItems.map((item) => (
                <ListItemButton
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  sx={{ borderRadius: '10px', py: 1, px: 1.5 }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: '#8B8FA8' }}>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500, color: '#8B8FA8' }}
                  />
                </ListItemButton>
              ))}
            </List>
          </>
        )}

        <Divider sx={{ mx: 2, my: 1 }} />
        <Box
          sx={{
            px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1.5,
            cursor: 'pointer',
            borderRadius: '10px',
            mx: 1.5,
            '&:hover': { bgcolor: alpha('#5B5DF6', 0.05) },
            transition: 'all 200ms',
          }}
          onClick={logout}
        >
          <Avatar sx={{ width: 32, height: 32, fontSize: '0.75rem', fontWeight: 700 }}>
            {user?.name?.charAt(0)}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0F1115', lineHeight: 1.3, noWrap: true }}
              noWrap
            >
              {user?.name}
            </Typography>
            <Typography variant="caption" sx={{ color: '#8B8FA8' }}>Sign out</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarNav;
