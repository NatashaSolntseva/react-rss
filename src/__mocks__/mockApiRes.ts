import { UnsplashApiPhoto, UnsplashImageDetails } from '../api/types';

export const mockApiResponse: UnsplashApiPhoto[] = [
  {
    id: '123',
    urls: { small: 'https://example.com/image.jpg' },
    user: { name: 'John Doe' },
  },
];

export const mockPhotoDetails: UnsplashImageDetails = {
  id: 'abc123',
  description: 'A beautiful scene',
  alt_description: 'Alt desc',
  urls: {
    full: 'http://image.com/full.jpg',
    regular: 'http://image.com/regular.jpg',
    small: 'http://image.com/small.jpg',
  },
  user: {
    name: 'John Doe',
    portfolio_url: 'https://portfolio.example.com',
    links: {
      html: 'https://unsplash.com/@johndoe',
    },
  },
  likes: 42,
  created_at: '2025-07-25T12:00:00Z',
};
