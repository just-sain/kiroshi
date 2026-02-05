import type { ComponentProps, FC } from 'react'

import type { INavDict } from '@constants'
import { Logotype } from '@widgets'

import { NavActions } from './nav-actions'
import { NavMenu } from './nav-menu'

interface IProps extends ComponentProps<'header'> {
	dict: INavDict
}

export const Header: FC<IProps> = ({ dict, ...props }) => {
	return (
		<header
			className='z-20 sticky top-4 container mx-auto flex justify-between items-center gap-2 px-4 py-3 my-3 md:w-full bg-background/5 backdrop-blur-xl rounded-2xl transition-all duration-300 shadow-[0_0_15px_rgba(255,0,0,0.3),inset_0_0_1px_rgba(255,255,255,0.2)]'
			{...props}
		>
			<Logotype />
			<NavMenu dict={dict} />
			<NavActions dict={dict} />
		</header>
	)
}
