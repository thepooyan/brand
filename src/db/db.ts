import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import * as schem from "./schema"
import { privateEnv } from '~/server/env/private-env';
import { ResultSet } from '@libsql/client';
import { SQLiteTransaction } from 'drizzle-orm/sqlite-core';
import { ExtractTablesWithRelations } from 'drizzle-orm';
import { pureProd } from '~/server/env/shared-env';

export const db = drizzle({ 
    connection: 
      pureProd ?
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

export type dbCtx = SQLiteTransaction<"async", ResultSet, typeof schem, ExtractTablesWithRelations<typeof schem>>
export type DB = typeof db
