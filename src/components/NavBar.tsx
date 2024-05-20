import React from 'react';
import { Link as RouterLink, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeContext } from '../ThemeContext';
import { useWeb3Onboard } from './util/Web3OnboardContext.tsx';

const navItems = [
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact'}
];

const NavBar: React.FC = () => {
  const { toggleColorMode, theme } = useThemeContext();
  const { connect, disconnect, connectedWallet } = useWeb3Onboard();
  const location = useLocation();

  const handleLogin = async () => {
    console.log("Login button clicked");
    await connect();
  };

  const handleLogout = () => {
    console.log("Logout button clicked");
    disconnect();
  };

  return (
    <AppBar position="fixed" color="default">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              marginRight: '20px',
              textDecoration: 'none',
              color: location.pathname === '/' ? '#FF7F50' : 'inherit',
              textTransform: 'none',
            }}
          >
            0xhttps
          </Typography>
          {navItems.map((item) => (
            <Button
              key={item.label}
              component={RouterNavLink}
              to={item.path}
              sx={{
                margin: '0 10px',
                position: 'relative',
                textTransform: 'none',
                '&.active': {
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '2px',
                    backgroundColor: '#FF7F50',
                    bottom: '-5px',
                    left: 0,
                  },
                },
              }}
              color="inherit"
            >
              {item.label}
            </Button>
          ))}
        </Box>
        {connectedWallet ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={handleLogin}>
            Login
          </Button>
        )}
        <IconButton edge="end" color="inherit" aria-label="mode" onClick={toggleColorMode}>
          {theme.palette.mode === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
