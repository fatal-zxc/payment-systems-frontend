import z from 'zod'

export const RegisterSchema = z
	.object({
		name: z.string().min(2, 'Имя должно содержать как минимум 2 символа').max(40, 'Имя должно быть не более 40 символов'),
		email: z.email('Некорректная почта'),
		password: z.string().min(6, 'Пароль должен содержать как минимум 6 символов').max(50, 'Пароль должен быть не более 50 символов'),
		_passwordRepeat: z.string().min(6, 'Пароль должен содержать как минимум 6 символов'),
	})
	.refine(data => data.password === data._passwordRepeat, {
		error: 'Пароли не совпадают',
		path: ['passwordRepeat'],
	})

export type TypeRegisterSchema = z.infer<typeof RegisterSchema>
