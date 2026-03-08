type mounthCount = 1 | 2 | 3

type feature = string

export type plan = {
  name: string
  price: number | "free",
  expiration: mounthCount | null,
  features: feature[]
}

export const allFeatures: feature[] = [
  "ارسال رایگان",
  "جعبه خالی",
  "فلان چیز",
  "اسباب کشی",
  "دهانشویه",
  "قالی باف",
  "برد بالا",
  "اطمینان",
]

const testPlan1: plan = {
  name: "پلن رایگان",
  price: "free",
  expiration: null,
  features: [
  ]
}

const testPlan2: plan = {
  name: "پلن حرفه‌ای",
  price: 50,
  expiration: 2,
  features: [
    ...allFeatures
  ]
}

const testPlan3: plan = {
  name: "پلن حرفه‌ای",
  price: 200,
  expiration: 3,
  features: [
    ...allFeatures
  ]
}

export const allPlans = [
  testPlan1,
  testPlan2,
  testPlan3,
]
