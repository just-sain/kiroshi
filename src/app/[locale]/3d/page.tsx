'use client'

import React, { useEffect, useState } from 'react'

import { cn } from '@lib'
import { services } from '@services'
import { Spinner } from '@shadcn'
import { useDictionaryStore } from '@store'
import { useQuery } from '@tanstack/react-query'
import { LiquidPagination } from '@widgets'
import { Cuboid, Search, X } from 'lucide-react'

import { ModelCard } from './model-card'

interface IDict {
	modelsPage: {
		badge: string
		title: string
		description: string
		search: {
			placeholder: string
			clearButton: string
			noResults: string
		}
		pagination: {
			label: string
		}
	}
	common: {
		loading: string
	}
}

const ModelsPage = ({ params }: { params: Promise<{ locale: string }> }) => {
	const { locale } = React.use(params)

	const dict = useDictionaryStore((state) => state.dict) as IDict

	const [currentPage, setCurrentPage] = useState(1)
	const [searchTerm, setSearchTerm] = useState('')
	const [debouncedSearch, setDebouncedSearch] = useState('')

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(searchTerm)
			if (searchTerm !== debouncedSearch) {
				setCurrentPage(1)
			}
		}, 500)

		return () => clearTimeout(timer)
	}, [searchTerm])

	const filters = debouncedSearch ? { name: { $containsi: debouncedSearch } } : undefined

	const { data, isFetching, isPending } = useQuery({
		...services.model.getAllModelsOptions({
			page: currentPage,
			pageSize: 10,
			search: filters,
			locale: locale,
		}),
	})

	if (isPending || !data || !dict) {
		return (
			<div className='w-full h-[60vh] flex items-center justify-center'>
				<div className='flex flex-col items-center gap-4'>
					<Spinner />
				</div>
			</div>
		)
	}

	const clearSearch = () => {
		setSearchTerm('')
		setDebouncedSearch('')
		setCurrentPage(1)
	}

	return (
		<section className='container w-full text-foreground py-12 px-4 relative min-h-screen'>
			<div className='absolute top-0 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] -z-10' />

			<div className='w-full mx-auto mb-12 text-center space-y-6'>
				<div className='inline-flex items-center justify-center py-1 px-4 bg-accent-foreground/5 backdrop-blur-xl text-primary rounded-full text-xs font-black tracking-widest uppercase border border-accent-foreground/10 shadow-[0_0_20px_rgba(0,0,0,0.2)]'>
					<Cuboid className='w-3 h-3 mr-2' />
					{dict.modelsPage.badge}
				</div>

				<h1 className='text-4xl font-black tracking-tighter lg:text-6xl uppercase italic'>
					{/* Предполагая, что в title может быть зашит тег или разделение */}
					{dict.modelsPage.title}
				</h1>

				<p className='text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
					{dict.modelsPage.description}
				</p>

				<div className='relative max-w-md mx-auto group'>
					<div className='absolute -inset-0.5 bg-primary/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500' />

					<div className='relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-4 h-14 transition-colors group-focus-within:border-primary/50 group-focus-within:bg-white/10'>
						<Search className='w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors' />

						<input
							className='w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/50 px-3 font-medium'
							placeholder={dict.modelsPage.search.placeholder}
							type='text'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>

						{searchTerm && (
							<button
								className='p-1 hover:bg-white/10 rounded-full transition-colors'
								title={dict.modelsPage.search.clearButton}
								onClick={clearSearch}
							>
								<X className='w-4 h-4 text-muted-foreground hover:text-foreground' />
							</button>
						)}
					</div>
				</div>
			</div>

			<div
				className={cn(
					'fixed top-0 left-0 w-full h-1 bg-primary/30 z-50 transition-opacity duration-300',
					isFetching ? 'opacity-100' : 'opacity-0',
				)}
			>
				<div className='h-full bg-primary animate-pulse w-1/3' />
			</div>

			<div className='w-full mx-auto relative'>
				<div
					className={cn(
						'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-12 transition-all duration-300',
						isFetching ? 'opacity-50 grayscale-50 pointer-events-none' : 'opacity-100',
					)}
				>
					{data?.data?.map((model) => (
						<ModelCard key={model.id} model={model} />
					))}
				</div>

				{data?.data.length === 0 && !isFetching && (
					<div className='flex flex-col items-center justify-center py-20 opacity-50'>
						<Search className='w-16 h-16 mb-4 text-muted-foreground' />
						<p className='text-xl font-bold uppercase tracking-widest'>{dict.modelsPage.search.noResults}</p>
					</div>
				)}

				{data?.meta.pagination && (
					<div className='flex flex-col items-center gap-4'>
						<span className='text-xs text-muted-foreground uppercase tracking-widest font-bold'>
							{dict.modelsPage.pagination.label}
						</span>
						<LiquidPagination
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
							totalPages={data.meta.pagination.pageCount || 1}
						/>
					</div>
				)}
			</div>
		</section>
	)
}

export default ModelsPage
