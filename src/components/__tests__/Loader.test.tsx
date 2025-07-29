import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Loader } from '@/components/Loader/Loader';

describe('Loader', () => {
  it('renders loader spinner', () => {
    const { container } = render(<Loader />);
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });
});
