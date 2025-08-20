"use server";

import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from ".";

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = await getUserLocale();
  const lang = ["en-US", "es-ES"].includes(locale) ? locale : "en-US";

  return {
    locale: lang,
    messages: (await import(`./translations/${lang}.json`)).default,
  };
});
