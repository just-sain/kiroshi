'use client'

import { useState } from 'react'

import { LiquidPagination } from '@widgets'
import { Cuboid } from 'lucide-react'

import { ModelCard } from './model-card'

const models: {
	id: number
	title: string
	category: string
	date: string
	image: string
	fileSize: string
}[] = [
	{
		id: 1,
		title: 'Viper Slide Assembly',
		category: 'Lift',
		date: '2025-02-14',
		image: '/3d/id.png',
		fileSize: '12 MB',
	},
	{
		id: 2,
		title: 'Custom Intake Claw',
		category: 'Manipulator',
		date: '2025-02-10',
		image: '/3d/id.png',
		fileSize: '4.5 MB',
	},
	{
		id: 3,
		title: 'Mecanum Drive Pod',
		category: 'Chassis',
		date: '2025-01-20',
		image: '/3d/id.png',
		fileSize: '8.2 MB',
	},
	{
		id: 4,
		title: 'Camera Mount v2',
		category: 'Vision',
		date: '2025-01-15',
		image: '/3d/id.png',
		fileSize: '1.2 MB',
	},
]

const ModelsPage = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const totalPages = 5 // Пример количества страниц

	return (
		<section className='container w-full text-foreground py-12 px-4 sm:px-6 lg:px-8 font-sans relative'>
			{/* Фоновое свечение для атмосферы */}
			<div className='absolute top-0 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] -z-10' />

			<div className='w-full mx-auto mb-12 text-center'>
				<div className='inline-flex items-center justify-center py-1 px-4 bg-accent-foreground/5 backdrop-blur-xl text-primary rounded-full mb-6 text-xs font-black tracking-widest uppercase border border-accent-foreground/10 shadow-[0_0_20px_rgba(0,0,0,0.2)]'>
					<Cuboid className='w-3 h-3 mr-2' />
					CAD Library
				</div>

				<h1 className='text-4xl font-black tracking-tighter lg:text-6xl mb-4 uppercase italic'>
					Наши <span className='text-primary'>3D Модели</span>
				</h1>

				<p className='text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
					Коллекция открытых CAD-файлов нашей команды. Скачивайте, изучайте и используйте в своих роботах.
				</p>
			</div>

			{/* Сетка моделей */}
			<div className='w-full mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6'>
				{models.map((model) => (
					<ModelCard key={model.id} model={model} />
				))}
			</div>

			<LiquidPagination currentPage={currentPage} setCurrentPage={(a) => false} totalPages={totalPages} />
		</section>
	)
}

export default ModelsPage
