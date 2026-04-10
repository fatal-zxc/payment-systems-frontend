'use client'

import { PropsWithChildren } from 'react'

import { AuthProvider } from './auth-provider'
import { TanstackQueryProvider } from './tanstack-query-provider'
import { ThemeProvider } from './theme-provider'
import { ToastProvider } from './toast-provider'

export function MainProvider({ children }: PropsWithChildren<unknown>) {
	return (
		<TanstackQueryProvider>
			<ThemeProvider attribute='class' defaultTheme='light'>
				<ToastProvider />
				<AuthProvider>{children}</AuthProvider>
			</ThemeProvider>
		</TanstackQueryProvider>
	)
}
