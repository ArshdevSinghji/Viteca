"use client";

import * as React from "react";

import { AppBar, Box, Toolbar, Typography } from "@mui/material";

import styles from "./navbar.module.scss";

import ProfileMenu from "./profile-menu";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className={styles.appBar}>
        <Toolbar className={styles.toolbar}>
          <Typography variant="h6" component="div" className={styles.title}>
            Viteca
          </Typography>
          <ProfileMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
