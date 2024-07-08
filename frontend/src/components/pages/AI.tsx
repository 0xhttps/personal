import React, { useState } from "react";
import { Typography, Box, Paper, InputBase, IconButton } from "@mui/material";
import { Login, ArrowUpward, DeleteForever, Backspace } from '@mui/icons-material';
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
    { role: 'system', content: 'You are a chat bot on a website. The url of the website is 0xhttps.dev. This is a personal portfolio website make by 0xhttps (also known as Michael).' }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setResponse("You are not Authorized! Oh no... If you want to use this, please have 0xhttps whitelist you. Send him an email :)");
      return;
    }
    if (prompt.trim() === '') {
      return; // Prevent sending empty messages
    }
    hasSent = true;
    setConversation([...conversation, { role: 'user', content: prompt }]);
    try {
      //const res = await fetch('http://localhost:4442/api/ai', {
      const res = await fetch('https://0xhttps.dev/api/ai', {
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
      setPrompt('');
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
    setConversation([{ role: 'system', content: 'You are a chat bot on a website. The url of the website is 0xhttps.dev. This is a personal portfolio website make by 0xhttps (also known as Michael).' }]);
    hasSent = false;
    setPrompt('');
    setResponse('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <ThemeProvider theme={inputTheme}>
      <PageWrapper>
        <Typography variant="h2">
          <code>/ai</code>
        </Typography>
        {user ? (
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box component="form" onSubmit={handleSubmit} width="100%" maxWidth="600px" sx={{ border: '1px solid #FF7F50', borderRadius: '5px', height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1rem' }}>
              <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
                {conversation.length > 1 && conversation.slice(1).map((msg, index) => (
                  <Typography key={index} variant="body1"><strong className="role">{msg.role}:</strong> {msg.content}<br /><br /></Typography>
                ))}
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'right' }}>
                <Box style={{width: '90%'}}/>
                  <IconButton
                    onClick={newChat}
                    sx={{
                      p: '5px',
                      color: '#FF7F50',
                      ':hover': { backgroundColor: 'inherit' },
                      ':active': { backgroundColor: 'inherit' }
                    }}
                    aria-label="new chat"
                  >
                    <DeleteForever sx={{ fontSize: "30px", color: 'inherit' }} />
                  </IconButton>
                  <IconButton
                    onClick={clearPrompt}
                    sx={{
                      p: '5px',
                      pr: 0,
                      color: '#FF7F50',
                      ':hover': { backgroundColor: 'inherit' },
                      ':active': { backgroundColor: 'inherit' }
                    }}
                    aria-label="clear prompt"
                  >
                    <Backspace sx={{ fontSize: "30px", color: 'inherit' }} />
                  </IconButton>
              </Box>
              <Paper
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', mt: 1, backgroundColor: 'inherit', color: 'inherit', border:'1px solid #FF7F50' }}
              >
                <InputBase
                  sx={{ ml: 1, mr: 1, flex: 1, color: 'inherit'}}
                  placeholder="Enter your prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={handleKeyPress}
                  multiline
                  rows={3}
                  inputProps={{ 'aria-label': 'enter your prompt' }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <IconButton
                  type="submit"
                  sx={{
                    p: '5px',
                    color: '#FF7F50',
                    ':hover': { backgroundColor: 'inherit' },
                    ':active': { backgroundColor: 'inherit' }
                  }}
                  aria-label="submit"
                >
                  <ArrowUpward sx={{ fontSize: "35px", color: 'inherit' }} />
                </IconButton>
                </Box>
              </Paper>
            </Box>
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
