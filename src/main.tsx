
import { createRoot } from 'react-dom/client';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import App from './App.tsx';
import './index.css';

// Add touch support detection
const touchSupported = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (touchSupported) {
  document.documentElement.classList.add('touch-device');
}

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

// Create the root element and render the app
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found");
}

// Log initialization information
console.log(`App initialized, touch support: ${touchSupported ? 'enabled' : 'disabled'}`);
