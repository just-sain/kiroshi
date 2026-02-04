import Link from 'next/link'

import { Button } from '@shadcn'

const Page = () => {
	return (
		<div className='flex flex-col items-center justify-center p-4 text-center flex-1'>
			<h1 className='text-9xl font-bold text-primary'>404</h1>
			<h2 className='text-2xl font-semibold mt-4 uppercase tracking-widest'>Status: Disconnected</h2>
			<p className='mt-2 max-w-md'>
				Похоже, ваш автономный период пошел не по плану. Робот не смог обнаружить цель по этому адресу.
			</p>
			<div className='mt-8 p-4 border-2 border-dashed border-primary rounded-lg bg-destructive/20'>
				<p className='text-sm font-mono text-primary'>
					// ERROR: Target coordinate not found <br />
					// Check your Driver Station connection
				</p>
			</div>
			<Button className='mt-4' size='lg' variant='default'>
				<Link href='/'>Вернуться в Пит-зону</Link>
			</Button>
		</div>
	)
}

export default Page
