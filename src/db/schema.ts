import { relations, sql } from "drizzle-orm";
import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { ticket_states } from "~/components/ticket/ticket-signal";
import { message } from "~/lib/chatUtil";
import { plan_ids } from "~/sections/plan";

export const tokenLength = 62

export const chatbot_history_table = sqliteTable("chatbot_history", ({
  id: int().primaryKey({autoIncrement: true}),
  bot_id: int().references(() => chatbotTable.id).notNull(),
  chat_id: int().notNull(),
  history: text({ mode: "json" }).$type<message[]>().notNull()
}))

export const ticketTable = sqliteTable("ticket", {
  id: int().primaryKey({autoIncrement: true}),
  isSeen: integer({mode: "boolean"}).notNull().default(true),
  userId: int().notNull().references(() => usersTable.id),
  subject: text().notNull(),
  category: text().notNull().default("سایر"),
  content: text({mode: "json"}).$type<{from: "user" | "admin", msg: string}[]>().notNull(),
  state: text({ enum: ticket_states }).notNull().default("pending"),
  updatedAt: integer({mode: "timestamp"}).notNull().default(new Date()),
})

export const ticket_user_relation = relations(ticketTable, ({one}) => ({
  user: one(usersTable, {fields: [ticketTable.userId], references: [usersTable.id]})
}))

export type Ticket = typeof ticketTable.$inferSelect
export type NewTicket = typeof ticketTable.$inferInsert

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
  greeting: text(),
  suggestedQuestions: text({ mode: "json" }).$type<string[]>().notNull().default([]),
  floatingMessage: text({ mode: "json" }).$type<{active: boolean, msg: string}>().default({active: false, msg: ""}).notNull(),
  color: text().notNull().default("#2780d2"),
  color_foreground: text().notNull().default("#ffffff"),
  logo: text(),
  current_token: text({length: tokenLength})
})

export type Chatbot = typeof chatbotTable.$inferSelect

export const chatbot_user_relation = relations(chatbotTable, ({one}) => ({
  user: one(usersTable, {fields: [chatbotTable.userId], references: [usersTable.id]})
}))

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

export const planTable = sqliteTable("plan", {
  id: int().primaryKey({ autoIncrement: true }),
  plan_id: text({ enum: plan_ids }).notNull(),
  messageCount: integer().notNull(),
  botCount: integer().notNull(),
  remainingMessages: integer().notNull(),
  expirationDate: integer({mode: "timestamp"}),
  boughtDate: integer({mode: "timestamp"}).notNull(),
})

export type DB_Plan = typeof planTable.$inferSelect
export type NewPlan = typeof planTable.$inferInsert

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text(),
  email: text().unique(),
  number: text({length: 11}).unique().notNull(),
  current_plan_id: int().notNull().references(() => planTable.id)
});

export type User = typeof usersTable.$inferInsert

export const user_plan_relations = relations(usersTable, ({one}) => ({
  current_plan: one(planTable, {fields: [usersTable.current_plan_id], references: [planTable.id]})
}))

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
