'use client'

import { useMemo, useState } from 'react'

import { cn } from '@lib'
import { ArrowDown, Award, Filter, Globe, MapPin, Medal, Star, Target, Trophy, Users } from 'lucide-react'

// --- ДАННЫЕ ---
const ACHIEVEMENTS = [
	{
		id: 1,
		title: 'Inspire Award 1st Place',
		type: 'worlds',
		season: 'Decode',
		competition: 'Houston World Championship',
		date: 'Апрель 2026',
		color: 'from-purple-500/20 to-pink-500/20',
		icon: Globe,
	},
	{
		id: 2,
		title: 'Winning Alliance Captain',
		type: 'national',
		season: 'Decode',
		competition: 'Digital Bridge National Cup',
		date: 'Февраль 2026',
		color: 'from-blue-500/20 to-cyan-500/20',
		icon: Trophy,
	},
	{
		id: 3,
		title: 'Think Award',
		type: 'regional',
		season: 'Decode',
		competition: 'Almaty Regional',
		date: 'Январь 2026',
		color: 'from-emerald-500/20 to-teal-500/20',
		icon: Target,
	},
	{
		id: 4,
		title: 'Innovate Award',
		type: 'qualifier',
		season: 'Decode',
		competition: 'Astana Qualifier',
		date: 'Декабрь 2025',
		color: 'from-orange-500/20 to-yellow-500/20',
		icon: Star,
	},
	{
		id: 5,
		title: 'Finalist Alliance',
		type: 'invitational',
		season: 'Decode',
		competition: 'Silk Way Invitational',
		date: 'Ноябрь 2025',
		color: 'from-red-500/20 to-orange-500/20',
		icon: Award,
	},
	{
		id: 6,
		title: 'Design Award',
		type: 'off-season',
		season: 'CenterStage',
		competition: 'Tech Fest Off-Season',
		date: 'Август 2025',
		color: 'from-indigo-500/20 to-blue-500/20',
		icon: Medal,
	},
	{
		id: 7,
		title: 'Judges Choice',
		type: 'scrimmage',
		season: 'Decode',
		competition: 'Local Scrimmage #2',
		date: 'Октябрь 2025',
		color: 'from-slate-500/20 to-gray-500/20',
		icon: Star,
	},
]

const TYPE_LABELS: Record<string, string> = {
	all: 'Все уровни',
	worlds: 'Worlds',
	national: 'National',
	regional: 'Regional',
	qualifier: 'Qualifier',
}

const SEASONS = ['All', 'Decode', 'CenterStage', 'PowerPlay']

// --- УТИЛИТЫ ---
function getWordEnding(num: number, text_forms: string[]) {
	num = Math.abs(num) % 100
	const n1 = num % 10

	if (num > 10 && num < 20) return text_forms[2]
	if (n1 > 1 && n1 < 5) return text_forms[1]
	if (n1 === 1) return text_forms[0]

	return text_forms[2]
}

