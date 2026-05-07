import { z } from "zod";

export const privateEnvSchema = z.object({
  SESSION_SECRET: z.string().min(1),
  TURSO_DATABASE_URL: z.string().min(1),
  TURSO_AUTH_TOKEN: z.string().min(1),
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
  ADMIN_BOT: z.string().min(1),
  SUPPORT_BOT: z.string().min(1),
  BUCKET_KEY: z.string().min(1),
  BUCKET_SECRET: z.string().min(1),
  BUCKET_NAME: z.string().min(1),
  SMS_PANEL: z.string().min(1),
  GAPGPT_API_KEY: z.string(),
  GAPGPT_API_URL: z.string()
});

export type PrivateEnv = z.infer<typeof privateEnvSchema>;
export const privateEnv: PrivateEnv = privateEnvSchema.parse(process.env);
