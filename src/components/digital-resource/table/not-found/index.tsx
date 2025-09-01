import { Box, Stack, Typography } from "@mui/material";
import React from "react";

import styles from "./not-found.module.scss";

const NotFound = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      gap={2}
      sx={{ height: "100%" }}
    >
      <img
        src="/not-found.png"
        alt="Not Found"
        className={styles.notFoundImage}
      />
      <Typography className={styles.notFoundHeadText}>
        No related resources found
      </Typography>
      <Typography className={styles.notFoundBodyText}>
        To view associated resources, you must request the creation of a
        resource using the "New" button at the top.
      </Typography>
    </Stack>
  );
};

export default NotFound;
