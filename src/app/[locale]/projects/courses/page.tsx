'use client'

import React from 'react'

import { getYouTubeId } from '@helpers'
import { services } from '@services'
import { Spinner } from '@shadcn'
import { useDictionaryStore } from '@store'
import { useQuery } from '@tanstack/react-query'
import { Clock, PlayCircle } from 'lucide-react'

interface IDict {
	courses: {
		badge: string
		title: string
		titleAccent: string
		description: string
		lesson: string
	}
}

const CoursesPage = ({ params }: { params: Promise<{ locale: string }> }) => {
	const { locale } = React.use(params)
	const dict = useDictionaryStore((state) => state.dict) as IDict

	const { data: courses, isLoading } = useQuery({
		...services.page.getCoursesOptions(locale),
		enabled: true,
	})

	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<Spinner />
			</div>
		)
	}

	// Сортируем курсы по полю order, если это не сделано на стороне API
	const sortedCourses = [...(courses || [])].sort((a, b) => a.order - b.order)

	return (
		<section className='container mx-auto px-4 py-20 space-y-16 relative'>
			{/* Фоновые акценты */}
			<div className='absolute top-0 right-0 w-125 h-125 bg-primary/5 blur-[150px] -z-10' />

			{/* Заголовок курса */}
			<div className='max-w-3xl space-y-4'>
				<div className='flex items-center gap-3 text-primary'>
					<div className='h-px w-12 bg-primary' />
					<span className='text-xs font-black uppercase tracking-[0.4em]'>
						{dict?.courses?.badge || 'Educational Program'}
					</span>
				</div>
				<h1 className='text-5xl lg:text-7xl font-black uppercase italic tracking-tighter'>
					{dict?.courses?.title || 'Курс по'}{' '}
					<span className='text-primary'>{dict?.courses?.titleAccent || 'FTC Робототехнике'}</span>
				</h1>
				<p className='text-muted-foreground text-lg'>
					{dict?.courses?.description ||
						'Пошаговое руководство от проектирования до победы на соревнованиях. Изучай теорию и сразу применяй её в симуляторе или на железе.'}
				</p>
			</div>

			{/* Список видео-уроков */}
			<div className='mx-auto flex flex-col gap-10 max-w-5xl'>
				{sortedCourses.map((video, index) => {
					const videoId = getYouTubeId(video.link)

					return (
						<div
							key={video.documentId}
							className='group relative grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-8 rounded-[2.5rem] bg-card/30 border border-accent-foreground/10 backdrop-blur-xl transition-all duration-500 hover:border-primary/30'
						>
							{/* Левая часть: Видео (iframe) */}
							<div className='lg:col-span-7 relative aspect-video rounded-3xl overflow-hidden border border-accent-foreground/5 shadow-2xl bg-black'>
								<iframe
									allowFullScreen
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
									className='absolute inset-0 w-full h-full border-0'
									src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
									title={video.name}
								/>
							</div>

							{/* Правая часть: Описание урока */}
							<div className='lg:col-span-5 flex flex-col justify-center space-y-6'>
								<div className='space-y-4'>
									<div className='flex items-center justify-between'>
										<div className='flex items-center gap-2'>
											<PlayCircle className='w-4 h-4 text-primary' />
											<span className='text-primary font-black text-sm uppercase tracking-widest'>
												{dict?.courses?.lesson || 'Урок'} {video.order || index + 1}
											</span>
										</div>
										<div className='flex items-center gap-2 text-muted-foreground text-[10px] font-bold uppercase bg-accent-foreground/5 px-2 py-1 rounded-md'>
											<Clock className='w-3 h-3' />
											{video.duration}
										</div>
									</div>

									<div className='space-y-2'>
										<h2 className='text-2xl lg:text-3xl font-bold group-hover:text-primary transition-colors leading-tight'>
											{video.name}
										</h2>
										<p className='text-sm text-muted-foreground leading-relaxed'>{video.description}</p>
									</div>

									{video.season && (
										<div className='pt-2'>
											<span className='text-[10px] font-bold px-2 py-1 rounded border border-primary/20 text-primary/60 uppercase'>
												Season: {video.season.name}
											</span>
										</div>
									)}
								</div>
							</div>

							{/* Номер на фоне для декора */}
							<div className='absolute -right-4 -bottom-4 text-9xl font-black text-accent-foreground/5 select-none pointer-events-none group-hover:text-primary/10 transition-colors'>
								{String(video.order || index + 1).padStart(2, '0')}
							</div>
						</div>
					)
				})}
			</div>
		</section>
	)
}

export default CoursesPage
