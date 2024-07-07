import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './App.css';
import { AuthProvider } from './components/util/AuthContext';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);




