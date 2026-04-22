'use client'

import { CreditCardIcon } from 'lucide-react'
import { FC } from 'react'
import * as xlsx from 'xlsx'

import { usePaymentControllerGetHistory } from '@/shared/api/generated/payment/payment'
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/components'
import { TransactionReponseProvider } from '@/shared/types'
import { formatDate } from '@/shared/utils'

import { PaymentStatusBadge } from './badges'

export const PaymentHistory: FC = () => {
	const { data: payments, isPending: isPendingPayments } = usePaymentControllerGetHistory()

	const providerNames: Record<TransactionReponseProvider, string> = {
		YOOKASSA: 'Юкасса',
		CRYPTOPAY: 'CryptoPay',
		STRIPE: 'Stripe',
	}

	const handleExport = () => {
		if (!payments) return

		const data = payments.map(payment => ({
			ID: payment.id,
			Дата: formatDate(payment.createdAt),
			Сумма: `${payment.amount} ₽`,
			Провайдер: providerNames[payment.provider],
			Статус: payment.status,
		}))

		const worksheet = xlsx.utils.json_to_sheet(data)

		worksheet['!cols'] = [{ wch: 25 }, { wch: 12 }, { wch: 6 }, { wch: 12 }, { wch: 12 }]

		const workbook = xlsx.utils.book_new()
		xlsx.utils.book_append_sheet(workbook, worksheet, 'История платежей')

		const buffer = xlsx.write(workbook, {
			bookType: 'xlsx',
			type: 'array',
		})

		const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

		const link = document.createElement('a')

		link.href = URL.createObjectURL(blob)
		link.setAttribute('download', 'payment-history.xlsx')
		document.body.append(link)
		link.click()
		link.remove()
	}

	if (isPendingPayments || !payments) return <PaymentHistorySkeleton />

	return (
		<Card className=''>
			<CardHeader className='flex items-center justify-between'>
				<CardTitle className='font-heading text-lg'>История платежей</CardTitle>
				{payments.length !== 0 && (
					<Button onClick={handleExport} variant='outline' size='sm'>
						Экспорт
					</Button>
				)}
			</CardHeader>
			<CardContent className='overflow-x-auto'>
				{payments.length !== 0 ? (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>ID</TableHead>
								<TableHead>Дата</TableHead>
								<TableHead>Статус</TableHead>
								<TableHead>Провайдер</TableHead>
								<TableHead className='text-right'>Сумма</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{payments.map(payment => (
								<TableRow key={payment.id}>
									<TableCell className='font-heading'>{payment.id}</TableCell>
									<TableCell>{formatDate(payment.createdAt)}</TableCell>
									<TableCell>
										<PaymentStatusBadge status={payment.status} />
									</TableCell>
									<TableCell>{payment.provider}</TableCell>
									<TableCell className='text-right'>{payment.amount} &#8381;</TableCell>
								</TableRow>
							))}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TableCell colSpan={4}>Всего</TableCell>
								<TableCell className='text-right'>{payments.reduce((acc, item) => acc + item.amount, 0)} &#8381;</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				) : (
					<div className='py-12 text-center'>
						<CreditCardIcon className='mx-auto mb-4 h-12 w-12 text-gray-300' />
						<h3 className='mb-2 text-lg font-semibold'>Нет истории платежей</h3>
						<p className='text-muted-foreground'>Ваши платежи будут отображаться здесь</p>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

const PaymentHistorySkeleton: FC = () => {
	return (
		<Card>
			<CardHeader className='flex items-center justify-between'>
				<CardTitle className='font-heading text-lg'>История платежкй</CardTitle>
				<Skeleton className='h-8 w-20' />
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>Дата</TableHead>
							<TableHead>Статус</TableHead>
							<TableHead>Провайдер</TableHead>
							<TableHead className='text-right'>Сумма</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Array.from({ length: 8 }).map((_, index) => (
							<TableRow key={index}>
								<TableCell className='font-heading'>
									<Skeleton className='h-4 w-16' />
								</TableCell>
								<TableCell>
									<Skeleton className='h-4 w-20' />
								</TableCell>
								<TableCell>
									<Skeleton className='h-4 w-16' />
								</TableCell>
								<TableCell>
									<Skeleton className='h-4 w-14' />
								</TableCell>
								<TableCell className='text-right'>
									<Skeleton className='h-4 w-16' />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell colSpan={4}>Всего</TableCell>
							<TableCell className='text-right'>
								<Skeleton className='h-4 w-16' />
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</CardContent>
		</Card>
	)
}
