import { createTheme, alpha } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    brand: {
      indigo: string;
      lavender: string;
      softIndigo: string;
      muted: string;
    };
  }
  interface PaletteOptions {
    brand?: {
      indigo?: string;
      lavender?: string;
      softIndigo?: string;
      muted?: string;
    };
  }
}

const BRAND = {
  indigo: '#5B5DF6',
  lavender: '#9B8FFF',
  softIndigo: '#EEF0FF',
  muted: '#8B8FA8',
};

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: BRAND.indigo,
      light: BRAND.lavender,
      dark: '#4042D4',
      contrastText: '#ffffff',
    },
    secondary: {
      main: BRAND.lavender,
      contrastText: '#ffffff',
    },
    background: {
      default: '#F8F9FC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0F1115',
      secondary: '#5A5E72',
      disabled: '#B0B3C6',
    },
    divider: 'rgba(91,93,246,0.08)',
    brand: BRAND,
    success: { main: '#22C55E', light: '#DCFCE7', dark: '#16A34A' },
    warning: { main: '#F59E0B', light: '#FEF3C7', dark: '#D97706' },
    error: { main: '#EF4444', light: '#FEE2E2', dark: '#DC2626' },
    info: { main: BRAND.indigo },
  },
  typography: {
    fontFamily: '"DM Sans", "Sora", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: {
      fontFamily: '"Sora", sans-serif',
      fontWeight: 800,
      fontSize: '3.5rem',
      lineHeight: 1.1,
      letterSpacing: '-0.03em',
      color: '#0F1115',
    },
    h2: {
      fontFamily: '"Sora", sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.15,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontFamily: '"Sora", sans-serif',
      fontWeight: 700,
      fontSize: '1.875rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontFamily: '"Sora", sans-serif',
      fontWeight: 600,
      fontSize: '1.375rem',
      lineHeight: 1.3,
      letterSpacing: '-0.015em',
    },
    h5: {
      fontFamily: '"Sora", sans-serif',
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontFamily: '"Sora", sans-serif',
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.4,
    },
    body1: {
      fontFamily: '"DM Sans", sans-serif',
      fontSize: '1rem',
      lineHeight: 1.65,
      letterSpacing: '-0.005em',
    },
    body2: {
      fontFamily: '"DM Sans", sans-serif',
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    caption: {
      fontFamily: '"DM Sans", sans-serif',
      fontSize: '0.75rem',
      letterSpacing: '0.02em',
    },
    button: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 500,
      letterSpacing: '-0.01em',
      textTransform: 'none',
      fontSize: '0.9375rem',
    },
    overline: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 600,
      fontSize: '0.6875rem',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  shadows: [
    'none',
    '0px 1px 3px rgba(15,17,21,0.04), 0px 1px 2px rgba(15,17,21,0.04)',
    '0px 2px 6px rgba(15,17,21,0.05), 0px 1px 3px rgba(15,17,21,0.05)',
    '0px 4px 10px rgba(15,17,21,0.06)',
    '0px 6px 16px rgba(15,17,21,0.07)',
    '0px 8px 24px rgba(15,17,21,0.08)',
    '0px 10px 30px rgba(15,17,21,0.08)',
    '0px 14px 40px rgba(15,17,21,0.09)',
    '0px 16px 48px rgba(15,17,21,0.10)',
    '0px 20px 56px rgba(15,17,21,0.11)',
    '0px 24px 64px rgba(15,17,21,0.12)',
    '0px 10px 30px rgba(15,17,21,0.05)',
    '0px 10px 30px rgba(15,17,21,0.05)',
    '0px 10px 30px rgba(15,17,21,0.05)',
    '0px 10px 30px rgba(15,17,21,0.05)',
    '0px 10px 30px rgba(15,17,21,0.05)',
    '0px 10px 30px rgba(15,17,21,0.05)',
    '0px 10px 30px rgba(15,17,21,0.05)',
    '0px 10px 30px rgba(15,17,21,0.05)',
    '0px 10px 30px rgba(15,17,21,0.05)',
    '0px 10px 30px rgba(15,17,21,0.05)',
    '0px 10px 30px rgba(15,17,21,0.05)',
    '0px 10px 30px rgba(15,17,21,0.05)',
    '0px 10px 30px rgba(15,17,21,0.05)',
    '0px 10px 30px rgba(15,17,21,0.05)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': { boxSizing: 'border-box' },
        html: { scrollBehavior: 'smooth' },
        body: {
          backgroundColor: '#F8F9FC',
          fontFamily: '"DM Sans", sans-serif',
        },
        '::-webkit-scrollbar': { width: '6px' },
        '::-webkit-scrollbar-track': { background: 'transparent' },
        '::-webkit-scrollbar-thumb': {
          background: alpha(BRAND.indigo, 0.2),
          borderRadius: '3px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: alpha(BRAND.indigo, 0.4),
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 14,
          padding: '10px 24px',
          fontWeight: 500,
          fontSize: '0.9375rem',
          transition: 'all 220ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': { transform: 'translateY(-1px)' },
          '&:active': { transform: 'translateY(0)' },
        },
        contained: {
          background: `linear-gradient(135deg, ${BRAND.indigo} 0%, ${BRAND.lavender} 100%)`,
          boxShadow: `0 4px 14px ${alpha(BRAND.indigo, 0.35)}`,
          '&:hover': {
            boxShadow: `0 6px 20px ${alpha(BRAND.indigo, 0.45)}`,
            background: `linear-gradient(135deg, ${BRAND.indigo} 0%, ${BRAND.lavender} 100%)`,
          },
        },
        outlined: {
          borderColor: alpha(BRAND.indigo, 0.25),
          color: BRAND.indigo,
          '&:hover': {
            borderColor: BRAND.indigo,
            backgroundColor: alpha(BRAND.indigo, 0.04),
          },
        },
        text: {
          color: BRAND.muted,
          '&:hover': { backgroundColor: alpha(BRAND.indigo, 0.04), color: BRAND.indigo },
        },
        sizeLarge: {
          padding: '14px 32px',
          fontSize: '1rem',
          borderRadius: 16,
        },
        sizeSmall: {
          padding: '6px 16px',
          fontSize: '0.8125rem',
          borderRadius: 10,
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: '#FAFBFF',
            transition: 'all 200ms',
            '& fieldset': { borderColor: alpha(BRAND.indigo, 0.15) },
            '&:hover fieldset': { borderColor: alpha(BRAND.indigo, 0.35) },
            '&.Mui-focused fieldset': {
              borderColor: BRAND.indigo,
              borderWidth: '1.5px',
              boxShadow: `0 0 0 3px ${alpha(BRAND.indigo, 0.08)}`,
            },
          },
          '& .MuiInputLabel-root.Mui-focused': { color: BRAND.indigo },
        },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderRadius: 24,
          border: `1px solid ${alpha(BRAND.indigo, 0.08)}`,
          boxShadow: '0px 10px 30px rgba(15,17,21,0.05)',
          transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0px 16px 40px rgba(15,17,21,0.09)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          fontSize: '0.75rem',
        },
        colorPrimary: {
          backgroundColor: alpha(BRAND.indigo, 0.1),
          color: BRAND.indigo,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          margin: '1px 0',
          '&.Mui-selected': {
            backgroundColor: alpha(BRAND.indigo, 0.08),
            color: BRAND.indigo,
            '&:hover': { backgroundColor: alpha(BRAND.indigo, 0.12) },
            '& .MuiListItemIcon-root': { color: BRAND.indigo },
          },
          '&:hover': { backgroundColor: alpha(BRAND.indigo, 0.05) },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 99,
          backgroundColor: alpha(BRAND.indigo, 0.1),
          height: 6,
        },
        bar: {
          borderRadius: 99,
          background: `linear-gradient(90deg, ${BRAND.indigo}, ${BRAND.lavender})`,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          background: `linear-gradient(135deg, ${BRAND.indigo}, ${BRAND.lavender})`,
        },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(248,249,252,0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${alpha(BRAND.indigo, 0.08)}`,
          color: '#0F1115',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
          borderRight: `1px solid ${alpha(BRAND.indigo, 0.08)}`,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: alpha(BRAND.indigo, 0.08) },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#0F1115',
          borderRadius: 8,
          fontSize: '0.75rem',
          padding: '6px 12px',
        },
        arrow: { color: '#0F1115' },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: { borderRadius: 20 },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          background: `linear-gradient(135deg, ${BRAND.indigo}, ${BRAND.lavender})`,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.9375rem',
          '&.Mui-selected': { color: BRAND.indigo },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          background: `linear-gradient(90deg, ${BRAND.indigo}, ${BRAND.lavender})`,
          borderRadius: 2,
          height: 2,
        },
      },
    },
  },
});
