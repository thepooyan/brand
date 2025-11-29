import { z } from "zod";
import { envSchema, envSchemaPublic } from "./envSchema";
import { isServer } from "solid-js/web";

export type Env = z.infer<typeof envSchema>;
export type EnvPublic = z.infer<typeof envSchemaPublic>;

const env: Env = envSchema.parse(process.env);

export const getEnv = () => {
  if (!isServer) throw new Error("Attempt to access env in client.")
  return env
}

export const envPublic = envSchemaPublic.parse(import.meta.env)
//todo: remove VITE from public env
