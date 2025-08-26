import { AppBar, Box, Button, Drawer, Stack, Typography } from "@mui/material";

import FilterFields from "../../ui/filter-fields/filter-fields";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./filter-drawer.module.scss";
import React from "react";

import { useWindowSize } from "@/hooks/window-size/use-window-size.hook";
import { useEffect, useState } from "react";

export default function FilterDrawer(props: {
  state: {
    right: boolean;
  };
  toggleDrawer: any;
}) {
  const { state, toggleDrawer } = props;
  const { width } = useWindowSize();

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(width < 480);
  }, [width]);

  const list = (anchor: "right") => (
    <Box role="presentation" className={styles.drawer}>
      <Stack gap={"16px"} className={styles.filter}>
        {!isMobile ? (
          <Box className={styles.header}>
            <Typography>Filters</Typography>
            <CloseIcon
              width={20}
              height={20}
              onClick={toggleDrawer("right", false)}
              cursor={"pointer"}
            />
          </Box>
        ) : (
          <AppBar position="fixed" className={styles.appBar}>
            <Box sx={{ p: "12px", height: "48px" }}>
              <CloseIcon onClick={toggleDrawer("right", false)} />
            </Box>
            <Typography>Filters</Typography>
          </AppBar>
        )}

        {isMobile && <Box sx={{ p: "16px", height: "56px" }} />}

        <FilterFields />

        <Box className={styles.button}>
          <Button variant="text" disabled>
            Clear
          </Button>
          <Button
            variant="text"
            onClick={toggleDrawer("right", false)}
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--primary-primary-900, #01579b)",
            }}
          >
            Apply
          </Button>
        </Box>
      </Stack>
    </Box>
  );

  return (
    <React.Fragment>
      <Drawer
        anchor={"right"}
        open={state["right"]}
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%",
            maxWidth: 320,
            "@media screen and (max-width: 480px)": {
              width: "100%",
              maxWidth: "100%",
            },
          },
        }}
      >
        {list("right")}
      </Drawer>
    </React.Fragment>
  );
}
