import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const locales = ['ru', 'en']
const defaultLocale = 'ru'
const COOKIE_NAME = 'NEXT_LOCALE'

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	// 1. Проверяем, есть ли уже локаль в пути
	const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

	if (pathnameHasLocale) {
		// Если локаль в пути есть, извлекаем её и сохраняем в куки (на случай, если она изменилась)
		const localeInPath = pathname.split('/')[1]
		const response = NextResponse.next()

		response.cookies.set(COOKIE_NAME, localeInPath)

		return response
	}

	// 2. Если локали в пути нет, пытаемся достать её из куки
	const cookieLocale = request.cookies.get(COOKIE_NAME)?.value
	const locale = cookieLocale && locales.includes(cookieLocale) ? cookieLocale : defaultLocale

	request.nextUrl.pathname = `/${locale}${pathname}`

	const response = NextResponse.redirect(request.nextUrl)

	response.cookies.set(COOKIE_NAME, locale)

	return response
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|.*\\..*).*)'],
}
