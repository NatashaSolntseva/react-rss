import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import CardList from '../CardList/CardList';
import { UnsplashImage } from '../../api/types';
import { renderWithRouterAndParams } from '../../__tests__/renderWithRouter';

const mockItems: UnsplashImage[] = [
  {
    id: 'abc123',
    imageUrl: 'https://example.com/image1.jpg',
    author: 'Alice',
  },
  {
    id: 'def456',
    imageUrl: 'https://example.com/image2.jpg',
    author: 'Bob',
  },
];

describe('CardList', () => {
  it('renders cards with correct data and links', () => {
    renderWithRouterAndParams(<CardList items={mockItems} />);

    expect(screen.getByAltText('Alice')).toBeInTheDocument();
    expect(screen.getByAltText('Bob')).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', expect.stringContaining('page=2'));
    expect(links[0]).toHaveAttribute(
      'href',
      expect.stringContaining('query=cat')
    );
    expect(links[0]).toHaveAttribute(
      'href',
      expect.stringContaining('details=abc123')
    );
  });
});
