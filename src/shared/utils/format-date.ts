export function formatDate(dateString: string | Date | null) {
	if (dateString === null) {
		return 'Ошибка'
	}
	return new Date(dateString).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
