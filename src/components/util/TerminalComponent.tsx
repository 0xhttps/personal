import React, { useEffect, useRef } from 'react';
import { useTerminalContext } from './TerminalContext';

const TerminalComponent: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const { initTerminal, term } = useTerminalContext();

  useEffect(() => {
    if (terminalRef.current) {
      initTerminal(terminalRef.current);
    }
  }, [initTerminal, term]);

  return (
    <div 
      ref={terminalRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        backgroundColor: '#1E1E1E',
        whiteSpace: 'pre-wrap',
        overflow: 'hidden',
        wordWrap: 'break-word',
        paddingTop: 10,
        paddingLeft: 10,
      }} 
    />
  );
};

export default TerminalComponent;
