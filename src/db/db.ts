import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import * as schem from "./schema"
import { privateEnv } from '~/server/env/private-env';

export const db = drizzle({ 
    connection: 
      process.env.NODE_ENV === "production" ?
      { 
        url: privateEnv.TURSO_DATABASE_URL as string,
        authToken: privateEnv.TURSO_AUTH_TOKEN as string
      }
      : 
      {
        url: "file:./mydb.sqlite"
      },
    schema: schem
});
