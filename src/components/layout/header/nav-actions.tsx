'use client'

import { type ComponentProps, useEffect, useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@shadcn'
import { ThemeToggle } from '@widgets'
import { Search } from 'lucide-react'

import { SearchModal } from './search-modal'

export const NavActions = ({ ...props }: ComponentProps<'div'>) => {
	const [open, setOpen] = useState(false)

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen((open) => !open)
			}
		}

		document.addEventListener('keydown', down)

		return () => document.removeEventListener('keydown', down)
	}, [])

	return (
		<div className='flex gap-4 items-center' {...props}>
			<button
				className='relative flex items-center justify-between w-full max-w-sm px-3 py-2 text-sm text-muted-foreground bg-secondary/50 rounded-md border border-transparent hover:border-input transition-all lg:w-55'
				onClick={() => setOpen(true)}
			>
				<div className='flex items-center gap-2'>
					<Search className='h-4 w-4' />
					<span>Поиск...</span>
				</div>
				<kbd className='pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
					<span className='text-xs font-sans mr-1'>⌘</span>K
				</kbd>
			</button>

			<SearchModal open={open} onOpenChange={setOpen} />

			<Avatar className='h-9 w-9 border'>
				<AvatarImage alt='KIROSHI' src='/logo.svg' />
				<AvatarFallback>KUP</AvatarFallback>
			</Avatar>

			<ThemeToggle />
		</div>
	)
}
