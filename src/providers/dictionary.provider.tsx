'use client'

import { useEffect } from 'react'

import { useDictionaryStore } from '@store'

export const DictionaryProvider = ({ dict }) => {
	const setDict = useDictionaryStore((state) => state.setDict)

	useEffect(() => {
		setDict(dict)
	}, [dict, setDict])

	return null
}
