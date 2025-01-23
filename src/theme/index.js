import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFB74D',
      light: '#FFD180',
      dark: '#FF9800',
      contrastText: '#1A1A1A',
    },
    secondary: {
      main: '#1A1A1A',
      light: '#2C2C2C',
      dark: '#000000',
      contrastText: '#FFD180',
    },
    background: {
      default: '#1A1A1A',
      paper: 'rgba(26, 26, 26, 0.95)',
    },
    success: {
      main: '#FFB74D',
    },
    error: {
      main: '#FF5252',
    },
    text: {
      primary: '#FFD180',
      secondary: 'rgba(255, 209, 128, 0.7)',
    },
  },
  typography: {
    fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
    h1: {
      fontFamily: "'Orbitron', sans-serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Orbitron', sans-serif",
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: '#FFD180',
    },
    h3: {
      fontFamily: "'Orbitron', sans-serif",
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: '#FFD180',
    },
    h4: {
      fontFamily: "'Orbitron', sans-serif",
      fontWeight: 600,
      letterSpacing: '0.02em',
      color: '#FFD180',
    },
    h5: {
      fontFamily: "'Orbitron', sans-serif",
      fontWeight: 500,
      letterSpacing: '0.01em',
      color: '#FFD180',
    },
    h6: {
      fontFamily: "'Orbitron', sans-serif",
      fontWeight: 500,
      letterSpacing: '0.01em',
      color: '#FFD180',
    },
    subtitle1: {
      fontFamily: "'Rajdhani', sans-serif",
      fontWeight: 600,
    },
    subtitle2: {
      fontFamily: "'Rajdhani', sans-serif",
      fontWeight: 600,
    },
    body1: {
      fontFamily: "'Rajdhani', sans-serif",
      fontWeight: 500,
    },
    body2: {
      fontFamily: "'Rajdhani', sans-serif",
      fontWeight: 500,
    },
    button: {
      fontFamily: "'Rajdhani', sans-serif",
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: '#1A1A1A',
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 183, 77, 0.1) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          background: 'linear-gradient(45deg, #FFB74D 30%, #FFA000 90%)',
          color: '#1A1A1A',
          fontWeight: 600,
          '&:hover': {
            background: 'linear-gradient(45deg, #FFA000 30%, #FF8F00 90%)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 16,
          border: '1px solid rgba(255, 183, 77, 0.2)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 4px 20px rgba(255, 183, 77, 0.2)',
            borderColor: 'rgba(255, 183, 77, 0.4)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("/honeycomb-pattern.png")',
            opacity: 0.05,
            pointerEvents: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: 'rgba(26, 26, 26, 0.95)',
          border: '1px solid rgba(255, 183, 77, 0.2)',
          transition: 'transform 0.2s ease-in-out, border-color 0.2s ease-in-out',
          '&:hover': {
            borderColor: 'rgba(255, 183, 77, 0.4)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(26, 26, 26, 0.95)',
          borderBottom: '1px solid rgba(255, 183, 77, 0.2)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(26, 26, 26, 0.95)',
          borderRight: '1px solid rgba(255, 183, 77, 0.2)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255, 183, 77, 0.2)',
          color: '#FFD180',
        },
        head: {
          backgroundColor: 'rgba(26, 26, 26, 0.95)',
          fontWeight: 600,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(255, 183, 77, 0.1)',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#FFD180',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 209, 128, 0.7)',
          '&.Mui-focused': {
            color: '#FFB74D',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 183, 77, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 183, 77, 0.4)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FFB74D',
            },
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
