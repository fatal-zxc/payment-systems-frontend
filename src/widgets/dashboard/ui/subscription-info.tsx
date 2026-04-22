'use client'

import { CreditCardIcon, CrownIcon, ZapIcon } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'

import { ToggleAutoRenewal } from '@/features/toggle-auto-renewal'

import { useUsersControllerGetMe } from '@/shared/api'
import { Button, Skeleton } from '@/shared/components'
import { SubscriptionResponseStatus } from '@/shared/types'
import { formatDate } from '@/shared/utils'

import { SubscriptionStatusBadge } from './badges'
import { SubscriptionCard } from './subscription-card'

export const SubscriptionInfo: FC = () => {
	const { data: user, isPending: isPendingUser } = useUsersControllerGetMe()

	if (isPendingUser || !user) return <SubscriptionInfoSkeleton />

	if (!user.subscription) {
		return (
			<SubscriptionCard
				icon={ZapIcon}
				iconBg='bg-gray-100'
				iconColor='text-gray-400'
				title='У вас нет активной подписки'
				description='Оформите подписку, чтобы получить доступ ко всем функциям и возможностям платформы'
				action={
					<Button variant='gradient' className='w-full p-0'>
						<Link href='/' transitionTypes={['fade']} className='flex h-full flex-1 items-center justify-center gap-2'>
							<CrownIcon />
							Выбрать тариф
						</Link>
					</Button>
				}
			/>
		)
	}

	if (user.subscription.status === SubscriptionResponseStatus.PENDING_PAYMENT) {
		return (
			<SubscriptionCard
				icon={CreditCardIcon}
				iconBg='bg-yellow-100'
				iconColor='text-yellow-600'
				title='Ожидается оплата'
				description={
					<>
						Вы выбрали тариф <strong className='font-semibold'>{user.subscription.plan.title}</strong>, но оплата еще не подтверждена.
					</>
				}
			/>
		)
	}

	if (user.subscription.status === SubscriptionResponseStatus.EXPIRED) {
		return (
			<SubscriptionCard
				icon={ZapIcon}
				iconBg='bg-yellow-100'
				iconColor='text-yellow-600'
				title='Ваша подписка истекла'
				description='Чтобы продолжить пользоваться всеми функциями, продлите текущий тариф или выберите новый.'
				action={
					<Button variant='gradient' className='w-full p-0'>
						<Link href='/' transitionTypes={['fade']} className='flex h-full flex-1 items-center justify-center gap-2'>
							<CrownIcon />
							Продлить подписку
						</Link>
					</Button>
				}
			/>
		)
	}

	return (
		<SubscriptionCard action={<ToggleAutoRenewal isAutoRenewal={user.isAutoRenewal} className='w-full' />}>
			<div className='flex justify-between'>
				<span className='text-base text-muted-foreground'>Тариф:</span>
				<span className='text-base'>{user.subscription.plan.title}</span>
			</div>

			<div className='flex justify-between'>
				<span className='text-base text-muted-foreground'>Статус:</span>
				<SubscriptionStatusBadge status={user.subscription.status} />
			</div>

			<div className='flex justify-between'>
				<span className='text-base text-muted-foreground'>Следующий платеж:</span>
				<span className='text-base'>{formatDate(user.subscription.endDate)}</span>
			</div>

			<div className='border-t pt-4'>
				<div className='flex items-center gap-2'>
					<CreditCardIcon className='size-4 text-gray-500' />
					<span className='text-sm font-medium'>Автосписание</span>
				</div>
				<p className='mt-2 text-xs text-muted-foreground'>
					{user.isAutoRenewal ? 'Платежи будут списываться автоматически' : 'Вы будете получать уведомления о необходимости оплаты'}
				</p>
			</div>
		</SubscriptionCard>
	)
}

const SubscriptionInfoSkeleton: FC = () => {
	return (
		<SubscriptionCard>
			<div className='flex items-center justify-between'>
				<Skeleton className='h-4 w-12' />
				<Skeleton className='h-4 w-20' />
			</div>

			<div className='flex items-center justify-between'>
				<Skeleton className='h-4 w-14' />
				<Skeleton className='h-5 w-16' />
			</div>

			<div className='flex items-center justify-between'>
				<Skeleton className='h-4 w-32' />
				<Skeleton className='h-4 w-20' />
			</div>

			<div className='border-t pt-4'>
				<div className='flex items-center gap-4'>
					<Skeleton className='h-4 w-4' />
					<Skeleton className='h-4 w-20' />
				</div>
				<Skeleton className='mt-2 h-3 w-64' />
			</div>

			<Skeleton className='h-10 w-full' />
		</SubscriptionCard>
	)
}
