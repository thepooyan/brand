import { db } from "~/db/db"
import { DB_Plan, NewPlan, planTable } from "~/db/schema"

type mounthCount = 1 | 2 | 3

type feature = string
type plan_id = typeof plan_ids[number]

export type plan = {
  id: plan_id,
  name: string
  price: number,
  expirationMounth: mounthCount,
  messageCount: number,
  botCount: number,
  knowledgeBase: number,
  features: feature[]
}

const daysFromNow = (days: number) => {
  let date = new Date()
  date.setDate(date.getDate() + days)
  return date
}

export const newFreePlan = async () => {
  const [inserted] = await db.insert(planTable).values({
    plan_id: "free",
    expirationDate: null,
    botCount: freePlan.botCount,
    boughtDate: new Date(),
    messageCount: freePlan.messageCount,
    remainingMessages: freePlan.messageCount
  }).returning()
  return inserted
}

export const plan_ids = [ "free" , "starter" , "regular" , "pro" ] as const

export const doesPlanHaveTelegram = (p: plan_id) => {
  if (p == "pro") return true
  if (p == "regular") return true
  return false
}

export const convertPlanToDTO = (p: plan, remainingMessages?: number):NewPlan => ({
  plan_id: p.id,
  botCount: p.botCount,
  messageCount: p.messageCount,
  remainingMessages: remainingMessages ? p.messageCount + remainingMessages : p.messageCount,
  boughtDate: new Date(),
  expirationDate: daysFromNow(p.expirationMounth * 30),
})

export const allFeatures: feature[] = [
  "یادگیری از لینک",
  "رنگ سازمانی",
  "حذف لوگو هوشبان",
  "پشتیبانی اختصاصی"
]

export const freePlan: plan = {
  id: "free",
  name: "پلن رایگان",
  price: 0,
  expirationMounth: 1,
  messageCount: 10,
  botCount: 1,
  knowledgeBase: 100,
  features: [
    "یادگیری از لینک",
  ],
}

const testPlan1: plan = {
  id: "starter",
  name: "پلن شروع",
  price: 50,
  expirationMounth: 1,
  messageCount: 100,
  botCount: 2,
  knowledgeBase: 300,
  features: [
    "یادگیری از لینک",
  ],
}

const testPlan2: plan = {
  id: "regular",
  name: "پلن متوسط",
  price: 150,
  expirationMounth: 1,
  messageCount: 500,
  botCount: 5,
  knowledgeBase: 1000,
  features: [
    "یادگیری از لینک",
    "رنگ سازمانی",
    "حذف لوگو هوشبان",
  ],
}

const testPlan3: plan = {
  id: "pro",
  name: "پلن حرفه‌ای",
  price: 200,
  expirationMounth: 1,
  messageCount: 1000,
  knowledgeBase: 5000,
  botCount: 10,
  features: [
    ...allFeatures
  ],
}

export const allPlans = [
  testPlan1,
  testPlan2,
  testPlan3,
]

export const findPlanName = (p: DB_Plan) => allPlans.find(i => i.id === p.plan_id)?.name || ""
