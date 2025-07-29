import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SelectionState {
  selectedIds: string[];
  toggleSelected: (id: string) => void;
  isSelected: (id: string) => boolean;
  clearSelection: () => void;
}

export const useSelectionStore = create<SelectionState>()(
  persist(
    (set, get) => ({
      selectedIds: [],

      toggleSelected: (id) => {
        const { selectedIds } = get();
        const exists = selectedIds.includes(id);
        set({
          selectedIds: exists
            ? selectedIds.filter((x) => x !== id)
            : [...selectedIds, id],
        });
      },

      isSelected: (id) => get().selectedIds.includes(id),

      clearSelection: () => set({ selectedIds: [] }),
    }),
    {
      name: 'selected-images',
    }
  )
);
