import { useRef } from 'react'
import { create } from 'zustand'

import { apiClient, setInstanceAccessToken } from '@/shared/api/instance'

interface SessionState {
	isAuth: boolean
	accessToken: string | null
	setSession: (token: string | null) => void
	logout: () => Promise<void>
}

export const useSessionStore = create<SessionState>(set => ({
	isAuth: false,
	accessToken: null,
	setSession: token => {
		setInstanceAccessToken(token)
		set({ accessToken: token, isAuth: !!token })
	},
	logout: async () => {
		try {
			await apiClient.post('/auth/logout')
		} catch (e) {
			console.log('Ошибка при выходе', e)
		} finally {
			setInstanceAccessToken(null)
			set({ accessToken: null, isAuth: false })
		}
	},
}))

export const SessionStoreSync = ({ isAuth }: { isAuth: boolean }) => {
	const initialized = useRef(false)

	if (!initialized.current) {
		useSessionStore.setState({ isAuth })
		initialized.current = true
	}

	return null
}
