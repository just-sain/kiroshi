'use client'

import { cn } from '@lib'
// Убедитесь, что путь верный
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@shadcn'

// Путь к вашим компонентам shadcn

interface LiquidPaginationProps {
	currentPage: number
	totalPages: number
	setCurrentPage: (page: number) => void
}

export const LiquidPagination = ({ currentPage, totalPages, setCurrentPage }: LiquidPaginationProps) => {
	return (
		<div className='mt-20 flex flex-col items-center gap-8'>
			<Pagination className='w-auto'>
				<PaginationContent className='p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl gap-1'>
					<PaginationItem>
						<PaginationPrevious
							className={cn(
								'rounded-xl hover:bg-white/10 transition-all hover:text-primary border-none cursor-pointer',
								currentPage === 1 &&
									'opacity-20 cursor-not-allowed hover:bg-transparent hover:text-muted-foreground',
							)}
							onClick={(e) => {
								e.preventDefault()
								if (currentPage > 1) setCurrentPage(currentPage - 1)
							}}
						/>
					</PaginationItem>

					{[1, 2, 3].map((page) => (
						<PaginationItem key={page}>
							<PaginationLink
								className={cn(
									'min-w-11 h-11 rounded-xl text-sm font-bold transition-all duration-300 border-none cursor-pointer',
									currentPage === page
										? 'bg-primary text-white shadow-[0_0_20px_-5px_var(--primary)] scale-110 z-10 hover:bg-primary hover:text-white'
										: 'text-muted-foreground hover:text-foreground hover:bg-white/5',
								)}
								isActive={currentPage === page}
								onClick={(e) => {
									e.preventDefault()
									setCurrentPage(page)
								}}
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					))}

					<PaginationItem>
						<PaginationEllipsis className='text-muted-foreground' />
					</PaginationItem>

					<PaginationItem>
						<PaginationLink
							className='min-w-11 h-11 rounded-xl text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-white/5 border-none cursor-pointer'
							onClick={(e) => {
								e.preventDefault()
								setCurrentPage(totalPages)
							}}
						>
							{totalPages}
						</PaginationLink>
					</PaginationItem>

					<PaginationItem>
						<PaginationNext
							className={cn(
								'rounded-xl hover:bg-white/10 transition-all hover:text-primary border-none cursor-pointer',
								currentPage === totalPages &&
									'opacity-20 cursor-not-allowed hover:bg-transparent hover:text-muted-foreground',
							)}
							onClick={(e) => {
								e.preventDefault()
								if (currentPage < totalPages) setCurrentPage(currentPage + 1)
							}}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	)
}
