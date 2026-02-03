import type { ComponentProps, FC } from 'react'

import { User } from 'lucide-react'

interface IProps extends ComponentProps<'div'> {
	name: string
	role: string
}

export const AuthorBadge: FC<IProps> = ({ name, role }) => {
	return (
		<div className='flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group'>
			<div className='w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:scale-110 transition-transform'>
				<User className='w-4 h-4 text-primary' />
			</div>
			<div className='flex flex-col'>
				<span className='text-sm font-bold leading-tight'>{name}</span>
				<span className='text-[10px] text-muted-foreground uppercase tracking-wider'>{role}</span>
			</div>
		</div>
	)
}
