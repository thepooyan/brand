import { getApi } from "./shared/api";
import { getUseChat } from "./shared/useChat";
import { sharedEnv } from "~/server/env/shared-env";

export type message = {
  role: "user" | "assistant" | "system",
  content: string
};

export interface timedMessage extends message {
  timestamp: Date
}

export const chat_sources = [
  "telegram",
  "widget",
  "api",
  "website",
] as const
export type chat_sources = typeof chat_sources[number]

const useChatApi = getApi({getToken: () => sharedEnv.VITE_HOOSHBOT })
const userChatApi = getApi({})

export const useChat = getUseChat("/api/chat", useChatApi, "website")

export const useUserChat = (botId: string) => getUseChat(`/api/chat/session/${botId}`, userChatApi, "website")

