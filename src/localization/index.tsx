"use server";

import { Locale } from "next-intl";
import { cookies } from "next/headers";

const LOCAL_COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
  const cookieStore = await cookies();
  return cookieStore.get(LOCAL_COOKIE_NAME)?.value || "en-US";
}

export async function setUserLocale(locale: Locale) {
  const cookieStore = await cookies();
  cookieStore.set(LOCAL_COOKIE_NAME, locale);
}
