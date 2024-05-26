import React from 'react';
import PageWrapper from '../util/PageWrapper';
import { Terminal as TerminalIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Heading } from '@chakra-ui/react';
import { useTerminalContext } from '../util/TerminalContext';

const Home: React.FC = () => {
  const { handleOpen } = useTerminalContext();
  
  return (
    <PageWrapper>
      <code>
        <Heading>Hello!</Heading>
        <body>
          <code>
            This is my website<br/>Press below to open terminal 
          </code>
          <div>
            <IconButton           
              color="inherit" 
              aria-label="terminal" 
              onClick={handleOpen}
            >
              <TerminalIcon sx={{fontSize: "150px"}}/>
            </IconButton>
          </div>
        </body>
      </code>
    </PageWrapper>
  );
};

export default Home;
