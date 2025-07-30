import { sql } from "drizzle-orm";
import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const chatbot = sqliteTable("chatbot", {
  id: int().primaryKey({autoIncrement: true}),
  userId: int().notNull().references(() => usersTable.id),
  botName: text().notNull(),
  business: text().notNull(),
  tone: text().notNull(),
  language: text().notNull(),
  maxResponseLength: text().notNull(),
  websiteUrl: text(),
  trainingText: text(),
  customization: text(),
  description: text(),
})

export const websiteOrders = sqliteTable("website_orders", {
  id: int().primaryKey({autoIncrement: true}),
  budget: text(),
  contentReady: text(),
  description: text(),
  email: text(),
  features: text(),
  isMarketplace: text(),
  name: text(),
  pageCount: text(),
  phone: text(),
  timeline: text(),
  websiteType: text(),
})

export const adminsTable = sqliteTable("admins_table", {
  id: int().primaryKey({autoIncrement: true}),
  chat_id: text().notNull()
})

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