// --- КОМПОНЕНТ ---
const AwardsPage = () => {
	const [activeType, setActiveType] = useState('all')
	const [activeSeason, setActiveSeason] = useState('All')

	const filteredAwards = useMemo(() => {
		return ACHIEVEMENTS.filter((award) => {
			const typeMatch = activeType === 'all' || award.type === activeType
			const seasonMatch = activeSeason === 'All' || award.season === activeSeason

			return typeMatch && seasonMatch
		})
	}, [activeType, activeSeason])

	return (
		<section className='container mx-auto px-4 py-12 space-y-20 relative'>
			{/* Фоновый декор */}
			<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-primary/5 blur-[120px] -z-10' />

			<div className='absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000' />

			{/* 1. HERO SECTION: ГЛАВНОЕ СОБЫТИЕ И ФОТО */}
			<div className='relative group'>
				<div className='relative overflow-hidden rounded-[3rem] border border-white/10 bg-card/30 backdrop-blur-2xl shadow-2xl'>
					<div className='grid grid-cols-1 lg:grid-cols-12'>
						{/* Контент Hero */}
						<div className='lg:col-span-5 p-8 lg:p-14 flex flex-col justify-center space-y-8 z-20 bg-linear-to-r from-background/80 via-background/40 to-transparent'>
							<div className='space-y-4'>
								<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-[10px] font-black uppercase tracking-[0.2em] text-primary'>
									<Trophy className='w-3 h-3' /> Major Achievement
								</div>
								<h2 className='text-4xl lg:text-6xl font-black uppercase italic tracking-tighter leading-[0.9]'>
									Central Asia <br />
									<span className='text-primary'>First Championship</span> <br />
									2025
								</h2>
							</div>

							<div className='flex flex-wrap gap-6'>
								<div className='flex items-center gap-2 text-muted-foreground'>
									<MapPin className='w-4 h-4 text-primary' />
									<span className='text-[10px] font-bold uppercase tracking-widest'>Almaty, Kazakhstan</span>
								</div>
								<div className='flex items-center gap-2 text-muted-foreground'>
									<Users className='w-4 h-4 text-primary' />
									<span className='text-[10px] font-bold uppercase tracking-widest'>Команда ATC</span>
								</div>
							</div>

							<p className='text-muted-foreground text-sm leading-relaxed max-w-sm border-l-2 border-primary/30 pl-4'>
								Наше самое масштабное выступление сезона. Мы объединили инженерную мысль и командную работу,
								чтобы занять достойное место среди лучших команд Центральной Азии.
							</p>
						</div>

						{/* Фото команды */}
						<div className='lg:col-span-7 relative h-[400px] lg:h-[600px] overflow-hidden'>
							<img
								alt='Team Photo'
								className='absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105'
								src='/hero/6.jpg' // Замени на свое реальное фото
							/>
							<div className='absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/90 lg:to-black/80' />
						</div>
					</div>
				</div>

				{/* Декоративная иконка скролла */}
				<div className='absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center animate-bounce shadow-2xl z-30'>
					<ArrowDown className='w-5 h-5 text-primary' />
				</div>
			</div>

			{/* 2. ЗАГОЛОВОК И СЧЕТЧИК */}
			<div className='flex flex-col items-center text-center space-y-8 pt-10'>
				<div className='relative'>
					<h1 className='text-6xl lg:text-8xl font-black uppercase italic tracking-tighter'>
						Наши <span className='text-primary'>Награды</span>
					</h1>

					<div className='absolute -top-4 -right-8 lg:-right-12 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md shadow-[0_0_20px_rgba(var(--primary),0.3)] animate-in fade-in zoom-in duration-500'>
						<span className='text-[10px] lg:text-xs font-black text-primary tracking-tighter uppercase'>
							{filteredAwards.length} {getWordEnding(filteredAwards.length, ['НАГРАДА', 'НАГРАДЫ', 'НАГРАД'])}
						</span>
					</div>
				</div>

				{/* 3. БЛОК ФИЛЬТРОВ */}
				<div className='flex flex-col md:flex-row items-center justify-center gap-6 w-full'>
					<div className='flex flex-wrap justify-center gap-2 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md'>
						{Object.entries(TYPE_LABELS).map(([key, label]) => (
							<button
								key={key}
								className={cn(
									'px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all',
									activeType === key
										? 'bg-primary text-white shadow-[0_0_15px_rgba(var(--primary),0.5)]'
										: 'text-muted-foreground hover:text-white hover:bg-white/5',
								)}
								onClick={() => setActiveType(key)}
							>
								{label}
							</button>
						))}
					</div>

					<div className='hidden md:block w-px h-8 bg-white/10' />

					<div className='flex gap-2'>
						{SEASONS.map((season) => (
							<button
								key={season}
								className={cn(
									'px-4 py-2 rounded-xl text-[10px] font-bold uppercase border transition-all',
									activeSeason === season
										? 'border-primary text-primary bg-primary/10'
										: 'border-white/10 text-muted-foreground hover:border-white/30',
								)}
								onClick={() => setActiveSeason(season)}
							>
								{season}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* 4. СЕТКА НАГРАД */}
			{filteredAwards.length > 0 ? (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
					{filteredAwards.map((award) => (
						<div
							key={award.id}
							className='group relative flex flex-col p-8 rounded-[2.5rem] border border-white/10 bg-card/30 backdrop-blur-xl transition-all duration-500 hover:border-primary/40 hover:-translate-y-2 overflow-hidden shadow-2xl'
						>
							<div
								className={cn(
									'absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-30 transition-opacity',
									award.color,
								)}
							/>
							<div className='relative z-10 flex flex-col h-full space-y-6'>
								<div className='flex justify-between items-start'>
									<div className='p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all'>
										<award.icon className='w-8 h-8 text-primary' />
									</div>
									<div className='text-right'>
										<div className='text-[10px] font-black uppercase tracking-widest text-primary'>
											{award.season}
										</div>
										<div className='text-[9px] font-bold text-muted-foreground uppercase italic'>
											{award.date}
										</div>
									</div>
								</div>

								<div className='space-y-2'>
									<h2 className='text-2xl font-black uppercase italic tracking-tight leading-tight'>
										{award.title}
									</h2>
									<p className='text-[10px] font-bold text-muted-foreground uppercase tracking-widest'>
										{award.competition}
									</p>
								</div>

								<div className='mt-auto flex items-center justify-between pt-4 border-t border-white/5'>
									<span className='px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[0.2em]'>
										{award.type}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className='py-20 text-center space-y-4'>
					<Filter className='w-12 h-12 text-muted-foreground mx-auto opacity-20' />
					<p className='text-muted-foreground uppercase tracking-widest font-bold'>Наград не найдено</p>
					<button
						className='text-primary text-xs font-black uppercase underline'
						onClick={() => {
							setActiveType('all')
							setActiveSeason('All')
						}}
					>
						Сбросить
					</button>
				</div>
			)}
		</section>
	)
}

export default AwardsPage
