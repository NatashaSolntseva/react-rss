import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import * as api from '../../api/api';
import ImageDetails from '../ImageDetails/ImageDetails';
import { mockPhotoDetails } from '../../__mocks__/mockApiRes';

vi.mock('../../api/api', async () => {
  return {
    fetchLatestImages: vi.fn(),
    searchImages: vi.fn(),
    fetchPhotoDetails: vi.fn(),
  };
});

describe('ImageDetails component', () => {
  it('renders null if no detailsId in URL', () => {
    render(
      <MemoryRouter>
        <ImageDetails />
      </MemoryRouter>
    );
    expect(screen.queryByText('Image Details')).not.toBeInTheDocument();
  });

  it('renders image details on success', async () => {
    (api.fetchPhotoDetails as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockPhotoDetails
    );

    const initialEntries = ['/?details=abc123'];
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <ImageDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Image Details')).toBeInTheDocument();
    });
  });

  it('shows error when image is not found (404)', async () => {
    const error = new Error('API error: 404');
    (api.fetchPhotoDetails as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      error
    );

    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const initialEntries = ['/?details=notfound'];
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <ImageDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Image not found/i)).toBeInTheDocument();
    });

    consoleErrorMock.mockRestore();
  });

  it('calls handleClose on ✕ click', async () => {
    (api.fetchPhotoDetails as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockPhotoDetails
    );

    const initialEntries = ['/?details=abc123'];
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <ImageDetails />
      </MemoryRouter>
    );

    await screen.findByText('✕');

    const closeBtn = screen.getByText('✕');
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(window.location.search).not.toContain('details');
    });
  });
});
