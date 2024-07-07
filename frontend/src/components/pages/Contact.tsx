import React, { useState } from 'react';
import PageWrapper from '../util/PageWrapper';
import { Box, Link, TextField, Button, Avatar, Typography } from '@mui/material';
import emailjs from 'emailjs-com';
import pfp from '../../../public/0xhttps.png';
import { ThemeProvider } from '@mui/material/styles';
import { inputTheme } from '../util/inputTheme';

const Contact: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const service_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const template_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const user_ID = import.meta.env.VITE_EMAILJS_USER_ID;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const templateParams = {
      from_name: email,
      message: message,
    };

    emailjs.send(
      service_ID,
      template_ID,
      templateParams,
      user_ID
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus('Email sent successfully!');
      }, (err) => {
        console.log('FAILED...', err);
        setStatus('Failed to send email.');
      });

    // Clear form fields
    setEmail('');
    setMessage('');
  };

  return (
    <ThemeProvider theme={inputTheme}>
      <PageWrapper>
        <Typography variant="h2">
          <code>/contact</code>
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar src={pfp} alt="pfp" sx={{ width: 100, height: 100 }} />
          <Box mt={4} textAlign="center">
            <p>
              {`You can reach me at `}
              <Link href={`mailto:0xhttps.dev@gmail.com`} color="#FF7F50">
                0xhttps.dev@gmail.com
              </Link>
              , or fill in the form below:
            </p>
          </Box>
          <Box component="form" onSubmit={handleSubmit} mt={2} width="100%" maxWidth={600}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
              variant="outlined"
              placeholder="Enter your email"
            />
            <TextField
              label="Message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              required
              multiline
              rows={4}
              margin="normal"
              variant="outlined"
              placeholder="Enter your message"
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }} style={{ backgroundColor: '#FF7F50', color: 'inherit' }}>
              <code>Send</code>
            </Button>
          </Box>
          {status && (
            <Box mt={2}>
              <Typography variant="body1" color={status.includes('successfully') ? '#FF7F50' : 'red'}>
                {status}
              </Typography>
            </Box>
          )}
        </Box>
      </PageWrapper>
    </ThemeProvider>
  );
};

export default Contact;
