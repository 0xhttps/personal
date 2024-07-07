import React, { useEffect } from 'react';
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

  const getStuff = async () => {
    try {
      console.log('Fetching data...');
      const response = await fetch('http://localhost:4442/api');
      //const response = await fetch('https://0xhttps.dev/api/');
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };
  
  const App: React.FC = () => {
    useEffect(() => {
      console.log('useEffect called');
      const fetchData = async () => {
        await getStuff();
      };
      fetchData();
    }, []);
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
