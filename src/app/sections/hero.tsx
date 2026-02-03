import Image from 'next/image'

import { Button } from '@shadcn'
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'

const HERO_IMAGES = [
	'/hero/1.jpg',
	'/hero/2.jpg',
	'/hero/3.jpg',
	'/hero/4.jpg',
	'/hero/5.jpg',
	'/hero/6.jpg',
	'/hero/7.jpg',
]

export const HeroSection = () => {
	return (
		<section className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-hidden'>
			{/* Левая часть: Бесконечно крутящаяся сетка */}
			<div className='relative h-[600px] overflow-hidden group'>
				{/* Градиентные маски для мягкого исчезновения краев */}
				<div className='absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background to-transparent z-10' />
				<div className='absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent z-10' />

				<div className='border border-white/10 rounded-[2.5rem] p-4 bg-card/30 backdrop-blur-sm h-full overflow-hidden'>
					<div className='grid grid-cols-2 gap-4 h-full'>
						{/* Первая колонка */}
						<div className='flex flex-col gap-4 animate-infinite-scroll-slow'>
							{[...HERO_IMAGES, ...HERO_IMAGES].map((src, i) => (
								<div
									key={`col1-${i}`}
									className='relative aspect-[3/4] w-full shrink-0 rounded-2xl overflow-hidden border border-white/5'
								>
									<Image
										fill
										alt='Robotics work'
										className='object-cover hover:scale-110 transition-transform duration-700'
										sizes='(max-width: 768px) 50vw, 25vw'
										src={src}
									/>
								</div>
							))}
						</div>

						{/* Вторая колонка (с другой скоростью) */}
						<div className='flex flex-col gap-4 animate-infinite-scroll-fast mt-12'>
							{[...HERO_IMAGES, ...HERO_IMAGES].reverse().map((src, i) => (
								<div
									key={`col2-${i}`}
									className='relative aspect-[3/4] w-full shrink-0 rounded-2xl overflow-hidden border border-white/5'
								>
									<Image
										fill
										alt='Robotics work'
										className='object-cover hover:scale-110 transition-transform duration-700'
										sizes='(max-width: 768px) 50vw, 25vw'
										src={src}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Правая часть: Текст (без изменений, только отступы) */}
			<div className='space-y-8 lg:pl-10'>
				<div className='space-y-4'>
					<h1 className='text-4xl lg:text-6xl font-extrabold tracking-tight uppercase italic'>
						Будущее <br /> <span className='text-primary'>технологий</span>
					</h1>
					<p className='text-muted-foreground leading-relaxed max-w-xl text-sm lg:text-base'>
						МЫ — КОМАНДА PID & KIROSHI, ОБЪЕДИНЕННАЯ ИНТЕРЕСОМ К РОБОТОТЕХНИКЕ. ПРОЕКТИРУЕМ, КОНСТРУИРУЕМ И
						ПРОГРАММИРУЕМ БУДУЩЕЕ.
						<br />
						<br />
						<span className='font-semibold text-foreground italic'>ЦЕЛЬ КОМАНДЫ</span> — СОЗДАВАТЬ НАДЕЖНЫЕ И
						ЭФФЕКТИВНЫЕ РЕШЕНИЯ В СФЕРЕ РОБОТОТЕХНИКИ.
					</p>
				</div>

				<div className='flex flex-wrap gap-4'>
					<Button
						className='rounded-full px-8 font-semibold shadow-[0_0_20px_-5px_var(--primary)] hover:shadow-[0_0_30px_-5px_var(--primary)] transition-all bg-primary hover:bg-primary/90'
						size='lg'
					>
						ПРИСОЕДИНИТЬСЯ
					</Button>
					<Button
						className='rounded-full px-8 bg-transparent border-white/20 hover:bg-white/5'
						size='lg'
						variant='outline'
					>
						УЗНАТЬ БОЛЬШЕ
					</Button>
				</div>

				{/* Блок с курсами */}
				<div className='flex items-center gap-4 mt-8 p-4 bg-white/5 border border-white/10 rounded-2xl max-w-md'>
					<div className='p-3 bg-primary/10 border border-primary/20 rounded-xl'>
						<BookOpen className='w-6 h-6 text-primary' />
					</div>
					<div className='flex-1 text-xs text-muted-foreground'>
						<span className='text-foreground font-bold block'>Специальность конструктор</span>
						Обучение работе с 3D печатью и CAD системами
					</div>
					<div className='flex gap-1'>
						<Button className='h-8 w-8 rounded-full' size='icon' variant='ghost'>
							<ChevronLeft className='w-4 h-4' />
						</Button>
						<Button className='h-8 w-8 rounded-full' size='icon' variant='ghost'>
							<ChevronRight className='w-4 h-4' />
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}
