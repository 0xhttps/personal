import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useThemeContext } from '../../ThemeContext';
import { navItems } from '../NavBar';

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
        term.writeln(`\r\n\nls            list all available pages`)
        term.writeln(`about         navigate to /about`)
        term.writeln(`contact       navigate to /contact`)
        term.writeln(`light         toggle light mode on`)
        term.writeln(`dark          toggle light mode on`)
        term.writeln(`date          current date and time`)
        term.writeln(`clear         clear terminal`)
        break;
      case 'date':
        term.writeln('\r\n' + new Date().toString());
        break;

      //theme toggle
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

      //list all pages
      case 'ls':
      case 'pages':
      case 'page':
      case 'route':
        term.writeln('\r');
        navItems.forEach(item => {
          if (window.location.hash.includes(item.path)) {
            term.writeln(`* ${item.path}`);
          } else {
            term.writeln(`  ${item.path}`);
          }
        });
        break;

      //page routing
      case 'about':
        navigate('/about');
        handleClose(); // Close the modal after navigation
        break;
      case 'contact':
        navigate('/contact');
        handleClose(); // Close the modal after navigation
        break;

      default:
        term.writeln('\r\nCommand not found: ' + command);
        break;
    }
  };

  return (
    <TerminalContext.Provider value={{ term, open, handleOpen, handleClose, initTerminal }}>
      {children}
    </TerminalContext.Provider>
  );
};

export default TerminalProvider;
