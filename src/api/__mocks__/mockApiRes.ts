import { type UnsplashApiItem, UnsplashImageDetails } from '@/api/types';

export const mockApiResponse: UnsplashApiItem[] = [
  {
    id: '123',
    created_at: '2025-07-28T12:00:00Z',
    likes: 42,
    description: 'A beautiful sunset over the ocean.',
    alt_description: 'sunset over ocean',
    urls: {
      raw: 'https://example.com/image-raw.jpg',
      full: 'https://example.com/image-full.jpg',
      regular: 'https://example.com/image-regular.jpg',
      small: 'https://example.com/image-small.jpg',
      thumb: 'https://example.com/image-thumb.jpg',
    },
    user: {
      name: 'John Doe',
      links: {
        html: 'https://unsplash.com/@johndoe',
      },
    },
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
