import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
	const { url, cookies } = request

	const refreshToken = cookies.get('refreshToken')?.value

	const isAuthPage = url.includes('/auth')

	if (isAuthPage) {
		if (refreshToken) {
			return NextResponse.redirect(new URL('/dashboard/settings', url))
		}

		return NextResponse.next()
	}

	if (!refreshToken) {
		return NextResponse.redirect(new URL('/auth/login', url))
	}
}

export const config = {
	matcher: ['/auth/:path*', '/dashboard', '/dashboard/:path*'],
}
