'use client'

import * as React from 'react'

import Link from 'next/link'

import { cn } from '@lib'
import { services } from '@services'
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	Spinner,
} from '@shadcn'
import { useDictionaryStore } from '@store'
import { useQuery } from '@tanstack/react-query'
import type { ISeriesResponse } from '@types'
import { InfoCard } from '@widgets'
import { ArrowUpRight, Bot, Image as ImageIcon, MessageCircleQuestion, Phone, PlayCircle, Rocket } from 'lucide-react'

import { HeroSection } from './sections/hero'

interface IDict {
	hero: {
		title_1: string
		title_2: string
		description: string
		goal: string
		button_join: string
		button_learn_more: string
		course_label: string
		course_desc: string
	}
	info_cards: {
		news: {
			title: string
			desc: string
		}
		gallery: {
			title: string
			desc: string
		}
		contacts: {
			title: string
			desc: string
		}
		faq: {
			title: string
			desc: string
		}
	}
	latest_news: {
		badge: string
		title: string
		view_all: string
		read_more: string
	}
	sections: {
		kap_series: string
	}
	common: {
		loading: string
	}
}

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = React.use(params)

	const dict = useDictionaryStore((state) => state.dict) as IDict

	const { data, isLoading } = useQuery({ ...services.page.getMainOptions(locale), enabled: true })

	// Ждем и данные от API, и загрузку словаря
	if (isLoading || !data || !dict) return <Spinner />

	return (
		<div className='min-h-screen text-foreground overflow-x-hidden'>
			<div className='relative container mx-auto px-4 py-12 space-y-24'>
				{/* Передаем словарь в HeroSection */}
				<HeroSection dict={dict.hero} images={data.scroller} />

				{/* --- 2. INFO CARDS SECTION --- */}
				<section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					<InfoCard desc={dict.info_cards.news.desc} icon={Rocket} title={dict.info_cards.news.title} />
					<InfoCard desc={dict.info_cards.gallery.desc} icon={ImageIcon} title={dict.info_cards.gallery.title} />
					<InfoCard desc={dict.info_cards.contacts.desc} icon={Phone} title={dict.info_cards.contacts.title} />
					<InfoCard
						desc={dict.info_cards.faq.desc}
						icon={MessageCircleQuestion}
						title={dict.info_cards.faq.title}
					/>
				</section>

				{/* --- NEW SECTION: LATEST NEWS --- */}
				<section className='space-y-12'>
					<div className='flex items-end justify-between border-b border-accent-foreground/10 pb-6'>
						<div className='space-y-2'>
							<span className='text-primary font-bold tracking-[0.2em] text-xs uppercase'>
								{dict.latest_news.badge}
							</span>
							<h2 className='text-4xl font-black uppercase tracking-tighter'>{dict.latest_news.title}</h2>
						</div>
						<Link
							className='hidden sm:flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors'
							href={`/${locale}/news`}
						>
							{dict.latest_news.view_all} <ArrowUpRight className='w-4 h-4' />
						</Link>
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
						<NewsCard
							category='Симулятор'
							date='03 Фев, 2026'
							description='Мы создали наш симулятор! Создание физика манипуляторов и добавлена поддержка новых элементов.'
							image='/projects/atc/atc.png'
							link={`/${locale}/projects/atc`}
							readMoreText={dict.latest_news.read_more}
							title='Новый симулятор ATC SIM для сезона DECODE!'
						/>

						<NewsCard
							isVideo
							category='Видео'
							date='1 месяц назад'
							description='Посмотрите наш новый эпизод Kap Series, где мы разбираем конструкцию нашего последнего робота и делимся секретами программирования автономного периода.'
							image='https://img.youtube.com/vi/W3ebfJs4SZA/default.jpg'
							link='https://www.youtube.com/watch?v=W3ebfJs4SZA'
							readMoreText={dict.latest_news.read_more}
							title=' FIRST: Начало | Короткометражный фильм by KAP #27674'
						/>
					</div>
				</section>

				{/* --- 3. KAP SERIES (CAROUSEL) --- */}
				<section className='space-y-12 py-20'>
					<div className='flex flex-col items-center gap-2'>
						<h2 className='text-4xl font-bold text-center uppercase tracking-widest italic'>
							Kap <span className='text-primary'>Series</span>
						</h2>
						<div className='h-1 w-24 bg-primary rounded-full' />
					</div>

					<CustomCarousel series={data.series} />
				</section>
			</div>

			{/* Floating Widget (KapAI) */}
			<div className='fixed bottom-12 right-6 lg:right-12 flex flex-col items-center gap-2 z-10'>
				<div className='relative group cursor-pointer'>
					<div className='absolute inset-0 bg-accent-foreground/20 rounded-full blur-lg group-hover:bg-accent-foreground/30 transition-all' />
					<div className='relative h-14 w-14 bg-black border border-accent-foreground/20 rounded-full flex items-center justify-center overflow-hidden'>
						<div className='absolute w-full h-1 bg-linear-to-r from-transparent via-red-500 to-transparent rotate-45 animate-pulse' />
						<Bot className='h-6 w-6 text-accent-foreground' />
					</div>
				</div>
				<span className='text-xs font-bold tracking-widest uppercase'>KapAI</span>
			</div>
		</div>
	)
}

