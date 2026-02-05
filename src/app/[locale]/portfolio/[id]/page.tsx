'use client'

import { use } from 'react'

import { useRouter } from 'next/navigation'

import { cn, getMedia } from '@lib'
import { services } from '@services'
import { Button, Spinner } from '@shadcn'
import { useQuery } from '@tanstack/react-query'
import { Calendar, ChevronLeft, Download, ExternalLink, FileText, Trophy } from 'lucide-react'

interface PageProps {
	params: Promise<{ id: string }>
}

const PortfolioDetailPage = ({ params }: PageProps) => {
	const { id } = use(params)
	const router = useRouter()

	const {
		data: item,
		isLoading,
		error,
	} = useQuery({
		...services.portfolio.getPortfolioByDocumentIdOption(id),
	})

	if (isLoading)
		return (
			<div className='w-full h-screen flex items-center justify-center'>
				<Spinner />
			</div>
		)

	if (error || !item)
		return (
			<div className='w-full h-screen flex flex-col items-center justify-center space-y-4'>
				<h1 className='text-2xl font-bold'>Портфолио не найдено</h1>
				<Button onClick={() => router.back()}>Вернуться назад</Button>
			</div>
		)

	// const fileUrl = item.file?.url ? getMedia(item.file.url) : null
	const fileUrl = ''
	const posterUrl = item.poster?.url ? getMedia(item.poster.url) : ''

	return (
		<main className='min-h-screen pb-20'>
			{/* Хедер с кнопкой назад */}
			<div className='container mx-auto px-4 py-8'>
				<button
					className='group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors uppercase text-xs font-black tracking-widest'
					onClick={() => router.back()}
				>
					<ChevronLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
					Назад к списку
				</button>
			</div>

			<section className='container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12'>
				{/* ЛЕВАЯ КОЛОНКА: Превью обложки */}
				<div className='lg:col-span-5 space-y-6'>
					<div className='relative aspect-3/4 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl'>
						<img alt={item.name} className='w-full h-full object-cover' src={posterUrl} />
						<div className='absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent' />

						{/* Бейдж сезона на самой картинке */}
						<div className='absolute bottom-8 left-8'>
							<div className='px-4 py-2 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-widest shadow-xl'>
								{item.event.season?.name}
							</div>
						</div>
					</div>

					{/* Кнопки действий под фото */}
					<div className='flex gap-4'>
						{fileUrl && (
							<Button
								className='flex-1 h-14 rounded-2xl font-bold gap-2 shadow-lg shadow-primary/20'
								onClick={() => window.open(fileUrl, '_blank')}
							>
								<ExternalLink className='w-5 h-5' /> ЧИТАТЬ PDF
							</Button>
						)}
					</div>
				</div>

				{/* ПРАВАЯ КОЛОНКА: Инфо */}
				<div className='lg:col-span-7 space-y-10'>
					<div className='space-y-4'>
						<div className='flex items-center gap-3 text-primary'>
							<Trophy className='w-5 h-5' />
							<span className='text-sm font-black uppercase tracking-[0.3em]'>
								{item.event.type} Award Winner
							</span>
						</div>

						<h1 className='text-5xl lg:text-7xl font-black uppercase italic tracking-tighter leading-none'>
							{item.name}
						</h1>
					</div>

					{/* Карточки с мета-данными */}
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<div className='p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2'>
							<Calendar className='w-5 h-5 text-muted-foreground' />
							<p className='text-xs text-muted-foreground uppercase font-bold tracking-wider'>Сезон</p>
							<p className='text-lg font-black uppercase italic'>{item.event.season?.name || 'Н/Д'}</p>
						</div>
						<div className='p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2'>
							<FileText className='w-5 h-5 text-muted-foreground' />
							<p className='text-xs text-muted-foreground uppercase font-bold tracking-wider'>Тип документа</p>
							<p className='text-lg font-black uppercase italic'>Engineering Portfolio</p>
						</div>
					</div>

					<div className='space-y-6'>
						<h3 className='text-xl font-black uppercase italic flex items-center gap-2'>
							<div className='w-8 h-0.5 bg-primary' />
							Описание проекта
						</h3>
						<p className='text-xl text-muted-foreground leading-relaxed font-medium'>{item.description}</p>
					</div>

					<div className='pt-4'>
						<Button
							className={cn(
								'group relative h-16 w-full sm:w-auto px-8 rounded-2xl overflow-hidden',
								'bg-white/5 border-white/10 backdrop-blur-md',
								'hover:bg-primary/10 hover:border-primary/50 transition-all duration-500',
								'flex items-center justify-between gap-6',
							)}
							variant='outline'
							onClick={() => fileUrl && window.open(fileUrl, '_blank')}
						>
							{/* Эффект сканирующей линии при ховере */}
							<div className='absolute inset-0 w-full h-px bg-primary/50 -translate-y-16 group-hover:animate-scan' />

							<div className='flex items-center gap-4 relative z-10'>
								<div className='p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300'>
									<Download className='w-5 h-5' />
								</div>
								<div className='flex flex-col items-start'>
									<span className='text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] leading-none mb-1'>
										Technical Doc
									</span>
									<span className='text-sm font-black uppercase italic tracking-wider'>Скачать PDF</span>
								</div>
							</div>

							<div className='text-[10px] font-mono text-primary/40 group-hover:text-primary transition-colors'>
								[ 12.4 MB ]
							</div>
						</Button>
					</div>
				</div>
			</section>
		</main>
	)
}

export default PortfolioDetailPage
