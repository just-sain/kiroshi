import type { FC } from 'react'

import Image from 'next/image'

import { getMedia } from '@lib'
import type { IMediaResponse } from '@types'

interface IProps {
	images: IMediaResponse[]
	dict: {
		title_1: string
		title_2: string
		description: string
		goal: string
		button_join: string
		button_learn_more: string
		course_label: string
		course_desc: string
	}
}

export const HeroSection: FC<IProps> = ({ images, dict }) => {
	return (
		<section className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-hidden'>
			{/* Левая часть: Бесконечно крутящаяся сетка */}
			<div className='relative h-150 overflow-hidden group'>
				<div className='absolute inset-x-0 top-0 h-20 bg-linear-to-b from-background to-transparent z-10' />
				<div className='absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-background to-transparent z-10' />

				<div className='border border-accent-foreground/10 rounded-[2.5rem] p-4 bg-card/30 backdrop-blur-sm h-full overflow-hidden'>
					<div className='grid grid-cols-2 gap-4 h-full'>
						{/* Первая колонка */}
						<div className='flex flex-col gap-4 animate-infinite-scroll-slow'>
							{images.map((src, i) => (
								<div
									key={`col1-${i}`}
									className='relative aspect-3/4 w-full shrink-0 rounded-2xl overflow-hidden border border-accent-foreground/5'
								>
									<Image
										fill
										alt='Robotics work'
										className='object-cover hover:scale-110 transition-transform duration-700'
										sizes='(max-width: 768px) 50vw, 25vw'
										src={getMedia(src.formats.small.url)}
									/>
								</div>
							))}
						</div>

						{/* Вторая колонка */}
						<div className='flex flex-col gap-4 animate-infinite-scroll-fast mt-12'>
							{[...images].reverse().map((src, i) => (
								<div
									key={`col2-${i}`}
									className='relative aspect-3/4 w-full shrink-0 rounded-2xl overflow-hidden border border-accent-foreground/5'
								>
									<Image
										fill
										alt='Robotics work'
										className='object-cover hover:scale-110 transition-transform duration-700'
										sizes='(max-width: 768px) 50vw, 25vw'
										src={getMedia(src.formats.medium.url)}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Правая часть: Текст из словаря */}
			<div className='space-y-8 lg:pl-10'>
				<div className='space-y-4'>
					<h1 className='text-4xl lg:text-6xl font-extrabold tracking-tight uppercase italic'>
						{dict.title_1} <br /> <span className='text-primary'>{dict.title_2}</span>
					</h1>
					<p className='text-muted-foreground leading-relaxed max-w-xl text-sm lg:text-base'>
						{dict.description}
						<br />
						<br />
						<span className='font-semibold text-foreground italic'>{dict.goal.split('—')[0]}</span>
						{'—' + dict.goal.split('—')[1]}
					</p>
				</div>
			</div>
		</section>
	)
}
