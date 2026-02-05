import type { INav } from '@types'
import { Award, Gamepad, LibraryBig } from 'lucide-react'

export interface INavDict {
	details: string
	portfolio: string
	projects: {
		title: string
		all: string
		allDesc: string
		courses: string
		coursesDesc: string
		sim: string
		simDesc: string
	}
	team: {
		title: string
		awards: string
		awardsDesc: string
	}
	support: string
}

export const getNavigationData = (dict: INavDict): INav[] => [
	{
		title: dict.details,
		url: '/3d',
	},
	{
		title: dict.portfolio,
		url: '/portfolio',
	},
	{
		title: dict.projects.title,
		url: '/projects',
		items: [
			{
				icon: LibraryBig,
				title: dict.projects.all,
				url: '/projects',
				description: dict.projects.allDesc,
			},
			{
				icon: LibraryBig,
				title: dict.projects.courses,
				url: '/projects/courses',
				description: dict.projects.coursesDesc,
			},
			{
				icon: Gamepad,
				title: dict.projects.sim,
				url: '/projects/atc',
				description: dict.projects.simDesc,
			},
		],
	},
	{
		title: dict.team.title,
		url: '/about',
		items: [
			{
				icon: Award,
				title: dict.team.awards,
				url: '/about/awards',
				description: dict.team.awardsDesc,
			},
		],
	},
]
