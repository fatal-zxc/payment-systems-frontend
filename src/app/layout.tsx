import type { Metadata } from 'next'
import localFont from 'next/font/local'

import { ToggleTheme } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import { MainProvider } from '@/shared/providers'
import '@/shared/styles/globals.css'

const geistMonoHeading = localFont({
	src: '../shared/assets/fonts/geist-mono.woff2',
	variable: '--font-heading',
	display: 'swap',
})

const merriweather = localFont({
	src: '../shared/assets/fonts/merriweather.woff2',
	variable: '--font-serif',
	display: 'swap',
})

export const metadata: Metadata = {
	title: { absolute: 'Платежки', template: '%s | Платежки' },
	description: 'Учебный проект для демонстрации работы с платежными системами и провайдерами',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='en'
			className={cn('h-full', 'antialiased', 'font-serif', merriweather.variable, geistMonoHeading.variable)}
			suppressHydrationWarning
		>
			<body>
				<MainProvider>
					<div className='relative flex min-h-screen flex-col'>
						<ToggleTheme />
						<div className='flex min-h-full flex-col'>{children}</div>
					</div>
				</MainProvider>
			</body>
		</html>
	)
}
