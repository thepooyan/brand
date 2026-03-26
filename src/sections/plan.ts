import { NewPlanInstance, PlanInstance, User_Plan_Bots } from "~/db/schema"

type mounthCount = 1 | 2 | 3

export enum planFeatures {
  telegram = "اتصال به تلگرام",
  color = "قابلیت تغییر تم",
  learnFromLink = "یادگیری از لینک",
  removeOurLogo = "حذف لوگو هوشبان",
  specialSupport = "پشتیبانی اختصاصی",
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

export const daysFromNow = (days: number) => {
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

export const convertPlanToDTO = (p: PlanDefinition, user_id: number):NewPlanInstance => ({
  user_id: user_id,
  plan_id: p.id,
  remainingMessages: p.messageCount,
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
  return plans.map(t => getPlan(t).features.includes(planFeatures.telegram) ).reduce((p,c) => p || c, false)
}

const getNumberOfAllowedBots = (plans: PlanInstance[]) => {
  return plans.map(p => getPlan(p).botCount).reduce((p,c) => p + c, 0)
}

const getRemainingMesseages = (plans: PlanInstance[]) => {
  return plans.map(m => m.remainingMessages).reduce((p,c) => p+c, 0)
}

const findSoonestExpiringPlan = (plans: PlanInstance[]): PlanInstance | null => {
  if (!plans || plans.length === 0) {
    return null;
  }

  let soonestPlan: PlanInstance | null = null;

  for (const plan of plans) {
    if (plan.expirationDate === null) return plan
    if (isNaN(plan.expirationDate.getTime())) { 
      console.warn(`Warning: Plan with ID ${plan.id} has an invalid expiration date. Skipping.`);
      continue
    }
    if (soonestPlan === null || plan.expirationDate < soonestPlan.expirationDate!) {
      soonestPlan = plan;
    }
  }

  return soonestPlan;
}

const isPlanExpired = (p: PlanInstance) => {
  return (p.expirationDate < new Date())
}

/**
 * Find the plan that is not expired and has remainingMessages.
 * Proiority with the one that expires sooner
 * @returns plan instance that fits the description, or if none, null
 */
export const findAvailavlePlanForDecrement = (plans: PlanInstance[]):PlanInstance | null => {
  let plansWithMsg = plans.filter(p => p.remainingMessages > 0)
  if (!plansWithMsg) return null

  //if free plan is there, it is the proiority
  let freePlan = plansWithMsg.find(p => p.plan_id === "free")
  if (freePlan && !isPlanExpired(freePlan)) return freePlan

  let soonest = findSoonestExpiringPlan(plans)
  if (!soonest) return null
  if (!isPlanExpired(soonest)) return soonest
  return findAvailavlePlanForDecrement(plans.filter(p => p.id !== soonest.id))
}

export const userPermissions = (user: User_Plan_Bots) => {

  let avlPlan = findAvailavlePlanForDecrement(user.current_plans)
  if (!avlPlan) return {
    telegram: null,
    moreBots: null,
    message: null,
    expired: true
  }
  return {
    telegram: doesAtleastOnePlanHaveTelegram(user.current_plans),
    moreBots: user.bots.length < getNumberOfAllowedBots(user.current_plans),
    message: getRemainingMesseages(user.current_plans) > 0,
    expired: false
  }
}

