'use client'

import React, { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { cn, getMedia } from '@lib'
import { services } from '@services'
import { Button, Spinner } from '@shadcn'
import { useDictionaryStore } from '@store'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Download, Eye, FileCode, Heart, type LucideIcon, Share2, User } from 'lucide-react'

interface IDict {
	modelDetailPage: {
		back: string
		notFound: string
		stats: {
			views: string
			downloads: string
			likes: string
		}
		author: {
			unknown: string
		}
		actions: {
			download: string
			like: string
			liked: string
			share: string
		}
		info: {
			publishedAt: string
		}
	}
}

const ModelDetailPage = ({ params }: { params: Promise<{ locale: string }> }) => {
	const { locale } = React.use(params)
	const dict = useDictionaryStore((state) => state.dict) as IDict

	const { id } = useParams()
	const [isLiked, setIsLiked] = useState(false)

	const { data: model, isLoading } = useQuery({
		...services.model.getModelByDocumentIdOption(id as string, locale),
	})

	if (isLoading || !dict || !model)
		return (
			<div className='w-full h-screen flex items-center justify-center'>
				<Spinner />
			</div>
		)

	if (!model)
		return (
			<div className='text-center py-20 font-bold uppercase tracking-widest'>{dict.modelDetailPage.notFound}</div>
		)

	const handleLike = () => setIsLiked(!isLiked)

	return (
		<section className='container mx-auto px-4 py-12 space-y-8 relative'>
			<div className='absolute top-20 left-1/2 -translate-x-1/2 w-150 h-150 bg-primary/10 blur-[120px] -z-10' />

			{/* Навигация назад */}
			<Link
				className='inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group'
				href='/3d'
			>
				<ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
				{dict.modelDetailPage.back}
			</Link>

			<div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
				{/* ЛЕВАЯ ЧАСТЬ */}
				<div className='lg:col-span-8 space-y-6'>
					<div className='relative aspect-video rounded-[2.5rem] border border-accent-foreground/10 bg-card/30 backdrop-blur-xl overflow-hidden group shadow-2xl'>
						<Image
							fill
							priority
							alt={model.name}
							className='object-contain p-12 transition-transform duration-700 group-hover:scale-105'
							src={getMedia(model.poster.url)}
						/>
						<div className='absolute bottom-8 left-8 flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 border border-accent-foreground/10 backdrop-blur-md'>
							<FileCode className='w-4 h-4 text-primary' />
							<span className='text-xs font-mono font-bold uppercase tracking-widest'>.STEP</span>
						</div>
					</div>

					<div className='flex flex-wrap items-center gap-6 p-6 rounded-[2rem] bg-accent-foreground/5 border border-accent-foreground/5'>
						<StatItem icon={Eye} label={dict.modelDetailPage.stats.views} value={0} />
						<StatItem
							icon={Download}
							label={dict.modelDetailPage.stats.downloads}
							value={model.downloadCount || 0}
						/>
						<StatItem
							icon={Heart}
							label={dict.modelDetailPage.stats.likes}
							value={isLiked ? (model.likeCount || 0) + 1 : model.likeCount || 0}
						/>
					</div>
				</div>

				{/* ПРАВАЯ ЧАСТЬ */}
				<div className='lg:col-span-4 space-y-6'>
					<div className='p-8 rounded-[2.5rem] border border-accent-foreground/10 bg-card/30 backdrop-blur-xl space-y-8'>
						<div className='space-y-2'>
							<h1 className='text-3xl font-black uppercase italic tracking-tighter leading-none'>
								{model.name}
							</h1>
							<div className='flex items-center gap-2 text-primary'>
								<User className='w-3 h-3' />
								<span className='text-[10px] font-black uppercase tracking-[0.2em]'>
									{model.author?.name || dict.modelDetailPage.author.unknown}
								</span>
							</div>
						</div>

						<p className='text-sm text-muted-foreground leading-relaxed'>{model.description}</p>

						<div className='space-y-3 pt-4'>
							<Button
								asChild
								className='w-full h-14 rounded-2xl font-bold gap-3 shadow-[0_0_30px_-5px_var(--primary)] hover:shadow-[0_0_50px_-5px_var(--primary)] transition-all'
							>
								{/* Рекомендую добавить реальную ссылку, когда Strapi поле будет готово:
                           href={getMedia(model.file.url)}
                        */}
								<button className='uppercase'>
									<Download className='w-5 h-5' /> {dict.modelDetailPage.actions.download}
								</button>
							</Button>

							<div className='flex gap-3'>
								<Button
									className={cn(
										'flex-1 h-12 rounded-xl border-accent-foreground/10 bg-accent-foreground/5 gap-2 transition-all uppercase',
										isLiked ? 'text-primary border-primary/50 bg-primary/5' : 'hover:bg-accent-foreground/10',
									)}
									variant='outline'
									onClick={handleLike}
								>
									<Heart className={cn('w-4 h-4', isLiked && 'fill-primary')} />
									{isLiked ? dict.modelDetailPage.actions.liked : dict.modelDetailPage.actions.like}
								</Button>
								<Button
									className='h-12 w-12 rounded-xl border-accent-foreground/10 bg-accent-foreground/5 hover:bg-accent-foreground/10'
									title={dict.modelDetailPage.actions.share}
									variant='outline'
								>
									<Share2 className='w-4 h-4' />
								</Button>
							</div>
						</div>

						<div className='pt-6 border-t border-accent-foreground/5 space-y-4'>
							<InfoRow
								label={dict.modelDetailPage.info.publishedAt}
								value={new Date(model.publishedAt).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US')}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

// --- Вспомогательные компоненты ---

interface IStatItem {
	icon: LucideIcon
	value: number
	label: string
}

const StatItem = ({ icon: Icon, value, label }: IStatItem) => (
	<div className='flex items-center gap-2'>
		<Icon className='w-4 h-4 text-muted-foreground' />
		<span className='text-sm font-bold'>
			{value} <span className='text-muted-foreground font-medium lowercase'>{label}</span>
		</span>
	</div>
)

interface IInfoRow {
	label: string
	value: string
	isPrimary?: boolean
}

const InfoRow = ({ label, value, isPrimary }: IInfoRow) => (
	<div className='flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground'>
		<span>{label}</span>
		<span className={isPrimary ? 'text-primary' : 'text-foreground'}>{value}</span>
	</div>
)

export default ModelDetailPage
