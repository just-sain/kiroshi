'use client'

import * as React from 'react'

import Image from 'next/image'

import { cn } from '@lib'
import { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@shadcn'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface GameGalleryProps {
	images: string[]
}

export function GameGallery({ images }: GameGalleryProps) {
	const [api, setApi] = React.useState<CarouselApi>()
	const [current, setCurrent] = React.useState(0)
	const [count, setCount] = React.useState(0)

	React.useEffect(() => {
		if (!api) return
		setCount(api.scrollSnapList().length)
		setCurrent(api.selectedScrollSnap() + 1)
		api.on('select', () => setCurrent(api.selectedScrollSnap() + 1))
	}, [api])

	if (!images || images.length === 0) return null

	return (
		<div className='w-full max-w-6xl mx-auto space-y-8'>
			<Carousel
				className='w-full'
				opts={{
					align: 'center',
					loop: true,
				}}
				setApi={setApi}
			>
				<CarouselContent>
					{images.map((src, index) => (
						<CarouselItem key={index} className='md:basis-1/2 lg:basis-2/3'>
							<div className='p-2'>
								<div className='bg-card border border-white/10 aspect-video rounded-[2rem] overflow-hidden relative group'>
									{/* Overlay — pointer-events-none важен для работы клика в Zoom */}
									<div className='absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none' />

									<Zoom zoomMargin={40}>
										<div className='relative w-full aspect-video cursor-zoom-in'>
											<Image
												fill
												alt={`ATC Game Screenshot ${index + 1}`}
												className='object-cover'
												priority={index === 0}
												sizes='(max-width: 768px) 100vw, 66vw'
												src={src}
											/>
										</div>
									</Zoom>

									<div className='absolute bottom-6 left-8 z-20 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 pointer-events-none'>
										<span className='text-white font-bold tracking-widest text-xs uppercase bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10'>
											View Frame {index + 1}
										</span>
									</div>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>

				<CarouselPrevious className='-left-6 lg:-left-12 border-white/10 bg-black/50 backdrop-blur-xl hover:bg-primary/20 hover:text-primary transition-colors' />
				<CarouselNext className='-right-6 lg:-right-12 border-white/10 bg-black/50 backdrop-blur-xl hover:bg-primary/20 hover:text-primary transition-colors' />
			</Carousel>

			{/* Индикаторы */}
			<div className='flex justify-center gap-3'>
				{Array.from({ length: count }).map((_, index) => (
					<button
						key={index}
						aria-label={`Go to slide ${index + 1}`}
						className={cn(
							'h-1.5 transition-all duration-500 rounded-full',
							current === index + 1
								? 'bg-primary w-8 shadow-[0_0_10px_rgba(var(--primary),0.5)]'
								: 'bg-white/10 w-4 hover:bg-white/30',
						)}
						onClick={() => api?.scrollTo(index)}
					/>
				))}
			</div>
		</div>
	)
}
