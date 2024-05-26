import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useThemeContext } from '../../ThemeContext';
import { navItems } from '../NavBar';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface TerminalContextProps {
  term: Terminal | null;
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  initTerminal: (container: HTMLDivElement) => void;
}

const TerminalContext = createContext<TerminalContextProps | undefined>(undefined);

export const useTerminalContext = (): TerminalContextProps => {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error('useTerminalContext must be used within a TerminalProvider');
  }
  return context;
};

const TerminalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [term, setTerm] = useState<Terminal | null>(null);
  const [open, setOpen] = useState(false);
  const { setColorMode } = useThemeContext();
  const navigate = useNavigate();
  const location = useLocation();
  const terminalContainerRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);
  const welcomeMessage = 'Welcome';
  let commandBuffer = '';

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key === 'q') {
        handleOpen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // Add the current pathname to the navigation history if it's not the same as the last one
    setNavigationHistory((prevHistory) => {
      const lastPath = prevHistory[prevHistory.length - 1];
      const currentPath = window.location.hash.substring(1);
      if (lastPath !== currentPath) {
        return [...prevHistory, currentPath];
      }
      return prevHistory;
    });
  }, [location.pathname]);

  const initTerminal = (container: HTMLDivElement) => {
    terminalContainerRef.current = container;

    if (!term) {
      const terminalInstance = new Terminal({
        cursorBlink: true,
        fontFamily: 'monospace',
        fontSize: 14,
        theme: {
          background: '#1E1E1E',
          foreground: '#FFFFFF',
        },
      });

      terminalInstance.open(container);
      setTerm(terminalInstance);

      const prompt = () => {
        terminalInstance.write('\r\n$ ');
      };
      terminalInstance.writeln(`${welcomeMessage}\r\nUse this terminal to navigate\r\n"help" for commands`);
      terminalInstance.writeln(`\r\nAlt + Q to toggle`);

      if (isMobile) {
        terminalInstance.writeln('\r\nNOTE: Not optimized for mobile');
      }

      prompt();

      terminalInstance.onKey(({ key, domEvent }) => {
        const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

        if (domEvent.key === 'Enter') {
          const command = commandBuffer.trim();
          commandBuffer = '';
          runFakeCommand(terminalInstance, command);
          prompt();
        } else if (domEvent.key === 'Backspace') {
          if (commandBuffer.length > 0) {
            commandBuffer = commandBuffer.slice(0, -1);
            terminalInstance.write('\b \b');
          }
        } else if (printable) {
          commandBuffer += key;
          terminalInstance.write(key);
        }
      });
    } else {
      container.innerHTML = '';
      term.open(container);
      term.focus();
    }
  };

  const runFakeCommand = (term: Terminal, command: string | undefined) => {
    if (!command) return;

    switch (command.toLowerCase()) {
      // help
      case 'help': 
        term.writeln(`\r\n\nls            list all pages`);
        term.writeln(`cd <page>     go to page`);
        term.writeln(`cd ..         go to previous page`);
        term.writeln(`pwd           view current path`);
        term.writeln(`\nlight         toggle light mode`);
        term.writeln(`dark          toggle dark mode`);
        term.writeln(`date          current date`);
        term.writeln(`\nclear         clear terminal`);
        term.writeln(`close         close terminal`);
        break;

      case 'date':
        term.writeln('\r\n' + new Date().toString());
        break;

      // theme toggle
      case 'dark':
        setColorMode('dark');
        term.writeln('\r\nSwitched to dark mode');
        break;
      case 'light':
        setColorMode('light');
        term.writeln('\r\nSwitched to light mode');
        break;
      
      // clear terminal
      case 'clear':
      case 'reset':
        term.reset();
        term.writeln(`${welcomeMessage}\r\nUse this terminal to navigate\r\n"help" for commands`);
        term.writeln(`\r\nAlt + Q to toggle`);
        break;

      // list all pages
      case 'ls':
      case 'pages':
      case 'page':
      case 'route':
        term.writeln('\r');
        navItems.forEach(item => {
          if (window.location.hash.substring(1) === item.path) {
            term.writeln(`* ${item.path}`);
          } else {
            term.writeln(`  ${item.path}`);
          }
        });
        break;

      case 'pwd':
        term.writeln(`\r\n${window.location.hash.substring(1)}`);
        break;

      // page routing
      case 'cd about':
        navigateToPage(term, '/about');
        term.writeln(`\r\nNavigating to /about ...`);
        break;
      case 'cd contact':
        navigateToPage(term, '/contact');
        term.writeln(`\r\nNavigating to /contact ...`);
        break;
      case 'cd home':
      case 'cd /':
        navigateToPage(term, '/');
        term.writeln(`\r\nNavigating to / ...`);
        break;
      case 'cd ..':
      case 'cd..':
        navigateToPreviousPage(term);
        break;
      
      // close terminal
      case 'close':
      case 'kill':
        handleClose();
        break;

      default:
        term.writeln('\r\nCommand not found: ' + command);
        break;
    }
  };

  const navigateToPage = (term: Terminal, path: string) => {
    const currentPath = window.location.hash.substring(1);
    if (currentPath !== path) {
      setNavigationHistory((prevHistory) => {
        const lastPath = prevHistory[prevHistory.length - 1];
        if (lastPath !== path) {
          return [...prevHistory, path];
        }
        return prevHistory;
      });
      navigate(path);
    } else {
      term.writeln(`\r\nAlready on ${path}`);
    }
  };

  const navigateToPreviousPage = (term: Terminal) => {
    setNavigationHistory((prevHistory) => {
      if (prevHistory.length > 1) {
        const previousPage = prevHistory[prevHistory.length - 2];
        navigate(previousPage);
        term.writeln(`\r\nNavigating to ${previousPage}...`);
        return prevHistory.slice(0, -1);
      } else {
        term.writeln(`\r\nNo previous page in history`);
        return prevHistory;
      }
    });
  };

  return (
    <TerminalContext.Provider value={{ term, open, handleOpen, handleClose, initTerminal }}>
      {children}
    </TerminalContext.Provider>
  );
};

export default TerminalProvider;
