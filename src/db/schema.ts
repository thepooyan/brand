import { sql } from "drizzle-orm";
import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text(),
  email: text().unique(),
  number: text({length: 11}).unique().notNull(),
});

export const otpTable = sqliteTable("otp_table", {
  number: text({length: 11}).notNull(),
  otp: text({length: 6}).notNull(),
  timestamp: integer("timestamp", {mode: "timestamp"}).notNull().default(sql`(unixepoch())`),
})

export const messagesTable = sqliteTable("messages_table", {
  name: text().notNull(),
  email: text(),
  number: text(),
  subject: text(),
  message: text().notNull()
})
