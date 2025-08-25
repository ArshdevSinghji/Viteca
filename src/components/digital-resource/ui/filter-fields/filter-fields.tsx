import {
  Autocomplete,
  Box,
  Checkbox,
  MenuItem,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import React from "react";

import styles from "./filter-fields.module.scss";

const FilterFields = () => {
  const CATEGORY_LIMIT_SIZE = 1;

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const category = [
    {
      label: "Course Presentation",
      value: "Course Presentation",
    },
    {
      label: "Program Presentation",
      value: "Program Presentation",
    },
  ];

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
                    color: " #9E9E9E",
                  },
                },
                InputLabelProps: {
                  sx: { fontSize: 14, color: " #9E9E9E" },
                },
              },
            }}
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
        className={styles.select}
        fullWidth
      >
        <MenuItem value="Published">Published</MenuItem>
        <MenuItem value="Draft">Draft</MenuItem>
      </TextField>

      <TextField
        select
        variant="outlined"
        label="Subject"
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
        fullWidth
      >
        <MenuItem value="Draft">Draft</MenuItem>
      </TextField>

      <Autocomplete
        multiple
        limitTags={CATEGORY_LIMIT_SIZE}
        size="small"
        id="checkboxes-tags-demo"
        options={category}
        disableCloseOnSelect
        getOptionLabel={(option) => option.label}
        // renderValue={(selected) => {
        //   if (selected.length > CATEGORY_LIMIT_SIZE) {
        //     return (
        //       <Chip
        //         label={`+${selected.length - CATEGORY_LIMIT_SIZE}`}
        //         className={styles.chip}
        //         onDelete={() => console.log("delete")}
        //         size="small"
        //       />
        //     );
        //   }
        //   return selected.map((value) => (
        //     <Chip
        //       key={value.label}
        //       label={value.label}
        //       className={styles.chip}
        //       onDelete={() => console.log("delete")}
        //     />
        //   ));
        // }}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.label}
            </li>
          );
        }}
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: "8px",
          },
        }}
        slotProps={{
          chip: { className: styles.chip },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
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
          />
        )}
      />

      <TextField
        select
        variant="outlined"
        label="Audio Language"
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
        fullWidth
      >
        <MenuItem value="Draft">Draft</MenuItem>
      </TextField>

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
        fullWidth
      >
        <MenuItem value="Draft">Draft</MenuItem>
      </TextField>

      <TextField
        select
        variant="outlined"
        label="Subtitle Languages"
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
        fullWidth
      >
        <MenuItem value="Draft">Draft</MenuItem>
      </TextField>
    </Box>
  );
};

export default FilterFields;
