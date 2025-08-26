import * as React from "react";
import {
  Box,
  Divider,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import styles from "./profile-menu.module.scss";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Stack
        direction="row"
        alignItems="center"
        gap={"2px"}
        onClick={handleClick}
        sx={{ cursor: "pointer" }}
      >
        <Box className={styles.icon}>
          <AccountCircleIcon />
        </Box>
        <Typography className={styles.title}>Admin</Typography>
        <KeyboardArrowDownIcon />
      </Stack>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
        disableScrollLock
        sx={{ borderRadius: "8px" }}
      >
        <MenuItem onClick={handleClose} className={styles.userDetails}>
          <Typography>Admin</Typography>
          <Tooltip title="Admin123@admin.com">
            <Typography className={styles.email}>Admin123@admin.com</Typography>
          </Tooltip>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} className={styles.logout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M6.40833 10.9917L7.58333 12.1667L11.75 8L7.58333 3.83333L6.40833 5.00833L8.55833 7.16667H0.5V8.83333H8.55833L6.40833 10.9917ZM13.8333 0.5H2.16667C1.24167 0.5 0.5 1.25 0.5 2.16667V5.5H2.16667V2.16667H13.8333V13.8333H2.16667V10.5H0.5V13.8333C0.5 14.75 1.24167 15.5 2.16667 15.5H13.8333C14.75 15.5 15.5 14.75 15.5 13.8333V2.16667C15.5 1.25 14.75 0.5 13.8333 0.5Z"
              fill="#424242"
            />
          </svg>
          <Typography>LOG OUT</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
