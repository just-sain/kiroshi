import { type ComponentProps, forwardRef } from 'react'

import { NAVIGATION_DATA } from '@constants'
import { cn } from '@lib'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@shadcn'
import type { LucideIcon } from 'lucide-react'

export const NavMenu = ({ ...props }: ComponentProps<typeof NavigationMenu>) => {
	return (
		<NavigationMenu {...props}>
			<NavigationMenuList>
				{NAVIGATION_DATA.map((nav) => (
					<NavigationItem key={nav.url} nav={nav} />
				))}
			</NavigationMenuList>
		</NavigationMenu>
	)
}

const NavigationItem = ({ nav }: { nav: (typeof NAVIGATION_DATA)[number] }) => {
	if (nav.items && nav.items.length > 0) {
		return (
			<NavigationMenuItem>
				<NavigationMenuTrigger className='bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent hover:text-red-500 data-active:bg-transparent data-[state=open]:text-red-500 transition-all'>
					{nav.title}
				</NavigationMenuTrigger>

				<NavigationMenuContent>
					<ul className='grid w-100 gap-3 p-4 md:w-125 md:grid-cols-2 lg:w-150'>
						{nav.items.map((item) => (
							<ListItem key={item.title} Icon={item.icon} href={item.url} title={item.title}>
								{item.description}
							</ListItem>
						))}
					</ul>
				</NavigationMenuContent>
			</NavigationMenuItem>
		)
	}

	return (
		<NavigationMenuItem>
			<NavigationMenuLink
				className={cn(
					navigationMenuTriggerStyle(),
					'bg-transparent! hover:bg-transparent focus:bg-transparent hover:text-red-500 focus:text-red-500 data-active:bg-transparent transition-all',
				)}
				href={nav.url}
			>
				{nav.title}
			</NavigationMenuLink>
		</NavigationMenuItem>
	)
}

const ListItem = forwardRef<
	React.ComponentRef<typeof NavigationMenuLink>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuLink> & { title: string; Icon: LucideIcon }
>(({ className, title, Icon, children, href, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink
				ref={ref}
				className={cn(
					'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all',
					'hover:bg-transparent focus:bg-transparent active:bg-transparent bg-none!',
					'hover:text-red-500 focus:text-red-500',
					'hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]',
					className,
				)}
				href={href || '#'}
				{...props}
			>
				<div className='text-sm font-medium leading-none'>
					<Icon className='inline' /> {title}
				</div>
				<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
			</NavigationMenuLink>
		</li>
	)
})
