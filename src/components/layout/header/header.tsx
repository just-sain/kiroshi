'use client'

import * as React from 'react'

import Link from 'next/link'

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

export function NavigationMenuDemo() {
	return (
		<header className='flex justify-center items-center w-full py-5'>
			{/* logotype */}
			<div className='flex space-x-2 items-center'>
				<img className='' src='./logo.svg' />
				<p>KIROSHI</p>
			</div>

			{/* menu */}
			<NavigationMenu>
				<NavigationMenuList>
					{NAVIGATION_DATA.map((nav) => (
						<NavigationItem key={nav.url} nav={nav} />
					))}
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	)
}

const NavigationItem = ({ nav }: { nav: (typeof NAVIGATION_DATA)[number] }) => {
	if (nav.items && nav.items.length > 0) {
		return (
			<NavigationMenuItem>
				<NavigationMenuTrigger>{nav.title}</NavigationMenuTrigger>
				<NavigationMenuContent>
					<ul className='grid w-100 gap-3 p-4 md:w-125 md:grid-cols-2 lg:w-150'>
						{nav.items.map((item) => (
							<ListItem key={item.title} href={item.url} title={item.title}>
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
			<Link passHref href={nav.url}>
				<NavigationMenuLink className={navigationMenuTriggerStyle()}>{nav.title}</NavigationMenuLink>
			</Link>
		</NavigationMenuItem>
	)
}

const ListItem = React.forwardRef<React.ComponentRef<'a'>, React.ComponentPropsWithoutRef<'a'> & { title: string }>(
	({ className, title, children, href, ...props }, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<Link
						ref={ref}
						className={cn(
							'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
							className,
						)}
						href={href!}
						{...props}
					>
						<div className='text-sm font-medium leading-none'>{title}</div>
						<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
					</Link>
				</NavigationMenuLink>
			</li>
		)
	},
)
