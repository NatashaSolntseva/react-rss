'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type AppState = {
  page: number;
  searchTerm: string;
  totalPages: number | null;
};

type AppActions = {
  setPage: (page: number) => void;
  setSearchTerm: (search: string) => void;
  setTotalPages: (n: number | null) => void;
  reset: () => void;
};

const initialState: AppState = {
  page: 1,
  searchTerm: '',
  totalPages: null,
};

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      ...initialState,
      setPage: (page) => set({ page }),
      setSearchTerm: (searchTerm) => set({ searchTerm }),
      setTotalPages: (n) => set({ totalPages: n }),
      reset: () => set(initialState),
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const selectPage = (s: AppState & AppActions) => s.page;
export const selectSearch = (s: AppState & AppActions) => s.searchTerm;
export const selectTotalPages = (s: AppState) => s.totalPages;
