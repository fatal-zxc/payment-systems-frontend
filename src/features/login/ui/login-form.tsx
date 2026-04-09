'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { AuthWrapper, Button, Field, FieldError, FieldGroup, FieldLabel, Input } from '@/shared/components'

import { useLoginMutation } from '../api'
import { LoginSchema, TypeLoginSchema } from '../model'

export const LoginForm: FC = () => {
	const form = useForm<TypeLoginSchema>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const { mutate: login, isPending: isLoadingLogin } = useLoginMutation(form.setError)

	const onSubmit = (data: TypeLoginSchema) => {
		login(data)
	}

	return (
		<AuthWrapper
			title='Войти'
			description='Введите свои данные для входа в аккаунт'
			bottomText='Еще нет аккаунта?'
			bottomTextLink='Регистрация'
			bottomLinkHref='/auth/register'
		>
			<form id='login-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<FieldGroup className='gap-4'>
					<Controller
						name='email'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor='login-form-email'>Почта</FieldLabel>
								<Input
									{...field}
									id='login-form-email'
									type='email'
									disabled={isLoadingLogin}
									aria-invalid={fieldState.invalid}
									placeholder='ivan@example.com'
								/>
								{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
							</Field>
						)}
					/>
					<Controller
						name='password'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor='login-form-password'>Пароль</FieldLabel>
								<Input
									{...field}
									id='login-form-password'
									type='password'
									disabled={isLoadingLogin}
									aria-invalid={fieldState.invalid}
									placeholder='******'
								/>
								{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
							</Field>
						)}
					/>
				</FieldGroup>
				<Button type='submit' size='lg' className='w-full' disabled={isLoadingLogin}>
					Войти в аккаунт
				</Button>
			</form>
		</AuthWrapper>
	)
}
