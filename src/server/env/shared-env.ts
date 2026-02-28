import z from "zod"

export enum Features {
  smartCustomerAssistant = "smartCustomerAssistant",
  something = "something"
}

export const sharedEnvSchema = z.object({
  VITE_features: z.string().default("").optional()
  .transform(v => v?.split(",").filter(Boolean) || []).pipe(z.array(z.nativeEnum(Features))),
})

export type sharedEnv = z.infer<typeof sharedEnvSchema>;
export const getSharedEnv = () => sharedEnvSchema.parse(import.meta.env)
export const sharedEnv = sharedEnvSchema.parse(import.meta.env)

type featureSelector = (f: typeof Features) => Features
export const featureEnabled = (f: featureSelector) => {
  const feature = f(Features)
  return sharedEnv.VITE_features.includes(feature)
}
