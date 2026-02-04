'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@lib'
import { Button } from '@shadcn'
import { ArrowLeft, Box, Download, Eye, FileCode, Heart, Share2, User } from 'lucide-react'

const ModelDetailPage = () => {
	const [isLiked, setIsLiked] = useState(false)
	const [likes, setLikes] = useState(124)

	const handleLike = () => {
		setIsLiked(!isLiked)
		setLikes((prev) => (isLiked ? prev - 1 : prev + 1))
	}

	return (
		<section className='container mx-auto px-4 py-12 space-y-8 relative'>
			{/* Фоновое свечение */}
			<div className='absolute top-20 left-1/2 -translate-x-1/2 w-150 h-150 bg-primary/10 blur-[120px] -z-10' />

			{/* Навигация назад */}
			<Link
				className='inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group'
				href='/3d'
			>
				<ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
				Назад к библиотеке
			</Link>

			<div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
				{/* ЛЕВАЯ ЧАСТЬ: Изображение и Просмотр */}
				<div className='lg:col-span-8 space-y-6'>
					<div className='relative aspect-video rounded-[2.5rem] border border-accent-foreground/10 bg-card/30 backdrop-blur-xl overflow-hidden group shadow-2xl'>
						<Image
							fill
							priority
							alt='Motor Mount Step'
							className='object-contain p-12 transition-transform duration-700 group-hover:scale-105'
							src='/3d/id.png' // Твой путь к изображению
						/>
						{/* Бейдж формата */}
						<div className='absolute bottom-8 left-8 flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 border border-accent-foreground/10 backdrop-blur-md'>
							<FileCode className='w-4 h-4 text-primary' />
							<span className='text-xs font-mono font-bold uppercase tracking-widest'>.STEP</span>
						</div>
					</div>

					{/* Статистика (Мобильная + Десктопная под картинкой) */}
					<div className='flex flex-wrap items-center gap-6 p-6 rounded-[2rem] bg-accent-foreground/5 border border-accent-foreground/5'>
						<div className='flex items-center gap-2'>
							<Eye className='w-4 h-4 text-muted-foreground' />
							<span className='text-sm font-bold'>
								1,240 <span className='text-muted-foreground font-medium'>просмотров</span>
							</span>
						</div>
						<div className='flex items-center gap-2'>
							<Download className='w-4 h-4 text-muted-foreground' />
							<span className='text-sm font-bold'>
								452 <span className='text-muted-foreground font-medium'>загрузок</span>
							</span>
						</div>
						<div className='flex items-center gap-2'>
							<Heart className='w-4 h-4 text-muted-foreground' />
							<span className='text-sm font-bold'>
								{likes} <span className='text-muted-foreground font-medium'>лайков</span>
							</span>
						</div>
					</div>
				</div>

				{/* ПРАВАЯ ЧАСТЬ: Информация и Кнопки */}
				<div className='lg:col-span-4 space-y-6'>
					<div className='p-8 rounded-[2.5rem] border border-accent-foreground/10 bg-card/30 backdrop-blur-xl space-y-8'>
						<div className='space-y-2'>
							<h1 className='text-3xl font-black uppercase italic tracking-tighter leading-none'>
								Motor Mount <span className='text-primary'>STEP</span>
							</h1>
							<div className='flex items-center gap-2 text-primary'>
								<User className='w-3 h-3' />
								<span className='text-[10px] font-black uppercase tracking-[0.2em]'>Рамазан Машанло</span>
							</div>
						</div>

						<p className='text-sm text-muted-foreground leading-relaxed'>
							Эта функция обеспечивает высокий уровень гибкости в механической конструкции робота, поскольку
							позволяет устанавливать моторы практически в любой части его корпуса. Отсутствие жёстких
							ограничений упрощает адаптацию робота под различные задачи и форм-факторы.
						</p>

						<div className='space-y-3 pt-4'>
							<Button className='w-full h-14 rounded-2xl font-bold gap-3 shadow-[0_0_30px_-5px_var(--primary)] hover:shadow-[0_0_50px_-5px_var(--primary)] transition-all'>
								<Download className='w-5 h-5' /> СКАЧАТЬ МОДЕЛЬ
							</Button>

							<div className='flex gap-3'>
								<Button
									className={cn(
										'flex-1 h-12 rounded-xl border-accent-foreground/10 bg-accent-foreground/5 gap-2 transition-all',
										isLiked ? 'text-primary border-primary/50 bg-primary/5' : 'hover:bg-accent-foreground/10',
									)}
									variant='outline'
									onClick={handleLike}
								>
									<Heart className={cn('w-4 h-4', isLiked && 'fill-primary')} />
									{isLiked ? 'В ЛЮБИМЫХ' : 'ЛАЙК'}
								</Button>
								<Button
									className='h-12 w-12 rounded-xl border-accent-foreground/10 bg-accent-foreground/5 hover:bg-accent-foreground/10'
									variant='outline'
								>
									<Share2 className='w-4 h-4' />
								</Button>
							</div>
						</div>

						<div className='pt-6 border-t border-accent-foreground/5 space-y-4'>
							<div className='flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground'>
								<span>Дата публикации</span>
								<span className='text-foreground'>14 Фев 2026</span>
							</div>
							<div className='flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground'>
								<span>Сложность монтажа</span>
								<span className='text-primary'>Легкая</span>
							</div>
						</div>
					</div>

					{/* Дополнительный блок: Лицензия */}
					<div className='p-6 rounded-3xl bg-primary/5 border border-primary/10 backdrop-blur-sm'>
						<div className='flex items-center gap-3'>
							<div className='p-2 rounded-lg bg-primary/20 text-primary'>
								<Box className='w-4 h-4' />
							</div>
							<div className='text-[10px] font-bold uppercase tracking-widest'>
								Открытая лицензия <br />
								<span className='text-muted-foreground'>Для коммерческого и личного использования</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ModelDetailPage
