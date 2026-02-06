import Link from 'next/link'

import { PlayCircle } from 'lucide-react'

export const NewsCard = ({ title, description, date, category, image, link, isVideo = false }) => {
	return (
		<Link
			className='group relative flex flex-col sm:flex-row gap-6 p-6 rounded-[2rem] bg-card/30 border border-white/10 backdrop-blur-md hover:bg-card/50 hover:border-primary/30 transition-all duration-500'
			href={link}
		>
			<div className='relative h-48 sm:h-auto sm:w-52 shrink-0 rounded-2xl overflow-hidden border border-accent-foreground/5'>
				<img
					alt={title}
					className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
					src={image}
				/>
				{isVideo && (
					<div className='absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors'>
						<PlayCircle className='w-12 h-12 text-accent-foreground/80 group-hover:text-primary group-hover:scale-110 transition-all' />
					</div>
				)}
			</div>

			<div className='py-2 space-y-4'>
				<div className='space-y-2'>
					<div className='flex items-center gap-3'>
						<span className='text-[10px] text-muted-foreground font-mono italic'>{date}</span>
					</div>
					<h3 className='text-xl font-bold leading-tight group-hover:text-primary transition-colors'>{title}</h3>
					<p className='text-xs text-muted-foreground leading-relaxed line-clamp-2'>{description}</p>
				</div>

				<span className='inline text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-primary/10 px-2 py-0.5 rounded'>
					{category}
				</span>
			</div>
		</Link>
	)
}
