import * as React from "react";
import { Box, Chip, Drawer } from "@mui/material";
import { Rows } from "..";
import { Typography } from "@mui/material";

import styles from "./bottom-drawer.module.scss";

export default function AnchorTemporaryDrawer(props: {
  state: {
    bottom: boolean;
  };
  toggleDrawer: any;
  selectedRow: Rows | null;
}) {
  const { state, toggleDrawer, selectedRow } = props;

  const list = (anchor: "bottom") => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className={styles.drawerContainer}
    >
      {selectedRow && (
        <Box className={styles.drawerDetails}>
          <Typography className={styles.drawerTitle}>
            {selectedRow.title}
          </Typography>
          <Typography className={styles.drawerBody}>
            Type: <Chip label={selectedRow.type} size="small" />
          </Typography>
          <Typography className={styles.drawerBody}>
            Duration: <Chip label={selectedRow.duration} size="small" />
          </Typography>
          <Typography className={styles.drawerBody}>
            Language: <Chip label={selectedRow.language} size="small" />
          </Typography>
          <Typography className={styles.drawerBody}>
            Translation: <Chip label={selectedRow.translation} size="small" />
          </Typography>
          <Typography className={styles.drawerBody}>
            Creation Date: {selectedRow.creationDate}
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <React.Fragment>
      <Drawer
        anchor={"bottom"}
        open={state["bottom"]}
        onClose={toggleDrawer("bottom", false)}
        disableScrollLock
        sx={{
          "& .MuiDrawer-paper": {
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
          },
        }}
      >
        {list("bottom")}
      </Drawer>
    </React.Fragment>
  );
}
