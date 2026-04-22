import { DashboardHeader, PaymentHistory, SubscriptionInfo } from '@/widgets/dashboard'

export default function DashboardPage() {
	return (
		<div className='min-h-screen px-4 py-8'>
			<div className='mx-auto max-w-6xl space-y-8'>
				<DashboardHeader />

				<div className='grid gap-8 lg:grid-cols-3'>
					<div className='lg:col-span-1'>
						<SubscriptionInfo />
					</div>

					<div className='lg:col-span-2'>
						<PaymentHistory />
					</div>
				</div>
			</div>
		</div>
	)
}
