"use client";

import { Box, Chip, Typography } from "@mui/material";
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
  GeneratedLanguage,
  Language,
  Modality,
  Status,
} from "@/features/digitial-resources/digital-resources.types";
import { setPagination } from "@/features/filter/filter.slice";
import NotFound from "./not-found";
import { getSession } from "@/app/auth/session-token";

const Table = () => {
  const t = useTranslations("Table");

  const [hasSearchPermission, setHasSearchPermission] =
    useState<boolean>(false);
  const [role, setRole] = useState<{ id: number; name: string }[] | undefined>(
    []
  );

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
    const fetchSession = async () => {
      const session = await getSession();
      const hasPermission = session?.user?.permissions?.some((permission) => {
        return permission.name === "search-digital-resources";
      });
      setHasSearchPermission(!!hasPermission);
      setRole(session?.user?.roles);
    };
    fetchSession();
  }, []);

  useEffect(() => {
    if (!hasSearchPermission) return;

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
    dispatch(setPagination(paginationModel));
  }, [paginationModel, hasSearchPermission]);

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
            {isHovered && params.row.urls.play ? (
              <video
                src={params.row.urls.preview}
                autoPlay
                muted
                loop
                className={styles.previewImage}
              />
            ) : (
              <img
                src={params.row.urls.thumbnail}
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
          <Chip
            label={params.row.type
              .replace(/_/g, " ")
              .replace(/\b\w/g, (l: string) => l.toUpperCase())}
            size="small"
            className={styles.chip}
          />
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
            <Typography>{params.row.duration || "00:00:00"}</Typography>
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
            label={
              params.row.generated_language.charAt(0).toUpperCase() +
              params.row.generated_language.slice(1).toLowerCase()
            }
            size="small"
            className={styles.chip}
          />
        );
      },
    },
    {
      field: "modality",
      headerName: `${t("modality")}`,
      flex: 1,
      minWidth: 128,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Chip
            label={
              params.row.modality.charAt(0).toUpperCase() +
              params.row.modality.slice(1).toLowerCase()
            }
            size="small"
            className={styles.chip}
          />
        );
      },
    },
    {
      field: "status",
      headerName: `${t("status")}`,
      flex: 1,
      minWidth: 128,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Chip
            label={params.row.status
              .replace(/_/g, " ")
              .replace(/\b\w/g, (l: string) => l.toUpperCase())}
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
            <Typography>{params.row.created_at.split("T")[0]}</Typography>
          </Box>
        );
      },
    },
  ];
  const rows = [
    {
      uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      url: {
        thumbnail: "/thumbnail.png",
        preview: "/preview.png",
        play: "/random-video.mp4",
        download: "/download.zip",
      },
      title: "Academic Management System: Academic Monitoring",
      type: "Interactive expository session",
      main_language: Language.es,
      created_at: "2025-08-29T05:21:57.906Z",
      duration: "00:25:22",
      speakers: [
        {
          uuid: "sdfsfsdfdsgsd",
          first_name: "Thania",
          last_name: "Candelaria Chio Montero",
        },
        {
          uuid: "sdfsfsdflkjhgfddsgsd",
          first_name: "Daniel",
          last_name: "González",
        },
        {
          uuid: "sdfsfsdfdssadgsd",
          first_name: "Author",
          last_name: "1",
        },
        {
          uuid: "sdfsfsdhfghfdsgsd",
          first_name: "Author",
          last_name: "2",
        },
        {
          uuid: "sdfsfsdfduouiousgsd",
          first_name: "Author",
          last_name: "3",
        },
      ],
      campus_name: "Main Campus",
      generated_language: GeneratedLanguage.Automatic,
      modality: Modality.Virtual,
      status: Status.Published,
    },
    {
      uuid: "4fa85f64-5717-4562-b3fc-2c963f66afa7",
      url: {
        thumbnail: "/thumbnail.png",
        preview: "/preview.png",
        play: "/random-video.mp4",
        download: "/download.zip",
      },
      title: "Digital Library: Resource Management",
      type: "Lecture",
      main_language: Language.en,
      created_at: "2025-09-10T10:15:00.000Z",
      duration: "00:40:10",
      speakers: [
        {
          uuid: "author1",
          first_name: "Maria",
          last_name: "Lopez",
        },
        {
          uuid: "author2",
          first_name: "John",
          last_name: "Smith",
        },
      ],
      campus_name: "North Campus",
      generated_language: GeneratedLanguage.Automatic,
      modality: Modality.Presential,
      status: Status.Published,
    },
    {
      uuid: "5fa85f64-5717-4562-b3fc-2c963f66afa8",
      url: {
        thumbnail: "/thumbnail.png",
        preview: "/preview.png",
        play: "/random-video.mp4",
        download: "/download.zip",
      },
      title: "E-learning Platform: Student Engagement",
      type: "Workshop",
      main_language: Language.fr,
      created_at: "2025-10-01T14:30:45.000Z",
      duration: "01:10:05",
      speakers: [
        {
          uuid: "author3",
          first_name: "Pierre",
          last_name: "Dupont",
        },
      ],
      campus_name: "East Campus",
      generated_language: GeneratedLanguage.Automatic,
      modality: Modality.Virtual,
      status: Status.Published,
    },
  ];

  return (
    <Box className={styles.tableContainer}>
      <SearchBar hasPermission={hasSearchPermission} />
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
            initialState={{
              columns: {
                columnVisibilityModel: {
                  translation: role?.some((r) => {
                    return r.name === process.env.NEXT_PUBLIC_AUDIOVISUAL_ROLE;
                  })
                    ? false
                    : true,
                  authors: role?.some((r) => {
                    return r.name === process.env.NEXT_PUBLIC_TRANSLATOR_ROLE;
                  })
                    ? false
                    : true,
                  modality: role?.some((r) => {
                    return r.name === process.env.NEXT_PUBLIC_ADMIN_ROLE;
                  })
                    ? false
                    : true,
                  status: role?.some((r) => {
                    return r.name === process.env.NEXT_PUBLIC_ADMIN_ROLE;
                  })
                    ? false
                    : true,
                },
              },
            }}
            slots={{
              noRowsOverlay: NotFound,
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
              "& .MuiDataGrid-columnHeader:focus": {
                outline: "none",
              },
              "& .MuiDataGrid-cell:focus": {
                outline: "none",
              },
              "& .MuiDataGrid-scrollbarFiller": {
                backgroundColor: "#f5f5f5 !important",
              },

              "& .MuiNativeSelect-root": {
                border: "1px solid #E0E0E0 !important",
              },
              "& .mui-18zjd9i-MuiNativeSelect-root-MuiSelect-select-MuiInputBase-input":
                {
                  display: "flex !important",
                  minWidth: "74px !important",
                  border: "1px solid #E0E0E0 !important",
                  borderRadius: "8px !important",
                  padding: "0 12px 0 16px !important",
                  gap: "8px !important",
                  minHeight: "32px !important",
                  alignItems: "center !important",
                  color: "#424242",
                },
              "& .MuiDataGrid-columnSeparator": {
                display: "none",
              },
              "& .MuiDataGrid-columnHeader:focus-within": {
                outline: "none",
              },
            }}
            hideFooter={data.length === 0}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={data && [2, 4, 6]}
            disableRowSelectionOnClick
            disableColumnMenu
            disableColumnResize
            rowHeight={115}
          />
        )}
      </Box>
    </Box>
  );
};

export default Table;
