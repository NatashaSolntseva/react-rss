import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import * as router from 'react-router-dom';

import {
  renderWithRouter,
  renderWithRouterAndParams,
} from '@/__tests__/renderWithRouter';
import { HomePage } from '@/pages//HomePage/HomePage';
import { mockItems } from '@/components/__mocks__/mockCardList';
import * as api from '@/api/api';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof router>('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('HomePage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders search bar and pagination controls', () => {
    renderWithRouter(<HomePage />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(/Previous/i)).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
  });

  it('loads default images when searchTerm is not present in localStorage', async () => {
    const fetchLatestImagesMock = vi
      .spyOn(api, 'fetchLatestImages')
      .mockResolvedValueOnce(mockItems);

    renderWithRouter(<HomePage />);

    await waitFor(() => {
      expect(
        screen.getByAltText(/A beautiful sunrise over the mountains/i)
      ).toBeInTheDocument();
      expect(
        screen.getByAltText(/A peaceful forest path in autumn/i)
      ).toBeInTheDocument();
    });

    expect(fetchLatestImagesMock).toHaveBeenCalled();
  });

  it('loads and displays images from searchImages when searchTerm is set', async () => {
    const mockSearchImages = vi
      .spyOn(api, 'searchImages')
      .mockResolvedValueOnce({
        results: mockItems,
        totalImages: mockItems.length,
      });

    localStorage.setItem('searchTerm', 'nature');
    renderWithRouter(<HomePage />);

    await waitFor(() => {
      expect(
        screen.getByAltText(/A beautiful sunrise over the mountains/i)
      ).toBeInTheDocument();
      expect(
        screen.getByAltText(/A peaceful forest path in autumn/i)
      ).toBeInTheDocument();
    });

    expect(mockSearchImages).toHaveBeenCalledWith(
      'nature',
      1,
      expect.any(Number)
    );
  });

  it('sets trimmed search term in localStorage and navigates to default page', () => {
    const navigateMock = vi.fn();
    (router.useNavigate as unknown as Mock).mockReturnValue(navigateMock);
    const setItemMock = vi.spyOn(window.localStorage.__proto__, 'setItem');

    renderWithRouter(<HomePage />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '  trees  ' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(setItemMock).toHaveBeenCalledWith('searchTerm', 'trees');
    expect(navigateMock).toHaveBeenCalledWith('/1');
  });

  it('navigates to next page without idParam when Next button is clicked', () => {
    const navigateMock = vi.fn();
    (router.useNavigate as unknown as Mock).mockReturnValue(navigateMock);

    renderWithRouterAndParams(<HomePage />, { route: '/2', path: '/:page' });
    screen.debug();

    const nextButton = screen.getByTestId('next-btn');
    fireEvent.click(nextButton);

    expect(navigateMock).toHaveBeenCalledWith('/3');
  });

  it('navigates to previous page with idParam when Previous button is clicked', () => {
    const navigateMock = vi.fn();
    (router.useNavigate as unknown as Mock).mockReturnValue(navigateMock);

    renderWithRouterAndParams(<HomePage />, { route: '/4', path: '/:page' });

    const prevButton = screen.getByTestId('prev-btn');
    fireEvent.click(prevButton);

    expect(navigateMock).toHaveBeenCalledWith('/3');
  });
});
