import { LucideIcon } from 'lucide-react'

import { InitPaymentRequestProvider } from './generated'

export interface PaymentMethod {
	id: InitPaymentRequestProvider
	name: string
	description: string
	icon: LucideIcon
	bg: string
	textColor: string
}
