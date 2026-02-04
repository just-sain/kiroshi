import Image from 'next/image'
import Link from 'next/link'

export const Logotype = () => {
	return (
		<Link className='flex items-center group transition-opacity hover:opacity-90' href='/'>
			<div className='relative w-10 h-10'>
				<Image fill priority alt='Kiroshi Logo' className='object-contain' src='/kap.png' />
			</div>

			<p className='text-xl font-semibold tracking-tighter uppercase'>KAP</p>
		</Link>
	)
}
