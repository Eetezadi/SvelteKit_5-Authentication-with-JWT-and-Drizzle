import { fail, redirect } from '@sveltejs/kit';
import { setAuthToken } from '../setAuthToken';
import { createUser } from '$lib/server/userManagement';

export const actions = {
	register: async ({ cookies, request }) => {
		const formData = Object.fromEntries(await request.formData());
		const username = formData.username as string;
		const email = formData.email as string;
		const password = formData.password as string;

		try {
			const { token } = await createUser(username, email, password);

			setAuthToken({ cookies, token });

			throw redirect(302, '/');
		} catch (error) {
			throw error;
		}
	}
};
