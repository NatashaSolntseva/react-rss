import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import { AppRoutes } from '../routes';
import { ThemeProvider } from '@/app/theme/ThemeProvider';

describe('AppRoutes', () => {
  it('renders HomePage on index route', () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/1']}>
          <AppRoutes />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(
      screen.getByPlaceholderText(/search for images/i)
    ).toBeInTheDocument();
  });

  it('renders ImageDetails when ID param is provided', async () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/1/LBI7cgq3pbM']}>
          <AppRoutes />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(await screen.findByText(/image details/i)).toBeInTheDocument();
  });

  it('renders AboutPage on /about', () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/about']}>
          <AppRoutes />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByText(/about image explorer/i)).toBeInTheDocument();
  });

  it('renders NotFoundPage for unknown route', async () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/nonexistent-route']}>
          <AppRoutes />
        </MemoryRouter>
      </ThemeProvider>
    );

    const notFoundTitle = await screen.findByTestId('not-found-title');
    expect(notFoundTitle).toHaveTextContent('404 - Page Not Found');
  });
});
