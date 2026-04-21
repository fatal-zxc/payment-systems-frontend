import z from 'zod'

import { InitPaymentRequestBillingPeriod, InitPaymentRequestProvider } from '@/shared/types'

export const initPaymentSchema = z.object({
	planId: z.string(),
	provider: z.enum(InitPaymentRequestProvider),
	billingPeriod: z.enum(InitPaymentRequestBillingPeriod),
})

export type TypeInitPaymentSchema = z.infer<typeof initPaymentSchema>
