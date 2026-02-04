import type { ComponentProps } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shadcn'
import { ChevronRight, type LucideIcon } from 'lucide-react'

interface IProps extends ComponentProps<typeof Card> {
	icon: LucideIcon
	title: string
	desc: string
}

export const InfoCard = ({ icon: Icon, title, desc }: IProps) => {
	return (
		<Card className='group relative overflow-hidden bg-card/40 border-accent-foreground/5 hover:border-accent-foreground/20 transition-all duration-300 hover:-translate-y-1'>
			<div className='absolute inset-0 bg-linear-to-b from-accent-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
			<CardHeader className='space-y-4'>
				<div className='w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center border border-accent-foreground/5 text-foreground'>
					<Icon className='h-5 w-5' />
				</div>
				<CardTitle className='text-sm font-bold uppercase tracking-wider'>{title}</CardTitle>
			</CardHeader>
			<CardContent className='space-y-6'>
				<CardDescription className='text-xs text-muted-foreground min-h-10'>{desc}</CardDescription>
				<div className='flex items-center text-[10px] font-bold uppercase text-accent-foreground/60 group-hover:text-accent-foreground transition-colors cursor-pointer'>
					Читать <ChevronRight className='ml-1 h-3 w-3' />
				</div>
			</CardContent>
		</Card>
	)
}
