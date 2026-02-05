import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react'

import { cn } from '@lib'

export const Footer: FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({
	className,
	...props
}) => {
	return (
		<footer
			className={cn(
				'relative mt-10 py-10 text-center text-sm',
				'backdrop-blur-md bg-background/30 border-t border-primary/20',
				'shadow-[0_-10px_40px_-15px_rgba(var(--primary),0.2)]',
				className,
			)}
			{...props}
		>
			{/* glow line */}
			<div className='absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(var(--primary),0.8)]' />

			<div className='relative space-y-2'>
				<p className='text-muted-foreground tracking-wide'>
					just{' '}
					<span className='text-primary font-medium drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]'>
						FTC #27674 KIROSHI
					</span>{' '}
					team
				</p>

				<div className='text-muted-foreground space-y-1 text-sm'>
					<p>
						📞{' '}
						<a className='hover:text-primary transition-colors' href='tel:+77772974441'>
							+7 777 297 4441
						</a>
					</p>

					<p>
						📸{' '}
						<a
							className='hover:text-primary transition-colors'
							href='https://instagram.com/kap.ftc'
							rel='noopener noreferrer'
							target='_blank'
						>
							@kap.ftc
						</a>
					</p>
				</div>
			</div>
		</footer>
	)
}
