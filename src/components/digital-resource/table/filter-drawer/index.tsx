"use client";

import { AppBar, Box, Button, Drawer, Stack, Typography } from "@mui/material";

import FilterFields from "../../ui/filter-fields";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./filter-drawer.module.scss";
import React from "react";

import { useWindowSize } from "@/hooks/window-size/use-window-size.hook";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { clearFilters } from "@/features/filter/filter.slice";
import { GetDigitalResource } from "@/features/digitial-resources/digital-resources.action";

export default function FilterDrawer(props: {
  state: {
    right: boolean;
  };
  toggleDrawer: any;
}) {
  const { state, toggleDrawer } = props;
  const { width } = useWindowSize();

  const [isMobile, setIsMobile] = useState<boolean>(false);

  const filterState = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const handleClear = () => {
    dispatch(clearFilters());
  };

  const handleApply = async (e: any) => {
    await dispatch(
      GetDigitalResource({
        search: filterState.search,
        modality: filterState.modality,
        generated_language: filterState.generated_language,
        category: filterState.category,
        subjects: filterState.subjects,
        status: filterState.status,
        subtitle_languages: filterState.subtitle_languages,
        audio_languages: filterState.audio_languages,
        // campuses: filterState.campuses,
        date_filter: {
          publication_date: filterState.date.publication_date,
        },
        pagination: {
          page: filterState.pagination.page || 1,
          limit: filterState.pagination.pageSize || 2,
        },
      })
    );
    toggleDrawer("right", false)(e);
  };

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
          <Button variant="text" onClick={handleClear}>
            Clear
          </Button>
          <Button
            variant="text"
            onClick={(e) => handleApply(e)}
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
