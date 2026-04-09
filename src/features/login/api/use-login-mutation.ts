import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { TypeLoginSchema } from '../model'

import { login } from './'

export const useLoginMutation = (setError: UseFormSetError<TypeLoginSchema>) => {
	return useMutation({
		mutationKey: ['login'],
		mutationFn: login,
		onSuccess: () => {
			toast.success('Вы успешно вошли в аккаунт')
		},
		onError: (error: any) => {
			const backendError = error.response?.data

			if (backendError?.fields && Array.isArray(backendError.fields)) {
				backendError.fields.forEach((field: any) => {
					setError(field, {
						type: 'server',
						message: backendError.message,
					})
				})
			}

			toastMessageHandler(backendError)
		},
	})
}
