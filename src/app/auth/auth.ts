import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        if (credentials) {
          try {
            const res = await axios.get(
              `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_API_URL}/firebase/authentication?token=${credentials.token}`
            );
            if (res.data.permissions) {
              const hasPermission = res.data.permissions.some(
                (permission: { id: number; name: string }) => {
                  permission.name === "enters-videos-catalog-app";
                }
              );
              if (hasPermission) {
                return res.data;
              }
            }
            return null;
          } catch (error) {
            console.error("Error fetching Firebase auth:", error);
            return null;
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.roles = user.roles;
        token.permissions = user.permissions;
        token.token = user.token;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.roles = token.roles as { id: number; name: string }[];
        session.user.permissions = token.permissions as {
          id: string;
          name: string;
        }[];
        session.user.token = token.token as string;
        session.user.refreshToken = token.refreshToken as string;
      }
      return session;
    },
  },
});
