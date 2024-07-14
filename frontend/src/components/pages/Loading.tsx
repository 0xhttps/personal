import React from 'react';
import { Typography } from '@mui/material';
import PageWrapper from '../util/PageWrapper';

const Loading: React.FC = () => {
    return (
        <PageWrapper>
            <Typography variant="h2">
                <code>/loading</code>
            </Typography>
        </PageWrapper>
    );
};

export default Loading;
