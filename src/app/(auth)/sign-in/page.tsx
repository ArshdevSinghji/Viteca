import { Avatar, Box, Button, Stack, Typography } from "@mui/material";

import styles from "./sign-in.module.scss";
import React from "react";
import SelectLanguage from "@/components/select-language";

const SignIn = () => {
  return (
    <Box className={styles.sign_in_container}>
      <Box className={styles.container}>
        <Box className={styles.intro}>
          <Box>
            <img src="/video.png" alt="Video" width={30} height={30} />
          </Box>
          <Typography variant="h4" component="h4">
            Viteca
          </Typography>
          <Typography variant="subtitle2" component="p">
            Academic Content Manager.
          </Typography>
        </Box>
        <Box className={styles.auth_button}>
          <Typography variant="h6" component="h6">
            Login
          </Typography>
          <Button
            variant="text"
            startIcon={
              <img
                src={"/google.png"}
                style={{ width: "20px", height: "20px" }}
              />
            }
            component="button"
          >
            Continue with Google
          </Button>
        </Box>
      </Box>
      <Box>
        <SelectLanguage />
      </Box>
    </Box>
  );
};

export default SignIn;
