import { screen } from '@testing-library/react';

import { describe, it, expect } from 'vitest';

import { renderWithRouter } from '../../__tests__/renderWithRouter';
import HomePage from '../HomePage/HomePage';

describe('HomePage', () => {
  it('renders search bar and pagination controls', () => {
    renderWithRouter(<HomePage />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(/Previous/i)).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
  });
});
