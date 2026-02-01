import type { INav } from '@types'
import { Headset, LibraryBig } from 'lucide-react'

export const NAVIGATION_DATA: INav[] = [
	{
		title: '3D Детали',
		url: '/3d',
	},
	{
		title: 'Портфолио',
		url: '/portfolio',
		items: [
			{
				icon: LibraryBig,
				title: 'Инженерное портфолио',
				url: '/portfolio/engineer',
				description: 'Инженерные портфолио нашей команды',
			},
		],
	},
	{
		title: 'Обучающие курсы',
		url: '/courses',
		items: [
			{
				icon: LibraryBig,
				title: 'ПУСТО',
				url: '/courses',
				description: 'Пока тут пусто',
			},
		],
	},
	{
		title: 'Наша команда',
		url: '/about',
		items: [
			{
				icon: LibraryBig,
				title: 'О нашей команде',
				url: '/about',
				description: 'Узнай подробнее о нашей команде',
			},
			{
				icon: LibraryBig,
				title: 'Into The Deep',
				url: '/about/seasons/into-the-deep',
				description: 'Сезон Into the Deep 2024-2025',
			},
			{
				icon: LibraryBig,
				title: 'Текущий сезон',
				url: '/about/seasons/current',
				description: 'Сезон 2025-2026',
			},
		],
	},
] as const

export const navFooter = [
	{
		title: 'Поддержка',
		url: '/support',
		icon: Headset,
	},
]
