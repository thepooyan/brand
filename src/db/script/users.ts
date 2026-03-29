import { db } from "../db";
import { usersTable } from "../schema";

await db.update(usersTable).set({
  createdAt: new Date()
})
