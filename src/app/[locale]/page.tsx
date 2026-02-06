'use client'

import * as React from 'react'

import Link from 'next/link'

import { normalizeDate } from '@helpers'
import { cn, getMedia } from '@lib'
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
import { InfoCard, NewsCard } from '@widgets'
import { ArrowUpRight, Image as ImageIcon, MessageCircleQuestion, Phone, Rocket } from 'lucide-react'

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
	const { data: newsData, isLoading: newsLoading } = useQuery({
		...services.news.getAllNewsesOptions({ locale, page: 1, pageSize: 4 }),
		enabled: true,
	})

	// Ждем и данные от API, и загрузку словаря
	if (isLoading || !data || !dict) return <Spinner />

	return (
		<div className='min-h-screen text-foreground'>
			<div className='relative container mx-auto px-4 py-12 space-y-24'>
				{/* hero */}
				<HeroSection dict={dict.hero} images={data.scroller} />

				{/* latest news */}
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

					{newsData?.data && !newsLoading ? (
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
							{newsData.data.map((news) => (
								<NewsCard
									key={news.documentId}
									category={news.tag}
									date={normalizeDate(news.date, locale)}
									description={news.description}
									image={getMedia(news.poster.url)}
									link={news.link}
									title={news.name}
								/>
							))}
						</div>
					) : (
						<div className='w-full h-[60vh] flex items-center justify-center'>
							<div className='flex flex-col items-center gap-4'>
								<Spinner />
							</div>
						</div>
					)}
				</section>

				<section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					<InfoCard
						desc={dict.info_cards.news.desc}
						href='/about/awards'
						icon={Rocket}
						locale={locale}
						title={dict.info_cards.news.title}
					/>
					<InfoCard
						desc={dict.info_cards.gallery.desc}
						href='/about/gallery'
						icon={ImageIcon}
						locale={locale}
						title={dict.info_cards.gallery.title}
					/>
					<InfoCard
						desc={
							<div className='text-sm'>
								<p>📞 +7 777 297 4441</p>
								<p>📸 @kap.ftc</p>
							</div>
						}
						icon={Phone}
						locale={locale}
						title={dict.info_cards.contacts.title}
					/>
					<InfoCard
						desc={dict.info_cards.faq.desc}
						icon={MessageCircleQuestion}
						locale={locale}
						title={dict.info_cards.faq.title}
					/>
				</section>

				{/* kap series */}
				<section className='space-y-12 py-20'>
					<div className='flex flex-col items-center gap-2'>
						<h2 className='text-4xl font-bold text-center uppercase tracking-widest italic'>
							Kap <span className='text-primary'>Series</span>
						</h2>
						<div className='h-1 w-24 bg-primary rounded-full' />
					</div>

					{data.series && <CustomCarousel series={data.series} />}
				</section>
			</div>
		</div>
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
