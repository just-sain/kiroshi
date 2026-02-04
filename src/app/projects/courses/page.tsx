'use client'

import { Clock } from 'lucide-react'

const COURSE_VIDEOS = [
	{
		id: '3Ww4B1-fPGI',
		title: 'Введение в FTC: Основы и регламент',
		duration: '15:20',
		description: 'Разбираем правила сезона, устройство поля и основные требования к конструкции робота.',
	},
	{
		id: 'beBD8HIEUsk',
		title: 'Проектирование манипуляторов',
		duration: '22:45',
		description: 'Изучаем механику захватов, передаточные числа и оптимизацию веса узлов.',
	},
	{
		id: 'K-2McNPHzE0',
		title: 'Автономный период: Основы навигации',
		duration: '18:10',
		description: 'Программирование движения по одометрии и использование датчиков для точного позиционирования.',
	},
]

const CoursesPage = () => {
	return (
		<section className='container mx-auto px-4 py-20 space-y-16 relative'>
			{/* Фоновые акценты */}
			<div className='absolute top-0 right-0 w-125 h-125 bg-primary/5 blur-[150px] -z-10' />

			{/* Заголовок курса */}
			<div className='max-w-3xl space-y-4'>
				<div className='flex items-center gap-3 text-primary'>
					<div className='h-px w-12 bg-primary' />
					<span className='text-xs font-black uppercase tracking-[0.4em]'>Educational Program</span>
				</div>
				<h1 className='text-5xl lg:text-7xl font-black uppercase italic tracking-tighter'>
					Курс по <span className='text-primary'>FTC Робототехнике</span>
				</h1>
				<p className='text-muted-foreground text-lg'>
					Пошаговое руководство от проектирования до победы на соревнованиях. Изучай теорию и сразу применяй её в
					симуляторе или на железе.
				</p>
			</div>

			{/* Список видео-уроков */}
			<div className='mx-auto flex flex-col gap-10 max-w-5xl'>
				{COURSE_VIDEOS.map((video, index) => (
					<div
						key={video.id}
						className='group relative grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-8 rounded-[2.5rem] bg-card/30 border border-accent-foreground/10 backdrop-blur-xl transition-all duration-500 hover:border-primary/30'
					>
						{/* Левая часть: Видео (iframe) */}
						<div className='lg:col-span-7 relative aspect-video rounded-3xl overflow-hidden border border-accent-foreground/5 shadow-2xl'>
							<iframe
								allowFullScreen
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
								className='absolute inset-0 w-full h-full border-0'
								src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
								title={video.title}
							/>
						</div>

						{/* Правая часть: Описание урока */}
						<div className='lg:col-span-5 flex flex-col justify-center space-y-6'>
							<div className='space-y-2'>
								<div className='flex items-center justify-between'>
									<span className='text-primary font-black text-sm uppercase tracking-widest'>
										Урок {index + 1}
									</span>
									<div className='flex items-center gap-2 text-muted-foreground text-[10px] font-bold uppercase'>
										<Clock className='w-3 h-3' />
										{video.duration}
									</div>
								</div>
								<h2 className='text-2xl font-bold group-hover:text-primary transition-colors'>{video.title}</h2>
								<p className='text-sm text-muted-foreground leading-relaxed'>{video.description}</p>
							</div>

							{/* <div className='flex items-center gap-4 pt-4'>
								<button className='flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground hover:text-primary transition-colors'>
									МАТЕРИАЛЫ К УРОКУ <ArrowRight className='w-3 h-3 text-primary' />
								</button>
								<div className='h-px flex-1 bg-accent-foreground/5' />
							</div> */}
						</div>

						{/* Номер на фоне для декора (Liquid эффект) */}
						<div className='absolute -right-4 -bottom-4 text-9xl font-black text-accent-foreground/50 select-none pointer-events-none group-hover:text-primary/5 transition-colors'>
							0{index + 1}
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

export default CoursesPage
