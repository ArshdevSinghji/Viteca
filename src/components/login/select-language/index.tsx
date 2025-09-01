"use client";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import styles from "./select-language.module.scss";
import Cookies from "js-cookie";

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

export default function SelectLanguage({ locale }: { locale: string }) {
  const [language, setLanguage] = useState(locale);

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
          "& fieldset": { border: "none" },
        }}
        MenuProps={{
          sx: {
            "& .MuiMenuItem-root": {
              fontSize: "14px !important",
            },
          },
        }}
      >
        {LANGUAGES.map((lang) => (
          <MenuItem
            key={lang.code}
            value={lang.code}
            className={styles.menuItem}
          >
            {lang.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
