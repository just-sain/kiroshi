'use client'

import React, { useMemo } from 'react'

import Image from 'next/image'
// Добавили useMemo

import Link from 'next/link'

import { normalizeDate } from '@helpers'
import { getMedia } from '@lib'
import { services } from '@services'
import { Spinner } from '@shadcn'
import { useDictionaryStore } from '@store'
import { useQuery } from '@tanstack/react-query'
import { Calendar, Camera, ChevronRight } from 'lucide-react'

export default function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = React.use(params)
	const dict = useDictionaryStore((state) => state.dict)

	const { data: gallery, isLoading } = useQuery({
		...services.page.getGalleriesOptions(locale),
	})

	const groupedGallery = useMemo(() => {
		if (!gallery?.data) return {}

		const groups: Record<string, Record<string, typeof gallery.data>> = {}

		gallery.data.forEach((item) => {
			const date = new Date(item.event.date)

			if (isNaN(date.getTime())) return

			const year = date.getFullYear().toString()
			// Достаем название сезона. Если его нет, используем заглушку или пустую строку.
			const seasonName = item.event.season?.name || ''

			if (!groups[year]) groups[year] = {}
			if (!groups[year][seasonName]) groups[year][seasonName] = []

			groups[year][seasonName].push(item)
		})

		return groups
	}, [gallery?.data])

	const sortedYears = useMemo(() => {
		return Object.keys(groupedGallery).sort((a, b) => Number(b) - Number(a))
	}, [groupedGallery])

	if (!dict || isLoading || !gallery) {
		return (
			<div className='flex h-screen items-center justify-center'>
				<Spinner />
			</div>
		)
	}

	const glassStyle = 'backdrop-blur-xl border border-accent-foreground/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]'

	return (
		<section className='min-h-screen container mx-auto p-6 space-y-12'>
			<div className='relative space-y-4'>
				<h1 className='text-5xl lg:text-7xl font-black uppercase italic tracking-tighter leading-none'>
					{locale == 'ru' ? 'Галерея' : 'Events'}{' '}
					<span className='text-primary'>{locale == 'ru' ? 'событий' : 'gallery'}</span>
				</h1>
				<p className='text-white/60 text-lg ml-1'>
					{locale == 'ru'
						? 'История наших побед и будней в фотографиях'
						: 'The history of our victories and everyday life in photographs'}
				</p>
			</div>

			<div className='space-y-20'>
				{sortedYears.map((year) => (
					<div key={year} className='space-y-12'>
						{/* Перебор СЕЗОНОВ внутри года */}
						{Object.entries(groupedGallery[year]).map(([seasonName, events]) => (
							<div key={seasonName} className='space-y-8'>
								{/* Объединенный заголовок: Год + Название сезона */}
								<div className='flex items-baseline gap-3'>
									<h2 className='text-4xl lg:text-5xl font-black tracking-tighter text-primary'>
										{year},{' '}
										{seasonName && <span className='text-accent-foreground uppercase'>{seasonName}</span>}
									</h2>
									{/* Декоративная линия */}
									<div className='h-px flex-1 bg-linear-to-r from-accent-foreground/30 to-transparent opacity-50' />
								</div>

								{/* Сетка карточек */}
								<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
									{events.map((eventGroup) => (
										<Link
											key={eventGroup.event.documentId}
											className={`group relative flex flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 ${glassStyle}`}
											href={`/about/gallery/${eventGroup.documentId}`}
										>
											<div className='aspect-video overflow-hidden relative'>
												{eventGroup.medias?.[0]?.url ? (
													<Image
														fill
														alt={eventGroup.event.name}
														className='object-cover transition-transform duration-700 group-hover:scale-110'
														src={getMedia(eventGroup.medias[0].url)}
													/>
												) : (
													<div className='w-full h-full bg-white/5 flex items-center justify-center'>
														<Camera className='text-accent-foreground/30' size={48} />
													</div>
												)}
												<div className='absolute top-4 right-4 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs flex items-center gap-1.5'>
													<Camera size={14} />
													{eventGroup.medias.length}
												</div>
											</div>

											<div className='p-6 space-y-4 flex-1 flex flex-col'>
												<div className='space-y-1 flex-1'>
													<h3 className='text-xl font-bold group-hover:text-primary transition-colors line-clamp-2'>
														{eventGroup.event.name}
													</h3>
													<div className='flex items-center gap-2 text-white/50 text-sm'>
														<Calendar size={14} />
														{normalizeDate(eventGroup.event.date, locale)}
													</div>
												</div>
												<div className='flex items-center justify-between pt-4 border-t border-white/5 text-sm font-medium'>
													<span>{locale == 'ru' ? 'Смотреть альбом' : 'Open gallery'}</span>
													<ChevronRight
														className='transition-transform group-hover:translate-x-1'
														size={18}
													/>
												</div>
											</div>
										</Link>
									))}
								</div>
							</div>
						))}
					</div>
				))}
			</div>
		</section>
	)
}
