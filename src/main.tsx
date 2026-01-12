/**
 * React Entry Point - main.tsx
 *
 * This is the first JavaScript code that runs when the app loads.
 * It's responsible for:
 *   1. Finding the root DOM element in index.html
 *   2. Creating a React root attached to that element
 *   3. Rendering our main App component
 *
 * React.StrictMode wraps our app to help catch potential problems:
 *   - It runs effects twice in development to catch bugs
 *   - It warns about deprecated APIs
 *   - It helps identify unsafe lifecycle methods
 *
 * Note: StrictMode only affects development - it has zero impact on production.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Find the root element - this must exist in index.html
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    'Failed to find the root element. ' +
    'Make sure there is a <div id="root"></div> in index.html'
  );
}

// Create a React root and render our app
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
