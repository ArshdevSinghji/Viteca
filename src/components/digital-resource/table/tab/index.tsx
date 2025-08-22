"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export default function BasicTabs() {
  const [value, setValue] = React.useState("repository");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="secondary tabs example"
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#01579b",
          },
          "& .MuiTab-root.Mui-selected": {
            fontWeight: 600,
            color: "#01579b",
          },
        }}
      >
        <Tab value="repository" label="repository" />
      </Tabs>
    </Box>
  );
}
