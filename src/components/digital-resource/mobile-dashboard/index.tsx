"use client";

import { Box, Chip, Paper, Stack, Typography } from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import styles from "./mobile-dashboard.module.scss";
import { useEffect, useState } from "react";
import AnchorTemporaryDrawer from "./bottom-drawer";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import NotFound from "../table/not-found";
import { GetDigitalResource } from "@/features/digitial-resources/digital-resources.action";
import InfiniteScroll from "react-infinite-scroll-component";

type Anchor = "bottom";

const MobileDashboard = () => {
  const { data, count } = useAppSelector((state) => state.digitalResources);
  const dispatch = useAppDispatch();

  const [state, setState] = useState({
    bottom: false,
  });

  const [selectedRow, setSelectedRow] = useState<(typeof data)[0] | null>(null);

  const loadMore = async () => {
    await dispatch(
      GetDigitalResource({
        pagination: {
          page: Math.ceil((data.length ?? 0 + 1) / 5),
          limit: data.length ?? 0 + 5,
        },
      })
    );
  };

  useEffect(() => {
    if (!data) {
      dispatch(
        GetDigitalResource({
          pagination: {
            page: 1,
            limit: 5,
          },
        })
      );
    }
  }, [dispatch]);

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
      {data ? (
        <InfiniteScroll
          dataLength={data.length}
          next={loadMore}
          hasMore={data.length < count}
          loader={<h4>Loading...</h4>}
          scrollableTarget="infinite-scroll-select-menu"
        >
          {data.map((row) => (
            <Paper
              variant="outlined"
              key={row.uuid}
              className={styles.mobileDashboard}
              onClick={(event) => {
                toggleDrawer("bottom", true)(event);
                setSelectedRow(row);
              }}
            >
              <Box className={styles.preview}>
                <img
                  src={row.urls.thumbnail}
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
                  <Typography className={styles.type}>
                    Type: {row.type}
                  </Typography>
                  <Typography className={styles.creationDate}>
                    Creation Date: {row.created_at}
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
        </InfiniteScroll>
      ) : (
        <Paper variant="outlined" sx={{ flexGrow: 1, borderRadius: "8px" }}>
          <NotFound />
        </Paper>
      )}
    </Box>
  );
};

export default MobileDashboard;
