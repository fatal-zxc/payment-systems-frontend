import { CreditCardIcon } from 'lucide-react'
import { FC } from 'react'

import { Button } from '@/shared/components'
import { cn } from '@/shared/lib/utils'

import { useToggleAutoRenewal } from '../api'

interface ToggleAutoRenewalProps {
	isAutoRenewal: boolean
	className?: string
}

export const ToggleAutoRenewal: FC<ToggleAutoRenewalProps> = ({ isAutoRenewal, className }) => {
	const { mutate, isPending } = useToggleAutoRenewal()
	return (
		<Button
			className={cn('', className)}
			disabled={isPending}
			onClick={() => mutate({ data: { isAutoRenewal: !isAutoRenewal } })}
			variant='outline'
		>
			{isAutoRenewal ? 'Отключить' : 'Включить'}
		</Button>
	)
}
