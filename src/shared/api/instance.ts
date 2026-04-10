import axios, { AxiosRequestConfig } from 'axios'

export const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
})

let _accessToken: string | null = null

export const setInstanceAccessToken = (token: string | null) => {
	_accessToken = token
}

apiClient.interceptors.request.use(
	config => {
		if (config.headers && _accessToken) config.headers.Authorization = `Bearer ${_accessToken}`

		return config
	},
	error => {
		return Promise.reject(error)
	}
)

let onRefreshSuccess: ((token: string) => void) | null = null
let onRefreshError: (() => void) | null = null

export const subscribeToRefresh = (onSuccess: (token: string) => void, onError: () => void) => {
	onRefreshSuccess = onSuccess
	onRefreshError = onError
}

apiClient.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			try {
				const res = await axios.post(
					`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`,
					{},
					{
						withCredentials: true,
					}
				)
				const newToken = res.data.accessToken

				setInstanceAccessToken(newToken)
				onRefreshSuccess?.(newToken)

				originalRequest.headers.Authorization = `Bearer ${newToken}`
				return apiClient(originalRequest)
			} catch (refreshError) {
				setInstanceAccessToken(null)
				onRefreshError?.()
				return Promise.reject(refreshError)
			}
		}
		return Promise.reject(error)
	}
)

export const orvalInstance = async <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
	const response = await apiClient({
		...config,
		...options,
	})
	return response.data
}
