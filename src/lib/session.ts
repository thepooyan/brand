import { useSession } from "vinxi/http";
import { usersTable } from "~/db/schema";
import {  privateEnv } from "~/server/env/private-env";
import { theme } from "./theme";

export enum ROLES {
  USER,
  ADMIN
}

export type AuthSessionData = {
  user?: typeof usersTable.$inferSelect & {role: ROLES}
};

async function useAuthSession() {
  "use server";
  const session = await useSession<AuthSessionData>({
    password: privateEnv.SESSION_SECRET as string,
    name: "auth",
  });

  return session;
}

export async function getAuthSession() {
  "use server";
  const session = await useAuthSession();

  return session.data.user;
}

export async function updateAuthSession(data: AuthSessionData) {
  "use server";
  const session = await useAuthSession();
  await session.update(data);
}

export async function clearAuthSession() {
  "use server";
  const session = await useAuthSession();
  await session.clear();
}

export type ThemeSessionData = {
  theme: theme
};

async function useThemeSession() {
  "use server";
  const session = await useSession<ThemeSessionData>({
    password: privateEnv.SESSION_SECRET as string,
    name: "theme",
  });

  return session;
}

export async function getThemeSession() {
  "use server";
  const session = await useThemeSession();

  return session.data.theme;
}

export async function updateThemeSession(data: ThemeSessionData) {
  "use server";
  const session = await useThemeSession();
  await session.update(data);
}

export async function clearThemeSession() {
  "use server";
  const session = await useThemeSession();
  await session.clear();
}
