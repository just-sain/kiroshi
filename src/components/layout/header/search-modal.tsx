'use client'

import { useRouter } from 'next/navigation'

import { type INavDict, getNavigationData } from '@constants'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@shadcn'
import { FileText } from 'lucide-react'

// Путь к твоим данным

interface SearchModalProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	dict: INavDict
}

export function SearchModal({ open, dict, onOpenChange }: SearchModalProps) {
	const navData = getNavigationData(dict)
	const router = useRouter()

	const runCommand = (command: () => void) => {
		onOpenChange(false)
		command()
	}

	return (
		<CommandDialog open={open} onOpenChange={onOpenChange}>
			<CommandInput placeholder='Что вы ищете?' />
			<CommandList>
				<CommandEmpty>Ничего не найдено.</CommandEmpty>

				{/* Основная навигация */}
				{navData.map((group) => (
					<CommandGroup key={group.title} heading={group.title}>
						<CommandItem onSelect={() => runCommand(() => router.push(group.url))}>
							<FileText className='mr-2 h-4 w-4' />
							<span>{group.title}</span>
						</CommandItem>

						{group.items?.map((item) => (
							<CommandItem key={item.url} onSelect={() => runCommand(() => router.push(item.url))}>
								{item.icon ? <item.icon className='mr-2 h-4 w-4' /> : <FileText className='mr-2 h-4 w-4' />}
								<span>{item.title}</span>
								{item.description && (
									<span className='ml-2 text-xs text-muted-foreground truncate'>— {item.description}</span>
								)}
							</CommandItem>
						))}
					</CommandGroup>
				))}

				{/* <CommandSeparator /> */}

				{/* Футер навигация (Поддержка и т.д.) */}
				{/* <CommandGroup heading='Другое'>
					{navFooter.map((item) => (
						<CommandItem key={item.url} onSelect={() => runCommand(() => router.push(item.url))}>
							<item.icon className='mr-2 h-4 w-4' />
							<span>{item.title}</span>
						</CommandItem>
					))}
				</CommandGroup> */}
			</CommandList>
		</CommandDialog>
	)
}
