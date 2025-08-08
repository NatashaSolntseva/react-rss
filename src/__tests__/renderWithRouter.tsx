import { ReactElement } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@/app/theme/ThemeProvider';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export const renderWithRouter = (ui: ReactElement) => {
  const queryClient = createTestQueryClient();

  return render(
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{ui}</BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

interface Options {
  route?: string;
  path?: string;
}

export function renderWithRouterAndParams(
  ui: ReactElement,
  options: Options = {}
) {
  const { route = '/', path = '/' } = options;
  const queryClient = createTestQueryClient();

  return render(
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path={path} element={ui} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
