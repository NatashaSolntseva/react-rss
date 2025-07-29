import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Footer } from '@/components/Footer/Footer';
import { renderWithRouter } from '@/__tests__/renderWithRouter';

describe('Footer', () => {
  it('renders GitHub link', () => {
    renderWithRouter(<Footer />);
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/NatashaSolntseva'
    );
    expect(githubLink).toHaveAttribute('target', '_blank');
  });

  it('renders copyright text', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/© 2025 image search app/i)).toBeInTheDocument();
  });

  it('renders RS School logo with link', () => {
    renderWithRouter(<Footer />);
    const rssLink = screen.getByRole('link', { name: /rs school/i });
    expect(rssLink).toHaveAttribute('href', 'https://app.rs.school/');
    const logo = screen.getByAltText(/rs school/i);
    expect(logo).toBeInTheDocument();
  });
});
