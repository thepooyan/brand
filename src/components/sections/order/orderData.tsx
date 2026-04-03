export const websiteCategories = [
  "marketplace",
  "portfolio",
  "blog",
  "service",
  "other",
] as const;

export type websiteCategory = typeof websiteCategories[number]

export const getCategoryLabel = (c: websiteCategory) => {
  switch (c) {
    case "marketplace":
      return "فروشگاه آنلاین"
    case "portfolio":
      return "پورتفولیو و کار نمونه"
    case "blog":
      return "محتوا و بلاگ"
    case "service":
      return "ارائه خدمات"
    case "other":
      return "موارد دیگر"
    default:
      const _case:never = c;
      throw new Error(`Unhandled website category: ${_case}`)
  }
}

export const websiteTypes = [
  {
    value: "coded",
    label: "وب‌سایت کدنویسی شده",
    description: "عملکرد بالا و سفارشی‌سازی کامل",
  },
  {
    value: "wordpress",
    label: "وب‌سایت وردپرس",
    description: "راه‌اندازی سریع و مدیریت آسان",
  },
];
export const additionalFeatures = [
  "پنل مدیریت کاربران",
  "سیستم پرداخت آنلاین",
  "چت آنلاین",
  "تقویم و رزرو آنلاین",
  "گالری تصاویر",
  "بلاگ و اخبار",
  "فرم‌های پیشرفته",
  "نقشه و موقعیت مکانی",
  "چندزبانه بودن",
  "API و وب سرویس",
];
