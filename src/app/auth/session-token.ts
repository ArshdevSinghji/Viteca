"use server";

import { auth } from "./auth";

export async function getSessionToken() {
  const session = await auth();

  if (!session) return null;

  const token = session.user?.token;

  return token;
}
