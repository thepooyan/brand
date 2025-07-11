import { useSession } from "vinxi/http";
import { usersTable } from "~/db/schema";

type SessionData = {
  user?: typeof usersTable.$inferSelect
};

async function useAuthSession() {
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

  return session.data.user;
}

export async function updateAuthSession(data: SessionData) {
  "use server";
  const session = await useAuthSession();
  await session.update(data);
}

export async function clearAuthSession() {
  "use server";
  const session = await useAuthSession();
  await session.clear();
}
