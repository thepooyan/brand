import { relations, sql } from "drizzle-orm";
import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { ticket_states } from "~/components/ticket/ticket-signal";
import { chat_sources, message, timedMessage } from "~/db/constants";
import { plan_ids } from "~/sections/plan";

export const tokenLength = 62

export const chatbot_history_table = sqliteTable("chatbot_history", ({
  id: int().primaryKey({autoIncrement: true}),
  botId: int().notNull().references(() => chatbotTable.id, {onDelete: "cascade"}),
  userIP: text().notNull(),
  source: text({ enum: chat_sources }).notNull(),
  nickname: text().notNull(),
  messages: text({ mode: "json" }).$type<timedMessage[]>().notNull(),
  lastUpdated: int({mode: "timestamp"}).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date())
}))

export const chatbot_history_relation = relations(chatbot_history_table, ({one}) => ({
  chatbot: one(chatbotTable, {fields: [chatbot_history_table.botId], references: [chatbotTable.id]})
}))

export type History = typeof chatbot_history_table.$inferSelect

export const chatbot_messager_table = sqliteTable("chatbot_messager", ({
  id: int().primaryKey({autoIncrement: true}),
  bot_id: int().references(() => chatbotTable.id, {onDelete: "cascade"}).notNull(),
  chat_id: int().notNull(),
  history: text({ mode: "json" }).$type<message[]>().notNull()
}))

export const ticketTable = sqliteTable("ticket", {
  id: int().primaryKey({autoIncrement: true}),
  isSeen: integer({mode: "boolean"}).notNull().default(true),
  userId: int().notNull().references(() => usersTable.id, {onDelete: "cascade"}),
  subject: text().notNull(),
  category: text().notNull().default("سایر"),
  content: text({mode: "json"}).$type<{from: "user" | "admin", msg: string}[]>().notNull(),
  state: text({ enum: ticket_states }).notNull().default("pending"),
  updatedAt: integer({mode: "timestamp"}).notNull().default(new Date()),
})

export const ticket_relations = relations(ticketTable, ({one}) => ({
  user: one(usersTable, {fields: [ticketTable.userId], references: [usersTable.id]})
}))

export type Ticket = typeof ticketTable.$inferSelect
export type NewTicket = typeof ticketTable.$inferInsert

export const chatbotTable = sqliteTable("chatbot", {
  id: int().primaryKey({autoIncrement: true}),
  userId: int().notNull().references(() => usersTable.id, {onDelete: "cascade"}),
  botName: text().notNull(),
  businessName: text().notNull(),
  tone: text().notNull(),
  language: text().notNull(),
  maxResponseLength: text().notNull(),
  websiteUrl: text(),
  trainingText: text().notNull(),
  customization: text(),
  description: text(),
  limitation: int(),
  greeting: text(),
  suggestedQuestions: text({ mode: "json" }).$type<string[]>().notNull().default([]),
  floatingMessage: text({ mode: "json" }).$type<{active: boolean, msg: string}>().default({active: false, msg: ""}).notNull(),
  color: text().notNull().default("#2780d2"),
  color_foreground: text().notNull().default("#ffffff"),
  logo: text(),
  current_token: text({length: 64}) // hash length is 64
})

export type Chatbot = typeof chatbotTable.$inferSelect

export const chatbot_relations = relations(chatbotTable, ({one, many}) => ({
  user: one(usersTable, {fields: [chatbotTable.userId], references: [usersTable.id]}),
  history: many(chatbot_history_table)
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
  number: text().notNull().references(() => usersTable.number, {onDelete: "cascade"})
})

export type AdminData = typeof adminsTable.$inferSelect
export type NewAdminData = typeof adminsTable.$inferInsert

export const planTable = sqliteTable("plan", {
  id: int().primaryKey({ autoIncrement: true }),
  plan_id: text({ enum: plan_ids }).notNull(),
  remainingMessages: integer().notNull(),
  boughtDate: integer({mode: "timestamp"}).notNull(),
  expirationDate: integer({mode: "timestamp"}).notNull(),
  user_id: int().notNull().references(() => usersTable.id, {onDelete: "cascade"})
})

export type PlanInstance = typeof planTable.$inferSelect
export type NewPlanInstance = typeof planTable.$inferInsert

export const plan_relations = relations(planTable, ({one}) => ({
  user: one(usersTable, {fields: [planTable.user_id], references: [usersTable.id]})
}))

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text(),
  email: text().unique(),
  number: text({length: 11}).unique().notNull(),
  isBlocked: text({enum: ["0", "1"]}).notNull().default("0"),
  createdAt: int({ mode: "timestamp"}).notNull().$defaultFn(() => new Date())
});

export type User = typeof usersTable.$inferInsert

export const users_relations = relations(usersTable, ({many, one}) => ({
  current_plans: many(planTable),
  bots: many(chatbotTable),
  admin: one(adminsTable, {fields: [usersTable.number], references: [adminsTable.number]})
}))
export type User_Plan = User & {current_plans: PlanInstance[]}
export type User_Plan_Bots = User_Plan & {bots: Chatbot[]}

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
