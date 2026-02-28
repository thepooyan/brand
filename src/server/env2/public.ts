import z from "zod"

export enum Features {
  smartCustomerAssistant = "smartCustomerAssistant",
  something = "something"
}

export const envSchemaPublic = z.object({
  VITE_features: z.string().default("").optional()
  .transform(v => v?.split(",").filter(Boolean) || []).pipe(z.array(z.nativeEnum(Features))),
})

export const publicEnv = () => envSchemaPublic.parse(import.meta.env)

type featureSelector = (f: typeof Features) => Features
export const featureEnabled = (f: featureSelector) => {
  console.log("running")
  console.log(import.meta.env)
  const feature = f(Features)
  return publicEnv().VITE_features.includes(feature)
}
