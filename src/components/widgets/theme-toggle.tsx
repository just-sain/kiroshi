'use client'

import { type ComponentProps, useEffect, useState } from 'react'

import { useTheme } from 'next-themes'

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@shadcn'
import { Monitor, Moon, Sun } from 'lucide-react'

enum ThemeEnum {
	light = 'Светлая тема',
	dark = 'Темная тема',
	system = 'Системная тема',
}

interface IProps extends ComponentProps<typeof DropdownMenu> {
	showText?: boolean
}

export const ThemeToggle = ({ showText = false, ...props }: IProps) => {
	const [themeText, setThemeText] = useState(ThemeEnum.system)
	const { setTheme, theme } = useTheme()

	useEffect(() => {
		if (!theme) return

		setThemeText(ThemeEnum[theme])
	}, [theme])

	return (
		<DropdownMenu {...props}>
			<DropdownMenuTrigger asChild>
				<Button className='w-9 px-0' size='icon' variant='outline'>
					<Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
					<Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />

					{showText && <span className='text-xs'>{themeText}</span>}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onClick={() => setTheme('light')}>
					<Sun /> {ThemeEnum.light}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					<Moon /> {ThemeEnum.dark}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
					<Monitor /> {ThemeEnum.system}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
