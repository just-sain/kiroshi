'use client'

import * as React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { normalizeDate } from '@helpers'
import { cn, getMedia } from '@lib'
import { services } from '@services'
import { Button, Spinner } from '@shadcn'
import { useDictionaryStore } from '@store'
import { useQuery } from '@tanstack/react-query'
import { ArrowUpRight, Calendar, Tag } from 'lucide-react'

interface IDict {
	latest_news: {
		badge: string
		title: string
		view_all: string
		read_more: string
	}
}

export default function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = React.use(params)
	const dict = useDictionaryStore((state) => state.dict) as IDict

	const [page, setPage] = React.useState(1)

	const { data: newsData, isLoading: newsLoading } = useQuery({
		...services.news.getAllNewsesOptions({ locale, page, pageSize: 10 }),
		enabled: !!dict,
	})

	if (newsLoading || !dict)
		return (
			<div className='h-screen flex items-center justify-center'>
				<Spinner />
			</div>
		)

	const newses = newsData?.data || []
	const pagination = newsData?.meta?.pagination

	return (
		<div className='min-h-screen text-foreground pb-24 px-12'>
			{/* --- Header --- */}
			<section className='container mx-auto px-4 py-16 border-b border-accent-foreground/10'>
				<span className='text-primary font-bold tracking-[0.3em] text-xs uppercase'>{dict.latest_news.badge}</span>
				<h1 className='text-5xl md:text-7xl font-black uppercase tracking-tighter mt-4'>
					{dict.latest_news.title}
				</h1>
			</section>

			{/* --- News Grid --- */}
			<section className='container mx-auto px-4 py-12'>
				<div className='grid grid-cols-1 gap-12'>
					{newses.length > 0 ? (
						newses.map((news) => (
							<Link
								key={news.id}
								className='group relative flex flex-col bg-card/20 border border-accent-foreground/10 rounded-[3rem] overflow-hidden hover:bg-card/30 hover:border-primary/40 transition-all duration-500'
								href={news.link}
								rel='noopener noreferrer'
								target='_blank'
							>
								{/* Image Container - Без нижних закруглений */}
								<div className='relative w-full overflow-hidden bg-muted/20'>
									<Image
										alt={news.name}
										className='w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000'
										height={675}
										priority={news.id === 0}
										src={getMedia(news.poster.url)}
										width={1200}
									/>

									{/* Категория (Tag) поверх изображения */}
									<div className='absolute top-6 left-6'>
										<div className='flex items-center gap-2 bg-black/60 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/10'>
											<Tag className='w-3.5 h-3.5 text-primary' />
											<span className='text-[11px] font-black uppercase tracking-[0.2em] text-white'>
												{news.tag}
											</span>
										</div>
									</div>
								</div>

								{/* Content Container - С хорошими отступами снизу и по бокам */}
								<div className='px-6 md:px-12 pt-10 pb-16 space-y-8'>
									<div className='flex items-center gap-3 text-muted-foreground'>
										<Calendar className='w-4 h-4 text-primary/60' />
										<span className='text-sm font-mono tracking-wider uppercase opacity-70'>
											{normalizeDate(news.date, locale)}
										</span>
									</div>

									<div className='space-y-6'>
										<h2 className='text-4xl md:text-7xl font-black leading-none tracking-tighter uppercase italic group-hover:text-primary transition-colors duration-300'>
											{news.name}
										</h2>
										<p className='text-muted-foreground text-lg md:text-2xl leading-relaxed max-w-5xl font-medium line-clamp-3'>
											{news.description}
										</p>
									</div>

									<div className='pt-4'>
										<div className='inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] py-4 px-10 rounded-full bg-primary text-black group-hover:bg-white transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(var(--primary),0.5)]'>
											{dict.latest_news.read_more}
											<ArrowUpRight className='w-5 h-5' />
										</div>
									</div>
								</div>
							</Link>
						))
					) : (
						<div className='text-center py-24 text-muted-foreground'>Пока новостей нет.</div>
					)}
				</div>

				{/* --- Pagination --- */}
				{pagination && pagination.pageCount > 1 && (
					<div className='flex justify-center items-center gap-4 mt-20'>
						<Button
							className='rounded-full'
							disabled={page === 1}
							variant='outline'
							onClick={() => {
								setPage((prev) => prev - 1)
								window.scrollTo({ top: 0, behavior: 'smooth' })
							}}
						>
							Назад
						</Button>

						<div className='flex items-center gap-2'>
							{Array.from({ length: pagination.pageCount }).map((_, i) => (
								<button
									key={i}
									className={cn(
										'w-10 h-10 rounded-full font-bold transition-all',
										page === i + 1
											? 'bg-primary text-primary-foreground shadow-lg'
											: 'hover:bg-accent-foreground/10',
									)}
									onClick={() => {
										setPage(i + 1)
										window.scrollTo({ top: 0, behavior: 'smooth' })
									}}
								>
									{i + 1}
								</button>
							))}
						</div>

						<Button
							className='rounded-full'
							disabled={page === pagination.pageCount}
							variant='outline'
							onClick={() => {
								setPage((prev) => prev + 1)
								window.scrollTo({ top: 0, behavior: 'smooth' })
							}}
						>
							Вперед
						</Button>
					</div>
				)}
			</section>
		</div>
	)
}
