'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@shadcn'
import { ArrowUpRight, Cpu, GraduationCap } from 'lucide-react'

const PROJECTS = [
	{
		id: 'atc-sim',
		title: 'ATC SIM',
		subtitle: 'ADVANCED TECH CHALLENGE',
		description:
			'Полноценный симулятор FTC робота. Оттачивай навыки управления, тестируй автономные периоды и изучай механику текущего сезона в цифровой среде.',
		image: '/projects/games/atc/atc.png', // Укажи путь к скрину из игры
		link: '/projects/atc',
		icon: Cpu,
		color: 'from-blue-500/20 to-primary/20',
		tags: ['Physics', 'FTC Decode', 'Training'],
	},
	{
		id: 'ftc-courses',
		title: 'КУРСЫ ПО FTC',
		subtitle: 'EDUCATION PROGRAM',
		description:
			'Изучай робототехнику с нуля до профессионального уровня. 3D-моделирование, программирование на Java и проектирование сложных механизмов под руководством экспертов.',
		image: '/projects/courses/preview.jpg', // Укажи путь к превью курсов
		link: '/projects/courses',
		icon: GraduationCap,
		color: 'from-orange-500/20 to-red-500/20',
		tags: ['Java', 'CAD/FUSION', 'Engineering'],
	},
]

const ProjectsPage = () => {
	return (
		<section className='container mx-auto px-4 py-20 space-y-20'>
			{/* Заголовок страницы */}
			<div className='flex flex-col items-center text-center space-y-4 mb-12'>
				<h1 className='text-5xl lg:text-7xl font-black uppercase tracking-tighter italic'>
					Наши <span className='text-primary'>Проекты</span>
				</h1>
				<p className='text-muted-foreground max-w-xl uppercase text-xs tracking-[0.4em] font-bold'>
					Инновации и обучение в мире робототехники
				</p>
			</div>

			{/* Список проектов */}
			<div className='flex flex-col gap-12 max-w-6xl mx-auto'>
				{PROJECTS.map((project) => (
					<Link
						key={project.id}
						className='group relative block overflow-hidden rounded-[2.5rem] border border-accent-foreground/10 bg-card/30 backdrop-blur-xl transition-all duration-500 hover:border-primary/30'
						href={project.link}
					>
						<div
							className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-30 group-hover:opacity-50 transition-opacity`}
						/>

						<div className='relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 lg:p-12'>
							{/* Левая сторона: Текст */}
							<div className='space-y-6 z-10'>
								<div className='flex items-center gap-4'>
									<div className='p-3 rounded-2xl bg-accent-foreground/5 border border-accent-foreground/10'>
										<project.icon className='w-6 h-6 text-primary' />
									</div>
									<div className='text-xs font-bold tracking-widest text-primary uppercase'>
										{project.subtitle}
									</div>
								</div>

								<h2 className='text-4xl lg:text-6xl font-black uppercase italic tracking-tight'>
									{project.title}
								</h2>

								<p className='text-muted-foreground text-lg leading-relaxed'>{project.description}</p>

								<div className='flex flex-wrap gap-2'>
									{project.tags.map((tag) => (
										<span
											key={tag}
											className='px-3 py-1 rounded-full bg-accent-foreground/5 border border-accent-foreground/10 text-[10px] font-bold uppercase tracking-widest'
										>
											{tag}
										</span>
									))}
								</div>

								<div className='pt-4'>
									<Button className='h-14 px-8 rounded-2xl font-bold gap-3 shadow-[0_0_30px_-5px_var(--primary)] group-hover:shadow-[0_0_50px_-5px_var(--primary)] transition-all'>
										ПОДРОБНЕЕ <ArrowUpRight className='w-5 h-5' />
									</Button>
								</div>
							</div>

							{/* Правая сторона: Изображение */}
							<div className='relative h-75 lg:h-100 rounded-3xl overflow-hidden border border-accent-foreground/10 shadow-2xl'>
								<div className='absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500' />
								<Image
									fill
									alt={project.title}
									className='object-cover transition-transform duration-700 group-hover:scale-105'
									src={project.image}
								/>
							</div>
						</div>
					</Link>
				))}
			</div>
		</section>
	)
}

export default ProjectsPage
