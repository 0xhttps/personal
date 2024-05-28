import React from 'react';
import PageWrapper from '../util/PageWrapper';
import { Terminal as TerminalIcon } from '@mui/icons-material';
import { IconButton, Typography, Box, Link } from '@mui/material';
import { useTerminalContext } from '../util/TerminalContext';

const Home: React.FC = () => {
  const { handleOpen } = useTerminalContext();

  // List of terminal commands
  const commands = [
    { command: 'help', description: 'List all commands' },
    { command: 'ls', description: 'List all pages' },
    { command: 'cd <page>', description: 'Go to page' },
    { command: 'cd ..', description: 'Go to previous page' },
    { command: 'pwd', description: 'View current path' },
    { command: 'light', description: 'Toggle light mode' },
    { command: 'dark', description: 'Toggle dark mode' },
    { command: 'date', description: 'Current date' },
    { command: 'clear', description: 'Clear terminal' },
    { command: 'close', description: 'Close terminal' },
  ];

  return (
    <PageWrapper>
      <Typography variant="h2">
        <code>/</code>
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box mt={0} textAlign="left">
          Press below to open terminal
        </Box>
        <Box>
          <IconButton
            color="inherit"
            aria-label="terminal"
            onClick={handleOpen}
          >
            <TerminalIcon sx={{ fontSize: "225px", color: '#FF7F50' }} />
          </IconButton>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="left">
        <Typography variant="h5" gutterBottom>
          <code>Terminal Info</code>
        </Typography>
        <p>
          Can be used to navigate the webpage, similar to a terminal you would use on your computer.
          Used <Link href='https://xtermjs.org/' color="#FF7F50">xterm.js</Link> to create the terminal effect,
          with my own custom commands and styling.
        </p>
        <Typography variant="h5" gutterBottom>
          <code>Commands</code>
        </Typography>
        <Box>
          {commands.map((cmd, index) => (
            <Box key={index} display="flex" alignItems="center">
              <Typography variant="body1" component="span" sx={{ color: '#FF7F50' }}>
                <code>{cmd.command}</code>
              </Typography>
              <Typography variant="body2" component="span" sx={{ marginLeft: '10px' }}>
                <code>{cmd.description}</code>
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </PageWrapper>
  );
};

export default Home;
