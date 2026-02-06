'use client'

import React, { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { formatFileSize, normalizeDate } from '@helpers'
import { downloadPhoto, getMedia } from '@lib'
import { services } from '@services'
import { Spinner } from '@shadcn'
import { useDictionaryStore } from '@store'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Calendar, Camera, Download } from 'lucide-react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

// Используем params для получения id из URL
export default function GalleryIdPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
	const { locale, id } = React.use(params)
	const dict = useDictionaryStore((state) => state.dict)
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

	// Запрос конкретной галереи по documentId
	const { data: gallery, isLoading } = useQuery({
		...services.page.getGalleryByDocumentIdOptions(id, locale),
		enabled: !!locale && !!id,
	})

	if (!dict || isLoading || !gallery) {
		return (
			<div className='flex h-screen items-center justify-center'>
				<Spinner />
			</div>
		)
	}

	const glassStyle = 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]'

	return (
		<section className='min-h-screen space-y-8 container mx-auto p-6 transition-all'>
			<Link
				className='inline-flex items-center gap-2 text-accent-foreground/60 hover:text-accent-foreground transition-colors mb-4'
				href='/about/gallery'
			>
				<ArrowLeft size={20} />
				<span>{locale === 'ru' ? 'Назад к галереям' : 'Back to gallery'}</span>
			</Link>

			<div className='relative space-y-4'>
				<h1 className='text-5xl lg:text-7xl font-black uppercase italic tracking-tighter leading-none'>
					{gallery.data.event.name}
				</h1>

				<div className='flex flex-wrap gap-2 text-sm font-medium text-accent-foreground/80'>
					<span className='flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10'>
						<Camera className='text-primary' size={18} />
						{gallery.data.medias.length}
					</span>
					<span className='flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10'>
						<Calendar className='text-primary' size={18} />
						{normalizeDate(gallery.data.event.date, locale)}
					</span>
					<span className='flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10'>
						<Calendar className='text-primary' size={18} />
						{gallery.data.event.season.name}
					</span>
				</div>
			</div>

			{/* Сетка фотографий */}
			<div className='columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4'>
				{gallery.data.medias.map((photo, index) => (
					<div
						key={photo.url}
						className={`break-inside-avoid mb-4 group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:ring-2 hover:ring-accent-foreground/50 ${glassStyle}`}
					>
						<button
							className='w-full h-auto block' // Убрали aspect-square
							onClick={() => setLightboxIndex(index)}
						>
							<Image
								alt={photo.name || 'Gallery image'}
								className='w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110'
								height={600} // Увеличьте базовую высоту для качества
								src={getMedia(photo.url)}
								width={400}
							/>
						</button>

						<div className='absolute inset-0 bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 gap-2 pointer-events-none'>
							<div className='flex justify-between items-center pointer-events-auto'>
								<span className='text-[10px] font-medium text-accent-foreground/90 truncate max-w-25'>
									{photo.name || `${index + 1}.jpg`}
								</span>
								<button
									className='p-2 bg-white/10 rounded-lg backdrop-blur-md border border-white/20 text-accent-foreground transition-colors hover:cursor-pointer'
									onClick={(e) => {
										e.stopPropagation()
										downloadPhoto(getMedia(photo.url), photo.name || 'image.jpg')
									}}
								>
									<Download size={14} />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Лайтбокс для просмотра во весь экран */}
			<Lightbox
				close={() => setLightboxIndex(null)}
				index={lightboxIndex ?? 0}
				open={lightboxIndex !== null}
				slides={gallery.data.medias.map((p) => ({
					src: getMedia(p.url),
					title: p.name,
					description: formatFileSize(p.size),
				}))}
			/>
		</section>
	)
}
