import { Metadata } from 'next'

import { LoginForm } from '@/features/login'

export const metadata: Metadata = {
	title: 'Вход в аккаунт',
}

export default function RegisterPage() {
	return (
		<div>
			<LoginForm />
		</div>
	)
}
