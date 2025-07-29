import { describe, it, expect, beforeEach } from 'vitest';

import { useSelectionStore } from '@/app/store/selectionStore';
import { mockItem } from '@/app/__mocks__/mockCardItem';

beforeEach(() => {
  useSelectionStore.getState().clearSelection();
  localStorage.clear();
});

describe('useSelectionStore', () => {
  it('adds item to selection', () => {
    useSelectionStore.getState().toggleSelected(mockItem);

    const { selectedIds, selectedItemsMap } = useSelectionStore.getState();

    expect(selectedIds).toContain(mockItem.id);
    expect(selectedItemsMap[mockItem.id]).toEqual(mockItem);
  });

  it('removes item from selection when toggled again', () => {
    const store = useSelectionStore.getState();
    store.toggleSelected(mockItem);
    store.toggleSelected(mockItem);

    const { selectedIds, selectedItemsMap } = useSelectionStore.getState();

    expect(selectedIds).not.toContain(mockItem.id);
    expect(selectedItemsMap[mockItem.id]).toBeUndefined();
  });

  it('clears selection', () => {
    const store = useSelectionStore.getState();
    store.toggleSelected(mockItem);
    store.clearSelection();

    const { selectedIds, selectedItemsMap } = useSelectionStore.getState();

    expect(selectedIds).toEqual([]);
    expect(selectedItemsMap).toEqual({});
  });
});
