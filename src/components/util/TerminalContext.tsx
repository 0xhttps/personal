import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useThemeContext } from '../../ThemeContext';
import { navItems } from '../NavBar';
import { isMobile } from '../NavBar';

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
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);
  const welcomeMessage = 'Welcome';
  let commandBuffer = '';
  const orangeColor = '\x1b[38;5;209m'; // Orange color code
  const resetColor = '\x1b[0m'; // Reset color code

  const handleOpen = () => {
    setOpen(true);
    console.log('Opening terminal...');
  };

  const handleClose = () => {
    setOpen(false);
    console.log('Closing terminal...');
  };

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
  }, [handleOpen]);

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
        scrollOnUserInput: true,
        theme: {
          background: '#1E1E1E',
          foreground: '#FFFFFF',
          selectionForeground: '#FF7F50',
        },
      });

      terminalInstance.open(container);
      setTerm(terminalInstance);

      const prompt = () => {
        const path = `~/0xhttps${window.location.hash.substring(1)}`;
        const promptText = `${orangeColor}${path}${resetColor}\r\n$ `;
        terminalInstance.write(`\r\n${promptText}`);
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

      case 'dark':
        setColorMode('dark');
        term.writeln('\r\nSwitched to dark mode');
        break;
      case 'light':
        setColorMode('light');
        term.writeln('\r\nSwitched to light mode');
        break;

      case 'clear':
      case 'reset':
        term.reset();
        term.writeln(`${welcomeMessage}\r\nUse this terminal to navigate\r\n"help" for commands`);
        term.writeln(`\r\nAlt + Q to toggle`);
        break;

      case 'ls':
      case 'pages':
      case 'page':
      case 'route':
        term.writeln('\r');
        navItems.forEach(item => {
          if (window.location.hash.substring(1) === item.path) {
            term.writeln(`${orangeColor}*${resetColor} ${item.path}`);
          } else {
            term.writeln(`  ${item.path}`);
          }
        });
        break;

      case 'pwd':
        term.writeln(`\r\n0xhttps${window.location.hash.substring(1)}`);
        break;

      case 'cd about':
      case 'cd /about':
        navigateToPage(term, '/about');
        break;
      case 'cd contact':
      case 'cd /contact':
        navigateToPage(term, '/contact');
        break;
      case 'cd home':
      case 'cd /':
        navigateToPage(term, '/');
        break;
      case 'cd ..':
      case 'cd..':
        navigateToPreviousPage(term);
        break;

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
      term.writeln(`\r\nNavigating to ${path}`);
      navigate(path);
    } else {
      term.writeln(`\r\nAlready on ${path}`);
    }
  };

  const navigateToPreviousPage = (term: Terminal) => {
    setNavigationHistory((prevHistory) => {
      if (prevHistory.length > 1) {
        const previousPage = prevHistory[prevHistory.length - 2];
        term.writeln(`\r\nNavigating to ${previousPage} ...`);
        navigate(previousPage);
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
