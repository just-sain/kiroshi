import type { FC } from 'react'

import Link from 'next/link'

import { Box } from 'lucide-react'

interface IProps {
	model: {
		id: number
		title: string
		category: string
		date: string
		image: string
		fileSize: string
	}
}

export const ModelCard: FC<IProps> = ({ model }) => {
	return (
		<div className='group relative flex flex-col overflow-hidden rounded-[2rem] border border-accent-foreground/10 bg-card/30 backdrop-blur-md transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_-10px_rgba(var(--primary),0.2)]'>
			{/* Верхняя часть с изображением */}
			<div className='relative flex h-52 items-center justify-center overflow-hidden bg-accent-foreground/5 p-8'>
				{/* Свечение при наведении */}
				<div className='absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

				<img
					alt={model.title}
					className='z-10 h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-110 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]'
					src={model.image}
				/>

				<div className='absolute top-4 right-4 z-20'>
					<span className='rounded-full border border-accent-foreground/10 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-foreground backdrop-blur-xl'>
						{model.category}
					</span>
				</div>
			</div>

			<div className='flex grow flex-col p-6'>
				<div className='grow space-y-2'>
					<Link
						className='text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary'
						href={`/3d/${model.id}`}
					>
						{model.title}
					</Link>

					<div className='flex items-center gap-3 text-xs font-medium text-muted-foreground'>
						<div className='flex items-center gap-1.5'>
							<Box className='h-3.5 w-3.5 text-primary/70' />
							<span className='font-mono'>STEP</span>
						</div>
						<span className='h-3 w-px bg-accent-foreground/10' />
						<span className='font-mono uppercase'>{model.fileSize}</span>
					</div>
				</div>
			</div>

			{/* effect */}
			<div className='absolute -bottom-px left-1/2 h-px w-0 bg-linear-to-r from-transparent via-primary to-transparent transition-all duration-700 group-hover:w-full group-hover:-translate-x-1/2' />
		</div>
	)
}
