import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Loader } from '@/components/Loader/Loader';

describe('Loader', () => {
  it('renders loader spinner', () => {
    render(<Loader />);
    const spinner = screen.getByLabelText(/loading/i);
    expect(spinner).toBeInTheDocument();
  });
});
