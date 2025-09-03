"use client";

import { Box, Typography } from "@mui/material";
import React from "react";

import styles from "./dashboard.module.scss";
import BasicTabs from "./table/tab";
import Table from "./table";
import { useTranslations } from "next-intl";

const DashboardComponent = () => {
  const t = useTranslations("Dashboard");

  return (
    <Box className={styles.dashboard}>
      <Typography className={styles.title}>{t("title")}</Typography>
      <Box className={styles.content}>
        <BasicTabs />
        <Table />
      </Box>
    </Box>
  );
};

export default DashboardComponent;
