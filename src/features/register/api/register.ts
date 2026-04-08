import { apiClient } from '@/shared/api'

import { TypeRegisterSchema } from '../model'

export const register = async (data: TypeRegisterSchema) => {
	await apiClient.post('/auth/register', data).then(res => res.data)
}
