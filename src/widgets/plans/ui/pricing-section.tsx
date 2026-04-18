'use client'

import { CheckIcon } from 'lucide-react'
import { FC, useState } from 'react'

import { Button, Card, Switch } from '@/shared/components'
import { LayoutIconOne, LayoutIconThree, LayoutIconTwo } from '@/shared/icons'
import { cn } from '@/shared/lib/utils'
import { PlanResponse } from '@/shared/types'

interface PricingSectionProps {
	plans: PlanResponse[]
}

export const PricingSection: FC<PricingSectionProps> = ({ plans }) => {
	const [isYearly, setIsYearly] = useState(false)

	const icons = [
		<LayoutIconOne className='size-9' key={0} />,
		<LayoutIconTwo className='size-9' key={1} />,
		<LayoutIconThree className='size-9' key={2} />,
	]

	const calculateYearlyDiscount = (monthlyPrice: number, yearlyPrice: number) => {
		const yearlyMonth = yearlyPrice / 12

		const discount = ((monthlyPrice - yearlyMonth) / monthlyPrice) * 100

		return Math.round(discount)
	}

	return (
		<section className='px-6 pb-20'>
			<div className='mx-auto max-w-7xl'>
				<div className='mb-12 flex justify-center'>
					<div className='flex flex-col items-center gap-4'>
						<div className='flex items-center gap-3 px-4 py-2'>
							<span className={cn('text-sm font-medium transition-colors', isYearly ? 'text-gray-500' : 'text-gray-900')}>Месячно</span>

							<Switch checked={isYearly} onCheckedChange={setIsYearly} />

							<span className={cn('text-sm font-medium transition-colors', !isYearly ? 'text-gray-500' : 'text-gray-900')}>Годовая</span>
						</div>

						{isYearly && <div className='rounded-lg bg-primary px-3 py-1 text-xs font-medium text-white'>Экономия 20%</div>}
					</div>
				</div>

				<div className='grid gap-8 md:grid-cols-3'>
					{plans.map((plan, index) => {
						const displayPrice = isYearly ? Math.round(plan.yearlyPrice / 12) : plan.monthlyPrice

						return (
							<Card
								key={plan.id}
								className={cn(
									'relative rounded-3xl border-0 bg-card p-8 shadow-lg backdrop-blur-sm',
									plan.isFeatured && 'transform shadow-xl ring-2 ring-primary ring-offset-2'
								)}
							>
								<div className='mb-6'>
									<div className='mb-4 flex size-12 items-center justify-center rounded-2xl border-2 border-primary-foreground bg-primary-foreground text-2xl shadow-md'>
										{icons[index]}
									</div>

									<h3 className='mb-2 text-2xl font-bold text-gray-900'>{plan.title}</h3>

									<p className='mb-6 text-sm text-gray-600'>{plan.description}</p>

									<div className='mb-6'>
										<div className='flex items-baseline gap-1'>
											<span className='text-4xl font-bold text-gray-900'>{displayPrice} &#8381;</span>
											<span className='text-gray-500'>/ в месяц</span>
										</div>
										{isYearly ? (
											<div className='mt-1 text-sm text-gray-500'>{plan.yearlyPrice} &#8381; в год</div>
										) : (
											<div className='mt-1 text-xs text-gray-500'>Останавливайте и отменяйте подписку в любой момент</div>
										)}
										{isYearly && (
											<div className='mt-1 text-sm text-gray-500'>
												Оплата за весь год, экономия {calculateYearlyDiscount(plan.monthlyPrice, plan.yearlyPrice)}%
											</div>
										)}
									</div>

									<Button size='lg' className='w-full'>
										Выбрать тариф
									</Button>
								</div>

								<div className='space-y-4'>
									<h4 className='mb-4 font-semibold text-gray-900'>В тариф входит:</h4>

									{plan.features.map((feature, index) => (
										<div key={index} className='flex items-start gap-x-3'>
											<div className='flex size-5 items-center justify-center rounded-full bg-primary'>
												<CheckIcon className='size-3 text-white' />
											</div>
											<span className='text-sm text-gray-700'>{feature}</span>
										</div>
									))}
								</div>
							</Card>
						)
					})}
				</div>
			</div>
		</section>
	)
}
