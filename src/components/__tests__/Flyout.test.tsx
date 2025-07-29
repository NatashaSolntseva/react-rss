import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { useSelectionStore } from '@/app/store/selectionStore';
import { downloadCsv } from '@/utils/downloadCsv';
import { Flyout } from '@/components/Flyout/Flyout';
import { mockItem, mockItems } from '../__mocks__/mockCardList';

vi.mock('@/utils/downloadCsv', () => ({
  downloadCsv: vi.fn(),
}));

describe('Flyout', () => {
  beforeEach(() => {
    useSelectionStore.getState().clearSelection();
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('does not render if no items selected', () => {
    render(<Flyout />);
    expect(screen.queryByText(/selected/)).not.toBeInTheDocument();
  });

  it('renders when 1 item is selected and handles unselect and download', () => {
    const store = useSelectionStore.getState();
    store.toggleSelected(mockItem);

    render(<Flyout />);

    expect(screen.getByText('1 item selected')).toBeInTheDocument();

    const unselectButton = screen.getByRole('button', {
      name: /unselect all/i,
    });
    const downloadButton = screen.getByRole('button', { name: /download/i });

    fireEvent.click(downloadButton);
    expect(downloadCsv).toHaveBeenCalledWith([mockItem]);

    fireEvent.click(unselectButton);
    expect(useSelectionStore.getState().selectedIds).toHaveLength(0);
  });

  it('renders with 2 items selected', () => {
    const store = useSelectionStore.getState();
    mockItems.forEach((item) => store.toggleSelected(item));

    render(<Flyout />);

    expect(screen.getByText('2 items selected')).toBeInTheDocument();
  });
});
