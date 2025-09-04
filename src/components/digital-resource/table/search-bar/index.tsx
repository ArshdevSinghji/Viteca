"use client";

import {
  Badge,
  Box,
  Button,
  IconButton,
  InputBase,
  Stack,
} from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import FilterDrawer from "../filter-drawer";

import styles from "./search-bar.module.scss";

import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { setSearch } from "@/features/filter/filter.slice";
import { GetDigitalResource } from "@/features/digitial-resources/digital-resources.action";
import { debounce } from "lodash";

type Anchor = "right";

const SearchBar: React.FC<{ hasPermission: boolean }> = ({ hasPermission }) => {
  const t = useTranslations("Table");

  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const { search } = useAppSelector((state) => state.filter.draft);
  const filter = useAppSelector((state) => state.filter.filter);

  const count = useAppSelector((state) => state.filter.count);

  const [state, setState] = useState({
    right: false,
  });
  const dispatch = useAppDispatch();

  const debounceSearch = useMemo(() => {
    return debounce(async (value: string | undefined) => {
      dispatch(
        GetDigitalResource({
          search: value,
          modality: filter.modality,
          generated_language: filter.generated_language,
          category: filter.category,
          subjects: filter.subjects,
          status: filter.status,
          subtitle_languages: filter.subtitle_languages,
          audio_languages: filter.audio_languages,
          // campuses: filter.campuses,
          date_filter: {
            publication_date: filter.date.publication_date,
            date_comparison: filter.date.date_comparison,
          },
          pagination: {
            page: filter.pagination.page || 1,
            limit: filter.pagination.pageSize || 2,
          },
        })
      );
    }, 300);
  }, [filter, dispatch]);

  useEffect(() => {
    if (!hasPermission) return;
    const fetchData = async () => {
      await dispatch(
        GetDigitalResource({
          search,
          pagination: {
            page: filter.pagination.page,
            limit: filter.pagination.pageSize,
          },
        })
      );
    };
    fetchData();
  }, []);

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
    <>
      <FilterDrawer state={state} toggleDrawer={toggleDrawer} />
      <Stack
        direction="row"
        justifyContent="space-between"
        className={styles.searchBarContainer}
      >
        <Box className={styles.searchBar}>
          <IconButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M13.1291 11.8791H12.4707L12.2374 11.6541C13.0541 10.7041 13.5457 9.47074 13.5457 8.12907C13.5457 5.1374 11.1207 2.7124 8.12907 2.7124C5.1374 2.7124 2.7124 5.1374 2.7124 8.12907C2.7124 11.1207 5.1374 13.5457 8.12907 13.5457C9.47074 13.5457 10.7041 13.0541 11.6541 12.2374L11.8791 12.4707V13.1291L16.0457 17.2874L17.2874 16.0457L13.1291 11.8791ZM8.12907 11.8791C6.05407 11.8791 4.37907 10.2041 4.37907 8.12907C4.37907 6.05407 6.05407 4.37907 8.12907 4.37907C10.2041 4.37907 11.8791 6.05407 11.8791 8.12907C11.8791 10.2041 10.2041 11.8791 8.12907 11.8791Z"
                fill="#616161"
              />
            </svg>
          </IconButton>
          <InputBase
            id="search-input"
            name="search"
            placeholder={t("placeholder")}
            value={searchTerm || ""}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (!hasPermission) return;
              debounceSearch(e.target.value);
              dispatch(setSearch(e.target.value));
            }}
            className={styles.input}
            endAdornment={
              searchTerm && (
                <CloseIcon
                  onClick={() => {
                    setSearchTerm(undefined);
                    if (!hasPermission) return;
                    debounceSearch(undefined);
                    dispatch(setSearch(undefined));
                  }}
                  sx={{
                    fontSize: "20px",
                    color: "#424242",
                    cursor: "pointer",
                    ml: 1,
                    "&:hover": {
                      backgroundColor: "#f2f2f2",
                      borderRadius: "50%",
                      transition: "background-color 0.3s",
                    },
                  }}
                />
              )
            }
          />
        </Box>
        <Button
          variant="text"
          startIcon={
            <Badge
              badgeContent={count}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#01579b",
                  color: "white",
                },
              }}
            >
              <FilterListIcon />
            </Badge>
          }
          sx={{ color: "#01579b", fontWeight: "600" }}
          onClick={toggleDrawer("right", true)}
        >
          {t("filters")}
        </Button>
      </Stack>
    </>
  );
};

export default SearchBar;
