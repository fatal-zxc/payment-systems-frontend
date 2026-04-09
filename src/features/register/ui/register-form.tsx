'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { AuthWrapper, Button, Field, FieldError, FieldGroup, FieldLabel, Input } from '@/shared/components'

import { useRegisterMutation } from '../api'
import { RegisterSchema, TypeRegisterSchema } from '../model'

export const RegisterForm: FC = () => {
	const form = useForm<TypeRegisterSchema>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			passwordRepeat: '',
		},
	})

	const { mutate: register, isPending: isLoadingRegister } = useRegisterMutation(form.setError)

	const onSubmit = (data: TypeRegisterSchema) => {
		register(data)
	}

	return (
		<AuthWrapper
			title='Регистрация'
			description='Заполните форму ниже, чтобы создать аккаунт'
			bottomText='Уже есть аккаунт?'
			bottomTextLink='Войти'
			bottomLinkHref='/auth/login'
		>
			<form id='register-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<FieldGroup className='gap-4'>
					<Controller
						name='name'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor='register-form-name'>Имя</FieldLabel>
								<Input
									{...field}
									id='register-form-name'
									disabled={isLoadingRegister}
									aria-invalid={fieldState.invalid}
									placeholder='Иван'
								/>
								{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
							</Field>
						)}
					/>
					<Controller
						name='email'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor='register-form-email'>Почта</FieldLabel>
								<Input
									{...field}
									id='register-form-email'
									type='email'
									disabled={isLoadingRegister}
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
								<FieldLabel htmlFor='register-form-password'>Пароль</FieldLabel>
								<Input
									{...field}
									id='register-form-password'
									type='password'
									disabled={isLoadingRegister}
									aria-invalid={fieldState.invalid}
									placeholder='******'
								/>
								{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
							</Field>
						)}
					/>
					<Controller
						name='passwordRepeat'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor='register-form-passwordRepeat'>Повторите пароль</FieldLabel>
								<Input
									{...field}
									id='register-form-passwordRepeat'
									type='password'
									disabled={isLoadingRegister}
									aria-invalid={fieldState.invalid}
									placeholder='******'
								/>
								{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
							</Field>
						)}
					/>
				</FieldGroup>
				<Button type='submit' size='lg' className='w-full' disabled={isLoadingRegister}>
					Создать аккаунт
				</Button>
			</form>
		</AuthWrapper>
	)
}
