import { fail, redirect } from '@sveltejs/kit';
import { setAuthToken } from '../setAuthToken.js';
import { loginUser } from '$lib/server/userManagement.js';

export const actions = {
	login: async ({ cookies, request }) => {
		const formData = Object.fromEntries(await request.formData());
		const { username, password } = formData;

		const { error, token } = await loginUser(username, password);

		if (error) {
			return fail(500, { error });
		}

		setAuthToken({ cookies, token });

		throw redirect(302, '/');
	}
};
