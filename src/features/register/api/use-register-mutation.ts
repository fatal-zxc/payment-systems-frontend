import { UseFormSetError } from 'react-hook-form'
import { toast } from 'sonner'

import { useAuthControllerRegister } from '@/shared/api/generated/authentification/authentification'
import { toastMessageHandler } from '@/shared/utils'

import { TypeRegisterSchema } from '../model'

export const useRegisterMutation = (setError: UseFormSetError<TypeRegisterSchema>) => {
	return useAuthControllerRegister({
		mutation: {
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
		},
	})
}
