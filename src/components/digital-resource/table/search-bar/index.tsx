"use client";

import { Box, Button, IconButton, InputBase, Stack } from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";

import styles from "./search-bar.module.scss";
import { useTranslations } from "next-intl";

const SearchBar = () => {
  const t = useTranslations("Table");
  return (
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
          className={styles.input}
        />
      </Box>
      <Button
        variant="text"
        startIcon={<FilterListIcon />}
        sx={{ color: "#01579b", fontWeight: "600" }}
      >
        {t("filters")}
      </Button>
    </Stack>
  );
};

export default SearchBar;
