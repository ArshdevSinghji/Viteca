import { cookies } from "next/headers";
import SelectLanguage from "..";

const LOCAL_COOKIE_NAME = "NEXT_LOCALE";

export async function ServerComponent() {
  const cookieStore = await cookies();
  const locale = cookieStore.get(LOCAL_COOKIE_NAME)?.value || "en-US";

  return <SelectLanguage locale={locale} />;
}
