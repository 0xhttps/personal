import React from 'react';
import { Route, Routes, HashRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import { ThemeContextProvider } from './ThemeContext';
import { Box } from '@mui/material';

import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import TerminalOverlay from './components/util/TerminalOverlay';
import TerminalProvider from './components/util/TerminalContext';

const App: React.FC = () => {
  return (
    <ThemeContextProvider>
        <HashRouter>
        <TerminalProvider>
          <NavBar />
          <Box sx={{ mt: 8 }}>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Box>
          <TerminalOverlay />
          </TerminalProvider>
        </HashRouter>
    </ThemeContextProvider>
  );
};

export default App;
