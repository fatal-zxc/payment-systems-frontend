'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { initPaymentSchema, TypeInitPaymentSchema } from '@/entities/payment'

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	Field,
	FieldGroup,
	FieldLabel,
	Label,
	RadioGroup,
	RadioGroupItem,
} from '@/shared/components'
import { paymentMethods } from '@/shared/data'
import { cn } from '@/shared/lib/utils'
import { InitPaymentRequestBillingPeriod, InitPaymentRequestProvider, PlanResponse } from '@/shared/types'

import { useInitPaymentMutation } from '../api'

interface PaymentModalProps {
	isOpen: boolean
	onClose: () => void
	plan: PlanResponse
	price: number
	billingPeriod: InitPaymentRequestBillingPeriod
}

export const PaymentModal: FC<PaymentModalProps> = ({ isOpen, onClose, plan, price, billingPeriod }) => {
	const form = useForm<TypeInitPaymentSchema>({
		resolver: zodResolver(initPaymentSchema),
		defaultValues: {
			planId: plan.id,
			provider: InitPaymentRequestProvider.YOOKASSA,
			billingPeriod,
		},
	})

	const { mutate, isPending } = useInitPaymentMutation(onClose)

	const { isValid } = form.formState

	const onSubmit = (data: TypeInitPaymentSchema) => {
		mutate({ data })
	}

	return (
		<Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Оплата</DialogTitle>
					<DialogDescription>
						Тариф &quot;{plan.title}&quot; - {price} &#8381; / {billingPeriod === InitPaymentRequestBillingPeriod.MONTHLY ? 'месяц' : 'год'}
					</DialogDescription>
				</DialogHeader>

				<form id='init-payment-form' onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						<Controller
							name='provider'
							control={form.control}
							render={({ field }) => (
								<Field>
									<FieldLabel></FieldLabel>
									<RadioGroup onValueChange={field.onChange} value={field.value} className='flex flex-col space-y-2'>
										{paymentMethods.map(method => {
											const isSelected = String(field.value) === method.id

											return (
												<div key={method.id} className='flex items-center gap-3'>
													<RadioGroupItem value={method.id} id={method.id} className='sr-only hidden' />
													<Label
														className={cn(
															'w-full gap-4 border-2 p-4 transition-all duration-200',
															isSelected ? 'border-primary bg-primary/15' : 'border-border hover:border-muted-foreground'
														)}
														htmlFor={method.id}
													>
														<div className={cn('flex size-10 items-center justify-center', isSelected ? 'bg-primary' : method.bg)}>
															<method.icon className={cn('size-5', isSelected ? 'text-white' : method.textColor)} />
														</div>

														<div className='flex-1'>
															<h3
																className={cn(
																	'text-base font-semibold tracking-wide',
																	isSelected ? 'text-primary' : 'text-secondary-foreground/70'
																)}
															>
																{method.name}
															</h3>
															<p className={cn('mt-1 text-sm text-muted-foreground')}>{method.description}</p>
														</div>
													</Label>
												</div>
											)
										})}
									</RadioGroup>
								</Field>
							)}
						/>
					</FieldGroup>
					<div className='grid grid-cols-2 gap-x-3 pt-4'>
						<Button type='button' variant='outline' size='lg' onClick={onClose}>
							Отмена
						</Button>
						<Button type='submit' size='lg' disabled={!isValid || isPending}>
							Продолжить
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
