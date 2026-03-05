import z from "zod"

export enum Features {
  smartCustomerAssistant = "smartCustomerAssistant",
  something = "something",
  enamad = "enamad",
  gtm = "gtm"
}

export const sharedEnvSchema = z.object({
  VITE_features: z.string().default("").optional()
  .transform(v => v?.split(",").filter(Boolean) || []).pipe(z.array(z.nativeEnum(Features))),
  PROD: z.boolean() 
})

export type sharedEnv = z.infer<typeof sharedEnvSchema>;
export const sharedEnv = sharedEnvSchema.parse(import.meta.env)

type featureSelector = (f: typeof Features) => Features
export const featureEnabled = (f: featureSelector) => {
  const feature = f(Features)
  return sharedEnv.VITE_features.includes(feature)
}

export const isProd = sharedEnv.PROD
