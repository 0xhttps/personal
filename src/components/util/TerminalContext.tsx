import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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
  const welcomeMessage = 'Welcome';

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'e' && location.pathname !== '/') {
        handleOpen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [location.pathname]);

  const initTerminal = (container: HTMLDivElement) => {
    if (term === null) {
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

      terminalInstance.writeln(`${welcomeMessage}\r\nYou can use this terminal to navigate the website\r\n"help" for a list of commands`);
      terminalInstance.writeln(`\r\nctrl + e to open terminal, or use button in nav`);

      prompt();

      terminalInstance.onKey(({ key, domEvent }) => {
        const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

        if (domEvent.key === 'Enter') {
          const command = terminalInstance.buffer.active.getLine(terminalInstance.buffer.active.cursorY)?.translateToString(false).trim().substring(2);
          runFakeCommand(terminalInstance, command);
          prompt();
        } else if (domEvent.key === 'Backspace') {
          if (terminalInstance.buffer.active.cursorX > 2) {
            terminalInstance.write('\b \b');
          }
        } else if (printable) {
          terminalInstance.write(key);
        }
      });
    } else {
      // Reattach the existing terminal instance to the new container
      container.innerHTML = '';
      term.open(container);
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
