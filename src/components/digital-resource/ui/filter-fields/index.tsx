import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

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
import MenuSelect from "../../shared/text-field";

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
                    <IconButton
                      size="small"
                      sx={{
                        // padding: "4px",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.04)",
                        },
                      }}
                      onClick={() => dispatch(setSelectedDate(undefined))}
                    >
                      <CloseIcon
                        sx={{
                          fontSize: "20px",
                          color: "#757575",
                          cursor: "pointer",
                        }}
                      />
                    </IconButton>
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

      <MenuSelect
        label={"Status"}
        value={status}
        setFunction={setStatus}
        enumType={Status}
      />

      <MultiSelectSubjectInfiniteScroll />

      <MenuSelect
        label={"Category"}
        value={category}
        setFunction={setSelectedCategory}
        enumType={Category}
      />

      <MultiSelectAuthorInfiniteScroll />
      <MultiSelectAudioInfiniteScroll />

      <MenuSelect
        label={"Translation"}
        value={generated_language}
        setFunction={setTranslation}
        enumType={GeneratedLanguage}
      />

      <MenuSelect
        label={"Modality"}
        value={modality}
        setFunction={setModality}
        enumType={Modality}
      />

      <MultiSelectSubtitle />
    </Box>
  );
};

export default FilterFields;
