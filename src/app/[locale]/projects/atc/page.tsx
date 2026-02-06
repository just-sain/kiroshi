'use client'

import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { formatFileSize } from '@helpers'
import { getMedia } from '@lib'
import { services } from '@services'
import { Button, Spinner } from '@shadcn'
import { useDictionaryStore } from '@store'
import { useQuery } from '@tanstack/react-query'
import { AuthorBadge, FeatureCard } from '@widgets'
import { Download, Gamepad2, Info, Layers } from 'lucide-react'

import { Gallery } from './gallery'

// Расширяем словарь для страницы игры
interface IDict {
	projects: {
		more: string
		download: string
		documentation: string
		version: string
		platform: string
		weight: string
		screenshots: string
		physicTitle: string
		configTitle: string
		moreThanTitle: string
		features: {
			physicTitle: string
			physicDesc: string
			infoTitle: string
			infoDesc: string
			downloadTitle: string
			downloadDesc: string
		}
	}
}

export default function GamePage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = React.use(params)
	const dict = useDictionaryStore((state) => state.dict) as IDict

	const { data: atc, isLoading } = useQuery({
		// Предполагаем, что getProjectsOptions возвращает данные типа IAtcResponse
		...services.page.getAtcOptions(locale),
		enabled: true,
	})

	// Защита от отсутствия данных или загрузки
	if (isLoading || !atc) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<Spinner />
			</div>
		)
	}

	return (
		<div className='min-h-screen text-foreground'>
			<div className='relative container mx-auto px-4 py-12 space-y-28'>
				{/* --- 1. HERO SECTION --- */}
				<section className='relative mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
					{/* Изображение проекта из API */}
					<div className='lg:col-span-7 relative group border border-accent-foreground/10 rounded-[2rem] overflow-hidden bg-card/30 backdrop-blur-md shadow-2xl'>
						<div className='aspect-video bg-muted/20 relative flex items-center justify-center'>
							<Image fill priority alt={atc.name} className='object-cover' src={getMedia(atc.poster.url)} />
						</div>
					</div>

					{/* Описание и авторы */}
					<div className='lg:col-span-5 space-y-8'>
						<div className='space-y-4'>
							{atc.season && (
								<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase'>
									<Gamepad2 className='w-3 h-3' />
									Current Season: {atc.season.name}
								</div>
							)}

							<h1 className='text-6xl lg:text-8xl font-black tracking-tighter uppercase italic'>
								{atc.name.split(' ')[0]} <span className='text-primary'>{atc.name.split(' ')[1]}</span>
							</h1>

							<p className='text-muted-foreground leading-relaxed text-lg'>{atc.shortDescription}</p>

							{/* АВТОРЫ ИЗ API */}
							<div className='flex flex-wrap gap-3 pt-2'>
								{atc.authors?.map((author) => (
									<AuthorBadge key={author.id} name={author.name} role={author.role} />
								))}
							</div>
						</div>

						<div className='flex flex-col sm:flex-row gap-4'>
							<Button
								asChild
								className='h-16 px-10 rounded-2xl font-bold text-lg shadow-[0_0_30px_-5px_var(--primary)] hover:shadow-[0_0_50px_-5px_var(--primary)] transition-all gap-3 bg-primary hover:bg-primary/90'
								size='lg'
							>
								<Link download href={getMedia(atc.game.url)}>
									<Download className='w-6 h-6' />
									{dict?.projects?.download}
								</Link>
							</Button>
							<Button
								disabled
								className='h-16 px-8 rounded-2xl border-accent-foreground/10 bg-accent-foreground/5 backdrop-blur-sm hover:bg-accent-foreground/10 transition-colors'
								size='lg'
								variant='outline'
							>
								{dict?.projects?.documentation}
							</Button>
						</div>

						{/* Технические статы (можно добавить поля в Strapi или оставить статикой, если нет в API) */}
						<div className='grid grid-cols-3 gap-4 pt-4 border-t border-accent-foreground/5'>
							<div>
								<div className='text-[10px] text-muted-foreground uppercase'>{dict?.projects?.version}</div>
								<div className='font-mono font-bold text-primary'>v0.13.37</div>
							</div>
							<div>
								<div className='text-[10px] text-muted-foreground uppercase'>{dict?.projects?.platform}</div>
								<div className='font-mono font-bold'>Windows/PC</div>
							</div>
							<div>
								<div className='text-[10px] text-muted-foreground uppercase'>{dict?.projects?.weight}</div>
								<div className='font-mono font-bold'>{formatFileSize(atc.game.size)}</div>
							</div>
						</div>
					</div>
				</section>

				{/* --- СЕКЦИЯ ПОДРОБНОГО ОПИСАНИЯ --- */}
				<section className='relative space-y-16 py-12'>
					<div className='absolute inset-0 bg-primary/5 blur-[120px] rounded-full -z-10' />

					<div className='max-w-4xl mx-auto text-center space-y-6'>
						<h2 className='text-3xl lg:text-5xl font-bold uppercase tracking-tight'>{atc.fullName}</h2>
						<p className='text-muted-foreground text-lg leading-relaxed'>{atc.fullDescription}</p>
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
						{/* Блок: Физика (Graphic/Physics) */}
						<div className='p-8 rounded-[2rem] bg-card/40 border border-accent-foreground/10 backdrop-blur-md space-y-4'>
							<h3 className='text-xl font-bold uppercase text-primary flex items-center gap-2'>
								<div className='w-2 h-2 bg-primary rounded-full animate-pulse' />
								{dict.projects.physicTitle}
							</h3>
							<p className='text-muted-foreground leading-relaxed'>{atc.graphicDescription}</p>
						</div>

						{/* Блок: Кастомизация (Config) */}
						<div className='p-8 rounded-[2rem] bg-card/40 border border-accent-foreground/10 backdrop-blur-md space-y-4'>
							<h3 className='text-xl font-bold uppercase text-primary flex items-center gap-2'>
								<div className='w-2 h-2 bg-primary rounded-full animate-pulse' />
								{dict.projects.configTitle}
							</h3>
							<p className='text-muted-foreground leading-relaxed'>{atc.configDescription}</p>
						</div>

						{/* Блок: Обучение (More Than) */}
						<div className='lg:col-span-2 p-8 rounded-[2rem] bg-primary/5 border border-primary/20 backdrop-blur-md'>
							<div className='flex flex-col lg:flex-row gap-8 items-center'>
								<div className='space-y-4 flex-1'>
									<h3 className='text-xl font-bold uppercase flex items-center gap-2 text-foreground'>
										<Info className='w-5 h-5 text-primary' />
										{dict.projects.moreThanTitle}
									</h3>
									<p className='text-muted-foreground leading-relaxed'>{atc.moreThanDescription}</p>
								</div>
								<div className='hidden lg:block w-px h-24 bg-primary/20' />
								<div className='flex flex-col items-center justify-center px-8 space-y-2'>
									<div className='text-4xl font-black text-primary uppercase italic'>Hands-On</div>
									<div className='text-xs text-muted-foreground uppercase tracking-[0.3em]'>
										Experimentation
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* --- 2. ГАЛЕРЕЯ ИЗ API --- */}
				<section className='space-y-12'>
					<div className='flex flex-col items-center text-center space-y-4'>
						<h2 className='text-4xl font-bold uppercase tracking-tight'>{dict?.projects?.screenshots}</h2>
						<div className='h-1 w-20 bg-primary rounded-full' />
					</div>

					<Gallery images={atc.screenshots?.map((img) => getMedia(img.url)) || []} />
				</section>

				{/* --- 3. ОСОБЕННОСТИ --- */}
				{/* Оставляем FeatureCards как есть, либо их тоже можно вынести в API при необходимости */}
				<section className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					<FeatureCard
						description={dict.projects.features.physicDesc}
						icon={Layers}
						title={dict.projects.features.physicTitle}
					/>
					<FeatureCard
						description={dict.projects.features.infoDesc}
						icon={Info}
						title={dict.projects.features.infoTitle}
					/>
					<FeatureCard
						description={dict.projects.features.downloadDesc}
						icon={Download}
						title={dict.projects.features.downloadTitle}
					/>
				</section>
			</div>
		</div>
	)
}
