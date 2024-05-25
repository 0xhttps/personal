import React from 'react';
import PageWrapper from '../util/PageWrapper';
import { Heading } from '@chakra-ui/react';

const About: React.FC = () => {
  return (
    <PageWrapper>
      <code>
        <Heading>About Page</Heading>
        <body>
          <code>
            This is the about page.
          </code>
        </body>
      </code>
    </PageWrapper>
  );
};

export default About;
