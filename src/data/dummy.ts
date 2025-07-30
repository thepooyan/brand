import { chatbotStatus } from "~/lib/interface";

export const bots:chatbotStatus[] = [
  {
    id: 1,
    name: "پشتیبانی مشتریان",
    plan: "حرفه ای",
    messageCount: 15420,
    remainingMessages: 4580,
    expirationDate: "1403/08/15",
    isActive: true,
  },
  {
    id: 2,
    name: "فروش محصولات",
    plan: "استارتاپ",
    messageCount: 8750,
    remainingMessages: 1250,
    expirationDate: "1403/07/22",
    isActive: true,
  },
  {
    id: 3,
    name: "راهنمای تکنیکی",
    plan: "رایگان",
    messageCount: 450,
    remainingMessages: 50,
    expirationDate: "1403/06/30",
    isActive: false,
  },
  {
    id: 4,
    name: "اطلاعات عمومی",
    plan: "استارتاپ",
    messageCount: 6200,
    remainingMessages: 3800,
    expirationDate: "1403/09/10",
    isActive: true,
  },
];
