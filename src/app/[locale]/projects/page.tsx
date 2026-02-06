'use client'

import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { getProjectIcon } from '@helpers'
import { getMedia } from '@lib'
import { services } from '@services'
import { Button, Spinner } from '@shadcn'
import { useDictionaryStore } from '@store'
import { useQuery } from '@tanstack/react-query'
import { ArrowUpRight } from 'lucide-react'

interface IDict {
	projects: {
		title: string
		badge: string
		description: string
		more: string
		empty: string
	}
}

const ProjectsPage = ({ params }: { params: Promise<{ locale: string }> }) => {
	const { locale } = React.use(params)
	const dict = useDictionaryStore((state) => state.dict) as IDict

	const { data, isLoading } = useQuery({
		...services.page.getProjectsOptions(locale),
		enabled: true,
	})

	if (isLoading || !data) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<Spinner />
			</div>
		)
	}

	const projects = data || []

	return (
		<section className='container mx-auto px-4 py-20 space-y-20'>
			{/* Заголовок страницы */}
			<div className='flex flex-col items-center text-center space-y-4 mb-12'>
				<h1 className='text-5xl lg:text-7xl font-black uppercase tracking-tighter italic'>
					{dict.projects.title.split(' ')[0]}{' '}
					<span className='text-primary'>{dict.projects.title.split(' ')[1]}</span>
				</h1>
				<p className='text-muted-foreground max-w-xl uppercase text-xs tracking-[0.4em] font-bold'>
					{dict.projects.description}
				</p>
			</div>

			{/* Список проектов в горизонтальном стиле */}
			<div className='flex flex-col gap-12 max-w-6xl mx-auto'>
				{projects.map((project) => {
					const firstTag = project.tags?.split(',')[0] || 'engineering'
					const ProjectIcon = getProjectIcon(firstTag)

					return (
						<Link
							key={project.id}
							className='group relative block overflow-hidden rounded-[2.5rem] border border-accent-foreground/10 bg-card/30 backdrop-blur-xl transition-all duration-500 hover:border-primary/30'
							href={project.link}
							rel='noopener noreferrer'
						>
							{/* Фоновый градиент (индивидуальный или общий) */}
							<div className='absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-30 group-hover:opacity-50 transition-opacity' />

							<div className='relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 lg:p-12'>
								{/* Левая сторона: Текст */}
								<div className='space-y-6 z-10'>
									<div className='flex items-center gap-4'>
										<div className='p-3 rounded-2xl bg-accent-foreground/5 border border-accent-foreground/10'>
											<ProjectIcon className='w-6 h-6 text-primary' />
										</div>
										<div className='text-xs font-bold tracking-widest text-primary uppercase'>
											{project.subname}
										</div>
									</div>

									<h2 className='text-4xl lg:text-6xl font-black uppercase italic tracking-tight'>
										{project.name}
									</h2>

									<p className='text-muted-foreground text-lg leading-relaxed'>{project.description}</p>

									{/* Теги */}
									<div className='flex flex-wrap gap-2'>
										{project.tags?.split(',').map((tag) => (
											<span
												key={tag}
												className='px-3 py-1 rounded-full bg-accent-foreground/5 border border-accent-foreground/10 text-[10px] font-bold uppercase tracking-widest'
											>
												{tag.trim()}
											</span>
										))}
									</div>

									<div className='pt-4'>
										<Button className='h-14 px-8 rounded-2xl font-bold gap-3 shadow-[0_0_30px_-5px_var(--primary)] group-hover:shadow-[0_0_50px_-5px_var(--primary)] transition-all bg-primary text-primary-foreground'>
											{dict.projects.more} <ArrowUpRight className='w-5 h-5' />
										</Button>
									</div>
								</div>

								{/* Правая сторона: Изображение */}
								<div className='relative h-75 lg:h-100 rounded-3xl overflow-hidden border border-accent-foreground/10 shadow-2xl'>
									<div className='absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500' />
									<Image
										fill
										alt={project.name}
										className='object-cover transition-transform duration-700 group-hover:scale-105'
										sizes='(max-width: 768px) 100vw, 50vw'
										src={getMedia(project.poster.url)}
									/>
								</div>
							</div>
						</Link>
					)
				})}
			</div>
		</section>
	)
}

export default ProjectsPage
