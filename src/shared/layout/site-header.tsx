import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { Button } from '../components'

interface SiteHeaderProps {
	isAuth: boolean
}

export const SiteHeader: FC<SiteHeaderProps> = ({ isAuth }) => {
	return (
		<header className='w-full px-6 py-4'>
			<div className='mx-auto flex max-w-7xl items-center justify-between'>
				<div className='flex items-center gap-x-2'>
					<Image src='/images/logo.svg' alt='Payment' priority width={30} height={40} />
					<span className='text-xl font-semibold text-gray-800'>Payments</span>
				</div>
				<div className='flex items-center gap-x-4'>
					{isAuth ? (
						<Button size='sm'>
							<Link href='/dashboard'>Личный кабинет</Link>
						</Button>
					) : (
						<>
							<Button size='sm' variant='ghost'>
								<Link href='/auth/login'>Войти</Link>
							</Button>
							<Button size='sm'>
								<Link href='/auth/register'>Регистрация</Link>
							</Button>
						</>
					)}
				</div>
			</div>
		</header>
	)
}
