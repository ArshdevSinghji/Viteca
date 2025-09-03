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

import React, { useState } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import {
  Language,
  Subtitle,
} from "@/features/digitial-resources/digital-resources.types";

const LIMIT_SIZE = 2;

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface MultiSelectProps {
  label: string;
  options: string[];
  selectedValue: string[] | undefined;
  setSelectedValue:
    | ActionCreatorWithPayload<Subtitle[] | undefined>
    | ActionCreatorWithPayload<Language[] | undefined>;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  selectedValue,
  setSelectedValue,
}) => {
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setIsHovered(true);
    setAnchorEl(event.currentTarget);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    setAnchorEl(null);
  };

  return (
    <Box>
      <Autocomplete
        multiple
        limitTags={LIMIT_SIZE}
        size="small"
        id="checkboxes-tags-demo"
        openOnFocus={false}
        options={options}
        disableCloseOnSelect
        disableClearable
        value={selectedValue || []}
        onChange={(event, newValue) => {
          const uniqueValues = new Set(newValue);
          dispatch(setSelectedValue(Array.from(uniqueValues) as any[]));
        }}
        isOptionEqualToValue={(option, value) => option === value}
        getOptionLabel={(option) => option ?? ""}
        renderTags={(tagValue, getTagProps) => {
          return tagValue.map((option, index) => {
            if (index < LIMIT_SIZE) {
              return (
                <Chip
                  {...getTagProps({ index })}
                  key={index}
                  label={option}
                  size="small"
                  className={styles.chip}
                />
              );
            }
            if (index === LIMIT_SIZE) {
              return (
                <Chip
                  key="more-chip"
                  label={`+${tagValue.length - LIMIT_SIZE}`}
                  className={styles.tag}
                  size="small"
                  onDelete={() => {
                    setIsHovered(false);
                    setAnchorEl(null);
                    dispatch(
                      setSelectedValue(
                        selectedValue?.slice(0, LIMIT_SIZE) as any[]
                      )
                    );
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  sx={{ cursor: "pointer" }}
                />
              );
            }
            return null;
          });
        }}
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
              {option}
            </li>
          );
        }}
        getLimitTagsText={(more) => {
          return (
            <Box>
              <Chip
                label={`+${more}`}
                className={styles.tag}
                size="small"
                onDelete={() => {
                  setIsHovered(false);
                  setAnchorEl(null);
                  dispatch(
                    setSelectedValue(
                      selectedValue?.slice(0, LIMIT_SIZE) as any[]
                    )
                  );
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{ cursor: "pointer" }}
              />

              <Popper
                open={isHovered}
                anchorEl={anchorEl}
                placement="bottom"
                style={{ zIndex: 1600 }}
              >
                <ClickAwayListener onClickAway={handleMouseLeave}>
                  <Box className={styles.popper}>
                    {selectedValue &&
                      selectedValue
                        ?.slice(LIMIT_SIZE)
                        .map((value, index) => (
                          <Chip
                            key={index}
                            label={value}
                            className={styles.tag}
                            size="small"
                          />
                        ))}
                  </Box>
                </ClickAwayListener>
              </Popper>
            </Box>
          );
        }}
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: "8px",
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
        }}
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
                  "&.MuiInputLabel-shrink": {
                    top: 0,
                    transform: "translate(14px, -9px) scale(0.85) !important",
                  },
                },
              },
            }}
            sx={{
              " & .MuiInputBase-root": {
                height: "45px",
              },
              "& .MuiInputLabel-root": {
                top: "3px",
                "&.MuiInputLabel-shrink": {
                  top: 0,
                },
              },
            }}
          />
        )}
      />

      <Popper
        open={isHovered}
        anchorEl={anchorEl}
        placement="bottom"
        style={{ zIndex: 1600 }}
      >
        <ClickAwayListener onClickAway={handleMouseLeave}>
          <Box className={styles.popper}>
            {selectedValue &&
              selectedValue
                ?.slice(LIMIT_SIZE)
                .map((value, index) => (
                  <Chip
                    key={index}
                    label={value}
                    className={styles.tag}
                    size="small"
                  />
                ))}
          </Box>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};

export default MultiSelect;
