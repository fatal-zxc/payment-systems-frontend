'use client'

import { useRouter } from 'next/navigation'

import { usePaymentControllerInit } from '@/shared/api/generated/payment/payment'
import { toastMessageHandler } from '@/shared/utils'

export const useInitPaymentMutation = (onClose: () => void) => {
	const router = useRouter()
	return usePaymentControllerInit({
		mutation: {
			onSuccess: data => {
				onClose()
				router.push(data.url)
			},
			onError: (error: any) => {
				const backendError = error.response?.data

				toastMessageHandler(backendError)
			},
		},
	})
}
