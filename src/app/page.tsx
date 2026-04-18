import { unstable_cache } from 'next/cache'
import { cookies } from 'next/headers'

import { Header } from '@/widgets/header'
import { PricingSection } from '@/widgets/plans'

import { planControllerGetAll } from '@/shared/api'
import { FAQSection, HeroSection, TrustedBySection } from '@/shared/components'
import { SiteFooter } from '@/shared/layout'

const getCachedPlans = unstable_cache(async () => planControllerGetAll(), ['plans-cache-key'], { revalidate: 60 * 60, tags: ['plans'] })

export default async function Home() {
	const plans = await getCachedPlans()
	const cookieStore = await cookies()
	const hasRefreshToken = cookieStore.has('refreshToken')

	return (
		<div className='min-h-screen'>
			<div className='w-full bg-linear-to-b from-white via-primary/15 to-primary/25'>
				<Header initialAuth={hasRefreshToken} />
				<HeroSection />
				<PricingSection plans={plans} />
			</div>
			<TrustedBySection />
			<FAQSection />
			<SiteFooter />
		</div>
	)
}
