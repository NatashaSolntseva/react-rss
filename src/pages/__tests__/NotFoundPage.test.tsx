import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';
import { renderWithRouterAndParams } from '@/__tests__/renderWithRouter';

describe('NotFoundPage', () => {
  it('renders 404 message and description', () => {
    renderWithRouterAndParams(<NotFoundPage />);

    expect(
      screen.getByRole('heading', { name: /404 - Page Not Found/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Sorry, the page you're looking for doesn't exist/i)
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /назад/i })).toBeInTheDocument();
  });
});
