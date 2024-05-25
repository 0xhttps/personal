import React, { useState } from 'react';
import PageWrapper from '../util/PageWrapper';
import { Heading } from '@chakra-ui/react';

const Home: React.FC = () => {
  return (
    <PageWrapper>
      <code>
        <Heading>Hello friend</Heading>
        <body>
          <code>
            Welcome to my website.
          </code>
        </body>
      </code>
    </PageWrapper>
  );
};

export default Home;
