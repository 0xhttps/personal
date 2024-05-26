import React from 'react';
import { Link as RouterLink, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { Brightness4, Brightness7, Terminal as TerminalIcon } from '@mui/icons-material';
import { useThemeContext } from '../ThemeContext';
import { useTerminalContext } from './util/TerminalContext';

export const navItems = [
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }
];

const NavBar: React.FC = () => {
  const { toggleColorMode, theme } = useThemeContext();
  const { handleOpen } = useTerminalContext();
  const location = useLocation();

  return (
    <AppBar position="fixed" color="default">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <IconButton>
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
            <code>0xhttps</code>
          </Typography>
          </IconButton>
          
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
              <code>{item.label}</code>
            </Button>
          ))}
        </Box>
        <IconButton edge="end" color="inherit" aria-label="mode" onClick={toggleColorMode}>
          {theme.palette.mode === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
        <IconButton 
          edge="end" 
          color="inherit" 
          aria-label="terminal" 
          onClick={handleOpen} 
        >
          <TerminalIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
