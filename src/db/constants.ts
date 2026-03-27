
export const chat_sources = [
  "telegram",
  "widget",
  "api",
  "website",
] as const

export type chat_sources = typeof chat_sources[number]

export type message = {
  role: "user" | "assistant" | "system",
  content: string
};

export interface timedMessage extends message {
  timestamp: Date
}
