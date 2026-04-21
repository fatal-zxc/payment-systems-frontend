'use client'

import { CheckCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'

import { PaymentSuccessSkeleton } from '@/entities/payment'

import { usePaymentControllerGetById } from '@/shared/api/generated/payment/payment'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/components'
import { TransactionReponseBillingPeriod } from '@/shared/types'

// export const metadata: Metadata = {
// 	title: 'Успешная оплата',
// }

export default function PaymentSuccessPage() {
	const { id } = useParams<{ id: string }>()

	const { data: payment, isPending: isLoadingPayment, isError } = usePaymentControllerGetById(id)

	if (isLoadingPayment) {
		return <PaymentSuccessSkeleton />
	}

	if (isError || !payment) {
		notFound()
	}

	const plan = payment?.userSubscription.plan

	const price = payment.billingPeriod === TransactionReponseBillingPeriod.MONTHLY ? plan.monthlyPrice : plan.yearlyPrice
	const periodShort = payment.billingPeriod === TransactionReponseBillingPeriod.MONTHLY ? 'в месяц' : 'в год'
	const period = payment.billingPeriod === TransactionReponseBillingPeriod.MONTHLY ? 'Ежемесячно' : 'Ежегодно'

	return (
		<div className='flex min-h-screen items-center justify-center bg-muted'>
			<Card className='w-full max-w-md'>
				<CardHeader>
					<div className='mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-100'>
						<CheckCircleIcon className='size-8 text-green-600' />
					</div>
					<CardTitle className='text-center text-lg'>Оплата прошла успешно!</CardTitle>
					<CardDescription className='text-center'>Спасибо за покупку. Ваша подписка активирована.</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='p-4 text-left'>
						<h3 className='mb-2 font-heading text-sm'>Детали заказа:</h3>
						<div className='space-y-1 text-sm'>
							<div className='flex justify-between'>
								<span>Тариф:</span>
								<span className='font-medium'>{plan.title}</span>
							</div>
							<div className='flex justify-between'>
								<span>Стоимость:</span>
								<span className='font-medium'>
									{price}&#8381; / {periodShort}
								</span>
							</div>
							<div className='flex justify-between'>
								<span>Период оплаты:</span>
								<span className='font-medium'>{period}</span>
							</div>
							<div className='flex justify-between'>
								<span>ID транзакции:</span>
								<span className='font-heading text-xs'>{payment.id}</span>
							</div>
						</div>
					</div>
				</CardContent>
				<CardFooter className='grid grid-rows-2 gap-4'>
					<Button size='lg' variant='default'>
						<Link href='/dashboard'>Перейти в личный кабинет</Link>
					</Button>
					<p className='text-center text-xs text-muted-foreground'>
						Чек отправлен на вашу электронную почту. Если у вас есть вопросы, обратитесь в службу поддержки.
					</p>
				</CardFooter>
			</Card>
		</div>
	)
}
