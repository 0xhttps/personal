import React from 'react';
import { Box } from '@mui/material';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ padding: 3, maxWidth: '1200px', margin: '0 auto' }}>
      <code>
        {children}
      </code>
    </Box>
  );
};

export default PageWrapper;
