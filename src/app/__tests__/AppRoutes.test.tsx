import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { describe, it, expect } from 'vitest';
import AppRoutes from '../routes';

describe('App routes', () => {
  it('renders HomePage by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByPlaceholderText(/search for images/i)
    ).toBeInTheDocument();
  });

  it('renders About page on /about', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText(/about image search app/i)).toBeInTheDocument();
  });

  it('renders NotFoundPage for unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/wrong-route']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText(/404 - page not found/i)).toBeInTheDocument();
  });
});
