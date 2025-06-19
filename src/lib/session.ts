import { useSession } from "vinxi/http";

type SessionData = {
  token: string
};

export async function useAuthSession() {
  "use server";
  const session = await useSession<SessionData>({
    password: process.env.SESSION_SECRET as string,
    name: "auth",
  });

  return session;
}

export async function getAuthSession() {
  "use server";
  const session = await useAuthSession();

  return session.data.token;
}

export async function updateAuthSession(data: SessionData) {
  "use server";
  const session = await useAuthSession();
  await session.update(data);
}

export async function clearThemeSession() {
  "use server";
  const session = await useAuthSession();
  await session.clear();
}
