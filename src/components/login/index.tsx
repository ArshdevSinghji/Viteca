import { Box, Typography } from "@mui/material";

import styles from "./login.module.scss";
import GoogleAuthButton from "./google-auth-button";
import { useTranslations } from "next-intl";
import { ServerComponent } from "./select-language/server-component";

const Login = () => {
  const t = useTranslations("Login");
  return (
    <Box
      className={styles.container}
      sx={{ backgroundImage: "url('/login-background.svg')" }}
    >
      <Box className={styles.loginContent}>
        <Box className={styles.header}>
          <Box className={styles.appDetail}>
            <Box className={styles.appIcon}>
              <img src="/video.png" alt="Video" width={30} height={30} />
            </Box>
            <Typography className={styles.appName}>Viteca</Typography>
            <Typography>{t("company-description")}</Typography>
          </Box>
          <GoogleAuthButton />
        </Box>
        <Box>
          <ServerComponent />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
