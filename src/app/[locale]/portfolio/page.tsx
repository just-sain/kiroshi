'use client'

import React, { useEffect, useState } from 'react'

import Link from 'next/link'

import { cn, getMedia } from '@lib'
import { services } from '@services'
import { Button, Spinner } from '@shadcn'
import { useDictionaryStore } from '@store'
import { useQuery } from '@tanstack/react-query'
import { LiquidPagination } from '@widgets'
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
	X,
	Zap,
} from 'lucide-react'

const AWARD_ICONS: Record<string, LucideIcon> = {
	inspire: Trophy,
	think: GraduationCap,
	design: PenTool,
	innovate: Zap,
	control: Search,
	motivate: Star,
}

const getStyleByAward = (award: string = '') => {
	switch (award) {
		case 'inspire':
			return { color: 'from-orange-500/20 to-yellow-500/20', accent: 'text-orange-500' }
		case 'think':
			return { color: 'from-blue-500/20 to-cyan-500/20', accent: 'text-cyan-400' }
		case 'design':
			return { color: 'from-purple-500/20 to-pink-500/20', accent: 'text-pink-500' }
		case 'innovate':
			return { color: 'from-yellow-500/20 to-lime-500/20', accent: 'text-yellow-400' }
		default:
			return { color: 'from-primary/20 to-primary/5', accent: 'text-primary' }
	}
}

interface IDict {
	portfoliosPage: {
		badge: string
		title: {
			main: string
			accent: string
		}
		description: string
		search: {
			placeholder: string
			clear: string
			noResults: string
		}
		actions: {
			view: string
		}
	}
}

