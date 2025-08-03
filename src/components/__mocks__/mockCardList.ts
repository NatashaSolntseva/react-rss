import { type CardItem } from '@/api/types';

export const mockItems: CardItem[] = [
  {
    id: 'abc123',
    createdAt: '2025-07-29T12:00:00Z',
    imageUrl: 'https://example.com/image1.jpg',
    alt_description: 'A beautiful sunrise over the mountains',
    author: 'Alice',
    likes: 120,
    authorUrl: 'https://unsplash.com/@alice',
    description: 'Sunrise in the Alps with golden light over the peaks',
  },
  {
    id: 'def456',
    createdAt: '2025-07-28T09:30:00Z',
    imageUrl: 'https://example.com/image2.jpg',
    alt_description: 'A peaceful forest path in autumn',
    author: 'Bob',
    likes: 85,
    authorUrl: 'https://unsplash.com/@bob',
    description: null,
  },
];

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
