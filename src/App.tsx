import React from 'react';
import { Route, Routes, HashRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import PageFooter from './components/util/PageFooter';
import { ThemeContextProvider } from './ThemeContext';
import { Box } from '@mui/material';

import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import AI from './components/pages/AI';
import TerminalOverlay from './components/util/TerminalOverlay';
import TerminalProvider from './components/util/TerminalContext';

const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <HashRouter>
        <TerminalProvider>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <NavBar />
            <Box sx={{ flex: 1, mt: 8 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/ai" element={<AI />} />
              </Routes>
            </Box>
            <PageFooter />
          </Box>
          <TerminalOverlay />
        </TerminalProvider>
      </HashRouter>
    </ThemeContextProvider>
  );
};

export default App;
