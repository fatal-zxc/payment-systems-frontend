import { LucideIcon } from 'lucide-react'
import { FC, PropsWithChildren, ReactNode } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components'
import { cn } from '@/shared/lib/utils'

interface SubscriptionCardProps {
	icon?: LucideIcon
	iconBg?: string
	iconColor?: string
	title?: string
	description?: ReactNode
	action?: ReactNode
}

export const SubscriptionCard: FC<PropsWithChildren<SubscriptionCardProps>> = ({
	icon: Icon,
	iconBg,
	iconColor,
	title,
	description,
	action,
	children,
}) => {
	return (
		<Card className='gap-0'>
			<CardHeader>
				<CardTitle className='font-heading text-xl'>Подписка</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div className='text-center'>
					{Icon && (
						<div className={cn('mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-muted', iconBg)}>
							<Icon className={cn('size-8', iconColor)} />
						</div>
					)}
					{title && <h3 className='mb-2 font-heading text-lg'>{title}</h3>}
					{description && <p className='mb-6 text-sm text-muted-foreground'>{description}</p>}
				</div>
				{children}
				{action}
			</CardContent>
		</Card>
	)
}
