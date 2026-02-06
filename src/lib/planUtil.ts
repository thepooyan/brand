export type ToneValue = keyof typeof ToneOptions

export const ToneOptions = {
  formal: {
    label: "رسمی",
    description: "مناسب برای کسب‌وکارهای جدی و حرفه‌ای",
    llmPrompt: "پاسخ را به صورت رسمی و محترمانه بنویس."
  },
  friendly: {
    label: "دوستانه",
    description: "صمیمی و گرم برای ارتباط نزدیک با مشتریان",
    llmPrompt: "پاسخ را به شکل دوستانه و صمیمی بنویس."
  },
  professional: {
    label: "حرفه‌ای",
    description: "متعادل بین رسمی و دوستانه",
    llmPrompt: "پاسخ را با لحنی حرفه‌ای و قابل اعتماد بنویس."
  },
  enthusiastic: {
    label: "پرانرژی",
    description: "مثبت و انگیزه‌بخش",
    llmPrompt: "پاسخ را با انرژی بالا و لحن مثبت بنویس."
  },
  helpful: {
    label: "کمک‌کننده",
    description: "متمرکز بر حل مشکل و راهنمایی",
    llmPrompt: "پاسخ را با تمرکز بر کمک‌رسانی و راهنمایی بنویس."
  }
} as const

const isToneKey = (value: string): value is ToneValue =>
  value in ToneOptions

export const getToneValue = (str: string) => {
  if (isToneKey(str)) {
    return ToneOptions[str]
  }
  return null
}

export const getToneKeyByLabel = (label: string): ToneValue | null => {
  for (const key of Object.keys(ToneOptions) as ToneValue[]) {
    if (ToneOptions[key].label === label) {
      return key
    }
  }
  return null
}
