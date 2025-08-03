import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { describe, it, expect } from 'vitest';
import AppRoutes from '../routes';
import { ThemeProvider } from '@/app/theme/ThemeProvider';

describe('App routes', () => {
  it('renders HomePage by default', () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/']}>
          <AppRoutes />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(
      screen.getByPlaceholderText(/search for images/i)
    ).toBeInTheDocument();
  });

  it('renders About page on /about', () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/about']}>
          <AppRoutes />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByText(/about image explorer/i)).toBeInTheDocument();
  });

  it('renders NotFoundPage for unknown route', () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/wrong-route']}>
          <AppRoutes />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByText(/404 - page not found/i)).toBeInTheDocument();
  });
});
