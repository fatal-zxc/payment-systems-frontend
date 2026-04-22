import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { getUsersControllerGetMeQueryKey, useUsersControllerUpdateAutoRenewal } from '@/shared/api'
import { toastMessageHandler } from '@/shared/utils'

export const useToggleAutoRenewal = () => {
	const queryClient = useQueryClient()

	const userKey = getUsersControllerGetMeQueryKey()

	return useUsersControllerUpdateAutoRenewal({
		mutation: {
			onMutate: async ({ data }) => {
				await queryClient.cancelQueries({ queryKey: userKey })

				const previousUser = queryClient.getQueryData(userKey)

				queryClient.setQueryData(userKey, (old: any) => {
					if (!old) return old
					return {
						...old,
						isAutoRenewal: data.isAutoRenewal,
					}
				})

				return { previousUser }
			},
			onSuccess: data => {
				toast.success(`Вы успешно ${data.isAutoRenewal ? 'включили' : 'отключили'} автосписание`)
			},
			onError: (error: any, variables, context) => {
				if (context?.previousUser) {
					queryClient.setQueryData(userKey, context.previousUser)
				}

				const backendError = error.response?.data
				toastMessageHandler(backendError)
			},
			onSettled: () => {
				queryClient.invalidateQueries({ queryKey: userKey })
			},
		},
	})
}
