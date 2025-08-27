import { Box, MenuItem, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";

import styles from "./filter-fields.module.scss";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import {
  setModality,
  setSelectedDate,
  setStatus,
  setTranslation,
} from "@/features/filter/filter.slice";
import { Dayjs } from "dayjs";

import MultiSelectCategory from "../../table/filter-drawer/category";
import MultiSelectAuthor from "../../table/filter-drawer/author";
import MultiSelectSubjectInfiniteScroll from "../../table/filter-drawer/subjects";
import MultiSelectAudioInfiniteScroll from "../../table/filter-drawer/audio";
import MultiSelectSubtitle from "../../table/filter-drawer/subtitle";

const FilterFields = () => {
  const { selectedDate, status, modality, translation } = useAppSelector(
    (state) => state.filter
  );
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const [showCategory, setShowCategory] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  const handleMouseEnter = (event: any, param: string) => {
    setAnchorEl(event.currentTarget);
    switch (param) {
      case "Category":
        setShowCategory(true);
        break;
      case "Author":
        setShowAuthor(true);
        break;
      case "Subtitle":
        setShowSubtitle(true);
        break;
      default:
        break;
    }
  };

  const handleMouseLeave = (param: string) => {
    setAnchorEl(null);
    switch (param) {
      case "Category":
        setShowCategory(false);
        break;
      case "Author":
        setShowAuthor(false);
        break;
      case "Subtitle":
        setShowSubtitle(false);
        break;
      default:
        break;
    }
  };

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
                },
                InputLabelProps: {
                  sx: { fontSize: 14, color: " #9E9E9E" },
                },
              },
            }}
            value={selectedDate}
            onChange={(e: Dayjs | null) => dispatch(setSelectedDate(e))}
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
        value={status}
        className={styles.select}
        onChange={(e) => dispatch(setStatus(e.target.value))}
        fullWidth
      >
        <MenuItem value="Published">Published</MenuItem>
        <MenuItem value="Draft">Draft</MenuItem>
      </TextField>

      <MultiSelectSubjectInfiniteScroll />

      <MultiSelectCategory
        show={showCategory}
        anchorEl={anchorEl}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />

      <MultiSelectAuthor
        show={showAuthor}
        anchorEl={anchorEl}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />

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
        value={translation}
        onChange={(e) => dispatch(setTranslation(e.target.value))}
        fullWidth
      >
        <MenuItem value="Draft">Human</MenuItem>
        <MenuItem value="Final">Machine</MenuItem>
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
        value={modality}
        onChange={(e) => dispatch(setModality(e.target.value))}
        fullWidth
      >
        <MenuItem value="Draft">Presential</MenuItem>
      </TextField>

      <MultiSelectSubtitle
        show={showSubtitle}
        anchorEl={anchorEl}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    </Box>
  );
};

export default FilterFields;
