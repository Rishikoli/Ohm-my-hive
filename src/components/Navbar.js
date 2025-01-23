import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const pages = [
  { name: 'Home', path: '/home' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Trading', path: '/trading' },
  { name: 'Climate Impact', path: '/climate-impact' },
];

function Navbar() {
  const theme = useTheme();
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(26, 26, 26, 0.95)',
        borderBottom: '1px solid rgba(255, 183, 77, 0.2)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: '#FFB74D',
              textDecoration: 'none',
            }}
          >
            Ohm My Hive
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: '#FFB74D' }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.path}
                component={RouterLink}
                to={page.path}
                sx={{
                  my: 2,
                  mx: 1,
                  color: location.pathname === page.path ? '#FFB74D' : '#fff',
                  display: 'block',
                  borderBottom: location.pathname === page.path ? '2px solid #FFB74D' : 'none',
                  '&:hover': {
                    color: '#FFB74D',
                    borderBottom: '2px solid #FFB74D',
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
