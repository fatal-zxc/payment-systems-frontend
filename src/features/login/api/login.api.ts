import { apiClient } from '@/shared/api'

import { TypeLoginSchema } from '../model'

export const login = async (data: TypeLoginSchema) => {
	await apiClient.post('/auth/login', data).then(res => res.data)
}
