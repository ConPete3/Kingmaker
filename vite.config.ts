/**
 * Vite Configuration for Kingmaker
 *
 * Vite is our build tool - it handles:
 * - Development server with hot module replacement (instant updates as you code)
 * - TypeScript compilation
 * - Bundling for production
 *
 * The React plugin enables JSX transformation and React Fast Refresh
 * for a smooth development experience.
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // Server configuration for development
  server: {
    port: 3000,        // Run dev server on port 3000
    open: true,        // Auto-open browser when starting dev server
  },

  // Build configuration for production
  build: {
    outDir: 'dist',    // Output directory for production build
    sourcemap: true,   // Generate source maps for debugging
  },
});
