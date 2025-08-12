import axios from 'axios'
import { create } from 'zustand'

type State = {
  isLoading: boolean;
  error: string | null;
  data: any | null;
  searchTerm: null | string;
  setSearchTerm: (term: string | null) => void;
  reset: () => void;
  fetchData: (type: string) => Promise<void>;
};

export const useStore = create<State>((set) => ({
  isLoading: false,
  error: null,
  data: null,
  searchTerm: null,
  setSearchTerm: (term: string | null): void => set({ searchTerm: term }),
  reset: (): void => set({ isLoading: false, data: null, error: null }),
  fetchData: async (searchTerm: string): Promise<void> => {
    set({ isLoading: true, error: null, searchTerm })
  }
}))
