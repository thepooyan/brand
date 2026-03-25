import { DB_Plan, NewPlan, } from "~/db/schema"

type mounthCount = 1 | 2 | 3

enum features {
  telegram = "اتصال به تلگرام",
  color = "قابلیت تغییر تم",
  learnFromLink = "یادگیری از لینک",
  removeOurLogo = "حذف لوگو هوشبان"
}
type feature = features
export const allFeatures = Object.values(features)

export const plan_ids = [ "free" , "starter" , "regular" , "pro" ] as const
type plan_id = typeof plan_ids[number]

export type PlanDefinition = {
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


export const doesPlanHaveTelegram = (p: plan_id) => {
  if (p == "pro") return true
  if (p == "regular") return true
  return false
}

export const convertPlanToDTO = (p: PlanDefinition, remainingMessages?: number):NewPlan => ({
  plan_id: p.id,
  botCount: p.botCount,
  messageCount: p.messageCount,
  remainingMessages: remainingMessages ? p.messageCount + remainingMessages : p.messageCount,
  boughtDate: new Date(),
  expirationDate: daysFromNow(p.expirationMounth * 31),
})

export const freePlan: PlanDefinition = {
  id: "free",
  name: "پلن رایگان",
  price: 0,
  expirationMounth: 1,
  messageCount: 10,
  botCount: 1,
  knowledgeBase: 100,
  features: [
    features.learnFromLink
  ],
}

const testPlan1: PlanDefinition = {
  id: "starter",
  name: "پلن شروع",
  price: 50,
  expirationMounth: 1,
  messageCount: 100,
  botCount: 2,
  knowledgeBase: 300,
  features: [
    features.learnFromLink
  ],
}

const testPlan2: PlanDefinition = {
  id: "regular",
  name: "پلن متوسط",
  price: 150,
  expirationMounth: 1,
  messageCount: 500,
  botCount: 5,
  knowledgeBase: 1000,
  features: [
    features.learnFromLink,
    features.color,
    features.removeOurLogo
  ],
}

const testPlan3: PlanDefinition = {
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
  freePlan,
  testPlan1,
  testPlan2,
  testPlan3,
]

export const findPlanName = (p: DB_Plan) => {
  return allPlans.find(i => i.id === p.plan_id)?.name || ""
}
