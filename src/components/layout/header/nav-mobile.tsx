'use client'

import { type FC, useState } from 'react'

import Link from 'next/link'

import { type INavDict, getNavigationData } from '@constants'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Button,
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@shadcn'
import { Menu } from 'lucide-react'

interface IProps {
	dict: INavDict
}

export const NavMobile: FC<IProps> = ({ dict }) => {
	const [open, setOpen] = useState(false)
	const navData = getNavigationData(dict)

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					className='lg:hidden hover:bg-transparent active:scale-95 transition-all'
					size='icon'
					variant='ghost'
				>
					<Menu className='h-6 w-6 text-foreground' />
					<span className='sr-only'>Toggle menu</span>
				</Button>
			</SheetTrigger>

			<SheetContent className='w-75 bg-background/95 backdrop-blur-xl border-r border-white/10' side='left'>
				<SheetHeader>
					<SheetTitle className='text-left text-red-500 font-bold tracking-wider'>НАВИГАЦИЯ</SheetTitle>
				</SheetHeader>

				<div className='flex flex-col gap-1 mt-8 p-6'>
					{navData.map((nav) => {
						const hasItems = nav.items && nav.items.length > 0

						if (hasItems) {
							return (
								<Accordion key={nav.url} collapsible className='w-full' type='single'>
									<AccordionItem className='border-none' value={nav.url}>
										<AccordionTrigger className='py-3 text-lg font-medium hover:text-red-500 transition-all hover:no-underline'>
											{nav.title}
										</AccordionTrigger>
										<AccordionContent>
											<div className='flex flex-col gap-2 ml-4 border-l border-red-500/30 pl-4 py-2'>
												{nav.items?.map((item) => (
													<Link
														key={item.url}
														className='flex flex-col py-2 transition-all hover:text-red-500'
														href={item.url}
														onClick={() => setOpen(false)}
													>
														<span className='text-sm font-semibold'>{item.title}</span>
														{item.description && (
															<span className='text-xs text-muted-foreground line-clamp-1'>
																{item.description}
															</span>
														)}
													</Link>
												))}
											</div>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							)
						}

						return (
							<Link
								key={nav.url}
								className='py-3 text-lg font-medium border-b border-transparent hover:text-red-500 transition-all'
								href={nav.url}
								onClick={() => setOpen(false)}
							>
								{nav.title}
							</Link>
						)
					})}
				</div>
			</SheetContent>
		</Sheet>
	)
}
