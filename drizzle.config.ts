import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { privateEnv } from '~/server/env/private-env';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'turso',
  dbCredentials: {
    url: privateEnv.TURSO_DATABASE_URL,
    authToken: privateEnv.TURSO_AUTH_TOKEN
  },
});

