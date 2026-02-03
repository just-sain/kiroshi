import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react'

import { cn } from '@lib'

export const Footer: FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({
	className,
	...props
}) => {
	return (
		<footer
			className={cn(
				'relative mt-10 py-8 text-center text-sm',
				'backdrop-blur-md bg-background/30 border-t border-primary/20',
				'shadow-[0_-10px_40px_-15px_rgba(var(--primary),0.2)]',
				className,
			)}
			{...props}
		>
			<div className='absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(var(--primary),0.8)]' />

			<p className='relative text-muted-foreground tracking-wide'>
				just{' '}
				<span className='text-primary font-medium drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]'>
					FTC #27674 KIROSHI
				</span>{' '}
				team
			</p>
		</footer>
	)
}
