import React from 'react';
import ReactDOM from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LenisProvider } from './hooks/useLenis.jsx';
import App from './App';

import './styles.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Render application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LenisProvider>
      <App />
    </LenisProvider>
  </React.StrictMode>
);
