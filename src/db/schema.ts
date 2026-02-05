import { relations, sql } from "drizzle-orm";
import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const tokenLength = 62
export const chatbotStatusTable = sqliteTable("chatbot_status", {
  id: int().notNull().references(() => chatbotTable.id),
  plan: text({enum: ["free"]}).notNull(),
  messageCount: integer().notNull(),
  remainingMessages: integer().notNull(),
  expirationDate: integer({mode: "timestamp"}).notNull(),
  current_token: text({length: tokenLength}).notNull()
})

export const chatbot_status_relations = relations(chatbotStatusTable, ({one}) => ({
  chatbot: one(chatbotTable, {fields: [chatbotStatusTable.id], references: [chatbotTable.id]})
}))

export const chatbotTable = sqliteTable("chatbot", {
  id: int().primaryKey({autoIncrement: true}),
  userId: int().notNull().references(() => usersTable.id),
  botName: text().notNull(),
  businessName: text().notNull(),
  tone: text().notNull(),
  language: text().notNull(),
  maxResponseLength: text().notNull(),
  websiteUrl: text(),
  trainingText: text().notNull(),
  customization: text(),
  description: text(),
})

export type I_Bot = typeof chatbotTable.$inferSelect
export type I_NewBot = typeof chatbotTable.$inferInsert

export const websiteOrdersTable = sqliteTable("website_orders", {
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
  chat_id: text().notNull(),
  number: text().notNull()
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

export const blogsTable = sqliteTable("blogs_table", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  slug: text().notNull(),
  excerpt: text().notNull(),
  content: text().notNull(),
  date: text().notNull(),
  readTime: int().notNull(),
  image: text().notNull(),
  tags: text({ mode: "json" }).$type<string[]>().default([]).notNull(),
  likeCount: integer().default(0).notNull()
})

export type I_Blog = typeof blogsTable.$inferSelect
export type I_NewBlog = typeof blogsTable.$inferInsert
