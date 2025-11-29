import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { getEnv } from '~/server/env';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'turso',
  dbCredentials: {
    url: getEnv().TURSO_DATABASE_URL,
    authToken: getEnv().TURSO_AUTH_TOKEN
  },
});

