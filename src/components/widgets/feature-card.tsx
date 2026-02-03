import type { ComponentProps, FC } from 'react'

import type { LucideIcon } from 'lucide-react'

interface IProps extends ComponentProps<'div'> {
	icon: LucideIcon
	title: string
	description: string
}

export const FeatureCard: FC<IProps> = ({ icon: Icon, title, description, ...props }) => {
	return (
		<div
			className='p-8 rounded-[2rem] bg-card/20 border border-white/5 hover:border-primary/20 transition-colors group'
			{...props}
		>
			<div className='w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform'>
				<Icon className='w-6 h-6' />
			</div>
			<h3 className='text-xl font-bold mb-3 uppercase'>{title}</h3>
			<p className='text-muted-foreground text-sm leading-relaxed'>{description}</p>
		</div>
	)
}
