import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useNavigate } from 'react-router-dom';

import { CardList } from '@/components/CardList/CardList';
import { mockItems } from '@/components/__mocks__/mockCardList';
import { renderWithRouterAndParams } from '@/__tests__/renderWithRouter';

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('CardList', () => {
  it('renders cards with correct data', () => {
    renderWithRouterAndParams(<CardList items={mockItems} />, {
      route: '/2',
      path: '/:page',
    });

    expect(
      screen.getByAltText('A beautiful sunrise over the mountains')
    ).toBeInTheDocument();

    expect(
      screen.getByAltText('A peaceful forest path in autumn')
    ).toBeInTheDocument();

    expect(screen.getAllByRole('checkbox')).toHaveLength(mockItems.length);
  });

  it('navigates to details page on image click', () => {
    const navigateMock = vi.fn();
    (useNavigate as ReturnType<typeof vi.fn>).mockReturnValue(navigateMock);

    renderWithRouterAndParams(<CardList items={mockItems} />, {
      route: '/3',
      path: '/:page',
    });

    const image = screen.getByAltText('A beautiful sunrise over the mountains');
    fireEvent.click(image);

    expect(navigateMock).toHaveBeenCalledWith('/3/abc123');
  });

  it('toggles selection when checkbox is clicked', () => {
    renderWithRouterAndParams(<CardList items={mockItems} />, {
      route: '/1',
      path: '/:page',
    });

    const checkbox = screen.getAllByRole('checkbox')[0];
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});
