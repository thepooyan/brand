type mounthCount = 1 | 2 | 3

type feature = string

export type plan = {
  name: string
  price: number,
  expirationMounth: mounthCount,
  messageCount: number,
  botCount: number,
  features: feature[]
}

export const allFeatures: feature[] = [
  "یادگیری از لینک",
  "رنگ سازمانی",
  "حذف لوگو هوشبان",
  "پشتیبانی اختصاصی"
]

const testPlan1: plan = {
  name: "پلن شروع",
  price: 50,
  expirationMounth: 1,
  messageCount: 100,
  botCount: 2,
  features: [
  ],
}

const testPlan2: plan = {
  name: "پلن متوسط",
  price: 150,
  expirationMounth: 1,
  messageCount: 500,
  botCount: 5,
  features: [
    "رنگ سازمانی",
    "حذف لوگو هوشبان",
  ],
}

const testPlan3: plan = {
  name: "پلن حرفه‌ای",
  price: 200,
  expirationMounth: 1,
  messageCount: 1000,
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
