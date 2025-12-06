import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { getEnv } from '~/server/env';
import * as schem from "./schema"

export const db = drizzle({connection: {
  url: getEnv().TURSO_DATABASE_URL as string,
  authToken: getEnv().TURSO_AUTH_TOKEN as string
},
  schema: schem
});

