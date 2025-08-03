import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CardItem } from '@/api/types';

interface SelectionState {
  selectedIds: string[];
  selectedItemsMap: Record<string, CardItem>;
  toggleSelected: (item: CardItem) => void;
  clearSelection: () => void;
}

export const useSelectionStore = create<SelectionState>()(
  persist(
    (set, get) => ({
      selectedIds: [],
      selectedItemsMap: {},

      toggleSelected: (item) => {
        const { selectedIds, selectedItemsMap } = get();
        const exists = selectedIds.includes(item.id);

        if (exists) {
          const { [item.id]: _, ...rest } = selectedItemsMap;
          void _;
          set({
            selectedIds: selectedIds.filter((x) => x !== item.id),
            selectedItemsMap: rest,
          });
        } else {
          set({
            selectedIds: [...selectedIds, item.id],
            selectedItemsMap: { ...selectedItemsMap, [item.id]: item },
          });
        }
      },

      clearSelection: () => set({ selectedIds: [], selectedItemsMap: {} }),
    }),
    {
      name: 'selected-images',
      partialize: (state) => ({
        selectedIds: state.selectedIds,
        selectedItemsMap: state.selectedItemsMap,
      }),
    }
  )
);
