import * as React from "react";
import { Box, Chip, Drawer } from "@mui/material";
import { Typography } from "@mui/material";

import styles from "./bottom-drawer.module.scss";
import { DigitalResource } from "@/features/digitial-resources/digital-resources.slice";

export default function AnchorTemporaryDrawer(props: {
  state: {
    bottom: boolean;
  };
  toggleDrawer: any;
  selectedRow: DigitalResource | null;
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

          <Typography component={"div"} className={styles.drawerBody}>
            <Box>
              Type:{" "}
              <Chip
                label={selectedRow.type
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l: string) => l.toUpperCase())}
                size="small"
              />
            </Box>
          </Typography>

          <Typography component={"div"} className={styles.drawerBody}>
            <Box>
              Authors:{" "}
              {selectedRow.speakers.map((speaker) => {
                return (
                  <Chip
                    key={speaker.uuid}
                    label={`${speaker.first_name} ${speaker.last_name}`}
                    size="small"
                    className={styles.chip}
                    style={{ marginRight: "5px" }}
                  />
                );
              })}
            </Box>
          </Typography>

          <Typography component={"div"} className={styles.drawerBody}>
            <Box>
              Duration:{" "}
              <Chip label={selectedRow.duration || "00:00:00"} size="small" />
            </Box>
          </Typography>

          <Typography component={"div"} className={styles.drawerBody}>
            <Box>
              Language: <Chip label={selectedRow.main_language} size="small" />
            </Box>
          </Typography>

          <Typography component={"div"} className={styles.drawerBody}>
            <Box>
              Translation:{" "}
              <Chip
                label={
                  selectedRow.generated_language.charAt(0).toUpperCase() +
                  selectedRow.generated_language.slice(1).toLowerCase()
                }
                size="small"
              />
            </Box>
          </Typography>

          <Typography className={styles.drawerBody}>
            Creation Date: {selectedRow.created_at.split("T")[0]}
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
