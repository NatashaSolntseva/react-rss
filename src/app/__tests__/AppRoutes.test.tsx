import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppRoutes } from '../routes';
import { ThemeProvider } from '@/app/theme/ThemeProvider';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderWithProviders = (route: string) => {
  const queryClient = createTestQueryClient();

  render(
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>
          <AppRoutes />
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

describe('AppRoutes', () => {
  it('renders HomePage on index route', () => {
    renderWithProviders('/1');

    expect(
      screen.getByPlaceholderText(/search for images/i)
    ).toBeInTheDocument();
  });

  it('renders ImageDetails when ID param is provided', async () => {
    renderWithProviders('/1/LBI7cgq3pbM');

    expect(await screen.findByText(/image details/i)).toBeInTheDocument();
  });

  it('renders AboutPage on /about', () => {
    renderWithProviders('/about');

    expect(screen.getByText(/about image explorer/i)).toBeInTheDocument();
  });

  it('renders NotFoundPage for unknown route', async () => {
    renderWithProviders('/nonexistent-route');

    const notFoundTitle = await screen.findByTestId('not-found-title');
    expect(notFoundTitle).toHaveTextContent('404 - Page Not Found');
  });
});
