'use client'

import React, { useEffect, useState } from 'react'

import { cn } from '@lib'
import { services } from '@services'
import { Spinner } from '@shadcn'
import { useDictionaryStore } from '@store'
import { useQuery } from '@tanstack/react-query'
import { Globe, type LucideIcon, Search, Trophy, X } from 'lucide-react'

// Маппинг иконок (если они приходят строкой из базы)
const ICON_MAP: Record<string, LucideIcon> = {
	globe: Globe,
	trophy: Trophy,
	medal: Trophy, // или Medal из lucide
	star: Trophy,
}

interface IDict {
	aboutAwardsPage: {
		titleOur: string
		titleAwards: string
	}
}

const AwardsPage = ({ params }: { params: Promise<{ locale: string }> }) => {
	const { locale } = React.use(params)

	const dict = useDictionaryStore((state) => state.dict) as IDict

	// const [activeType, setActiveType] = useState('all')
	// const [activeSeason, setActiveSeason] = useState('All')
	const [searchTerm, setSearchTerm] = useState('')
	const [debouncedSearch, setDebouncedSearch] = useState('')

	// Debounce для поиска
	useEffect(() => {
		const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500)

		return () => clearTimeout(timer)
	}, [searchTerm])

	const {
		data: awards,
		isLoading,
		isFetching,
	} = useQuery({
		...services.award.getAllAwardsOptions({
			search: debouncedSearch,
			page: 1,
			pageSize: 100,
			locale: locale,
		}),
	})

	const clearFilters = () => {
		// setActiveType('all')
		// setActiveSeason('All')
		setSearchTerm('')
	}

	if (!dict) return <Spinner />

	return (
		<section className='container mx-auto px-4 py-12 space-y-20 relative'>
			{/* Фоновый декор и Hero остаются прежними... */}

			{/* --- БЛОК ЗАГОЛОВКА И ПОИСКА --- */}
			<div className='flex flex-col items-center text-center space-y-8 pt-10'>
				<div className='relative'>
					<h1 className='text-6xl lg:text-8xl font-black uppercase italic tracking-tighter'>
						{dict.aboutAwardsPage.titleOur}{' '}
						<span className='text-primary'>{dict.aboutAwardsPage.titleAwards}</span>
					</h1>
				</div>

				{/* --- SEARCH BAR --- */}
				<div className='relative max-w-md w-full mx-auto group'>
					<div className='absolute -inset-0.5 bg-primary/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500' />
					<div className='relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-4 h-12 transition-colors group-focus-within:border-primary/50'>
						<Search className='w-4 h-4 text-muted-foreground group-focus-within:text-primary' />
						<input
							className='w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/50 px-3 text-xs font-bold uppercase tracking-widest'
							placeholder='Поиск награды...'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						{searchTerm && (
							<button onClick={() => setSearchTerm('')}>
								<X className='w-4 h-4 text-muted-foreground hover:text-white' />
							</button>
						)}
					</div>
				</div>

				{/* --- ФИЛЬТРЫ --- */}
				<div className='flex flex-col md:flex-row items-center justify-center gap-6 w-full'>
					{/* Типы */}
					{/* <div className='flex flex-wrap justify-center gap-2 p-2 rounded-2xl bg-white/5 border border-white/10'>
						{['all', 'worlds', 'national', 'regional'].map((type) => (
							<button
								key={type}
								className={cn(
									'px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all',
									activeType === type ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-white/5',
								)}
								onClick={() => setActiveType(type)}
							>
								{type}
							</button>
						))}
					</div> */}

					{/* Сезоны */}
					{/* <div className='flex gap-2'>
						{['All', 'Decode', 'CenterStage'].map((s) => (
							<button
								key={s}
								className={cn(
									'px-4 py-2 rounded-xl text-[10px] font-bold uppercase border transition-all',
									activeSeason === s
										? 'border-primary text-primary bg-primary/10'
										: 'border-white/10 text-muted-foreground',
								)}
								onClick={() => setActiveSeason(s)}
							>
								{s}
							</button>
						))}
					</div> */}
				</div>
			</div>

			{/* --- КОНТЕНТ --- */}
			<div className={cn('relative min-h-100', isFetching && 'opacity-50 transition-opacity')}>
				{isLoading ? (
					<div className='absolute inset-0 flex items-center justify-center'>
						<Spinner />
					</div>
				) : awards && awards.data.length > 0 ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
						{awards.data.map((award) => {
							const Icon = ICON_MAP[award.event.type] || Trophy

							return (
								<div
									key={award.id}
									className='group relative p-8 rounded-[2.5rem] border border-white/10 bg-card/30 backdrop-blur-xl hover:border-primary/40 transition-all overflow-hidden'
								>
									{/* Градиентный фон карточки на основе типа награды */}
									<div className='absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-50' />

									<div className='relative z-10 space-y-6'>
										<div className='flex justify-between items-start'>
											<div className='p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-primary/20 transition-all'>
												<Icon className='w-8 h-8 text-primary' />
											</div>
											<div className='text-right'>
												<div className='text-[10px] font-black uppercase text-primary tracking-widest'>
													{award.event.type}
												</div>
												<div className='text-[9px] font-bold text-muted-foreground uppercase italic'>
													{new Date(award.event.date).toLocaleDateString('ru-RU')}
												</div>
											</div>
										</div>

										<div className='space-y-2'>
											<h2 className='text-2xl font-black uppercase italic tracking-tight leading-tight'>
												{award.awardName}
											</h2>
											<p className='text-[10px] font-bold text-muted-foreground uppercase tracking-widest'>
												{award.event.name}
											</p>
										</div>

										<div className='mt-auto pt-4 border-t border-white/5'>
											<span className='px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[0.2em]'>
												{award.event.type}
											</span>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				) : (
					<div className='py-20 text-center space-y-4'>
						<p className='text-muted-foreground uppercase tracking-widest font-bold'>Ничего не найдено</p>
						<button className='text-primary text-xs font-black uppercase underline' onClick={clearFilters}>
							Сбросить всё
						</button>
					</div>
				)}
			</div>
		</section>
	)
}

export default AwardsPage
