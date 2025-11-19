/**
 * ===== APPLICATION ENTRY POINT =====
 * 
 * This is the first file executed when the app starts.
 * Sets up React root and wraps the app with global providers.
 * 
 * INITIALIZATION ORDER:
 * 1. Browser loads index.html
 * 2. index.html references this file via <script>
 * 3. This file renders React app into #root div
 * 4. Providers wrap the app (React Query, etc)
 * 5. App.tsx renders with RouterProvider
 * 6. Router renders initial page based on URL
 * 
 * PROVIDERS USED:
 * - StrictMode: React's dev mode (double-renders to catch bugs)
 * - QueryProvider: React Query for API calls & caching
 * 
 * NO ROUTER PROVIDER HERE:
 * - RouterProvider is inside App.tsx
 * - Keeps separation of concerns clean
 * 
 * CSS IMPORTS:
 * - ./index.css: Tailwind CSS + global styles
 * 
 * WHY STRICTMODE?
 * - Warns about deprecated APIs
 * - Detects side effects in render
 * - Double-invokes effects to catch bugs
 * - Only active in development (no performance hit in prod)
 * 
 * NOTE: document.getElementById('root')! 
 * The ! is TypeScript non-null assertion
 * Safe because #root is guaranteed in index.html
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryProvider } from './providers';
import App from './App.tsx';
import './index.css';

// Create React root and render app with providers
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </StrictMode>
);
