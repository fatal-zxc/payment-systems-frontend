import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { companies } from '@/shared/data'

export const TrustedBySection: FC = () => {
	return (
		<section className='bg-gray-50 py-16'>
			<div className='mx-auto max-w-7xl'>
				<div className='mb-12 text-center'>
					<h2 className='mb-4 text-3xl font-bold text-gray-900'>Нам доверяют лидеры</h2>
					<p className='text-gray-600'>Присоединяйтесь к тысячам компаний, которые уже используют нашу платформу</p>
				</div>

				<div className='grid grid-cols-2 items-center gap-10 md:grid-cols-3 lg:grid-cols-6'>
					{companies.map(company => (
						<Link className='flex items-center justify-center' key={company.name} href={company.website} target='_blank'>
							<div className='relative h-25 w-37.5'>
								<Image src={`/images/companies/${company.logo}`} alt={company.name} loading='eager' fill className='object-contain' />
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	)
}
