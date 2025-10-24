import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { env } from '~/server/env';

export const db = drizzle({connection: {
  url: env.TURSO_DATABASE_URL as string,
  authToken: env.TURSO_AUTH_TOKEN as string
}});

