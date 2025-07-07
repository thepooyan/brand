import { AiFillRobot } from "solid-icons/ai";
import {
  FiSmartphone,
  FiCode,
  FiGlobe,
  FiZap,
  FiShield,
  FiClock,
} from "solid-icons/fi";

export const integrationOptions = [
  {
    icon: FiSmartphone,
    title: "تلگرام بات",
    description:
      "چت‌بات هوشمند در تلگرام که مشتریان می‌تونن مستقیماً باهاش ارتباط برقرار کنن",
    features: ["پاسخ خودکار", "مدیریت سفارشات", "پشتیبانی ۲۴/۷"],
    link: "/Telegram",
  },
  {
    icon: FiCode,
    title: "API Integration",
    description: "ادغام چت‌بات با سیستم‌های موجود شما از طریق API قدرتمند",
    features: ["RESTful API", "Webhook Support", "مستندات کامل"],
    link: "/API",
  },
  {
    icon: FiGlobe,
    title: "ویجت وب‌سایت",
    description: "چت‌بات تعبیه شده در وب‌سایت شما با طراحی سفارشی",
    features: ["طراحی سفارشی", "نصب آسان", "واکنش‌گرا"],
    link: "/Widget",
  },
];

export const features = [
  {
    icon: FiZap,
    title: "پاسخ سریع",
    description: "پاسخ‌دهی در کمتر از ۲ ثانیه",
  },
  {
    icon: AiFillRobot,
    title: "هوش مصنوعی پیشرفته",
    description: "استفاده از آخرین تکنولوژی‌های AI",
  },
  {
    icon: FiShield,
    title: "امنیت بالا",
    description: "حفاظت کامل از اطلاعات مشتریان",
  },
  {
    icon: FiClock,
    title: "دسترسی ۲۴/۷",
    description: "خدمات بدون وقفه در تمام ساعات",
  },
];
