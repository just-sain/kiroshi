const dictionaries = {
	en: () => import('@dictionaries/en.json').then((module) => module.default),
	ru: () => import('@dictionaries/ru.json').then((module) => module.default),
}

export type Locale = keyof typeof dictionaries

export const getDictionary = async (locale: string) => {
	const loader = dictionaries[locale as Locale]

	if (typeof loader !== 'function') {
		console.warn(`Dictionary for locale "${locale}" not found. Falling back to "en".`)

		return dictionaries.en()
	}

	return loader()
}
