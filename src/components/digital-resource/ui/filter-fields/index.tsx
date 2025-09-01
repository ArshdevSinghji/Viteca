import { Box, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import styles from "./filter-fields.module.scss";

import { useAppDispatch, useAppSelector } from "@/features/hooks";
import {
  setDateComparison,
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
    useAppSelector((state) => state.filter.draft);
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
              layout: (props) => {
                return (
                  <Box>
                    {props.children}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "6px",
                        padding: 2,
                        borderTop: "1px solid #e0e0e0",
                      }}
                    >
                      {[
                        {
                          key: "eq",
                          label: "Equal to",
                        },
                        {
                          key: "gt",
                          label: "Greater than",
                        },
                        {
                          key: "lt",
                          label: "Less than",
                        },
                      ].map((label) => (
                        <Box
                          key={label.key}
                          className={styles.calendarBox}
                          style={{
                            backgroundColor:
                              label.key !== date.date_comparison
                                ? "#eeeeee"
                                : "#E8F0FE",
                          }}
                          onClick={() => {
                            console.log(label.key);
                            dispatch(
                              setDateComparison(label.key as "gt" | "lt" | "eq")
                            );
                          }}
                        >
                          {label.key === date.date_comparison && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path
                                d="M4.4001 7.95039L2.3001 5.85039L1.6001 6.55039L4.4001 9.35039L10.4001 3.35039L9.7001 2.65039L4.4001 7.95039Z"
                                fill="#424242"
                              />
                            </svg>
                          )}
                          <Typography>{label.label}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                );
              },
            }}
            slotProps={{
              popper: {
                sx: {
                  "& .MuiPaper-root": {
                    borderRadius: "8px",
                  },
                },
              },
              field: { clearable: true },
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
