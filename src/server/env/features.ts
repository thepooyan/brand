import { env } from "."

export enum Features {
  smartCustomerAssistant,
  something
}

export const featureEnabled = (f: Features) => {
  return env.features.includes(f)
}
