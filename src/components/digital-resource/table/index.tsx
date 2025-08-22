"use client";

import { Box, Chip, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import SearchBar from "./search-bar";

import styles from "./table.module.scss";
import { useTranslations } from "next-intl";
import { useWindowSize } from "@/hooks/window-size/use-window-size.hook";
import { useEffect, useState } from "react";
import MobileDashboard from "../mobile-dashboard";

const Table = () => {
  const t = useTranslations("Table");

  const { width, height } = useWindowSize();

  const [responsive, setResponsive] = useState<boolean>(false);

  useEffect(() => {
    if (width < 720) {
      setResponsive(true);
    } else {
      setResponsive(false);
    }
  }, [width, height]);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "preview",
      headerName: `${t("preview")}`,
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box className={styles.previewContainer}>
            <img
              src={params.row.preview}
              alt="Preview"
              className={styles.previewImage}
            />
          </Box>
        );
      },
    },
    {
      field: "title",
      headerName: `${t("title")}`,
      flex: 1,
      minWidth: 314,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box className={styles.tableTitle}>
            <Typography>{params.row.title}</Typography>
          </Box>
        );
      },
    },
    {
      field: "type",
      headerName: `${t("type")}`,
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => {
        return <Chip label={params.row.type} />;
      },
    },
    {
      field: "duration",
      headerName: `${t("duration")}`,
      flex: 1,
      minWidth: 114,
      renderCell: (params: GridRenderCellParams) => {
        return <Chip label={params.row.duration} />;
      },
    },
    {
      field: "language",
      headerName: `${t("language")}`,
      flex: 1,
      minWidth: 118,
      renderCell: (params: GridRenderCellParams) => {
        return <Chip label={params.row.language} />;
      },
    },
    {
      field: "translation",
      headerName: `${t("translation")}`,
      flex: 1,
      minWidth: 128,
      renderCell: (params: GridRenderCellParams) => {
        return <Chip label={params.row.translation} />;
      },
    },
    {
      field: "creationDate",
      headerName: `${t("creationDate")}`,
      flex: 1,
    },
  ];
  const rows = [
    {
      id: 1,
      preview: "/preview.png",
      title: "Academic Management System: Academic Monitoring",
      type: "Interactive expository session",
      duration: "00:25:22",
      language: "ES",
      translation: "Human",
      creationDate: "16-04-2025",
    },
    {
      id: 2,
      preview: "/preview.png",
      title: "Academic Management System: Academic Monitoring",
      type: "Interactive expository session",
      duration: "00:25:22",
      language: "ES",
      translation: "Human",
      creationDate: "16-04-2025",
    },
    {
      id: 3,
      preview: "/preview.png",
      title: "Academic Management System: Academic Monitoring",
      type: "Interactive expository session",
      duration: "00:25:22",
      language: "ES",
      translation: "Human",
      creationDate: "16-04-2025",
    },
    {
      id: 4,
      preview: "/preview.png",
      title: "Academic Management System: Academic Monitoring",
      type: "Interactive expository session",
      duration: "00:25:22",
      language: "ES",
      translation: "Human",
      creationDate: "16-04-2025",
    },
    {
      id: 5,
      preview: "/preview.png",
      title: "Academic Management System: Academic Monitoring",
      type: "Interactive expository session",
      duration: "00:25:22",
      language: "ES",
      translation: "Human",
      creationDate: "16-04-2025",
    },
    {
      id: 6,
      preview: "/preview.png",
      title: "Academic Management System: Academic Monitoring",
      type: "Interactive expository session",
      duration: "00:25:22",
      language: "ES",
      translation: "Human",
      creationDate: "16-04-2025",
    },
    {
      id: 7,
      preview: "/preview.png",
      title: "Academic Management System: Academic Monitoring",
      type: "Interactive expository session",
      duration: "00:25:22",
      language: "ES",
      translation: "Human",
      creationDate: "16-04-2025",
    },
    {
      id: 8,
      preview: "/preview.png",
      title: "Academic Management System: Academic Monitoring",
      type: "Interactive expository session",
      duration: "00:25:22",
      language: "ES",
      translation: "Human",
      creationDate: "16-04-2025",
    },
    {
      id: 9,
      preview: "/preview.png",
      title: "Academic Management System: Academic Monitoring",
      type: "Interactive expository session",
      duration: "00:25:22",
      language: "ES",
      translation: "Human",
      creationDate: "16-04-2025",
    },
    {
      id: 10,
      preview: "/preview.png",
      title: "Academic Management System: Academic Monitoring",
      type: "Interactive expository session",
      duration: "00:25:22",
      language: "ES",
      translation: "Human",
      creationDate: "16-04-2025",
    },
    {
      id: 11,
      preview: "/preview.png",
      title: "Academic Management System: Academic Monitoring",
      type: "Interactive expository session",
      duration: "00:25:22",
      language: "ES",
      translation: "Human",
      creationDate: "16-04-2025",
    },
  ];

  return (
    <Box className={styles.tableContainer}>
      <SearchBar />
      <Box
        sx={{
          width: "100%",
        }}
      >
        {responsive ? (
          <MobileDashboard rows={rows} />
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 15]}
            disableRowSelectionOnClick
            rowHeight={115}
          />
        )}
      </Box>
    </Box>
  );
};

export default Table;
