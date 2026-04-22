import { FC } from 'react'

import { Badge } from '@/shared/components'
import { SubscriptionResponseStatus, TransactionReponseStatus } from '@/shared/types'

interface SubscriptionStatusBadgeProps {
	status: SubscriptionResponseStatus
}

export const SubscriptionStatusBadge: FC<SubscriptionStatusBadgeProps> = ({ status }) => {
	switch (status) {
		case SubscriptionResponseStatus.ACTIVE:
			return <Badge>Активна</Badge>
		case SubscriptionResponseStatus.EXPIRED:
			return <Badge variant='destructive'>Истекла</Badge>
		case SubscriptionResponseStatus.PENDING_PAYMENT:
			return <Badge variant='secondary'>Ожидает оплаты</Badge>
		default:
			return <Badge variant='outline'>{status}</Badge>
	}
}

interface PaymentStatusBadgeProps {
	status: TransactionReponseStatus
}

export const PaymentStatusBadge: FC<PaymentStatusBadgeProps> = ({ status }) => {
	switch (status) {
		case TransactionReponseStatus.SUCCESS:
			return <Badge>Успешно</Badge>
		case TransactionReponseStatus.FAILED:
			return <Badge variant='destructive'>Ошибка</Badge>
		case TransactionReponseStatus.PENDING:
			return <Badge variant='secondary'>Ожидание</Badge>
		default:
			return <Badge variant='outline'>{status}</Badge>
	}
}
