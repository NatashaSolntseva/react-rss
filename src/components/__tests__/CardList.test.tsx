import { render, screen } from '@testing-library/react';
import CardList from '../CardList/CardList';
import { test, expect } from 'vitest';
import { mockCardListItems } from '../../__mocks__/mockCardList';

test('renders all images with correct alt text', () => {
  render(<CardList items={mockCardListItems} />);

  expect(screen.getByAltText('John Doe')).toBeInTheDocument();
  expect(screen.getByAltText('Jane Smith')).toBeInTheDocument();
});

test('renders all author labels', () => {
  render(<CardList items={mockCardListItems} />);

  const photoByElements = screen.getAllByText(/photo by/i);
  expect(photoByElements).toHaveLength(2);

  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('Jane Smith')).toBeInTheDocument();
});
