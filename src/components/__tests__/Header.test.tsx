import { screen } from '@testing-library/react';
import { Header } from '@/components/Header/Header';
import { describe, it, expect } from 'vitest';
import { renderWithRouter } from '@/__tests__/renderWithRouter';

describe('Header', () => {
  it('renders both mobile and desktop titles', () => {
    renderWithRouter(<Header />);
    expect(screen.getByTestId('mobile-title')).toHaveTextContent(
      /image explorer/i
    );
    expect(screen.getByTestId('desktop-title')).toHaveTextContent(
      /image explorer/i
    );
  });

  it('renders both mobile and desktop nav links', () => {
    renderWithRouter(<Header />);
    expect(screen.getByTestId('mobile-home-link')).toHaveAttribute('href', '/');
    expect(screen.getByTestId('mobile-about-link')).toHaveAttribute(
      'href',
      '/about'
    );

    expect(screen.getByTestId('desktop-home-link')).toHaveAttribute(
      'href',
      '/'
    );
    expect(screen.getByTestId('desktop-about-link')).toHaveAttribute(
      'href',
      '/about'
    );
  });

  it('renders both header sections', () => {
    renderWithRouter(<Header />);
    expect(screen.getByTestId('header-mobile-top')).toBeInTheDocument();
    expect(screen.getByTestId('header-mobile-nav')).toBeInTheDocument();
    expect(screen.getByTestId('header-desktop')).toBeInTheDocument();
  });
});
