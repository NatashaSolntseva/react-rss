import { screen } from '@testing-library/react';

import { Header } from '@/components/Header/Header';
import { describe, it, expect } from 'vitest';
import { renderWithRouter } from '@/__tests__/renderWithRouter';

describe('Header', () => {
  it('renders the title', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText(/Image Search App/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithRouter(<Header />);
    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
  });

  it('has correct href for Home and About links', () => {
    renderWithRouter(<Header />);
    expect(screen.getByRole('link', { name: /Home/i })).toHaveAttribute(
      'href',
      '/'
    );
    expect(screen.getByRole('link', { name: /About/i })).toHaveAttribute(
      'href',
      '/about'
    );
  });
});
