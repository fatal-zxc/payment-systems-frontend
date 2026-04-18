'use client'

import axios from 'axios'
import { FC, PropsWithChildren, useEffect, useRef } from 'react'

import { SessionStoreSync, useSessionStore } from '@/entities/session'

import { subscribeToRefresh } from '@/shared/api/instance'

interface AuthProviderProps {
	initialAuth: boolean
}

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({ initialAuth, children }) => {
	return (
		<>
			<SessionStoreSync isAuth={initialAuth} />
			<AuthLogicWrapper>{children}</AuthLogicWrapper>
		</>
	)
}

export const AuthLogicWrapper: FC<PropsWithChildren> = ({ children }) => {
	const setSession = useSessionStore(s => s.setSession)
	const isInitialized = useRef(false)

	useEffect(() => {
		subscribeToRefresh(
			token => setSession(token),
			() => {
				useSessionStore.setState({ isAuth: false, accessToken: null })
			}
		)

		const initAuth = async () => {
			if (isInitialized.current) return
			isInitialized.current = true

			try {
				const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`, {}, { withCredentials: true })
				setSession(res.data.accessToken)
			} catch {}
		}

		initAuth()
	}, [setSession])

	return <>{children}</>
}
