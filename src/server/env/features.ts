import { isServer } from "solid-js/web"
import { envPublic } from "."

export enum Features {
  smartCustomerAssistant = "smartCustomerAssistant",
  something = "something"
}

type featureSelector = (f: typeof Features) => Features
export const featureEnabled = (f: featureSelector) => {
  if (isServer) {
    const feature = f(Features)
    return envPublic.VITE_features.includes(feature)
  } else {
    return false
  }
}
