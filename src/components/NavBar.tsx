import React, { useEffect, useRef } from 'react';
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Box, Popper, Paper, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import { Brightness4, Brightness7, Terminal as TerminalIcon, Menu as MenuIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useThemeContext } from '../ThemeContext';
import { useTerminalContext } from './util/TerminalContext';

export const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }
];

export var isMobile: any;

const NavBar: React.FC = () => {
  const { toggleColorMode, theme } = useThemeContext();
  const { handleOpen } = useTerminalContext();
  const themeMUI = useTheme();
  isMobile = useMediaQuery(themeMUI.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const currentPath = window.location.hash.substring(1);
  const popperRef = useRef<HTMLDivElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popperRef.current && !popperRef.current.contains(event.target as Node)) {
        handleMenuClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popperRef]);

  const filteredNavItems = navItems.filter(item => item.label !== 'Home');

  const menuItems = (
    <List>
      {filteredNavItems.map((item) => (
        <ListItem button
          key={item.label}
          component={RouterLink}
          to={item.path}
          onClick={handleMenuClose}
          sx={{
              color: currentPath === item.path ? '#FF7F50' : 'inherit',
          }}
        >
          <ListItemText primary={<code>{item.label}</code>} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <AppBar position="fixed" color="default">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Button
            component={RouterNavLink}
            to={'/'}
            sx={{
              margin: '0 10px',
              position: 'relative',
              textTransform: 'none',
              '&.active::after': {
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '2px',
                backgroundColor: '#FF7F50',
                bottom: '-5px',
                left: 0,
              },
              color: '#FF7F50',
            }}
          >
            <code>0xhttps</code>
          </Button>
          {!isMobile && filteredNavItems.map((item) => (
            <Button
              key={item.label}
              component={RouterNavLink}
              to={item.path}
              sx={{
                margin: '0 10px',
                position: 'relative',
                textTransform: 'none',
                '&.active::after': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '2px',
                  backgroundColor: '#FF7F50',
                  bottom: '-5px',
                  left: 0,
                },
              }}
              color="inherit"
            >
              <code>{item.label}</code>
            </Button>
          ))}
        </Box>
        <IconButton edge="end" color="inherit" aria-label="mode" onClick={toggleColorMode} sx={{ paddingRight: '15px' }}>
          {theme.palette.mode === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
        <IconButton edge="end" color="inherit" aria-label="terminal" onClick={handleOpen} sx={{ paddingRight: '15px' }}>
          <TerminalIcon />
        </IconButton>
        {isMobile && (
          <>
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuOpen} sx={{ paddingRight: '15px' }}>
              <MenuIcon />
            </IconButton>
            <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
              <Paper ref={popperRef}>
                {menuItems}
              </Paper>
            </Popper>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
