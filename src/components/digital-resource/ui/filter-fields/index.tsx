import { Box, MenuItem, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useDebugValue, useState } from "react";

import styles from "./filter-fields.module.scss";
import CloseIcon from "@mui/icons-material/Close";

import { useAppDispatch, useAppSelector } from "@/features/hooks";
import {
  setModality,
  setSelectedCategory,
  setSelectedDate,
  setStatus,
  setTranslation,
} from "@/features/filter/filter.slice";
import dayjs, { Dayjs } from "dayjs";

import MultiSelectSubjectInfiniteScroll from "../../table/filter-drawer/subjects";
import MultiSelectAudioInfiniteScroll from "../../table/filter-drawer/audio";
import MultiSelectSubtitle from "../../table/filter-drawer/subtitle";
import {
  Category,
  GeneratedLanguage,
  Modality,
  Status,
} from "@/features/digitial-resources/digital-resources.types";
import MultiSelectAuthorInfiniteScroll from "../../table/filter-drawer/author";

const FilterFields = () => {
  const { date, status, modality, generated_language, category } =
    useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const dateValue =
    date && date.publication_date ? dayjs(date.publication_date) : null;

  return (
    <Box className={styles.main}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Date of Recourse"
            slots={{
              openPickerIcon: () => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M16.6665 2.49967H15.8332V0.833008H14.1665V2.49967H5.83317V0.833008H4.1665V2.49967H3.33317C2.4165 2.49967 1.6665 3.24967 1.6665 4.16634V17.4997C1.6665 18.4163 2.4165 19.1663 3.33317 19.1663H16.6665C17.5832 19.1663 18.3332 18.4163 18.3332 17.4997V4.16634C18.3332 3.24967 17.5832 2.49967 16.6665 2.49967ZM16.6665 17.4997H3.33317V8.33301H16.6665V17.4997ZM16.6665 6.66634H3.33317V4.16634H16.6665V6.66634Z"
                    fill="#616161"
                  />
                </svg>
              ),
            }}
            slotProps={{
              textField: {
                variant: "outlined",
                size: "small",
                fullWidth: true,

                InputProps: {
                  sx: {
                    fontSize: 14,
                    borderRadius: "8px",
                  },
                  endAdornment: dateValue ? (
                    <CloseIcon
                      sx={{
                        fontSize: "20px",
                        color: "#424242",
                        cursor: "pointer",
                      }}
                      onClick={() => dispatch(setSelectedDate(undefined))}
                    />
                  ) : null,
                },
                InputLabelProps: {
                  sx: { fontSize: 14, color: " #9E9E9E" },
                },
              },
            }}
            value={dateValue}
            onChange={(e: Dayjs | null) =>
              dispatch(setSelectedDate(e ? e.toISOString() : undefined))
            }
          />
        </DemoContainer>
      </LocalizationProvider>

      <TextField
        select
        variant="outlined"
        label="Status"
        size="small"
        slotProps={{
          inputLabel: {
            sx: {
              fontSize: "14px",
              color: " #9E9E9E",
            },
          },
        }}
        value={status || ""}
        className={styles.select}
        // onChange={(e) => dispatch(setStatus(e.target.value))}
        fullWidth
      >
        {Object.values(Status).map((status) => (
          <MenuItem
            key={status}
            value={status}
            onClick={() => dispatch(setStatus(status))}
          >
            {status}
          </MenuItem>
        ))}
      </TextField>

      <MultiSelectSubjectInfiniteScroll />

      <TextField
        select
        variant="outlined"
        label="Category"
        size="small"
        slotProps={{
          inputLabel: {
            sx: {
              fontSize: 14,
              color: " #9E9E9E",
            },
          },
        }}
        className={styles.select}
        value={category || ""}
        // onChange={(e) => dispatch(setTranslation(e.target.value))}
        fullWidth
      >
        {Object.values(Category).map((category) => (
          <MenuItem
            key={category}
            value={category}
            onClick={() => dispatch(setSelectedCategory(category))}
          >
            {category}
          </MenuItem>
        ))}
      </TextField>

      <MultiSelectAuthorInfiniteScroll />

      <MultiSelectAudioInfiniteScroll />

      <TextField
        select
        variant="outlined"
        label="Translation"
        size="small"
        slotProps={{
          inputLabel: {
            sx: {
              fontSize: 14,
              color: " #9E9E9E",
            },
          },
        }}
        className={styles.select}
        value={generated_language || ""}
        // onChange={(e) => dispatch(setTranslation(e.target.value))}
        fullWidth
      >
        {Object.values(GeneratedLanguage).map((lang) => (
          <MenuItem
            key={lang}
            value={lang}
            onClick={() => dispatch(setTranslation(lang))}
          >
            {lang}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        variant="outlined"
        label="Modality"
        size="small"
        slotProps={{
          inputLabel: {
            sx: {
              fontSize: 14,
              color: " #9E9E9E",
            },
          },
        }}
        className={styles.select}
        value={modality || ""}
        // onChange={(e) => dispatch(setModality(e.target.value))}
        fullWidth
      >
        {Object.values(Modality).map((modality) => (
          <MenuItem
            key={modality}
            value={modality}
            onClick={() => dispatch(setModality(modality))}
          >
            {modality}
          </MenuItem>
        ))}
      </TextField>

      <MultiSelectSubtitle />
    </Box>
  );
};

export default FilterFields;
