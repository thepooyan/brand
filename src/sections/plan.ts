type mounthCount = 1 | 2 | 3

type feature = string

export type plan = {
  name: string
  price: number,
  expiration: mounthCount,
  features: feature[]
  counting_features: countingFeature[]
}

export type countingFeature = {name: string, count: number, unit?: string}

export const countingFeatures = [
  "تعداد پیام",
  "تعداد ربات",
]

export const allFeatures: feature[] = [
  "رنگ سازمانی",
  "حذف لوگو هوشبان",
]

const testPlan1: plan = {
  name: "پلن شروع",
  price: 50,
  expiration: 1,
  features: [
  ],
  counting_features: [
    {
      name: "تعداد پیام",
      count: 100
    },
    {
      name: "فضای ذخیره سازی",
      count: 10,
      unit: "گیگابایت"
    },
    {
      name: "تعداد ربات",
      count: 2,
    },
  ]
}

const testPlan2: plan = {
  name: "پلن متوسط",
  price: 150,
  expiration: 1,
  features: [
    "رنگ سازمانی",
    "حذف لوگو هوشبان",
  ],
  counting_features: [
    {
      name: "تعداد پیام",
      count: 10000
    },
    {
      name: "تعداد ربات",
      count: 20,
    },
  ]
}

const testPlan3: plan = {
  name: "پلن حرفه‌ای",
  price: 200,
  expiration: 1,
  features: [
    ...allFeatures
  ],
  counting_features: [
    {
      name: "تعداد پیام",
      count: 100
    },
    {
      name: "تعداد ربات",
      count: 2,
    },
  ]
}

export const allPlans = [
  testPlan1,
  testPlan2,
]
