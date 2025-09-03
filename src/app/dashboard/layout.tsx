import Navbar from "@/components/app-bar";
import { Stack } from "@mui/material";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Stack height={"100vh"}>
      <Navbar />
      {children}
    </Stack>
  );
}
