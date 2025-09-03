import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import StoreProvider from "./store-provider";

export const metadata: Metadata = {
  title: "Viteca",
  description: "Yoohoo!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <AppRouterCacheProvider>
          <NextIntlClientProvider messages={messages}>
            <StoreProvider>{children}</StoreProvider>
            <Toaster
              position="top-right"
              theme="light"
              expand={true}
              duration={2000}
            />
          </NextIntlClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
