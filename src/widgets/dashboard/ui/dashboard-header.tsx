'use client'

import { UserIcon } from 'lucide-react'
import { FC } from 'react'

import { useUsersControllerGetMe } from '@/shared/api'

export const DashboardHeader: FC = () => {
	const { data: user, isPending: isPendingUser } = useUsersControllerGetMe()

	return (
		<header className='flex items-center justify-between'>
			<div>
				<h1 className='font-heading text-3xl'>Личный кабинет</h1>
				<p className='mt-1 text-muted-foreground'>Управляйте своей подпиской и платежами</p>
			</div>

			<div className='flex items-center gap-3'>
				<div className='flex size-10 items-center justify-center rounded-full bg-primary'>
					<UserIcon className='size-5 text-white' />
				</div>

				<div>
					{isPendingUser || !user ? (
						'Загрузка...'
					) : (
						<>
							<p className='font-medium text-muted-foreground'>{user.name}</p>
							<p className='text-sm text-muted-foreground/70'>{user.email}</p>
						</>
					)}
				</div>
			</div>
		</header>
	)
}
