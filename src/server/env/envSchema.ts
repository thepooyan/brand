import { z } from "zod";
import { Features } from "./features";

const stripQuotes = (v: unknown) => {
  if (typeof v !== "string") return v;
  const s = v.trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1).trim();
  }
  return s;
};

const pre = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (typeof v === "string" ? stripQuotes(v) : v), schema);

export const envSchema = z.object({
  features: pre(z.string().default("").transform(v => v.split(",").filter(Boolean)).pipe(z.array(z.nativeEnum(Features)))),
  SESSION_SECRET: pre(z.string().min(1)),
  TURSO_DATABASE_URL: pre(z.string().min(1)),
  TURSO_AUTH_TOKEN: pre(z.string().min(1)),
  GOOGLE_GENERATIVE_AI_API_KEY: pre(z.string().min(1)),
  ADMIN_BOT: pre(z.string().min(1)),
  SUPPORT_BOT: pre(z.string().min(1)),
  BUCKET_URL: pre(z.string().min(1)),
  BUCKET_KEY: pre(z.string().min(1)),
  BUCKET_SECRET: pre(z.string().min(1)),
  BUCKET_NAME: pre(z.string().min(1)),
});
