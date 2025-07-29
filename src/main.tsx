import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from '@/app/App.tsx';
import { ThemeProvider } from '@/app/theme/ThemeProvider';

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
