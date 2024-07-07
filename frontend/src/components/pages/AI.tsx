import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, Button, IconButton } from "@mui/material";
import { Login } from '@mui/icons-material';
import PageWrapper from "../util/PageWrapper";
import OpenAI from "openai";
import { ThemeProvider } from '@mui/material/styles';
import { inputTheme } from '../util/inputTheme';
import { useAuth } from "../util/AuthContext";

const AI: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const { user, login } = useAuth();
  const [isWhitelisted, setIsWhitelisted] = useState(false);

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isWhitelisted) {
      setResponse("You are not Authorized! Oh no... If you want to use this, please have 0xhttps whitelist you. Send him an email :)");
      return;
    }
    try {
      const result = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.7,
      });
      const message = result.choices[0]?.message?.content;
      if (message) {
        setResponse(message);
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

  useEffect(() => {
    const whitelistedUsers = import.meta.env.VITE_WHITELIST;
    if (user && user.email && whitelistedUsers.includes(user.email)) {
      setIsWhitelisted(true);
    } else {
      setIsWhitelisted(false);
    }
  }, [user]);

  return (
    <ThemeProvider theme={inputTheme}>
      <PageWrapper>
        <Typography variant="h2">
          <code>/ai</code>
        </Typography>
        {user ? (
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box component="form" onSubmit={handleSubmit} width="100%" maxWidth="600px">
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
                  <code>Submit</code>
                </Button>
                {(prompt.length > 0 || response) && (
                  <Button type="button" variant="contained" onClick={clearPrompt} style={{ backgroundColor: '#FF7F50', color: 'inherit'}}>
                    <code>Clear</code>
                  </Button>
                )}
              </Box>
            </Box>
            {response && (
              <Box mt={4} width="100%" maxWidth="600px">
                <Typography variant="h5">Response:</Typography>
                <Typography variant="body1">{response}</Typography>
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
