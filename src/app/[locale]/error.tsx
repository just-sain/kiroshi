'use client'

import { Button } from '@shadcn'

const Page = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen p-4 text-center flex-1'>
			<div className='w-24 h-24 bg-primary rounded-full flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(220,38,38,0.5)]'>
				<span className='text-4xl font-bold'>E</span>
			</div>
			<h1 className='text-6xl mt-6 text-primary'>500: SMOKE TEST FAILED</h1>
			<h2 className='text-xl mt-4'>Внутренняя поломка механизмов сервера.</h2>
			<p className='mt-2 max-w-lg italic'>
				Наши механики уже выехали с набором шестигранников и новой Control Hub, чтобы всё починить.
			</p>

			<div className='mt-10 grid grid-cols-1 gap-4 text-left font-mono text-xs text-primary/60'>
				<p>[CRITICAL_FAILURE]: Battery voltage low or logic fried</p>
				<p>[SYSTEM]: Field personnel notified</p>
			</div>

			<Button
				className='mt-12 px-8 py-2 border-2 border-primary/60 hover:bg-primary/80 hover:text-accent-foreground transition-all duration-300'
				size='lg'
				variant='default'
				onClick={() => window.location.reload()}
			>
				RESTART ROBOT (FMS)
			</Button>
		</div>
	)
}

export default Page
