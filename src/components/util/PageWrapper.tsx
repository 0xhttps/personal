import React from 'react';
import { Box } from '@mui/material';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ padding: 1, maxWidth: '1222px', margin: '0 auto', paddingBottom: 3 }}>
      <code>
        {children}
      </code>
    </Box>
  );
};

export default PageWrapper;
