import { AiFillRobot } from "solid-icons/ai";
import {
  FiSmartphone,
  FiCode,
  FiGlobe,
  FiZap,
  FiShield,
  FiClock,
} from "solid-icons/fi";
import {
  MessageSquare,
  Bot,
  Eye,
  PenTool,
  Mic,
  FileText,
  TrendingUp,
  Camera,
  Zap,
  Shield,
  Clock,
  CheckCircle,
} from "lucide-solid";

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

export const services = [
  {
    id: "smart-assistant",
    icon: MessageSquare,
    title: "دستیار هوشمند مشتری",
    subtitle: "Smart Customer Assistant",
    description:
      "چت‌بات هوشمند که در وب‌سایت، تلگرام و سایر پلتفرم‌ها پاسخگوی مشتریان شماست",
    features: [
      "پاسخ‌دهی ۲۴ ساعته",
      "ادغام با وب‌سایت و تلگرام",
      "پشتیبانی چندزبانه",
      "تنظیمات شخصی‌سازی کامل",
    ],
    price: "از ۵ میلیون تومان",
    popular: false,
    demoLink: "Chat-Bot/Demo",
    link: "Chat-Bot"
  },
  {
    id: "business-agent",
    icon: Bot,
    title: "نماینده کسب‌وکار هوشمند",
    subtitle: "Intelligent Business Agent",
    description:
      "ربات پیشرفته با قابلیت ذخیره اطلاعات، رزرو بلیط، ارسال ایمیل و انجام کارهای پیچیده",
    features: [
      "مدیریت اطلاعات مشتریان",
      "رزرو و خرید آنلاین",
      "ارسال ایمیل و پیامک",
      "ادغام با سیستم‌های CRM",
    ],
    price: "از ۱۵ میلیون تومان",
    popular: true,
    demoLink: null,
    link: ""
  },
  {
    id: "automation-agent",
    icon: Eye,
    title: "سیستم نظارت هوشمند",
    subtitle: "Smart Monitoring System",
    description:
      "عامل هوشمند برای خودکارسازی کارهای روزانه از نظارت بر دوربین‌ها تا تشخیص پلاک خودرو",
    features: [
      "نظارت بر دوربین‌های امنیتی",
      "تشخیص پلاک خودرو",
      "هشدار خودکار",
      "گزارش‌دهی هوشمند",
    ],
    price: "از ۲۵ میلیون تومان",
    popular: false,
    demoLink: null,
    link: ""
  },
  {
    id: "content-generator",
    icon: PenTool,
    title: "تولیدکننده محتوای هوشمند",
    subtitle: "AI Content Generator",
    description:
      "سیستم هوشمند برای تولید محتوا، نوشتن مقالات، پست‌های شبکه‌های اجتماعی و متن‌های تبلیغاتی",
    features: [
      "نوشتن مقالات و بلاگ",
      "تولید محتوای شبکه‌های اجتماعی",
      "متن‌های تبلیغاتی",
      "ترجمه و ویرایش متن",
    ],
    price: "از ۸ میلیون تومان",
    popular: false,
    demoLink: null,
    link: ""
  },
  {
    id: "voice-assistant",
    icon: Mic,
    title: "دستیار صوتی هوشمند",
    subtitle: "Voice AI Assistant",
    description:
      "سیستم تشخیص و پردازش گفتار برای ایجاد تعامل صوتی با مشتریان و کاربران",
    features: [
      "تشخیص گفتار فارسی",
      "پاسخ صوتی طبیعی",
      "ادغام با تلفن و کال سنتر",
      "فرمان‌های صوتی",
    ],
    price: "از ۲۰ میلیون تومان",
    popular: false,
    demoLink: null,
    link: ""
  },
  {
    id: "document-processor",
    icon: FileText,
    title: "پردازشگر اسناد هوشمند",
    subtitle: "Smart Document Processor",
    description:
      "سیستم هوشمند برای استخراج اطلاعات از اسناد، OCR و پردازش خودکار فایل‌ها",
    features: [
      "تشخیص متن از تصاویر (OCR)",
      "استخراج اطلاعات از اسناد",
      "طبقه‌بندی خودکار فایل‌ها",
      "تبدیل فرمت‌های مختلف",
    ],
    price: "از ۱۲ میلیون تومان",
    popular: false,
    demoLink: null,
    link: ""
  },
  {
    id: "analytics-ai",
    icon: TrendingUp,
    title: "تحلیلگر پیش‌بینی هوشمند",
    subtitle: "Predictive Analytics AI",
    description:
      "سیستم هوشمند برای تحلیل داده‌ها، پیش‌بینی روندها و ارائه بینش‌های کسب‌وکار",
    features: [
      "تحلیل داده‌های فروش",
      "پیش‌بینی روندهای بازار",
      "گزارش‌های هوشمند",
      "داشبورد تعاملی",
    ],
    price: "از ۳۰ میلیون تومان",
    popular: false,
    demoLink: null,
    link: ""
  },
  {
    id: "image-recognition",
    icon: Camera,
    title: "تشخیص تصویر هوشمند",
    subtitle: "AI Image Recognition",
    description:
      "سیستم تشخیص و تحلیل تصاویر برای کاربردهای مختلف از امنیت تا کنترل کیفیت",
    features: [
      "تشخیص چهره و اشیاء",
      "کنترل کیفیت محصولات",
      "تحلیل تصاویر پزشکی",
      "طبقه‌بندی خودکار تصاویر",
    ],
    price: "از ۱۸ میلیون تومان",
    popular: false,
    demoLink: null,
    link: ""
  },
];

export const benefits = [
  {
    icon: Zap,
    title: "سرعت بالا",
    description: "پردازش و پاسخ‌دهی در کسری از ثانیه",
  },
  {
    icon: Shield,
    title: "امنیت تضمینی",
    description: "حفاظت کامل از اطلاعات و داده‌های شما",
  },
  {
    icon: Clock,
    title: "دسترسی ۲۴/۷",
    description: "خدمات بدون وقفه در تمام ساعات شبانه‌روز",
  },
  {
    icon: CheckCircle,
    title: "پشتیبانی کامل",
    description: "راهنمایی و نگهداری مستمر سیستم‌ها",
  },
];
