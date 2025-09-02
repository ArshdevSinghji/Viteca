import {
  Box,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseIcon from "@mui/icons-material/Close";
import InfiniteScroll from "react-infinite-scroll-component";
import { FilterType } from "@/features/filter/filter.types";
import { Speaker } from "@/features/speakers/speakers.slice";
import { GetSpeakers } from "@/features/speakers/speakers.action";
import { useAppDispatch } from "@/features/hooks";

interface MultiSelectInfiniteScroll {
  value: string[] | undefined;
  label: string;
  multiple?: boolean;
  searchPlaceholder?: string;
  noOptionsText?: string;
  options: Speaker[];
  totalOptions: number;
  onChange: (option: any) => void;
  onDelete: (option: any) => void;
}

const MultiSelectInfiniteScroll: React.FC<MultiSelectInfiniteScroll> = ({
  value,
  label,
  multiple,
  searchPlaceholder = "Search...",
  noOptionsText = "No data found",
  options,
  totalOptions,
  onChange,
  onDelete,
}) => {
  const [searchText, setSearchText] = React.useState("");
  const dispatch = useAppDispatch();

  const loadMore = async () => {
    await dispatch(
      GetSpeakers({
        limit: value?.length ?? 0 + 5,
        page: Math.ceil((value?.length ?? 0 + 1) / 5),
        search: searchText,
      })
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
  };

  const handleSearchClear = () => {
    setSearchText("");
  };

  let selectedValues: any = [];
  if (Array.isArray(value)) {
    selectedValues = value;
  } else if (value) {
    selectedValues = [value];
  }

  return (
    <FormControl
      fullWidth
      sx={{
        "& .MuiInputBase-root": {
          height: "45px",
        },
        "& .MuiInputLabel-root": {
          top: "-4px",
          "&.MuiInputLabel-shrink": {
            top: 0,
          },
        },
      }}
    >
      <InputLabel
        id="demo-multiple-chip-label"
        sx={{
          fontSize: 14,
          color: "#9E9E9E",
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId={`demo-multiple-chip-${label}`}
        id="demo-multiple-chip"
        multiple={multiple}
        value={selectedValues}
        label={label}
        // size="small"
        sx={{
          // minHeight: "46px",
          "& .MuiInputBase-root": {
            height: "45px",
          },
          "& .MuiInputLabel-root": {
            top: "-4px",
            "&.MuiInputLabel-shrink": {
              top: 0,
            },
          },
          borderRadius: "8px",
        }}
        renderValue={(selected) => {
          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value: FilterType) => (
                <Chip
                  key={value.key}
                  label={value.value}
                  size="small"
                  sx={{
                    fontSize: "11px",
                    color: "#424242",
                  }}
                  onDelete={() => {
                    onDelete(value);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                />
              ))}
            </Box>
          );
        }}
        MenuProps={{
          autoFocus: false,
          PaperProps: {
            id: "infinite-scroll-select-menu",
            sx: {
              maxHeight: 300,
              maxWidth: 272,
              "& .MuiList-root": {
                paddingTop: 0,
                paddingBottom: 0,
              },
            },
          },
          disableAutoFocus: true,
        }}
      >
        <ListSubheader sx={{ p: 0, lineHeight: "38px", height: "38px" }}>
          <TextField
            data-test-id={`text-infinite-scroll-${label}-search`}
            fullWidth
            autoFocus
            size="small"
            sx={{
              height: "38px !important",
              "& .MuiOutlinedInput-root": {
                padding: "0 16px",
                height: "38px",
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
            placeholder={"search..."}
            value={searchText}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <SearchOutlinedIcon
                  data-test-id={`icon-infinite-scroll-${label}-search`}
                  sx={{
                    marginRight: 1,
                    height: "20px",
                    width: "20px",
                    color: "text.secondary",
                  }}
                />
              ),
              endAdornment: (
                <IconButton
                  data-test-id={`button-infinite-scroll-${label}-close`}
                  aria-label="clear search"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSearchClear();
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  style={{ visibility: searchText ? "visible" : "hidden" }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              ),
            }}
            variant="outlined"
          />
        </ListSubheader>

        <InfiniteScroll
          dataLength={options.length}
          next={loadMore}
          hasMore={options.length < totalOptions}
          loader={<h4>Loading...</h4>}
          // endMessage={<p>No more results</p>}
          scrollableTarget="infinite-scroll-select-menu"
        >
          {options.map((option) => {
            // const isSelected = selectedValues.some(
            //   (item: any) => item === option.key
            // );
            return (
              <MenuItem
                key={option.uuid}
                value={option.first_name + " " + option.last_name}
                // sx={{
                //   backgroundColor: isSelected ? "#E8F0FE" : "transparent",
                //   "&:hover": {
                //     backgroundColor: !isSelected ? "transparent" : "#E8F0FE",
                //   },
                // }}
                onClick={() =>
                  onChange({
                    key: option.uuid,
                    value: option.first_name + " " + option.last_name,
                  })
                }
              >
                <Box
                  sx={{
                    height: "100%",
                    width: "100%",
                    padding: "12px 16px",
                    display: "flex",
                    gap: "16px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <Checkbox
                    data-test-id={`icon-infinite-scroll-${option.key}-menu-${label}`}
                    size="small"
                    checked={isSelected}
                    sx={{ padding: 0 }}
                  /> */}

                  <ListItemText
                    primary={
                      <Tooltip
                        PopperProps={{
                          disablePortal: true,
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [-4, -24],
                              },
                            },
                          ],
                        }}
                        componentsProps={{
                          tooltip: {
                            sx: {
                              maxWidth: "100%",
                              whiteSpace: "normal",
                              wordBreak: "break-word",
                            },
                          },
                        }}
                        title={option.first_name + " " + option.last_name}
                      >
                        <Typography
                          data-test-id={`text-infinite-scroll-${option.uuid}-menu-${label}`}
                          sx={{
                            maxWidth: "fit-content",
                            fontSize: "14px !important",
                            whiteSpace: "nowrap !important",
                            overflow: "hidden !important",
                            textOverflow: "ellipsis !important",
                            flexGrow: 1,
                          }}
                        >
                          {option.first_name + " " + option.last_name}
                        </Typography>
                      </Tooltip>
                    }
                  />
                </Box>
              </MenuItem>
            );
          })}
        </InfiniteScroll>
      </Select>
    </FormControl>
  );
};

export default MultiSelectInfiniteScroll;
