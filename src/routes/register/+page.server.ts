import { fail, redirect } from '@sveltejs/kit';
import { setAuthToken } from '../setAuthToken';
import { createUser } from '$lib/server/userManagement';

export const actions = {
	register: async ({ cookies, request }) => {
		const formData = Object.fromEntries(await request.formData());
		const { username, email, password } = formData;

		const { error, token } = await createUser(username, email, password);

		if (error) {
			console.log({ error });
			return fail(500, { error });
		}

		setAuthToken({ cookies, token });

		throw redirect(302, '/');
	}
};
