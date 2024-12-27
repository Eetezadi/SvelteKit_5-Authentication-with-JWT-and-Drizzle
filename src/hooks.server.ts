import { redirect } from '@sveltejs/kit';
import { authenticateUser } from '$lib/server/userManagement';

export const handle = async ({ event, resolve }) => {
	const authCookie = event.cookies.get('AuthorizationToken');
	const user = await authenticateUser(authCookie); // returns null if no user or error
	if (user) {
		event.locals.user = user; // set user
	}

	// Make sure protectec routes contain a +page.server.ts to force server requests
	const protectedRoutes = ['/admin']; // Add more protected paths if needed
	const isProtected = protectedRoutes.some((route) => event.url.pathname.startsWith(route));

	if (isProtected && !event.locals.user) {
		console.warn(`Unauthorized access attempt to ${event.url.pathname}`);
		throw redirect(302, '/login');
	}
	return await resolve(event);
};
