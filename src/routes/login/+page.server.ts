import { fail, redirect } from '@sveltejs/kit';
import { setAuthToken } from '../setAuthToken.js';
import { loginUser } from '$lib/server/userManagement.js';

export const actions = {
	login: async ({ cookies, request }) => {
		const formData = Object.fromEntries(await request.formData());
		const userIdent = formData.userIdent as string;
		const password = formData.password as string;

		const { error, token } = await loginUser(userIdent, password);

		if (error) {
			return fail(500, { error });
		}

		setAuthToken({ cookies, token });

		throw redirect(302, '/');
	}
};
