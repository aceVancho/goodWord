import { create } from 'zustand'

type State = {
	isLoading: boolean
	error: string | null
	data: any | null
  label: null | string
	searchTerm: null | string
	searchType: null | string
  lastSearchTerm: null | string
	setSearchTerm: (term: string | null) => void
	reset: () => void
	fetchData: (searchTerm: string, searchType: string, label?: string) => Promise<void>
}

export const useStore = create<State>(set => ({
	isLoading: false,
	error: null,
	data: null,
  label: null,
	searchTerm: null,
	searchType: null,
	lastSearchTerm: null,
	setSearchTerm: (term: string | null): void => set({ searchTerm: term }),
	reset: (): void => set({ isLoading: false, data: null, error: null }),
	fetchData: async (searchTerm: string, searchType: string): Promise<void> => {
    // TODO: Deep Search
    // const searchTypeSplit = searchType.split(':');
    // const searchSubType = searchTypeSplit[searchTypeSplit.length - 1]
    // or use this: const searchSubType = searchType.split(':')[searchType.split(':').length - 1]
		// set({ isLoading: searchSubType !== 'deep' ? true : false, error: null, searchTerm, searchType, lastSearchTerm: searchTerm })
		set({ isLoading: true, error: null, searchTerm, searchType, lastSearchTerm: searchTerm })
    searchType = searchType.trim().toLowerCase();
		try {
			const result = await window.api.invoke(searchType, searchTerm)
			set({ data: result, isLoading: false })
		} catch (err: any) {
			set({ error: String(err?.message ?? err), isLoading: false })
		}
	}
}))
