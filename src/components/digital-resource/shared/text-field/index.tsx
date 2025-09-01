import { IconButton, InputAdornment, MenuItem, TextField } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import React from "react";
import { useAppDispatch } from "@/features/hooks";
import {
  Category,
  GeneratedLanguage,
  Modality,
  Status,
} from "@/features/digitial-resources/digital-resources.types";

interface MenuSelectProps {
  label: string;
  value: string | undefined;
  setFunction: any;
  enumType:
    | typeof Status
    | typeof GeneratedLanguage
    | typeof Modality
    | typeof Category;
}

const MenuSelect: React.FC<MenuSelectProps> = ({
  label,
  value,
  setFunction,
  enumType,
}) => {
  const dispatch = useAppDispatch();
  return (
    <TextField
      select
      variant="outlined"
      label={label}
      size="small"
      slotProps={{
        inputLabel: {
          sx: {
            fontSize: 14,
            color: " #9E9E9E",
          },
        },
        select: {
          MenuProps: {
            PaperProps: {
              sx: {
                borderRadius: "4px",
                boxShadow:
                  "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                "& .MuiMenuItem-root": {
                  fontSize: "14px",
                  padding: "8px 16px",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#e3f2fd",
                    "&:hover": {
                      backgroundColor: "#bbdefb",
                    },
                  },
                },
              },
            },
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
          },
        },
        input: {
          sx: {
            color: "#424242",
            fontSize: 14,
            borderRadius: "8px",
          },
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => dispatch(setFunction(undefined))}
                sx={{
                  padding: "4px",
                  marginRight: "18px",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <CloseIcon
                  sx={{
                    fontSize: "20px",
                    color: "#757575",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      value={value || ""}
      fullWidth
    >
      {Object.values(enumType).map((lang) => (
        <MenuItem
          key={lang}
          value={lang}
          onClick={() => dispatch(setFunction(lang))}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            "&.Mui-selected": {
              backgroundColor: "#e3f2fd !important",
            },
          }}
        >
          {/* Add checkbox to match Autocomplete */}
          {/* <Checkbox
              checked={category === lang}
              size="small"
              sx={{
                padding: "0",
                "& .MuiSvgIcon-root": {
                  fontSize: "18px",
                },
              }}
            /> */}
          {lang
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l: string) => l.toUpperCase())}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default MenuSelect;
