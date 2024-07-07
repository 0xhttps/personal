import React from 'react';
import { Box } from '@mui/material';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ padding: 1, maxWidth: '1048px', margin: '0 auto' }}>
      <div className='page-wrapper'>
        {children}
      </div>
    </Box>
  );
};

export default PageWrapper;
