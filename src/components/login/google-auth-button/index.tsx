"use client";

import { Box, Typography } from "@mui/material";
import React from "react";

import styles from "./google-auth-button.module.scss";
import { useTranslations } from "next-intl";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "sonner";
import { auth } from "../firebase/firebase-config";

const GoogleAuthButton = () => {
  const t = useTranslations("Login");

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      if (response.user) toast.success(t("success"));
      else toast.error(t("error"));
    } catch (err) {
      toast.error(t("error"));
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
        <img src={"/google.png"} width={20} height={20} />
        <Box component={"span"} className={styles.googleAuthButtonText}>
          {t("auth-text")}
        </Box>
      </Box>
    </Box>
  );
};

export default GoogleAuthButton;
