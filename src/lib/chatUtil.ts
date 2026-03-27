import { getApi } from "./shared/api";
import { getUseChat } from "./shared/useChat";
import { sharedEnv } from "~/server/env/shared-env";

const useChatApi = getApi({getToken: () => sharedEnv.VITE_HOOSHBOT })
const userChatApi = getApi({})

export const useChat = getUseChat("/api/chat", useChatApi, "website")

export const useUserChat = (botId: string) => getUseChat(`/api/chat/session/${botId}`, userChatApi, "website")

