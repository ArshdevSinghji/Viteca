"use client";

import { Box, Chip, duration, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import SearchBar from "./search-bar";
import styles from "./table.module.scss";

import { useTranslations } from "next-intl";
import { useWindowSize } from "@/hooks/window-size/use-window-size.hook";
import { useEffect, useState } from "react";

import AuthorCell from "./author-cell";
import MobileDashboard from "../mobile-dashboard";

import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { GetDigitalResource } from "@/features/digitial-resources/digital-resources.action";
import {
  Category,
  GeneratedLanguage,
  Language,
  Modality,
  Status,
  Subtitle,
} from "@/features/digitial-resources/digital-resources.types";

const Table = () => {
  const t = useTranslations("Table");

  const { data } = useAppSelector((state) => state.digitalResources);
  const dispatch = useAppDispatch();

  const { width, height } = useWindowSize();

  const [responsive, setResponsive] = useState<boolean>(false);
  const [hoveredRowId, setHoveredRowId] = useState<number | null>(null);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 2,
    page: 0,
  });

  useEffect(() => {
    const fetchDigitalResource = async () => {
      await dispatch(
        GetDigitalResource({
          pagination: {
            page: paginationModel.page + 1,
            limit: paginationModel.pageSize,
          },
        })
      );
    };
    fetchDigitalResource();
  }, [paginationModel]);

  useEffect(() => {
    if (width < 480) {
      setResponsive(true);
    } else {
      setResponsive(false);
    }
  }, [width, height]);

  const columns: GridColDef<(typeof data)[number]>[] = [
    {
      field: "preview",
      headerName: `${t("preview")}`,
      flex: 1,
      minWidth: 200,
      editable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const isHovered = hoveredRowId === params.row.uuid;

        return (
          <Box
            className={styles.previewContainer}
            onMouseOver={() => setHoveredRowId(params.row.uuid)}
            onMouseOut={() => setHoveredRowId(null)}
          >
            {isHovered && params.row.url.play ? (
              <video
                src={params.row.url.play}
                autoPlay
                muted
                loop
                className={styles.previewImage}
              />
            ) : (
              <img
                src={params.row.url.preview}
                alt="Preview"
                className={styles.previewImage}
              />
            )}
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
        return <AuthorCell authors={params.row.speakers} />;
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
            label={params.row.main_language}
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
            label={params.row.generated_language}
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
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box className={styles.text}>
            <Typography>{params.row.created_at}</Typography>
          </Box>
        );
      },
    },
  ];
  // const rows = [
  //   {
  //     uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //     url: {
  //       thumbnail: "/thumbnail.png",
  //       preview: "/preview.png",
  //       play: "/random-video.mp4",
  //       download: "/download.zip",
  //     },
  //     title: "Academic Management System: Academic Monitoring",
  //     type: "Interactive expository session",
  //     main_language: Language.es,
  //     created_at: "2025-08-29T05:21:57.906Z",
  //     duration: "00:25:22",
  //     speakers: [
  //       {
  //         uuid: "sdfsfsdfdsgsd",
  //         first_name: "Thania",
  //         last_name: "Candelaria Chio Montero",
  //       },
  //       {
  //         uuid: "sdfsfsdflkjhgfddsgsd",
  //         first_name: "Daniel",
  //         last_name: "González",
  //       },
  //       {
  //         uuid: "sdfsfsdfdssadgsd",
  //         first_name: "Author",
  //         last_name: "1",
  //       },
  //       {
  //         uuid: "sdfsfsdhfghfdsgsd",
  //         first_name: "Author",
  //         last_name: "2",
  //       },
  //       {
  //         uuid: "sdfsfsdfduouiousgsd",
  //         first_name: "Author",
  //         last_name: "3",
  //       },
  //     ],
  //     campus_name: "Main Campus",
  //     generated_language: GeneratedLanguage.Automatic,
  //     modality: Modality.Virtual,
  //     status: Status.Published,
  //   },
  // ];

  return (
    <Box className={styles.tableContainer}>
      <SearchBar />
      <Box
        sx={{
          width: "100%",
          flex: 1,
          minHeight: 0,
        }}
      >
        {responsive ? (
          <MobileDashboard />
        ) : (
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row.uuid}
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
              "& .MuiDataGrid-columnHeader:focus": {
                outline: " none",
              },
              "& .MuiDataGrid-cell:focus": {
                outline: " none",
              },
              "& .MuiDataGrid-scrollbarFiller": {
                backgroundColor: "#f5f5f5 !important",
              },
            }}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[2, 4, 6]}
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
