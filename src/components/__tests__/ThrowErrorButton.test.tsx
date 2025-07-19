import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ThrowErrorButton from '../ThrowErrorButton/ThrowErrorButton';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

describe('ThrowErrorButton', () => {
  it('renders the button and throws error on click (caught by ErrorBoundary)', () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /throw error/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(
      screen.getByText(
        /something went wrong\. please try refreshing the page\./i
      )
    ).toBeInTheDocument();

    consoleErrorMock.mockRestore();
  });
});
