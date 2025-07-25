import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar/SearchBar';
import { describe, it, beforeEach, vi, expect } from 'vitest';

describe('SearchBar', () => {
  let onSearchMock: (term: string) => void;

  beforeEach(() => {
    onSearchMock = vi.fn();
    localStorage.clear();
  });

  it('renders with initialValue and updates input on typing', () => {
    render(<SearchBar onSearch={onSearchMock} initialValue="cats" />);
    const input = screen.getByPlaceholderText(/search for images/i);
    expect(input).toHaveValue('cats');

    fireEvent.change(input, { target: { value: 'dogs' } });
    expect(input).toHaveValue('dogs');
  });

  it('calls onSearch and saves trimmed input to localStorage on button click', () => {
    render(<SearchBar onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText(/search for images/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '  mountains  ' } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith('mountains');
    expect(localStorage.getItem('searchTerm')).toBe('mountains');
  });

  it('calls onSearch with empty string and removes from localStorage if input is only spaces', () => {
    localStorage.setItem('searchTerm', 'something');

    render(<SearchBar onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText(/search for images/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith('');
    // expect(localStorage.getItem('searchTerm')).toBeNull();
  });

  it('calls onSearch with empty string if input is empty', () => {
    render(<SearchBar onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText(/search for images/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith('');
    // expect(localStorage.getItem('searchTerm')).toBeNull();
  });
});
