import React from 'react';
import PageWrapper from '../util/PageWrapper';
import { Heading } from '@chakra-ui/react';

const Contact: React.FC = () => {
  return (
    <PageWrapper>
      <code>
        <Heading>Contact Page</Heading>
        <body>
          <code>
            This is where you can contact me.
          </code>
        </body>
      </code>
    </PageWrapper>
  );  
};

export default Contact;
