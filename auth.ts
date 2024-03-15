import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';

async function getUser(username: string): Promise<User | undefined> {
  try {
    const user =
      await sql<User>`SELECT * FROM users WHERE username=${username}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
async function setUser(formData: {
  username: string;
  password: string;
}): Promise<string | undefined> {
  const { username, password } = formData;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user =
      await sql<User>`SElECT * FROM users WHERE username=${username}`;
    if (user.rows.length) {
      return '当前用户名已存在';
    }
    await sql`INSERT INTO users (username,password)
    VALUES (${username},${hashedPassword})
    ON CONFLICT (id) DO NOTHING`;
  } catch (error) {
    console.error('Failed to create user:', error);
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string().min(1), password: z.string().min(6) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const user = await getUser(username);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});

export const registerIn = async (formData: FormData) => {
  const parsedCredentials = z
    .object({ username: z.string().min(0), password: z.string().min(6) })
    .safeParse(Object.fromEntries(formData));

  if (parsedCredentials.success) {
    const res = await setUser(parsedCredentials.data);
    console.log(res);
    return res;
  }
};
