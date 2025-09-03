"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useState } from "react";

import styles from "./google-auth-button.module.scss";
import { useTranslations } from "next-intl";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "sonner";
import { auth } from "../firebase/firebase-config";
import { Authenticate } from "@/app/auth/authenticate";
import { useRouter } from "next/navigation";

const GoogleAuthButton = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const t = useTranslations("Login");

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const response: any = await signInWithPopup(auth, provider);

      const rawUserData = JSON.parse(response._tokenResponse.rawUserInfo);

      const userData = {
        email: response._tokenResponse?.email,
        name: rawUserData.name,
        photoUrl: response.user?.photoURL,
        token: response.user.accessToken,
        refreshToken: response._tokenResponse.refreshToken,
      };

      const res = await Authenticate(userData);

      setLoading(false);

      if (res?.error) toast.error(t("error"));
      else {
        toast.success(t("success"));
        router.push("/dashboard");
      }
    } catch (err) {
      toast.error(t("error"));
      setLoading(false);
    }
  };

  return (
    <Box className={styles.googleAuthButtonContainer}>
      <Typography>{t("title")}</Typography>
      <Box
        component={"button"}
        className={styles.googleAuthButton}
        onClick={handleGoogleSignIn}
      >
        {loading ? (
          <CircularProgress size={"20px"} />
        ) : (
          <img src={"/google.png"} width={20} height={20} />
        )}
        <Box component={"span"} className={styles.googleAuthButtonText}>
          {t("auth-text")}
        </Box>
      </Box>
    </Box>
  );
};

export default GoogleAuthButton;
