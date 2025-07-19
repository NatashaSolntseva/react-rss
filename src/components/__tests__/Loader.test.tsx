import { render } from '@testing-library/react';
import Loader from '../Loader/Loader';
import { describe, it, expect } from 'vitest';

describe('Loader', () => {
  it('renders loader spinner', () => {
    const { container } = render(<Loader />);
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });
});
