import { cookies } from 'next/headers'
import { FC, PropsWithChildren } from 'react'

import { AuthProvider } from './auth-provider'
import { TanstackQueryProvider } from './tanstack-query-provider'
import { ThemeProvider } from './theme-provider'
import { ToastProvider } from './toast-provider'

export const MainProvider: FC<PropsWithChildren> = async ({ children }) => {
	const cookieStore = await cookies()
	const isAuth = cookieStore.has('refreshToken')

	return (
		<TanstackQueryProvider>
			<ThemeProvider attribute='class' defaultTheme='light'>
				<ToastProvider />
				<AuthProvider initialAuth={isAuth}>{children}</AuthProvider>
			</ThemeProvider>
		</TanstackQueryProvider>
	)
}
