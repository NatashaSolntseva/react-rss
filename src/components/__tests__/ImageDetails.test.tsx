import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import ImageDetails from '../ImageDetails/ImageDetails';

vi.mock('../../api/api');

// const mockData = {
//   id: 'abc123',
//   alt_description: 'Test image',
//   urls: { small: 'small.jpg', full: 'full.jpg' },
//   user: {
//     name: 'John Doe',
//     links: { html: 'https://unsplash.com/@johndoe' },
//   },
//   likes: 42,
//   description: 'A nice image',
// };

describe('ImageDetails component', () => {
  it('renders null if no detailsId in URL', () => {
    render(
      <MemoryRouter>
        <ImageDetails />
      </MemoryRouter>
    );
    expect(screen.queryByText('Image Details')).not.toBeInTheDocument();
  });

  // it('shows loader and renders image details on success', async () => {
  //   (api.fetchPhotoDetails as vi.Mock).mockResolvedValueOnce(mockData);

  //   const initialEntries = ['/?details=abc123'];
  //   render(
  //     <MemoryRouter initialEntries={initialEntries}>
  //       <ImageDetails />
  //     </MemoryRouter>
  //   );

  //   expect(screen.getByRole('status')).toBeInTheDocument(); // Loader

  //   await waitFor(() => {
  //     expect(screen.getByText('Image Details')).toBeInTheDocument();
  //   });

  //   expect(screen.getByText(/Author:/)).toHaveTextContent('John Doe');
  //   expect(screen.getByText(/Likes:/)).toHaveTextContent('42');
  //   expect(screen.getByText(/Description:/)).toHaveTextContent('A nice image');
  // });

  // it('shows error when image is not found (404)', async () => {
  //   (api.fetchPhotoDetails as vi.Mock).mockRejectedValueOnce(
  //     new Error('API error: 404')
  //   );

  //   const initialEntries = ['/?details=notfound'];
  //   render(
  //     <MemoryRouter initialEntries={initialEntries}>
  //       <ImageDetails />
  //     </MemoryRouter>
  //   );

  //   await waitFor(() => {
  //     expect(screen.getByText(/Image not found/)).toBeInTheDocument();
  //   });
  // });

  // it('calls handleClose on ✕ click', async () => {
  //   (api.fetchPhotoDetails as vi.Mock).mockResolvedValueOnce(mockData);

  //   const initialEntries = ['/?details=abc123'];
  //   render(
  //     <MemoryRouter initialEntries={initialEntries}>
  //       <ImageDetails />
  //     </MemoryRouter>
  //   );

  //   await screen.findByText('✕');

  //   const closeBtn = screen.getByText('✕');
  //   fireEvent.click(closeBtn);

  //   await waitFor(() => {
  //     expect(window.location.search).not.toContain('details');
  //   });
  // });
});
