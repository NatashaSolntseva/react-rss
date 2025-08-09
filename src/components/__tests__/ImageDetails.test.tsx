import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ImageDetails } from '@/components/ImageDetails/ImageDetails';
import { mockPhotoDetails } from '@/api/__mocks__/mockApiRes';
import { renderWithRouterAndParams } from '@/__tests__/renderWithRouter';
import * as api from '@/api/api';

vi.mock('@/api/api', async () => {
  return {
    fetchLatestImages: vi.fn(),
    searchImages: vi.fn(),
    fetchPhotoDetails: vi.fn(),
  };
});

describe('ImageDetails', () => {
  it('renders null if no id in URL', () => {
    renderWithRouterAndParams(<ImageDetails />, {
      route: '/1',
      path: '/:page',
    });

    expect(screen.queryByText('Image Details')).not.toBeInTheDocument();
  });

  it('renders image details on success', async () => {
    (api.fetchPhotoDetails as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockPhotoDetails
    );

    renderWithRouterAndParams(<ImageDetails />, {
      route: '/1/abc123',
      path: '/:page/:id',
    });

    expect(await screen.findByText('Image Details')).toBeInTheDocument();
    expect(screen.getByText(mockPhotoDetails.user.name)).toBeInTheDocument();
  });

  it('shows error text from error.message (404)', async () => {
    (api.fetchPhotoDetails as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('API error: 404')
    );

    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    renderWithRouterAndParams(<ImageDetails />, {
      route: '/1/notfound',
      path: '/:page/:id',
    });

    expect(await screen.findByText(/API error: 404/i)).toBeInTheDocument();

    consoleErrorMock.mockRestore();
  });

  it('navigates back to list on ✕ click', async () => {
    (api.fetchPhotoDetails as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockPhotoDetails
    );

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/2/abc123']}>
          <Routes>
            <Route path="/:page" element={<div>List page</div>} />
            <Route path="/:page/:id" element={<ImageDetails />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    const closeBtn = await screen.findByText('✕');
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.getByText('List page')).toBeInTheDocument();
    });
  });
});
