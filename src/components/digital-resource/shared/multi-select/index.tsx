import { useAppDispatch } from "@/features/hooks";
import {
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  ClickAwayListener,
  Popper,
  TextField,
} from "@mui/material";

import styles from "./multi-select.module.scss";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import React from "react";
import { FilterType } from "@/features/filter/filter.types";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

const LIMIT_SIZE = 1;

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface OptionType {
  key: string;
  value: string;
}

interface MultiSelectProps {
  label: string;
  options: OptionType[];
  selectedValue: FilterType[];
  setSelectedValue: ActionCreatorWithPayload<FilterType[]>;
  show: boolean;
  anchorEl: any;
  handleMouseEnter: (e: any, param: string) => void;
  handleMouseLeave: (param: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  selectedValue,
  setSelectedValue,
  show,
  anchorEl,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  const dispatch = useAppDispatch();

  return (
    <Autocomplete
      multiple
      limitTags={LIMIT_SIZE}
      size="small"
      id="checkboxes-tags-demo"
      options={options}
      disableCloseOnSelect
      value={selectedValue}
      onChange={(event, newValue) => {
        const uniqueValues = Array.from(
          new Map(newValue.map((item) => [item.value, item])).values()
        );
        dispatch(setSelectedValue(uniqueValues));
      }}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      getOptionLabel={(option) => option.value ?? ""}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps} className={styles.option}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
              size="small"
            />
            {option.value}
          </li>
        );
      }}
      sx={{
        "& .MuiInputBase-root": {
          borderRadius: "8px",
        },
      }}
      slotProps={{
        chip: { size: "small", className: styles.chip },
      }}
      getLimitTagsText={(more) => (
        <Box>
          <Chip
            label={`+${more}`}
            className={styles.tag}
            size="small"
            onDelete={() => {
              dispatch(setSelectedValue(selectedValue.slice(0, LIMIT_SIZE)));
            }}
            onMouseEnter={(e) => handleMouseEnter(e, label)}
            onMouseLeave={() => handleMouseLeave(label)}
            sx={{ cursor: "pointer" }}
          />

          <Popper
            open={show}
            anchorEl={anchorEl}
            placement="bottom"
            style={{ zIndex: 1600 }}
          >
            <ClickAwayListener onClickAway={() => handleMouseLeave(label)}>
              <Box className={styles.popper}>
                {selectedValue.slice(LIMIT_SIZE).map((value, index) => (
                  <Chip
                    key={index}
                    label={value.value}
                    className={styles.tag}
                    size="small"
                  />
                ))}
              </Box>
            </ClickAwayListener>
          </Popper>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          size="small"
          slotProps={{
            inputLabel: {
              sx: {
                fontSize: 14,
                color: " #9E9E9E",
              },
            },
          }}
          //   onMouseEnter={() => handleParentMouseEnter(label)}
          //   onMouseLeave={() => handleParentMouseLeave()}
        />
      )}
    />
  );
};

export default MultiSelect;
