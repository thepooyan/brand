import { z } from "zod";
import { Features } from "./features";



export const envSchema = z.object({
  features: z.string().default("").optional()
  .transform(v => v?.split(",").filter(Boolean) || []).pipe(z.array(z.nativeEnum(Features))),
  SESSION_SECRET: z.string().min(1),
  TURSO_DATABASE_URL: z.string().min(1),
  TURSO_AUTH_TOKEN: z.string().min(1),
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
  ADMIN_BOT: z.string().min(1),
  SUPPORT_BOT: z.string().min(1),
  BUCKET_URL: z.string().min(1),
  BUCKET_KEY: z.string().min(1),
  BUCKET_SECRET: z.string().min(1),
  BUCKET_NAME: z.string().min(1),
});
