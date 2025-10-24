import { z } from "zod";
import { envSchema } from "./envSchema";

export type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env);
