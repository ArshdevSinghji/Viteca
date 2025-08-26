import {
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  ClickAwayListener,
  MenuItem,
  Paper,
  Popper,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import styles from "./filter-fields.module.scss";

interface FilterType {
  label: string;
  code?: string;
}

const FilterFields = () => {
  const [selectedCategory, setSelectedCategory] = useState<FilterType[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<FilterType[]>([]);
  const [selectedAudioLanguages, setSelectedAudioLanguages] = useState<
    FilterType[]
  >([]);
  const [selectedSubtitleLanguages, setSelectedSubtitleLanguages] = useState<
    FilterType[]
  >([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [label, setLabel] = useState("");

  const [showCategory, setShowCategory] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);
  const [showAudio, setShowAudio] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  const LIMIT_SIZE = 1;

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const category = [
    {
      label: "Course Presentation",
    },
    {
      label: "Program Presentation",
    },
    {
      label: "Advanced Course",
    },
    {
      label: "Basic Training",
    },
  ];

  const author = [
    {
      label: "John Doe",
    },
    {
      label: "Jane Smith",
    },
    {
      label: "Emily Johnson",
    },
    {
      label: "Michael Brown",
    },
  ];

  const audio = [
    {
      label: "English",
      code: "en",
    },
    {
      label: "Spanish",
      code: "es",
    },
    {
      label: "French",
      code: "fr",
    },
    {
      label: "German",
      code: "de",
    },
  ];

  const subtitle = [
    {
      label: "English",
      code: "en",
    },
    {
      label: "Spanish",
      code: "es",
    },
    {
      label: "French",
      code: "fr",
    },
    {
      label: "German",
      code: "de",
    },
  ];

  const handleParentMouseEnter = (label: string) => {
    setLabel(label);
  };

  const handleParentMouseLeave = () => {
    setLabel("");
  };

  const handleMouseEnter = (event: any, param: string) => {
    setAnchorEl(event.currentTarget);
    switch (label) {
      case "Category":
        setShowCategory(true);
        break;
      case "Author":
        setShowAuthor(true);
        break;
      case "Audio":
        setShowAudio(true);
        break;
      case "Subtitle":
        setShowSubtitle(true);
        break;
      default:
        break;
    }
  };

  const handleMouseLeave = (param: string) => {
    setAnchorEl(null);
    switch (param) {
      case "Category":
        setShowCategory(false);
        break;
      case "Author":
        setShowAuthor(false);
        break;
      case "Audio":
        setShowAudio(false);
        break;
      case "Subtitle":
        setShowSubtitle(false);
        break;
      default:
        break;
    }
  };

  const handleClickAway = (param: string) => {
    setAnchorEl(null);
    switch (param) {
      case "Category":
        setShowCategory(false);
        break;
      case "Author":
        setShowAuthor(false);
        break;
      case "Audio":
        setShowAudio(false);
        break;
      case "Subtitle":
        setShowSubtitle(false);
        break;
      default:
        break;
    }
  };

  return (
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
              fontSize: "14px",
              color: " #9E9E9E",
            },
          },
        }}
        className={styles.select}
        fullWidth
      >
        <MenuItem value="Published">Published</MenuItem>
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

      {/* Category */}
      <Autocomplete
        multiple
        limitTags={LIMIT_SIZE}
        size="small"
        id="checkboxes-tags-demo"
        options={category}
        disableCloseOnSelect
        value={selectedCategory}
        onChange={(event, newValue) => {
          const set = new Set(newValue.map((item) => item.label));
          setSelectedCategory([...set].map((label) => ({ label })));
        }}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.label}
            </li>
          );
        }}
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: "8px",
          },
        }}
        slotProps={{
          chip: { size: "small", className: styles.chip },
        }}
        getLimitTagsText={(more) => (
          <Box>
            <Chip
              label={`+${more}`}
              className={styles.tag}
              size="small"
              onDelete={() => {
                setSelectedCategory(selectedCategory.slice(0, LIMIT_SIZE));
              }}
              onMouseEnter={(e) => handleMouseEnter(e, "Category")}
              onMouseLeave={() => handleMouseLeave("Category")}
              sx={{ cursor: "pointer" }}
            />

            <Popper
              open={showCategory}
              anchorEl={anchorEl}
              placement="bottom"
              style={{ zIndex: 1600 }}
            >
              <ClickAwayListener
                onClickAway={() => handleClickAway("Category")}
              >
                <Box className={styles.popper}>
                  {selectedCategory.slice(LIMIT_SIZE).map((value, index) => (
                    <Chip
                      key={index}
                      label={value.label}
                      className={styles.tag}
                      size="small"
                    />
                  ))}
                </Box>
              </ClickAwayListener>
            </Popper>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
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
            onMouseEnter={() => handleParentMouseEnter("Category")}
            onMouseLeave={() => handleParentMouseLeave()}
          />
        )}
      />

      {/* Authors */}
      <Autocomplete
        multiple
        limitTags={LIMIT_SIZE}
        size="small"
        id="checkboxes-tags-demo"
        options={author}
        disableCloseOnSelect
        value={selectedAuthors}
        onChange={(event, newValue) => {
          const set = new Set(newValue.map((item) => item.label));
          setSelectedAuthors([...set].map((label) => ({ label })));
        }}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.label}
            </li>
          );
        }}
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: "8px",
          },
        }}
        slotProps={{
          chip: { size: "small", className: styles.chip },
        }}
        getLimitTagsText={(more) => (
          <Box>
            <Chip
              label={`+${more}`}
              className={styles.tag}
              size="small"
              onDelete={() => {
                setSelectedAuthors(selectedAuthors.slice(0, LIMIT_SIZE));
              }}
              onMouseEnter={(e) => handleMouseEnter(e, "Author")}
              onMouseLeave={() => handleMouseLeave("Author")}
              sx={{ cursor: "pointer" }}
            />

            <Popper
              open={showAuthor}
              anchorEl={anchorEl}
              placement="bottom"
              style={{ zIndex: 1600 }}
            >
              <ClickAwayListener onClickAway={() => handleClickAway("Author")}>
                <Box className={styles.popper}>
                  {selectedAuthors.slice(LIMIT_SIZE).map((value, index) => (
                    <Chip
                      key={index}
                      label={value.label}
                      className={styles.tag}
                      size="small"
                    />
                  ))}
                </Box>
              </ClickAwayListener>
            </Popper>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Author"
            size="small"
            slotProps={{
              inputLabel: {
                sx: {
                  fontSize: 14,
                  color: " #9E9E9E",
                },
              },
            }}
            onMouseEnter={() => handleParentMouseEnter("Author")}
            onMouseLeave={() => handleParentMouseLeave()}
          />
        )}
      />

      {/* Audio Language */}
      <Autocomplete
        multiple
        limitTags={LIMIT_SIZE}
        size="small"
        id="checkboxes-tags-demo"
        options={audio}
        disableCloseOnSelect
        value={selectedAudioLanguages}
        onChange={(event, newValue) => {
          const set = new Set(newValue.map((item) => item.label));
          setSelectedAudioLanguages([...set].map((label) => ({ label })));
        }}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.label}
            </li>
          );
        }}
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: "8px",
          },
        }}
        slotProps={{
          chip: { size: "small", className: styles.chip },
        }}
        getLimitTagsText={(more) => (
          <Box>
            <Chip
              label={`+${more}`}
              className={styles.tag}
              size="small"
              onDelete={() => {
                setSelectedAudioLanguages(
                  selectedAudioLanguages.slice(0, LIMIT_SIZE)
                );
              }}
              onMouseEnter={(e) => handleMouseEnter(e, "Audio")}
              onMouseLeave={() => handleMouseLeave("Audio")}
              sx={{ cursor: "pointer" }}
            />

            <Popper
              open={showAudio}
              anchorEl={anchorEl}
              placement="bottom"
              style={{ zIndex: 1600 }}
            >
              <ClickAwayListener onClickAway={() => handleClickAway("Audio")}>
                <Box className={styles.popper}>
                  {selectedAudioLanguages
                    .slice(LIMIT_SIZE)
                    .map((value, index) => (
                      <Chip
                        key={index}
                        label={value.label}
                        className={styles.tag}
                        size="small"
                      />
                    ))}
                </Box>
              </ClickAwayListener>
            </Popper>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
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
            onMouseEnter={() => handleParentMouseEnter("Audio")}
            onMouseLeave={() => handleParentMouseLeave()}
          />
        )}
      />

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
        label="Modality"
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
        <MenuItem value="Draft">Presential</MenuItem>
      </TextField>

      {/* Subtitle Languages */}
      <Autocomplete
        multiple
        limitTags={LIMIT_SIZE}
        size="small"
        id="checkboxes-tags-demo"
        options={subtitle}
        disableCloseOnSelect
        value={selectedSubtitleLanguages}
        onChange={(event, newValue) => {
          const set = new Set(newValue.map((item) => item.label));
          setSelectedSubtitleLanguages([...set].map((label) => ({ label })));
        }}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.label}
            </li>
          );
        }}
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: "8px",
          },
        }}
        slotProps={{
          chip: { size: "small", className: styles.chip },
        }}
        getLimitTagsText={(more) => (
          <Box>
            <Chip
              label={`+${more}`}
              className={styles.tag}
              size="small"
              onDelete={() => {
                setSelectedSubtitleLanguages(
                  selectedSubtitleLanguages.slice(0, LIMIT_SIZE)
                );
              }}
              onMouseEnter={(e) => handleMouseEnter(e, "Subtitle")}
              onMouseLeave={() => handleMouseLeave("Subtitle")}
              sx={{ cursor: "pointer" }}
            />

            <Popper
              open={showSubtitle}
              anchorEl={anchorEl}
              placement="bottom"
              style={{ zIndex: 1600 }}
            >
              <ClickAwayListener
                onClickAway={() => handleClickAway("Subtitle")}
              >
                <Box className={styles.popper}>
                  {selectedSubtitleLanguages
                    .slice(LIMIT_SIZE)
                    .map((value, index) => (
                      <Chip
                        key={index}
                        label={value.label}
                        className={styles.tag}
                        size="small"
                      />
                    ))}
                </Box>
              </ClickAwayListener>
            </Popper>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
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
            onMouseEnter={() => handleParentMouseEnter("Subtitle")}
            onMouseLeave={() => handleParentMouseLeave()}
          />
        )}
      />
    </Box>
  );
};

export default FilterFields;
