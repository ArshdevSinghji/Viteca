"use server";

import { signIn } from "@/app/auth/auth";

export async function Authenticate(userData: {
  email: string;
  name: string;
  photoUrl: string;
  token: string;
  refreshToken: string;
}) {
  try {
    const result = await signIn("credentials", {
      ...userData,
      redirect: false,
    });

    // sign in method returns
    // {
    //     error: undefined,
    //     status: 200,
    //     ok: true,
    //     url: null
    // }

    return {
      success: !result?.error,
      error: result?.error,
    };
  } catch (error) {
    return {
      success: false,
      error: "Authentication failed",
    };
  }
}
