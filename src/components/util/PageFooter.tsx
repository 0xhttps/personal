import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { GitHub } from '@mui/icons-material';

const PageFooter: React.FC<{}> = () => {
    return (
        <Box className='page-footer' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, backgroundColor: 'inherit', color: 'inherit' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
                <Link href="https://github.com/0xhttps" target="_blank" rel="noopener" color="inherit">
                    <GitHub fontSize="large" />
                </Link>
            </Box>
            <Typography variant="inherit" color="inherit">
                &copy; {new Date().getFullYear()} 0xhttps.
            </Typography>
        </Box>
    );
};

export default PageFooter;
