import type { INav } from '@types'
import { Award, Gamepad, Headset, LibraryBig } from 'lucide-react'

export const NAVIGATION_DATA: INav[] = [
	{
		title: '3D Детали',
		url: '/3d',
	},
	{
		title: 'Портфолио',
		url: '/portfolio',
	},
	{
		title: 'Проекты',
		url: '/projects',
		items: [
			{
				icon: LibraryBig,
				title: 'Все наши проекты',
				url: '/projects',
				description: 'Просмотрите все наши проекты',
			},
			{
				icon: LibraryBig,
				title: 'Обучающие курсы',
				url: '/projects/courses',
				description: 'Курсы от нашей команды для обучения в FTC',
			},
			{
				icon: Gamepad,
				title: 'ATC SIM',
				url: '/projects/atc',
				description:
					'Полноценный симулятор FTC робота. Оттачивай навыки управления, тестируй автономные периоды и изучай механику текущего сезона в цифровой среде.',
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
				icon: Award,
				title: 'Наши достижения',
				url: '/about/awards',
				description: 'Достижения нашей команды',
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
