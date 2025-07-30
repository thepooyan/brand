export interface chatbotOrder {
  name: string,
  email: string,
  phone: string,
  botName: string,
  businessName: string,
  tone: string,
  language: string,
  pdfFiles: File[],
  websiteUrl: string,
  trainingText: string,
  maxResponseLength: string,
  customization: string,
  description: string,
}
export interface websiteOrder {
  budget: string,
  contentReady: string,
  description: string,
  email: string,
  features: string[],
  isMarketplace: string,
  name: string,
  pageCount: string,
  phone: string,
  timeline: string,
  websiteType: string,
}

export interface chatbotStatus {
  id: number,
  name: string,
  plan: string,
  messageCount: number,
  remainingMessages: number,
  expirationDate: string,
  isActive: boolean,
}

export type ChangeEvent<T extends EventTarget> =
  T extends EventTarget
    ? Event & { currentTarget: T }
    : Event

