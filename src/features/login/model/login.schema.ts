import z from 'zod'

export const LoginSchema = z.object({
	email: z.email('Некорректная почта'),
	password: z.string().min(6, 'Пароль должен содержать как минимум 6 символов').max(50, 'Пароль должен быть не более 50 символов'),
})

export type TypeLoginSchema = z.infer<typeof LoginSchema>
