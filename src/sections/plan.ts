import { NewPlanInstance, PlanInstance, User_Plan_Bots } from "~/db/schema"

type mounthCount = 1 | 2 | 3

export enum planFeatures {
  telegram = "اتصال به تلگرام",
  color = "قابلیت تغییر تم",
  learnFromLink = "یادگیری از لینک",
  removeOurLogo = "حذف لوگو هوشبان"
}
type feature = planFeatures
export const allFeatures = Object.values(planFeatures)

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

export const doesPlanIncludeFeature = (p: plan_id, f: planFeatures) => {
  let plan = allPlans.find(f => f.id === p)
  if (!plan) throw new Error(`Plan ${p} is not defined`)
  return plan.features.includes(f)
}

export const getPlan = (p:PlanInstance) => {
  let plan = allPlans.find(f => f.id === p.plan_id)
  if (!plan) throw new Error(`Plan ${p} is not defined`)
  return plan
}

export const convertPlanToDTO = (p: PlanDefinition, user_id: number, expirationDays: number):NewPlanInstance => ({
  user_id: user_id,
  plan_id: p.id,
  remainingMessages: p.messageCount,
  boughtDate: new Date(),
  expirationDate: daysFromNow(expirationDays),
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
    planFeatures.learnFromLink
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
    planFeatures.learnFromLink
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
    planFeatures.telegram,
    planFeatures.learnFromLink,
    planFeatures.color,
    planFeatures.removeOurLogo
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

export const findPlanName = (p: PlanInstance) => {
  return allPlans.find(i => i.id === p.plan_id)?.name || ""
}

const doesAtleastOnePlanHaveTelegram = (plans: PlanInstance[]) => {
  return plans.map(t => getPlan(t).features.includes(planFeatures.telegram) ).reduce((p,c) => p || c)
}

const getNumberOfAllowedBots = (plans: PlanInstance[]) => {
  return plans.map(p => getPlan(p).botCount).reduce((p,c) => p + c)
}

const getRemainingMesseages = (plans: PlanInstance[]) => {
  return plans.map(m => m.remainingMessages).reduce((p,c) => p+c)
}

export const userPermissions = (user: User_Plan_Bots) => ({
  telegram: doesAtleastOnePlanHaveTelegram(user.current_plans),
  moreBots: user.bots.length < getNumberOfAllowedBots(user.current_plans),
  message: getRemainingMesseages(user.current_plans) > 0,
})
