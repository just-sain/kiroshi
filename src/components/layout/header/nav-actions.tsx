'use client'

// Для смены URL
import { type ComponentProps, type FC, useEffect, useState } from 'react'

// Иконка языка
import { usePathname, useRouter } from 'next/navigation'

// Замените на путь к вашему UI-компоненту
import type { INavDict } from '@constants'
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@shadcn'
import { ThemeToggle } from '@widgets'
import { Languages, Search } from 'lucide-react'

import { SearchModal } from './search-modal'

interface IProps extends ComponentProps<'div'> {
	dict: INavDict
}

export const NavActions: FC<IProps> = ({ dict, ...props }) => {
	const [open, setOpen] = useState(false)
	const router = useRouter()
	const pathname = usePathname()

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

	const transitionedToLocale = (locale: string) => {
		const segments = pathname.split('/')

		segments[1] = locale
		router.push(segments.join('/'))
	}

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

			<SearchModal dict={dict} open={open} onOpenChange={setOpen} />

			{/* Селектор локали */}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button className='h-9 w-9' size='icon' variant='ghost'>
						<Languages className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem onClick={() => transitionedToLocale('ru')}>Русский</DropdownMenuItem>
					<DropdownMenuItem onClick={() => transitionedToLocale('en')}>English</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<ThemeToggle />
		</div>
	)
}
