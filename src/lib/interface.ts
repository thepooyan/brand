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
