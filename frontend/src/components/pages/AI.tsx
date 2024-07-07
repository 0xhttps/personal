import React, { useState } from "react";
import { Typography, Box, TextField, Button, IconButton } from "@mui/material";
import { Login } from '@mui/icons-material';
import PageWrapper from "../util/PageWrapper";
import { ThemeProvider } from '@mui/material/styles';
import { inputTheme } from '../util/inputTheme';
import { useAuth } from "../util/AuthContext";

let hasSent = false;

const AI: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const { user, login } = useAuth();
  const [conversation, setConversation] = useState<{ role: string, content: string }[]>([
    { role: 'system', content: 'You are a helpful assistant.' }
  ]);
  const handleSubmit = async (e: React.FormEvent) => {
    hasSent = true;
    e.preventDefault();
    if (!user) {
      setResponse("You are not Authorized! Oh no... If you want to use this, please have 0xhttps whitelist you. Send him an email :)");
      return;
    }
    setConversation([...conversation, { role: 'user', content: prompt }]);
    try {
      const res = await fetch('http://www.0xhttps.dev/api/ai', {
      //const res = await fetch('http://localhost:4442/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ conversation: [...conversation, { role: 'user', content: prompt }] })
      });
      const result = await res.json();
      const message = result.message;
      if (message) {
        setResponse(message);
        setConversation([...conversation, { role: 'user', content: prompt }, { role: 'assistant', content: message }]);
      } else {
        setResponse("No response received.");
      }
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("Error generating response.");
    }
  };

  const clearPrompt = () => {
    setPrompt('');
    setResponse('');
  };

  const newChat = () => {
    setConversation([{ role: 'system', content: 'You are a helpful assistant.' }]);
    hasSent = false;
    setPrompt('');
    setResponse('');
  };

  return (
    <ThemeProvider theme={inputTheme}>
      <PageWrapper>
        <Typography variant="h2">
          <code>/ai</code>
        </Typography>
        {user ? (
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box component="form" onSubmit={handleSubmit} width="100%" maxWidth="600px">
              <Box display="flex" justifyContent="flex-end" mt={2}>
                {hasSent ? (
                <Button type="button" onClick={newChat} variant="contained" style={{ backgroundColor: '#FF7F50', color: 'inherit' }}>
                  NEW CHAT
                </Button>
                ) : (<></>)}
              </Box>
              <TextField
                label="Prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                fullWidth
                required
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                placeholder="Enter your prompt"
              />
              <Box display="flex" justifyContent="flex-start" mt={2}>
                <Button type="submit" variant="contained" style={{ backgroundColor: '#FF7F50', color: 'inherit', marginRight: '10px' }}>
                  SUBMIT
                </Button>
                {(prompt.length > 0 || response) && (
                  <Button type="button" variant="contained" onClick={clearPrompt} style={{ backgroundColor: '#FF7F50', color: 'inherit'}}>
                    CLEAR INPUT
                  </Button>
                )}
              </Box>
            </Box>
            {conversation.length > 1 && (
              <Box mt={4} width="100%" maxWidth="600px">
                <Typography variant="h5">Conversation:</Typography>
                {conversation.slice(1).map((msg, index) => (
                  <Typography key={index} variant="body1"><strong>{msg.role}:</strong> {msg.content}</Typography>
                ))}
              </Box>
            )}
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center">
            <IconButton edge="end" color="inherit" aria-label="login" onClick={login} sx={{ paddingRight: '15px'}}>
              <Login sx={{ fontSize: "150px", color: '#FF7F50'}}/>
            </IconButton>
            login to access
          </Box>
        )}
      </PageWrapper>
    </ThemeProvider>
  );
};

export default AI;
