import React from 'react';
import { Route, Routes, HashRouter } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NavBar from './components/NavBar';
import { ThemeContextProvider } from './ThemeContext';
import { Web3OnboardProvider } from './components/util/Web3OnboardContext.tsx';
import { Box } from '@mui/material';

const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <Web3OnboardProvider>
        <HashRouter>
          <NavBar />
          <Box sx={{ mt: 8 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Box>
        </HashRouter>
      </Web3OnboardProvider>
    </ThemeContextProvider>
  );
};

export default App;
