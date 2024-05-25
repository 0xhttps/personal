import React from 'react';
import { Route, Routes, HashRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import { ThemeContextProvider } from './ThemeContext';
import { Box } from '@mui/material'; 

import Home from './components/pages/Home.tsx';
import About from './components/pages/About.tsx';
import Contact from './components/pages/Contact.tsx';

const App: React.FC = () => {
  return (
    <ThemeContextProvider>
        <HashRouter>
          <NavBar />
          <Box sx={{ mt: 8 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Box>
        </HashRouter>
    </ThemeContextProvider>
  );
};

export default App;
