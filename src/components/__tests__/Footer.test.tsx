import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Footer } from '@/components/Footer/Footer';
import { renderWithRouter } from '@/__tests__/renderWithRouter';

describe('Footer', () => {
  it('renders desktop footer elements', () => {
    renderWithRouter(<Footer />);

    const github = screen.getByTestId('github-desktop');
    expect(github).toHaveAttribute(
      'href',
      'https://github.com/NatashaSolntseva'
    );

    const copyright = screen.getByTestId('copyright-desktop');
    expect(copyright).toHaveTextContent(/© 2025 image explorer/i);

    const rsschool = screen.getByTestId('rsschool-desktop');
    expect(rsschool).toHaveAttribute('href', 'https://app.rs.school/');
  });

  it('renders mobile footer elements', () => {
    renderWithRouter(<Footer />);

    const github = screen.getByTestId('github-mobile');
    expect(github).toHaveAttribute(
      'href',
      'https://github.com/NatashaSolntseva'
    );

    const copyright = screen.getByTestId('copyright-mobile');
    expect(copyright).toHaveTextContent(/© 2025 image explorer/i);

    const rsschool = screen.getByTestId('rsschool-mobile');
    expect(rsschool).toHaveAttribute('href', 'https://app.rs.school/');
  });
});