const PortfoliosPage = ({ params }: { params: Promise<{ locale: string }> }) => {
	const { locale } = React.use(params)
	const dict = useDictionaryStore((state) => state.dict) as IDict

	const [currentPage, setCurrentPage] = useState(1)
	const [searchTerm, setSearchTerm] = useState('')
	const [debouncedSearch, setDebouncedSearch] = useState('')

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(searchTerm)
			if (searchTerm !== debouncedSearch) {
				setCurrentPage(1)
			}
		}, 500)

		return () => clearTimeout(timer)
	}, [searchTerm])

	const filters = debouncedSearch ? { name: { $containsi: debouncedSearch } } : undefined

	const { data, isFetching, isPending } = useQuery({
		...services.portfolio.getAllPortfoliosOptions({
			page: currentPage,
			pageSize: 9,
			search: filters,
			locale: locale,
		}),
	})

	const clearSearch = () => {
		setSearchTerm('')
		setDebouncedSearch('')
		setCurrentPage(1)
	}

	// Ждем загрузки словаря, если он еще не подтянулся в стор
	if (!dict || (isPending && !data))
		return (
			<div className='w-full h-screen flex items-center justify-center'>
				<Spinner />
			</div>
		)

	const { portfoliosPage: p } = dict

	return (
		<section className='container mx-auto px-4 py-20 space-y-12 relative overflow-hidden min-h-screen'>
			<div className='absolute top-0 right-0 w-150 h-150 bg-primary/10 blur-[180px] -z-10' />

			<div
				className={cn(
					'fixed top-0 left-0 w-full h-1 bg-primary/30 z-50 transition-opacity duration-300',
					isFetching ? 'opacity-100' : 'opacity-0',
				)}
			>
				<div className='h-full bg-primary animate-pulse w-1/3' />
			</div>

			<div className='flex flex-col items-center text-center space-y-8'>
				<div className='space-y-4'>
					<div className='inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mx-auto'>
						<FileText className='w-3 h-3 text-primary' />
						<span className='text-[10px] font-black uppercase tracking-[0.4em] text-primary'>{p.badge}</span>
					</div>
					<h1 className='text-5xl lg:text-7xl font-black uppercase italic tracking-tighter'>
						{p.title.main} <span className='text-primary'>{p.title.accent}</span>
					</h1>
					<p className='text-muted-foreground max-w-xl mx-auto text-lg'>{p.description}</p>
				</div>

				<div className='relative max-w-md w-full mx-auto group'>
					<div className='absolute -inset-0.5 bg-primary/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500' />
					<div className='relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-4 h-14 transition-colors group-focus-within:border-primary/50 group-focus-within:bg-white/10'>
						<Search className='w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors' />
						<input
							className='w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/50 px-3 font-medium'
							placeholder={p.search.placeholder}
							type='text'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						{searchTerm && (
							<button className='p-1 hover:bg-white/10 rounded-full transition-colors' onClick={clearSearch}>
								<X className='w-4 h-4 text-muted-foreground hover:text-foreground' />
							</button>
						)}
					</div>
				</div>
			</div>

			<div className='w-full max-w-7xl mx-auto relative min-h-100'>
				{data?.data && data.data.length > 0 ? (
					<>
						<div
							className={cn(
								'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16 transition-all duration-300',
								isFetching ? 'opacity-50 grayscale-30 pointer-events-none' : 'opacity-100',
							)}
						>
							{data.data.map((item) => {
								const styles = getStyleByAward(item.event.type)
								const AwardIcon = AWARD_ICONS[item.event.type] || Trophy

								return (
									<Link
										key={item.documentId}
										className='group relative flex flex-col rounded-[2.5rem] border border-white/10 bg-card/30 backdrop-blur-xl transition-all duration-500 hover:border-primary/40 hover:-translate-y-2 overflow-hidden shadow-2xl'
										href={`/${locale}/portfolio/${item.documentId}`} // Добавил locale в ссылку
									>
										<div className='absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-12 bg-linear-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine pointer-events-none' />

										<div className='relative aspect-3/4 overflow-hidden bg-muted'>
											<img
												alt={item.name}
												className='absolute inset-0 w-full h-full object-cover grayscale-20 group-hover:grayscale-0 transition-all duration-700'
												src={getMedia(item.poster.formats.medium.url)}
											/>
											<div
												className={cn(
													'absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-80',
													styles.color,
												)}
											/>

											<div className='absolute top-6 left-6 flex flex-col gap-2'>
												<div className='px-3 py-1 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-widest'>
													{item.event.season?.name}
												</div>
												<div className='px-3 py-1 rounded-lg bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-lg'>
													{item.event.type}
												</div>
											</div>

											<div className='absolute bottom-6 left-6 right-6 flex items-center gap-4'>
												<div className='p-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl'>
													<AwardIcon className={cn('w-6 h-6', styles.accent)} />
												</div>
												<div className='flex flex-col'>
													<span className='text-[10px] font-bold uppercase tracking-widest text-white/60'>
														Award Winner
													</span>
													<span
														className={cn(
															'text-xl font-black uppercase italic tracking-tight',
															styles.accent,
														)}
													>
														{item.event.type}
													</span>
												</div>
											</div>
										</div>

										<div className='p-8 space-y-6 flex-1 flex flex-col'>
											<h2 className='text-2xl font-black uppercase italic tracking-tight group-hover:text-primary transition-colors line-clamp-2'>
												{item.name}
											</h2>
											<p className='text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3'>
												{item.description}
											</p>
											<div className='flex gap-3 pt-4 mt-auto'>
												<Button className='flex-1 h-12 rounded-xl font-bold gap-2 shadow-[0_10px_20px_-10px_var(--primary)] pointer-events-none'>
													<Eye className='w-4 h-4' /> {p.actions.view}
												</Button>
												<Button
													className='w-12 h-12 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 p-0 pointer-events-auto z-20'
													variant='outline'
													onClick={(e) => {
														e.preventDefault()
														// Логика скачивания
													}}
												>
													<Download className='w-4 h-4 text-primary' />
												</Button>
											</div>
										</div>
									</Link>
								)
							})}
						</div>

						<LiquidPagination
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
							totalPages={data.meta.pagination?.pageCount || 1}
						/>
					</>
				) : (
					!isFetching && (
						<div className='flex flex-col items-center justify-center py-20 opacity-50'>
							<Search className='w-16 h-16 mb-4 text-muted-foreground' />
							<p className='text-xl font-bold uppercase tracking-widest'>{p.search.noResults}</p>
							<button
								className='mt-4 text-primary text-sm font-black uppercase underline hover:text-primary/80'
								onClick={clearSearch}
							>
								{p.search.clear}
							</button>
						</div>
					)
				)}
			</div>
		</section>
	)
}

export default PortfoliosPage
