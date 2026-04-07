import { Metadata } from 'next'

import { RegisterForm } from '@/features/register'

export const metadata: Metadata = {
	title: 'Регистрация',
}

export default function RegisterPage() {
	return (
		<div>
			<RegisterForm />
		</div>
	)
}
