'use client'

import { FC } from 'react'

import { useSessionStore } from '@/entities/session'

import { SiteHeader } from '@/shared/layout'

interface HeaderProps {
	initialAuth: boolean
}

export const Header: FC<HeaderProps> = ({ initialAuth }) => {
	const isAuth = useSessionStore(s => s.isAuth)

	return <SiteHeader isAuth={isAuth || initialAuth} />
}
