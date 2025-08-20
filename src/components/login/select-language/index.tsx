"use client";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import styles from "./select-language.module.scss";
import { setUserLocale } from "@/localization";
import { useState } from "react";

const LANGUAGES = [
  {
    label: "English (USA)",
    code: "en-US",
  },
  {
    label: "Español (España)",
    code: "es-ES",
  },
];

export default function SelectLanguage() {
  const [language, setLanguage] = useState(LANGUAGES[0].code);

  const handleLanguageChange = async (event: SelectChangeEvent) => {
    const selectedLocale = event.target.value;
    await setUserLocale(selectedLocale);
    setLanguage(selectedLocale);
  };

  return (
    <FormControl size="small">
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={language}
        onChange={handleLanguageChange}
        className={styles.select}
        sx={{
          // width: "177px",
          // height: "36px",
          // pl: 2,
          // fontSize: "14px",
          "& fieldset": { border: "none" },
        }}
      >
        {LANGUAGES.map((lang) => (
          <MenuItem key={lang.code} value={lang.code}>
            {lang.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
