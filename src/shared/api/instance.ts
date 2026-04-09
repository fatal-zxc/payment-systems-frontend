import axios, { AxiosRequestConfig } from 'axios'

export const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
})

export const orvalInstance = async <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
	const response = await apiClient({
		...config,
		...options,
	})
	return response.data
}
