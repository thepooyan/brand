import { envPublic } from "."

export enum Features {
  smartCustomerAssistant = "smartCustomerAssistant",
  something = "something"
}

type featureSelector = (f: typeof Features) => Features
export const featureEnabled = (f: featureSelector) => {
  const feature = f(Features)
  return envPublic.VITE_features.includes(feature)
}
