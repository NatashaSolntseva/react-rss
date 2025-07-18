import { render, screen } from '@testing-library/react';
import Footer from '../Footer/Footer';
import { describe, it, expect } from 'vitest';

describe('Footer', () => {
  it('renders footer with correct text', () => {
    render(<Footer />);
    const footerElement = screen.getByText(/© 2025 Image Search App/i);
    expect(footerElement).toBeInTheDocument();
  });
});
