import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@/shared/styles/main.css';

import App from '@/app/App.tsx';
import { ThemeProvider } from '@/app/theme/ThemeProvider';

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary.tsx';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
