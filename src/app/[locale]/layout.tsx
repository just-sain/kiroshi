import type { Metadata } from 'next'

import { BgEffects, Footer, Header } from '@layout'
import { getDictionary } from '@lib'
import { AuthProvider, DictionaryProvider, QueryProvider, ThemeProvider } from '@providers'
import { Toaster } from '@shadcn'

import './globals.css'

// metadata
export const metadata: Metadata = {
	title: 'KAP #27674',
	description: 'FROM FTC #27674 KAP team',
	icons: {
		icon: '/kap.png',
	},
}

// layout
export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode
	params: { locale: string }
}>) {
	const { locale } = params
	const dict = await getDictionary(locale)

	return (
		<html suppressHydrationWarning lang='ru'>
			<head />

			<body className='min-h-screen antialiased flex flex-col'>
				<ThemeProvider>
					<QueryProvider>
						<AuthProvider />
						<DictionaryProvider dict={dict} />

						<Header dict={dict.nav} />

						<BgEffects />

						<main className='flex-1 flex items-center justify-center w-full'>{children}</main>

						<Toaster position='top-center' />
						<Footer />
					</QueryProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
