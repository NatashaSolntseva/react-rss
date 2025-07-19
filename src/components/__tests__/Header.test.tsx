import { render, screen } from '@testing-library/react';
import Header from '../Header/Header';
import { describe, it, expect } from 'vitest';

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header />);
  });

  it('displays the correct title', () => {
    render(<Header />);
    const heading = screen.getByRole('heading', { name: /image search app/i });
    expect(heading).toBeInTheDocument();
  });
});
