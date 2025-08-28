import Navbar from "@/components/app-bar";
import { Box, Stack } from "@mui/material";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Stack height={"100vh"}>
      <Navbar />
      <Box flexGrow={2}>{children}</Box>
    </Stack>
  );
}
