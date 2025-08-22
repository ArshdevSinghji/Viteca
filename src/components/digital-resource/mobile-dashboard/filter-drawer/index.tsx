import {
  Box,
  Button,
  Drawer,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./filter-drawer.module.scss";

const MobileFilterDrawer: React.FC<{ toggleDrawer: any }> = ({
  toggleDrawer,
}) => {
  return (
    <Box className={styles.drawer}>
      <Box className={styles.header}>
        <Box sx={{ p: "12px", height: "48px" }}>
          <CloseIcon onClick={toggleDrawer("right", false)} />
        </Box>
        <Typography>Filters</Typography>
      </Box>
      <Stack gap={"16px"} className={styles.filter}>
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

          <TextField
            select
            variant="outlined"
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
            className={styles.select}
            fullWidth
          >
            <MenuItem value="Draft">Draft</MenuItem>
          </TextField>

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

        <Box className={styles.button}>
          <Button variant="text" disabled>
            Clear
          </Button>
          <Button variant="text" onClick={toggleDrawer("right", false)}>
            Apply
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default MobileFilterDrawer;
