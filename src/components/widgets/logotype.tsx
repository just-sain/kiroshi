import Image from 'next/image'
import Link from 'next/link'

export const Logotype = () => {
	return (
		<Link className='flex items-center group transition-opacity hover:opacity-90' href='/'>
			<div className='relative w-12 h-12'>
				<Image fill priority alt='Kiroshi Logo' className='object-contain' src='/logo.png' />
			</div>

			<p className='text-xl font-semibold tracking-tighter uppercase'>KUP</p>
		</Link>
	)
}
