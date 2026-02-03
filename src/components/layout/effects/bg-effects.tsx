'use client'

export const BgEffects = () => {
	return (
		<>
			<div className='fixed -top-[10%] left-[5%] w-125 h-125 bg-red-600/20 blur-[120px] rounded-full pointer-events-none -z-10 animate-blob' />

			<div className='fixed -bottom-[25%] right-[5%] w-150 h-150 bg-primary/25 blur-[140px] rounded-full pointer-events-none -z-10 animate-blob animation-delay-0' />
		</>
	)
}
