type timePeriods = "1-mounth" | "2-mounth" | "3-mounth"

type feature = string

type plan = {
  name: string
  price: number,
  expiration: timePeriods,
  features: feature[]
}

const allFeatures: feature[] = [
  "ارسال رایگان",
  "جعبه خالی",
  "فلان چیز"
]

export const testPlan: plan = {
  name: "پلن تست",
  price: 50,
  expiration: "1-mounth",
  features: [
    ...allFeatures
  ]
}
