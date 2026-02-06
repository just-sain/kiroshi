import type { Locale as ProjectLocales } from '@lib'
import { type Locale, format } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'

const locales: Record<ProjectLocales, Locale> = {
	ru: ru,
	en: enUS,
}

export const normalizeDate = (date: string | Date, locale: string = 'en'): string => {
	const dateObj = typeof date === 'string' ? new Date(date) : date

	const selectedLocale = locales[locale] || ru

	return format(dateObj, 'd MMMM, yyyy', { locale: selectedLocale })
}
