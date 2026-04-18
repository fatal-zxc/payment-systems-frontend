import { FC } from 'react'

import { faqs } from '../data'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Card } from './ui'

export const FAQSection: FC = () => {
	return (
		<section className='bg-gray-50 py-20'>
			<div className='mx-auto max-w-4xl'>
				<div className='mb-12 text-center'>
					<h2 className='mb-4 text-3xl font-bold text-gray-900'>Часто задаваемые вопросы</h2>
					<p className='text-gray-600'>Все что нужно знать о наших тарифах</p>
				</div>

				<Card className='w-full max-w-4xl px-4'>
					<Accordion className='flex flex-col gap-2'>
						{faqs.map(faq => (
							<AccordionItem key={faq.key} value={faq.key} className=''>
								<AccordionTrigger className='text-xl text-gray-900'>{faq.question}</AccordionTrigger>
								<AccordionContent className='text-sm text-gray-600'>{faq.answer}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</Card>
			</div>
		</section>
	)
}
