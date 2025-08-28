"use client";

import { Box, Chip, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import SearchBar from "./search-bar";

import styles from "./table.module.scss";
import { useTranslations } from "next-intl";
import { useWindowSize } from "@/hooks/window-size/use-window-size.hook";
import { useEffect, useState } from "react";
import MobileDashboard from "../mobile-dashboard";
import AuthorCell from "./author-cell";

const LIMIT = 2;

const Table = () => {
  const t = useTranslations("Table");

  const { width, height } = useWindowSize();

  const [responsive, setResponsive] = useState<boolean>(false);

  useEffect(() => {
    if (width < 480) {
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
      editable: false,
      sortable: false,
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
          <Box className={styles.text}>
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
        return (
          <Chip label={params.row.type} size="small" className={styles.chip} />
        );
      },
    },
    {
      field: "authors",
      headerName: `${t("authors")}`,
      flex: 1,
      minWidth: 226,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        return <AuthorCell authors={params.row.authors} />;
      },
    },
    {
      field: "duration",
      headerName: `${t("duration")}`,
      flex: 1,
      minWidth: 114,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box className={styles.text}>
            <Typography>{params.row.duration}</Typography>
          </Box>
        );
      },
    },
    {
      field: "language",
      headerName: `${t("language")}`,
      flex: 1,
      minWidth: 118,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Chip
            label={params.row.language}
            size="small"
            className={styles.chip}
          />
        );
      },
    },
    {
      field: "translation",
      headerName: `${t("translation")}`,
      flex: 1,
      minWidth: 128,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Chip
            label={params.row.translation}
            size="small"
            className={styles.chip}
          />
        );
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
      authors: [
        "Thania Candelaria Chio Montero",
        "Daniel González",
        "Author 1",
        "Author 2",
        "Author 3",
      ],
      duration: "00:25:22",
      language: "ES",
      translation: "Human",
      creationDate: "16-04-2025",
    },
    {
      id: 2,
      preview: "/preview.png",
      title: "Digital Library: Resource Cataloging",
      type: "Workshop",
      authors: ["Maria Lopez", "John Smith", "Author 4", "Author 5"],
      duration: "01:10:45",
      language: "EN",
      translation: "Machine",
      creationDate: "10-03-2025",
    },
    {
      id: 3,
      preview: "/preview.png",
      title: "E-Learning Platform: Course Creation",
      type: "Seminar",
      authors: ["Emily Clark", "Michael Brown"],
      duration: "00:45:30",
      language: "FR",
      translation: "Human",
      creationDate: "22-02-2025",
    },
    {
      id: 4,
      preview: "/preview.png",
      title: "Research Repository: Data Management",
      type: "Lecture",
      authors: ["Sophie Turner", "David Lee", "Author 6"],
      duration: "00:30:00",
      language: "DE",
      translation: "None",
      creationDate: "05-01-2025",
    },
    {
      id: 5,
      preview: "/preview.png",
      title: "Online Assessment: Exam Automation",
      type: "Panel Discussion",
      authors: ["Olivia Martinez", "James Wilson"],
      duration: "00:55:10",
      language: "ES",
      translation: "Machine",
      creationDate: "18-12-2024",
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
            slotProps={{
              columnHeaderSortIcon: {
                style: {
                  color: "#757575",
                  opacity: 1,
                  visibility: "visible",
                },
              },
            }}
            sx={{
              borderRadius: "8px",
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#f5f5f5 !important",
              },
              "& .MuiDataGrid-columnHeader--sorted .MuiDataGrid-sortIcon": {
                color: "#424242 !important",
              },
              "& .MuiDataGrid-sortIcon": {
                color: "#757575",
              },
              "& .MuiDataGrid-columnHeader--sorted .MuiDataGrid-columnHeaderTitle":
                {
                  color: "#424242 !important",
                },
            }}
            pageSizeOptions={[5, 15]}
            disableRowSelectionOnClick
            disableColumnMenu
            rowHeight={115}
          />
        )}
      </Box>
    </Box>
  );
};

export default Table;
