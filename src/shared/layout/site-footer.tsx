import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { companyLinks, productLinks, supportLinks } from '../data'

export const SiteFooter: FC = () => {
	return (
		<footer className='bg-gray-900 py-16 text-white'>
			<div className='mx-auto max-w-7xl'>
				<div className='grid gap-8 md:grid-cols-4'>
					<div className=''>
						<div className='mb-2 flex items-center gap-x-2'>
							<Image src='/images/logo.svg' alt='Payment' priority width={30} height={40} />
							<span className='text-xl font-semibold text-white'>Payments</span>
						</div>
						<p className='mb-6 text-gray-400'>Payments - сервис, в котором есть все</p>
					</div>

					<div>
						<h3 className='mb-4 font-semibold'>Продукт</h3>

						<ul className='space-y-2 text-gray-400'>
							{productLinks.map(link => (
								<li key={link.title}>
									<Link href={link.href} className='transition-colors hover:text-white'>
										{link.title}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className='mb-4 font-semibold'>О компании</h3>

						<ul className='space-y-2 text-gray-400'>
							{companyLinks.map(link => (
								<li key={link.title}>
									<Link href={link.href} className='transition-colors hover:text-white'>
										{link.title}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className='mb-4 font-semibold'>Поддержка</h3>

						<ul className='space-y-2 text-gray-400'>
							{supportLinks.map(link => (
								<li key={link.title}>
									<Link href={link.href} className='transition-colors hover:text-white'>
										{link.title}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</footer>
	)
}
