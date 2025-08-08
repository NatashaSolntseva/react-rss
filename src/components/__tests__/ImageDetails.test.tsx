import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import * as api from '@/api/api';
import { ImageDetails } from '@/components/ImageDetails/ImageDetails';
import { mockPhotoDetails } from '@/api/__mocks__/mockApiRes';

vi.mock('@/api/api', async () => {
  return {
    fetchLatestImages: vi.fn(),
    searchImages: vi.fn(),
    fetchPhotoDetails: vi.fn(),
  };
});

const renderWithQueryProvider = (
  ui: React.ReactElement,
  initialEntries: string[]
) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/:page" element={<ImageDetails />} />
          <Route path="/:page/:id" element={<ImageDetails />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('ImageDetails component', () => {
  it('renders null if no id in URL', () => {
    renderWithQueryProvider(<ImageDetails />, ['/1']);
    expect(screen.queryByText('Image Details')).not.toBeInTheDocument();
  });

  it('renders image details on success', async () => {
    (api.fetchPhotoDetails as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockPhotoDetails
    );

    renderWithQueryProvider(<ImageDetails />, ['/1/abc123']);

    expect(await screen.findByText('Image Details')).toBeInTheDocument();
    expect(screen.getByText(mockPhotoDetails.user.name)).toBeInTheDocument();
  });

  // it('shows error when image is not found (404)', async () => {
  //   const error = new Error('API error: 404');
  //   (api.fetchPhotoDetails as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
  //     error
  //   );

  //   const consoleErrorMock = vi
  //     .spyOn(console, 'error')
  //     .mockImplementation(() => {});

  //   renderWithQueryProvider(<ImageDetails />, ['/1/notfound']);

  //   expect(await screen.findByText(/Image not found/i)).toBeInTheDocument();

  //   consoleErrorMock.mockRestore();
  // });

  it('navigates back to list on ✕ click', async () => {
    (api.fetchPhotoDetails as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockPhotoDetails
    );

    const queryClient = new QueryClient();
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
