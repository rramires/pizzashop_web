import { api } from '@/lib/axios'

export interface UpdateProfileBody {
	name: string
	description: string
}

export async function updateProfile({ name, description }: UpdateProfileBody) {
	// simulate error after 3s
	/* await new Promise((_, reject) => {
		setTimeout(reject, 3000)
	}) */
	await api.put('/profile', { name, description })
}
