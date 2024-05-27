import React from 'react';
import PageWrapper from '../util/PageWrapper';
import { Terminal as TerminalIcon } from '@mui/icons-material';
import { IconButton, Typography, Box } from '@mui/material';
import { useTerminalContext } from '../util/TerminalContext';

const Home: React.FC = () => {
  const { handleOpen } = useTerminalContext();
  
  return (
    <PageWrapper>
        <Typography variant="h2" gutterBottom>
          <code>/</code>
        </Typography>
        <Box>
          <code>
            This is my website
            <br/>
            Press below to open terminal 
          </code>
          <Box>
            <IconButton           
              color="inherit" 
              aria-label="terminal" 
              onClick={handleOpen}
            >
              <TerminalIcon sx={{fontSize: "150px"}}/>
            </IconButton>
          </Box>
        </Box>
    </PageWrapper>
  );
};

export default Home;
