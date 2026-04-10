import { UseFormSetError } from 'react-hook-form'
import { toast } from 'sonner'

import { useSessionStore } from '@/entities/session'

import { useAuthControllerLogin } from '@/shared/api/generated/authentification/authentification'
import { toastMessageHandler } from '@/shared/utils'

import { TypeLoginSchema } from '../model'

export const useLoginMutation = (setError: UseFormSetError<TypeLoginSchema>) => {
	const setSession = useSessionStore(s => s.setSession)

	return useAuthControllerLogin({
		mutation: {
			onSuccess: data => {
				setSession(data.accessToken)
				toast.success('Вы успешно вошли в аккаунт')
			},
			onError: (error: any) => {
				const backendError = error.response?.data

				if (backendError?.fields && Array.isArray(backendError.fields)) {
					backendError.fields.forEach((field: any) => {
						setError(field as any, {
							type: 'server',
							message: backendError.message,
						})
					})
				}

				toastMessageHandler(backendError)
			},
		},
	})
}
