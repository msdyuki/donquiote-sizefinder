import React from 'react';
import ReactDOM from 'react-dom/client';
import LPApp from './lp/LPApp.jsx';
import './styles/tokens.css';
import './lp/lp.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LPApp />
  </React.StrictMode>
);
