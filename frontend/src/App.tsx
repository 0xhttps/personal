import React, { useEffect, Suspense, lazy } from 'react';
import { Route, Routes, HashRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import PageFooter from './components/util/PageFooter';
import { ThemeContextProvider } from './ThemeContext';
import { Box } from '@mui/material';
import TerminalOverlay from './components/util/TerminalOverlay';
import TerminalProvider from './components/util/TerminalContext';
import Loading from './components/pages/Loading';
import SetTitle from './components/util/SetTitle'

const Home = lazy(() => import('./components/pages/Home'));
const About = lazy(() => import('./components/pages/About'));
const Contact = lazy(() => import('./components/pages/Contact'));
const AI = lazy(() => import('./components/pages/AI'));

const getStuff = async () => {
  try {
    console.log('Fetching data...');
    const response = await fetch('https://0xhttps.dev/api/');
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
      <SetTitle />
        <TerminalProvider>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <NavBar />
            <Box sx={{ flex: 1, mt: 8 }}>
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/ai" element={<AI />} />
                </Routes>
              </Suspense>
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
