import { NewPlanInstance, PlanInstance, User_Plan_Bots } from "~/db/schema"

export enum planFeatures {
  fastBuild = "ساخت ربات در کمتر از ۵ دقیقه",
  knowledgeBase = "پایگاه دانش",
  manualTraining = "یادگیری از طریق متن",
  learnFromLink = "یادگیری از لینک",
  telegram = "اتصال به تلگرام",
  colors = "قابلیت تغییر تم",
  removeOurLogo = "امکان افزودن لوگو",
  specialSupport = "پشتیبانی اختصاصی",
  proSettings = "تنظیمات پیشرفته",
}
type feature = planFeatures
export const allFeatures = Object.values(planFeatures)

export const plan_ids = [ "free" , "starter" , "regular" , "pro" ] as const
type plan_id = typeof plan_ids[number]

export type PlanDefinition = {
  id: plan_id,
  name: string
  mounthlyPrice: number,
  messageCount: number,
  botCount: number,
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

export const convertPlanToDTO = (p: PlanDefinition, user_id: number, expirationMounth: number):NewPlanInstance => ({
  user_id: user_id,
  plan_id: p.id,
  remainingMessages: p.messageCount,
  boughtDate: new Date(),
  expirationDate: daysFromNow(expirationMounth * 31),
})

export const freePlan: PlanDefinition = {
  id: "free",
  name: "پلن رایگان",
  mounthlyPrice: 0,
  messageCount: 15,
  botCount: 1,
  features: [
    planFeatures.fastBuild,
    planFeatures.manualTraining,
    planFeatures.knowledgeBase,
  ],
}

const testPlan1: PlanDefinition = {
  id: "starter",
  name: "پلن برنز",
  mounthlyPrice: 770,
  messageCount: 900,
  botCount: 2,
  features: [
    planFeatures.fastBuild,
    planFeatures.learnFromLink,
    planFeatures.knowledgeBase,
    planFeatures.manualTraining
  ],
}

const testPlan2: PlanDefinition = {
  id: "regular",
  name: "پلن نقره ای",
  mounthlyPrice: 2120,
  messageCount: 4000,
  botCount: 5,
  features: [
    planFeatures.fastBuild,
    planFeatures.telegram,
    planFeatures.knowledgeBase,
    planFeatures.learnFromLink,
    planFeatures.colors,
    planFeatures.manualTraining,
    planFeatures.removeOurLogo
  ],
}

const testPlan3: PlanDefinition = {
  id: "pro",
  name: "پلن طلایی",
  mounthlyPrice: 4600,
  messageCount: 9500,
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

export const findPlanName = (p: PlanInstance) => {
  return allPlans.find(i => i.id === p.plan_id)?.name || ""
}

const doesAtleastOnePlanHaveFeature = (plans: PlanInstance[], feature: planFeatures) => {
  return plans.map(t => getPlan(t).features.includes(feature) ).reduce((p,c) => p || c, false)
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

export const userPermissions = (user: User_Plan_Bots):UserPermissions => {

  let avlPlan = findAvailavlePlanForDecrement(user.current_plans)
  if (!avlPlan) return {
    telegram: false,
    proSettings: false,
    colors: false,
    removeLogo: false,
    moreBots: false,
    message: false,
    expired: true
  }

  return {
    telegram: doesAtleastOnePlanHaveFeature(user.current_plans, planFeatures.telegram),
    proSettings: doesAtleastOnePlanHaveFeature(user.current_plans, planFeatures.proSettings),
    colors: doesAtleastOnePlanHaveFeature(user.current_plans, planFeatures.colors),
    removeLogo: doesAtleastOnePlanHaveFeature(user.current_plans, planFeatures.removeOurLogo),
    moreBots: user.bots.length < getNumberOfAllowedBots(user.current_plans),
    message: getRemainingMesseages(user.current_plans) > 0,
    expired: false
  }
}
export type UserPermissions = {
  telegram: boolean,
  proSettings: boolean,
  colors: boolean,
  removeLogo: boolean,
  moreBots: boolean,
  message: boolean,
  expired: boolean
}

export const planMounthOptions = [1,2,3]

export const planDiscountMap = new Map<number, number>([
  [2, 3],
  [3, 5],
])
