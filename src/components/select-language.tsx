"use client";

import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import styles from "./select-language.module.scss";

enum Language {
  ENGLISH = "English (USA)",
  SPANISH = "Spanish",
  FRENCH = "French",
}

export default function SelectLanguage() {
  const [language, setLanguage] = React.useState(Language.ENGLISH);

  return (
    <FormControl size="small">
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={language}
        onChange={(event: SelectChangeEvent) =>
          setLanguage(event.target.value as Language)
        }
        sx={{
          border: "none",
          outline: "none",
          boxShadow: "none",
          background: "transparent",
          width: "177px",
          height: "36px",
          paddingLeft: "16px",
          fontFamily: '"Open Sans", sans-serif',
          fontSize: "14px",
          "& fieldset": { border: "none" },
        }}
      >
        {Object.values(Language).map((language) => (
          <MenuItem key={language} value={language}>
            {language}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
