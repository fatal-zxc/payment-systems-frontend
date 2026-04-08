import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { TypeRegisterSchema } from '../model'

import { register } from './register'

export const useRegisterMutation = (setError: UseFormSetError<TypeRegisterSchema>) => {
	return useMutation({
		mutationKey: ['register'],
		mutationFn: register,
		onSuccess: () => {
			toast.success('Вы успешно создали аккаунт')
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
