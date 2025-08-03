import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';

vi.mock('@/hooks/useTheme', () => {
  return {
    useTheme: vi.fn(),
  };
});

import { useTheme } from '@/hooks/useTheme';

describe('ThemeToggle', () => {
  it('renders in DAY mode and toggles to NIGHT', () => {
    const toggleTheme = vi.fn();

    const mockedUseTheme = useTheme as ReturnType<typeof vi.fn>;
    mockedUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme,
    });

    render(<ThemeToggle />);

    expect(screen.getByText(/DAY/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('theme-toggle'));

    expect(toggleTheme).toHaveBeenCalled();
  });

  it('toggles from DAY to NIGHT when clicked', () => {
    const toggleTheme = vi.fn();

    (useTheme as ReturnType<typeof vi.fn>).mockReturnValue({
      theme: 'light',
      toggleTheme,
    });

    render(<ThemeToggle />);

    const toggle = screen.getByTestId('theme-toggle');

    expect(screen.getByText(/DAY/i)).toBeInTheDocument();

    fireEvent.click(toggle);

    expect(toggleTheme).toHaveBeenCalled();
  });

  it('renders NIGHT when theme is dark', () => {
    (useTheme as ReturnType<typeof vi.fn>).mockReturnValue({
      theme: 'dark',
      toggleTheme: vi.fn(),
    });

    render(<ThemeToggle />);

    expect(screen.getByText(/NIGHT/i)).toBeInTheDocument();
  });
});
