import { JWT_ACCESS_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { userTable } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
	const authCookie = event.cookies.get('AuthorizationToken');

	if (authCookie) {
		// Expected format: "Bearer <token>"
		const [scheme, token] = authCookie.split(' ');
		if (scheme === 'Bearer' && token) {
			try {
				const decoded = jwt.verify(token, JWT_ACCESS_SECRET) as { id: number };

				if (decoded?.id) {
					const [user] = await db
						.select({
							id: userTable.id,
							email: userTable.email,
							username: userTable.username
						})
						.from(userTable)
						.where(eq(userTable.id, decoded.id));

					if (user) {
						event.locals.user = user;
					}
				}
			} catch (error) {
				console.log(error);
			}
		}
	}

	const protectedRoutes = ['/admin']; // Add more protected paths as needed
	if (protectedRoutes.some((route) => event.url.pathname.startsWith(route)) && !event.locals.user) {
		throw redirect(302, '/'); // Redirect unauthenticated users
	}

	return await resolve(event);
};
