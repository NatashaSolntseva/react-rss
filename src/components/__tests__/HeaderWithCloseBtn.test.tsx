import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import HeaderWithCloseBtn from '../HeaderWithCloseBtn/HeaderWithCloseBtn';

describe('HeaderWithCloseBtn', () => {
  it('renders header text and close button', () => {
    render(<HeaderWithCloseBtn headerText="Details" onClose={() => {}} />);

    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('✕');
  });

  it('calls onClose when close button is clicked', () => {
    const onCloseMock = vi.fn();
    render(<HeaderWithCloseBtn headerText="Close me" onClose={onCloseMock} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
