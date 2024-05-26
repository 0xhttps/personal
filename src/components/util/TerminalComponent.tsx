import React, { useEffect, useRef } from 'react';
import { useTerminalContext } from './TerminalContext';

const TerminalComponent: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const { initTerminal } = useTerminalContext();

  useEffect(() => {
    if (terminalRef.current) {
      initTerminal(terminalRef.current);
    }
  }, [terminalRef, initTerminal]);

  return <div ref={terminalRef} style={{ width: '100%', height: '100%', backgroundColor: '#1E1E1E' }} />;
};

export default TerminalComponent;
