import { Card, CardContent, CardFooter, CardHeader, Skeleton } from '@/shared/components'

export const PaymentSuccessSkeleton = () => {
	return (
		<div className='flex min-h-screen items-center justify-center bg-muted p-4'>
			<Card className='w-full max-w-md shadow-lg'>
				<CardHeader>
					{/* Круг иконки */}
					<Skeleton className='mx-auto mb-4 size-16 rounded-full' />
					{/* Заголовок "Оплата прошла успешно!" */}
					<Skeleton className='mx-auto h-7 w-3/4 rounded' />
					{/* Описание под заголовком */}
					<Skeleton className='mx-auto mt-2 h-4 w-5/6 rounded' />
				</CardHeader>

				<CardContent>
					<div className='space-y-4 p-4'>
						{/* Заголовок "Детали заказа:" */}
						<Skeleton className='h-5 w-32 rounded' />

						<div className='space-y-3'>
							{/* Строка Тариф */}
							<div className='flex items-center justify-between'>
								<Skeleton className='h-4 w-16 rounded' />
								<Skeleton className='h-5 w-40 rounded' />
							</div>

							{/* Строка Стоимость */}
							<div className='flex items-center justify-between'>
								<Skeleton className='h-4 w-24 rounded' />
								<Skeleton className='h-5 w-36 rounded' />
							</div>

							{/* Строка Период оплаты */}
							<div className='flex items-center justify-between'>
								<Skeleton className='h-4 w-32 rounded' />
								<Skeleton className='h-5 w-28 rounded' />
							</div>

							{/* Строка ID транзакции */}
							<div className='flex items-center justify-between'>
								<Skeleton className='h-4 w-32 rounded' />
								<Skeleton className='h-4 w-60 rounded' />
							</div>
						</div>
					</div>
				</CardContent>

				<CardFooter className='grid grid-rows-2 gap-4'>
					{/* Кнопка "Перейти в личный кабинет" */}
					<Skeleton className='h-11 w-full rounded-md' />

					{/* Текст про чек внизу */}
					<div className='space-y-2'>
						<Skeleton className='h-3 w-full rounded' />
						<Skeleton className='h-3 w-3/4 rounded' />
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}
