"use client";

import { Box, Chip, Paper, Stack, Typography } from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import styles from "./mobile-dashboard.module.scss";
import { useState } from "react";
import AnchorTemporaryDrawer from "./bottom-drawer";

export interface Rows {
  id: number;
  preview: string;
  title: string;
  type: string;
  duration: string;
  language: string;
  translation: string;
  creationDate: string;
}

type Anchor = "bottom";

const MobileDashboard: React.FC<{ rows: Rows[] }> = ({ rows }) => {
  const [state, setState] = useState({
    bottom: false,
  });

  const [selectedRow, setSelectedRow] = useState<Rows | null>(null);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  return (
    <Box className={styles.mobileDashboardContainer}>
      {rows.map((row) => (
        <Paper
          variant="outlined"
          key={row.id}
          className={styles.mobileDashboard}
          onClick={(event) => {
            toggleDrawer("bottom", true)(event);
            setSelectedRow(row);
          }}
        >
          <Box className={styles.preview}>
            <img
              src={row.preview}
              alt="Preview"
              className={styles.previewImage}
            />
            <Chip
              label="Tap to Preview"
              size="small"
              className={styles.previewChip}
            />
          </Box>
          <Stack direction="row" alignItems="center" gap="5px">
            <Box sx={{ flexGrow: 1 }}>
              <Typography className={styles.title}>{row.title}</Typography>
              <Typography className={styles.type}>Type: {row.type}</Typography>
              <Typography className={styles.creationDate}>
                Creation Date: {row.creationDate}
              </Typography>
            </Box>
            <MoreVertIcon />
          </Stack>
        </Paper>
      ))}
      <AnchorTemporaryDrawer
        state={state}
        toggleDrawer={toggleDrawer}
        selectedRow={selectedRow}
      />
    </Box>
  );
};

export default MobileDashboard;
