import axios from 'axios'
import { create } from 'zustand'

type State = {
  isLoading: boolean;
  error: string | null;
  data: any | null;
  searchTerm: null | string;
  searchType: null | string;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setData: (data: any | null) => void;
  setSearchTerm: (term: string | null) => void;
  setSearchType: (type: string | null) => void;
  reset: () => void;
  fetchData: (searchTerm: string, searchType: string) => Promise<void>;
};

export const useStore = create<State>((set) => ({
  isLoading: false,
  error: null,
  data: null,
  searchTerm: null,
  searchType: null,
  setIsLoading: (isLoading: boolean): void => set({ isLoading }),
  setError: (error: string | null): void => set({ error }),
  setData: (data: any | null): void => set({ data }),
  setSearchType: (type: string | null): void => set({ searchType: type }),
  setSearchTerm: (term: string | null): void => set({ searchTerm: term }),
  reset: (): void => set({ isLoading: false, data: null, error: null }),
  fetchData: async (searchTerm: string, searchType: string): Promise<void> => {
    set({ isLoading: true, error: null, searchTerm, searchType })

    switch (searchType) {
      case 'thesaurus':
        window.api.invoke('search:thesaurus', searchTerm);
        break;
      default:
        set({ isLoading: false, error: 'Unknown search type' });
    }
  }
}))
