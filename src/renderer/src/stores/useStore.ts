import { create } from 'zustand'

type State = {
	isLoading: boolean
	error: string | null
	data: any | null
	searchTerm: null | string
	searchType: null | string
	setSearchTerm: (term: string | null) => void
	reset: () => void
	fetchData: (searchTerm: string, searchType: string) => Promise<void>
}

export const useStore = create<State>(set => ({
	isLoading: false,
	error: null,
	data: null,
	searchTerm: null,
	searchType: null,
	setSearchTerm: (term: string | null): void => set({ searchTerm: term }),
	reset: (): void => set({ isLoading: false, data: null, error: null }),
	fetchData: async (searchTerm: string, searchType: string): Promise<void> => {
		set({ isLoading: true, error: null, searchTerm, searchType })

		try {
			const result = await window.api.invoke('search:thesaurus', searchTerm)
			set({ data: result, isLoading: false })
		} catch (err: any) {
			set({ error: String(err?.message ?? err), isLoading: false })
		}
	}
}))
