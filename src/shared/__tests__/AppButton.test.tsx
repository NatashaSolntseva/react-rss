import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AppButton } from '@/shared/ui/AppButton/AppButton';

describe('AppButton', () => {
  it('renders with given text', () => {
    render(<AppButton onClick={() => {}} text="Click me" />);
    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<AppButton onClick={handleClick} text="Click me" />);
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<AppButton onClick={handleClick} text="Click me" disabled />);
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies additional className', () => {
    render(
      <AppButton onClick={() => {}} text="Click me" className="extra-class" />
    );
    expect(screen.getByRole('button')).toHaveClass('extra-class');
  });
});
