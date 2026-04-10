'use client'

import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useSessionStore } from '@/entities/session'

import { subscribeToRefresh } from '@/shared/api/instance'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const setSession = useSessionStore(s => s.setSession)
	const [isInitializing, setIsInitializing] = useState(true)

	useEffect(() => {
		subscribeToRefresh(
			token => setSession(token),
			() => {
				useSessionStore.setState({ isAuth: false, accessToken: null })
			}
		)

		const initAuth = async () => {
			try {
				const res = await axios.post(
					`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`,
					{},
					{
						withCredentials: true,
					}
				)
				setSession(res.data.accessToken)
			} catch {
			} finally {
				setIsInitializing(false)
			}
		}

		initAuth()
	}, [setSession])

	if (isInitializing) {
		return (
			<div className='flex min-h-screen items-center justify-center gap-3'>
				<p>Загрузка...</p>
				<Loader2 className='animate-spin' />
			</div>
		)
	}

	return <>{children}</>
}
