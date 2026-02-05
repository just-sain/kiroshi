// store/dictionaryStore.ts
import { create } from 'zustand'

interface DictionaryState<T> {
	dict: T | null
	setDict: (dict: T) => void
}

export const createDictionaryStore = <T>() =>
	create<DictionaryState<T>>((set) => ({
		dict: null,
		setDict: (dict: T) => set({ dict }),
	}))

export const useDictionaryStore = createDictionaryStore<unknown>()
