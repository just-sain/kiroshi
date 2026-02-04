'use client'

import { cn } from '@lib'
import { Button } from '@shadcn'
import {
	Download,
	Eye,
	FileText,
	GraduationCap,
	type LucideIcon,
	PenTool,
	Search,
	Star,
	Trophy,
	Zap,
} from 'lucide-react'

const PORTFOLIOS = [
	{
		id: 1,
		title: 'Engineering Portfolio',
		season: 'Decode',
		level: 'National',
		award: 'Inspire',
		description:
			'Полная техническая документация робота: от первых эскизов манипулятора до финальных алгоритмов автономного периода.',
		cover: '/hero/1.jpg', // Замени на свои пути
		color: 'from-orange-500/20 to-yellow-500/20',
		accent: 'text-orange-500',
	},
	{
		id: 2,
		title: 'Technical Documentation',
		season: 'CenterStage',
		level: 'Worlds',
		award: 'Think',
		description:
			'Глубокий анализ инженерного процесса и математические обоснования наших кастомных передач и систем одометрии.',
		cover: '/hero/1.jpg',
		color: 'from-blue-500/20 to-cyan-500/20',
		accent: 'text-cyan-400',
	},
	{
		id: 3,
		title: 'Robot Design Book',
		season: 'PowerPlay',
		level: 'Regional',
		award: 'Design',
		description: 'Фокус на эстетике и функциональности: CAD-рендеры, итерации захвата и систем подъема.',
		cover: '/hero/1.jpg',
		color: 'from-purple-500/20 to-pink-500/20',
		accent: 'text-pink-500',
	},
]

// Маппинг иконок для наград
const AWARD_ICONS: Record<string, LucideIcon> = {
	Inspire: Trophy,
	Think: GraduationCap,
	Design: PenTool,
	Innovate: Zap,
	Control: Search,
	Motivate: Star,
}

const PortfoliosPage = () => {
	return (
		<section className='container mx-auto px-4 py-20 space-y-16 relative overflow-hidden'>
			{/* Фоновое свечение */}
			<div className='absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[180px] -z-10' />

			{/* Заголовок */}
			<div className='flex flex-col items-center text-center space-y-4'>
				<div className='flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md'>
					<FileText className='w-3 h-3 text-primary' />
					<span className='text-[10px] font-black uppercase tracking-[0.4em] text-primary'>Documentation</span>
				</div>
				<h1 className='text-6xl lg:text-8xl font-black uppercase italic tracking-tighter'>
					Наши <span className='text-primary'>Портфолио</span>
				</h1>
				<p className='text-muted-foreground max-w-xl text-lg'>
					Инженерные книги, в которых задокументирован наш путь от идеи до реализации на мировом уровне.
				</p>
			</div>

			{/* Сетка портфолио */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto'>
				{PORTFOLIOS.map((item) => {
					const AwardIcon = AWARD_ICONS[item.award] || Trophy

					return (
						<div
							key={item.id}
							className='group relative flex flex-col rounded-[2.5rem] border border-white/10 bg-card/30 backdrop-blur-xl transition-all duration-500 hover:border-primary/40 hover:-translate-y-2 overflow-hidden shadow-2xl'
						>
							<div className='absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine pointer-events-none' />

							{/* Обложка (Cover) */}
							<div className='relative aspect-[3/4] overflow-hidden'>
								<img
									alt={item.title}
									className='absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700'
									src={item.cover}
								/>
								{/* Градиент на обложке */}
								<div
									className={cn(
										'absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80',
										item.color,
									)}
								/>

								{/* Бейджи на обложке */}
								<div className='absolute top-6 left-6 flex flex-col gap-2'>
									<div className='px-3 py-1 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-widest'>
										{item.season}
									</div>
									<div className='px-3 py-1 rounded-lg bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-lg'>
										{item.level}
									</div>
								</div>

								{/* Награда (Центральный акцент) */}
								<div className='absolute bottom-6 left-6 right-6 flex items-center gap-4'>
									<div className='p-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl'>
										<AwardIcon className={cn('w-6 h-6', item.accent)} />
									</div>
									<div className='flex flex-col'>
										<span className='text-[10px] font-bold uppercase tracking-widest text-white/60'>
											Award Winner
										</span>
										<span className={cn('text-xl font-black uppercase italic tracking-tight', item.accent)}>
											{item.award}
										</span>
									</div>
								</div>
							</div>

							{/* Контент под обложкой */}
							<div className='p-8 space-y-6 flex-1 flex flex-col'>
								<h2 className='text-2xl font-black uppercase italic tracking-tight group-hover:text-primary transition-colors'>
									{item.title}
								</h2>

								<p className='text-sm text-muted-foreground leading-relaxed flex-1'>{item.description}</p>

								<div className='flex gap-3 pt-4'>
									<Button className='flex-1 h-12 rounded-xl font-bold gap-2 shadow-[0_10px_20px_-10px_var(--primary)]'>
										<Eye className='w-4 h-4' /> СМОТРЕТЬ
									</Button>
									<Button
										className='w-12 h-12 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 p-0'
										variant='outline'
									>
										<Download className='w-4 h-4 text-primary' />
									</Button>
								</div>
							</div>

							{/* Световой блик */}
							<div className='absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:animate-shine' />
						</div>
					)
				})}
			</div>
		</section>
	)
}

export default PortfoliosPage
