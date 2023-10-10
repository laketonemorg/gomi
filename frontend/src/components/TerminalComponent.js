import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

const TerminalComponent = () => {
  const terminalRef = useRef(null);
  const xtermRef = useRef(new Terminal());

  useEffect(() => {
    xtermRef.current.open(terminalRef.current);
    xtermRef.current.writeln('Welcome to xterm.js');

    return () => {
      xtermRef.current.dispose();
    };
  }, []);

  return (
    <div ref={terminalRef} style={{ width: '800px', height: '400px' }}></div>
  );
};

export default TerminalComponent;

