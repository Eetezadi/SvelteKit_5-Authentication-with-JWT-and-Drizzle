import { JWT_ACCESS_SECRET } from '$env/static/private';
import { db } from './db';
import { eq } from 'drizzle-orm';
import { userTable } from './db/schema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface UserWithoutPass {
	id: Number;
	username: String;
	email: String;
}
interface UserWithPass extends UserWithoutPass {
	password: String;
}

export async function createUser(username: string, email: string, password: string) {
	try {
		const hashedPassword = await bcrypt.hash(password, 12);

		const [insertedUser] = await db
			.insert(userTable)
			.values({
				username,
				email,
				password: hashedPassword
			})
			.returning();

		const { password: _, ...userWithoutPassword } = insertedUser;

		const token = createJWT(userWithoutPassword);

		return { token };
	} catch (error) {
		return error;
	}
}

export async function loginUser(username: string, password: string) {
	try {
		const [user] = await db
			.select({
				id: userTable.id,
				username: userTable.username,
				email: userTable.email,
				password: userTable.password
			})
			.from(userTable)
			.where(eq(userTable.username, username));

		if (!user) {
			return { error: 'User not found' };
		}

		const isValid = await bcrypt.compare(password, user.password);

		if (!isValid) {
			return { error: 'Invalid password' };
		}

		// Generate a JWT excluding the password field
		const { password: _, ...userWithoutPassword } = user;
		const token = createJWT(userWithoutPassword);

		return { token };
	} catch (error) {
		console.error('Login error:', error);
		return { error: 'An unexpected error occurred during login.' };
	}
}

function createJWT(user: UserWithoutPass) {
	return jwt.sign({ id: user.id, name: user.username, email: user.email }, JWT_ACCESS_SECRET, {
		expiresIn: '1d'
	});
}