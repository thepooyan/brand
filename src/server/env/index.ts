import { z } from "zod";
import { envSchema } from "./envSchema";
import { isServer } from "solid-js/web";

export type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env);
export const getEnv = async () => {
  console.log(isServer)
  console.log(import.meta.env)
  if (isServer) 
  return envSchema.parse(process.env)
  else return envSchema.parse(import.meta.env)
}
