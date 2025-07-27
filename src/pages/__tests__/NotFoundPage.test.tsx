import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

describe('NotFoundPage', () => {
  it('renders 404 message and description', () => {
    render(<NotFoundPage />);

    expect(
      screen.getByRole('heading', { name: /404 - Page Not Found/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Sorry, the page you're looking for doesn't exist/i)
    ).toBeInTheDocument();
  });
});
