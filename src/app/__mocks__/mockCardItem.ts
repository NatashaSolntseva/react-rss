import type { CardItem } from '@/api/types';

export const mockItem: CardItem = {
  id: 'item1',
  createdAt: '2024-01-01T12:00:00Z',
  imageUrl: 'https://example.com/image.jpg',
  alt_description: 'Example image',
  author: 'Alice',
  likes: 42,
  authorUrl: 'https://example.com/author',
  description: 'Some description',
};
