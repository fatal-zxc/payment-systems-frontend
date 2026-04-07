import { AuthWrapper } from '@/shared/components'

export function RegisterForm() {
	return (
		<AuthWrapper
			title='Регистрация'
			description='Заполните форму ниже, чтобы создать аккаунт'
			bottomText='Уже есть аккаунт?'
			bottomTextLink='Войти'
			bottomLinkHref='/auth/login'
		>
			Content
		</AuthWrapper>
	)
}
