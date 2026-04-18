import * as dotenv from 'dotenv'
import { defineConfig } from 'orval'

dotenv.config()

export default defineConfig({
	payments: {
		input: `${process.env.NEXT_PUBLIC_SERVER_URL}/openapi.json`,
		output: {
			target: './src/shared/api/generated',
			schemas: './src/shared/types/generated',
			indexFiles: true,
			mode: 'tags-split', // Разделит файлы по тегам из контроллеров Nest (удобно для FSD)
			client: 'react-query', // Генерировать сразу хуки useQuery и useMutation
			httpClient: 'axios',
			prettier: true,
			override: {
				mutator: {
					path: './src/shared/api/instance.ts', // Твой кастомный инстанс Axios
					name: 'orvalInstance',
				},
			},
		},
	},
})
