import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { CardList } from '@/components/CardList/CardList';

import { renderWithRouterAndParams } from '@/__tests__/renderWithRouter';
import { mockItems } from '@/components/__mocks__/mockCardList';

describe('CardList', () => {
  it('renders cards with correct data and links', () => {
    renderWithRouterAndParams(<CardList items={mockItems} />);

    expect(
      screen.getByAltText('A beautiful sunrise over the mountains')
    ).toBeInTheDocument();
    expect(
      screen.getByAltText('A peaceful forest path in autumn')
    ).toBeInTheDocument();

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
