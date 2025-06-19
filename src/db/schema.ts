import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
});

export const otpTable = sqliteTable("otp_table", {
  number: text({length: 11}).notNull(),
  otp: text({length: 6}).notNull(),
  // timestamp: text().default(sql`(CURRENT_TIMESTAMP)`),
})
