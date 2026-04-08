import { toast } from 'sonner'

export function toastMessageHandler(error: any) {
	if (typeof error === 'string') {
		// просто строка
		toast.error(error)
	} else if (error.message) {
		// если это наша ошибка
		toast.error(error.message)
	} else if (error?.response?.data?.message) {
		// если это ошибка axios
		toast.error(error.response.data.message)
	} else {
		// любое другое
		toast.error('Ошибка на стороне сервера')
	}
}
