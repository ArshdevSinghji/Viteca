import { InputAdornment, TextField } from "@mui/material";
import { GridSearchIcon } from "@mui/x-data-grid";

const SearchField = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      size="small"
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <GridSearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchField;