// Обновленная карточка новости с поддержкой перевода кнопки
function NewsCard({ title, description, date, category, image, link, readMoreText, isVideo = false }) {
	return (
		<Link
			className='group relative flex flex-col sm:flex-row gap-6 p-6 rounded-[2rem] bg-card/30 border border-white/10 backdrop-blur-md hover:bg-card/50 hover:border-primary/30 transition-all duration-500'
			href={link}
		>
			<div className='relative h-48 sm:h-auto sm:w-52 shrink-0 rounded-2xl overflow-hidden border border-accent-foreground/5'>
				<img
					alt={title}
					className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
					src={image}
				/>
				{isVideo && (
					<div className='absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors'>
						<PlayCircle className='w-12 h-12 text-accent-foreground/80 group-hover:text-primary group-hover:scale-110 transition-all' />
					</div>
				)}
			</div>

			<div className='flex flex-col justify-between py-2 space-y-4'>
				<div className='space-y-2'>
					<div className='flex items-center gap-3'>
						<span className='text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-primary/10 px-2 py-0.5 rounded'>
							{category}
						</span>
						<span className='text-[10px] text-muted-foreground font-mono italic'>{date}</span>
					</div>
					<h3 className='text-xl font-bold leading-tight group-hover:text-primary transition-colors'>{title}</h3>
					<p className='text-xs text-muted-foreground leading-relaxed line-clamp-2'>{description}</p>
				</div>

				<div className='flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground group-hover:translate-x-1 transition-transform'>
					{readMoreText} <ArrowUpRight className='w-3 h-3 text-primary' />
				</div>
			</div>
		</Link>
	)
}

function CustomCarousel({ series }: { series: ISeriesResponse[] }) {
	const [api, setApi] = React.useState<CarouselApi>()

	const [current, setCurrent] = React.useState(0)

	const [count, setCount] = React.useState(0)

	React.useEffect(() => {
		if (!api) return

		setCount(api.scrollSnapList().length)

		setCurrent(api.selectedScrollSnap() + 1)

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap() + 1)
		})
	}, [api])

	return (
		<div className='w-full max-w-5xl mx-auto space-y-6'>
			<Carousel
				className='w-full'
				opts={{
					align: 'start',

					loop: true,
				}}
				setApi={setApi}
			>
				<CarouselContent>
					{series.map((videoId, index) => (
						<CarouselItem key={videoId.id}>
							<div className='p-1'>
								<div className='bg-[#0a0a0a] border border-accent-foreground/10 aspect-video rounded-3xl flex items-center justify-center relative overflow-hidden group shadow-2xl'>
									<iframe
										allowFullScreen
										allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
										className='absolute inset-0 w-full h-full border-0'
										src={videoId.url}
										title={`Kap Series Video ${index + 1}`}
									/>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>

				<CarouselPrevious className='hidden lg:flex -left-12 border-accent-foreground/10 bg-black/50 backdrop-blur-md hover:bg-primary hover:text-accent-foreground transition-all' />

				<CarouselNext className='hidden lg:flex -right-12 border-accent-foreground/10 bg-black/50 backdrop-blur-md hover:bg-primary hover:text-accent-foreground transition-all' />
			</Carousel>

			{/* Кастомная пагинация */}

			<div className='flex justify-center flex-wrap gap-2'>
				{Array.from({ length: count }).map((_, index) => (
					<button
						key={index}
						aria-label={`Go to slide ${index + 1}`}
						className={cn(
							'h-1.5 transition-all duration-300 rounded-full',

							current === index + 1
								? 'bg-primary w-8 shadow-[0_0_10px_rgba(var(--primary),0.5)]'
								: 'bg-accent-foreground/20 w-3 hover:bg-accent-foreground/40',
						)}
						onClick={() => api?.scrollTo(index)}
					/>
				))}
			</div>
		</div>
	)
}
