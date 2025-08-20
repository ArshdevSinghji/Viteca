import { Box, Typography } from "@mui/material";
import React from "react";

import styles from "./google-auth-button.module.scss";
import { useTranslations } from "next-intl";

const GoogleAuthButton = () => {
  const t = useTranslations("Login");
  return (
    <Box className={styles.googleAuthButtonContainer}>
      <Typography>{t("title")}</Typography>
      <Box component={"button"} className={styles.googleAuthButton}>
        <img src={"/google.png"} width={20} height={20} />
        <Box component={"span"} className={styles.googleAuthButtonText}>
          {t("auth-text")}
        </Box>
      </Box>
    </Box>
  );
};

export default GoogleAuthButton;
