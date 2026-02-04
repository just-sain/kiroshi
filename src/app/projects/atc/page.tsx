'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@shadcn'
import { AuthorBadge, FeatureCard } from '@widgets'
import { Download, Gamepad2, Info, Layers } from 'lucide-react'

import { Gallery } from './gallery'

export default function GamePage() {
	return (
		<div className='min-h-screen text-foreground overflow-x-hidden'>
			<div className='relative container mx-auto px-4 py-12 space-y-28'>
				{/* --- 1. HERO SECTION --- */}
				<section className='relative mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
					{/* Изображение проекта */}
					<div className='lg:col-span-7 relative group border border-accent-foreground/10 rounded-[2rem] overflow-hidden bg-card/30 backdrop-blur-md shadow-2xl'>
						<div className='aspect-video bg-muted/20 relative flex items-center justify-center'>
							<Image fill alt='ATC' className='object-fill' src='/projects/atc/atc.png' />
						</div>
					</div>

					{/* Описание и авторы */}
					<div className='lg:col-span-5 space-y-8'>
						<div className='space-y-4'>
							<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase'>
								<Gamepad2 className='w-3 h-3' /> Current Season: Decode
							</div>
							<h1 className='text-6xl lg:text-8xl font-black tracking-tighter uppercase italic'>
								ATC <span className='text-primary'>SIM</span>
							</h1>
							<p className='text-muted-foreground leading-relaxed text-lg'>
								Полноценный симулятор FTC робота. Оттачивай навыки управления, тестируй автономные периоды и
								изучай механику текущего сезона в цифровой среде.
							</p>

							{/* БЛОК АВТОРОВ */}
							<div className='flex flex-wrap gap-3 pt-2'>
								<AuthorBadge name='Дмитрий Енин' role='Lead Designer' />
								<AuthorBadge name='Дорошкевич Даниил' role='Physics & 3D' />
							</div>
						</div>

						<div className='flex flex-col sm:flex-row gap-4'>
							<Button
								asChild
								className='h-16 px-10 rounded-2xl font-bold text-lg shadow-[0_0_30px_-5px_var(--primary)] hover:shadow-[0_0_50px_-5px_var(--primary)] transition-all gap-3 bg-primary hover:bg-primary/90'
								size='lg'
							>
								<Link download='atc-simulation.zip' href='/projects/atc/game.zip'>
									<Download className='w-6 h-6' /> СКАЧАТЬ ATC
								</Link>
							</Button>
							<Button
								disabled
								className='h-16 px-8 rounded-2xl border-accent-foreground/10 bg-accent-foreground/5 backdrop-blur-sm hover:bg-accent-foreground/10 transition-colors'
								size='lg'
								variant='outline'
							>
								ДОКУМЕНТАЦИЯ
							</Button>
						</div>

						{/* Технические статы */}
						<div className='grid grid-cols-3 gap-4 pt-4 border-t border-accent-foreground/5'>
							<div>
								<div className='text-[10px] text-muted-foreground uppercase'>Версия</div>
								<div className='font-mono font-bold text-primary'>v0.13.37</div>
							</div>
							<div>
								<div className='text-[10px] text-muted-foreground uppercase'>Платформа</div>
								<div className='font-mono font-bold'>Windows/PC</div>
							</div>
							<div>
								<div className='text-[10px] text-muted-foreground uppercase'>Вес</div>
								<div className='font-mono font-bold'>~250 MB</div>
							</div>
						</div>
					</div>
				</section>

				{/* --- СЕКЦИЯ ПОДРОБНОГО ОПИСАНИЯ (ПОСЛЕ ГАЛЕРЕИ) --- */}
				<section className='relative space-y-16 py-12'>
					<div className='absolute inset-0 bg-primary/5 blur-[120px] rounded-full -z-10' />

					<div className='max-w-4xl mx-auto text-center space-y-6'>
						<h2 className='text-3xl lg:text-5xl font-bold uppercase tracking-tight'>
							ATC — <span className='text-primary'>Artificial Tech Challenge</span>
						</h2>
						<p className='text-muted-foreground text-lg leading-relaxed'>
							ATC — это физически точный симулятор робототехники, который детально воссоздает среду соревнований
							FTC DECODE. Вы настраиваете и управляете своим роботом на соревновательном поле, где важны каждое
							движение, столкновение и инженерное решение. Это не просто аркада — всё, что происходит в ATC,
							следует той же физической логике, которую вы ожидаете на реальном поле FTC.
						</p>
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
						{/* Блок: Физика */}
						<div className='p-8 rounded-[2rem] bg-card/40 border border-accent-foreground/10 backdrop-blur-md space-y-4'>
							<h3 className='text-xl font-bold uppercase text-primary flex items-center gap-2'>
								<div className='w-2 h-2 bg-primary rounded-full animate-pulse' />
								Реалистичная физика
							</h3>
							<p className='text-muted-foreground leading-relaxed'>
								ATC построен вокруг продвинутой физической системы. Элементы (шары) имеют реальную массу,
								отскок, трение и поведение при складывании. Ворота реагируют с правильным импульсом,
								сопротивлением и чувствительностью к моменту времени. Столкновения естественны и непрерывны. То,
								что вы видите на поле — это то, что на самом деле произошло бы, если бы вы построили такой же
								механизм в реальности.
							</p>
						</div>

						{/* Блок: Кастомизация */}
						<div className='p-8 rounded-[2rem] bg-card/40 border border-accent-foreground/10 backdrop-blur-md space-y-4'>
							<h3 className='text-xl font-bold uppercase text-primary flex items-center gap-2'>
								<div className='w-2 h-2 bg-primary rounded-full animate-pulse' />
								Настройка робота
							</h3>
							<p className='text-muted-foreground leading-relaxed'>
								Кастомизация робота в ATC гибкая: вы можете регулировать скорость и вес, чтобы изменить то, как
								ваш робот ускоряется, поворачивает и ведет себя при контакте. Системы захвата и запуска
								настраиваются с точным контролем отклика и механических ограничений. Оптимизируете ли вы
								скорость, точность или экспериментируете — ATC позволяет довести конструкцию до предела и
								ощутить последствия каждого выбора.
							</p>
						</div>

						{/* Блок: Обучение (на всю ширину) */}
						<div className='lg:col-span-2 p-8 rounded-[2rem] bg-primary/5 border border-primary/20 backdrop-blur-md'>
							<div className='flex flex-col lg:flex-row gap-8 items-center'>
								<div className='space-y-4 flex-1'>
									<h3 className='text-xl font-bold uppercase flex items-center gap-2 text-foreground'>
										<Info className='w-5 h-5 text-primary' />
										Больше чем просто игра
									</h3>
									<p className='text-muted-foreground leading-relaxed'>
										ATC — это понимание того, как взаимодействуют физика, механика и системы управления. Вы
										увидите, как небольшие изменения в конструкции влияют на стабильность и
										последовательность, как физика усложняет управление и как механические компромиссы
										приводят к стратегическим решениям на поле. Это делает ATC мощным инструментом для
										изучения концепций робототехники через практические эксперименты.
									</p>
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

				{/* --- 2. ГАЛЕРЕЯ --- */}
				<section className='space-y-12'>
					<div className='flex flex-col items-center text-center space-y-4'>
						<h2 className='text-4xl font-bold uppercase tracking-tight'>Скриншоты симулятора</h2>
						<div className='h-1 w-20 bg-primary rounded-full' />
					</div>

					<Gallery
						images={['/projects/atc/1.png', '/projects/atc/2.png', '/projects/atc/3.png', '/projects/atc/4.png']}
					/>
				</section>

				{/* --- 3. ОСОБЕННОСТИ --- */}
				<section className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					<FeatureCard
						description='Реалистичное поведение робота на поле, учитывающее трение колес, вес манипуляторов и инерцию.'
						icon={Layers}
						title='Точная физика'
					/>
					<FeatureCard
						description="Полное соответствие поля и игровых элементов текущему сезону FTC 'Decode'."
						icon={Info}
						title='Актуальный сезон'
					/>
					<FeatureCard
						description='Мы поддерживаем сообщество, поэтому симулятор доступен бесплатно для всех команд.'
						icon={Download}
						title='Open Source'
					/>
				</section>
			</div>
		</div>
	)
}
