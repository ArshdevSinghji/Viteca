import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterType } from "./filter.types";
import { Dayjs } from "dayjs";

const initialState = {
  selectedCategory: [] as FilterType[],
  selectedAuthors: [] as FilterType[],
  selectedSubtitleLanguages: [] as FilterType[],
  selectedAudioLanguages: null as FilterType | null,
  selectedSubject: null as FilterType | null,
  selectedDate: null as string | null,
  status: null as string | null,
  translation: null as string | null,
  modality: null as string | null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSelectedCategory(state, action: PayloadAction<FilterType[]>) {
      state.selectedCategory = action.payload;
    },
    setSelectedAuthors(state, action: PayloadAction<FilterType[]>) {
      state.selectedAuthors = action.payload;
    },
    setSelectedAudioLanguages(state, action: PayloadAction<FilterType | null>) {
      state.selectedAudioLanguages = action.payload;
    },
    setSelectedSubtitleLanguages(state, action: PayloadAction<FilterType[]>) {
      state.selectedSubtitleLanguages = action.payload;
    },
    setSelectedDate(state, action: PayloadAction<string | null>) {
      state.selectedDate = action.payload;
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setSelectedSubject(state, action: PayloadAction<FilterType | null>) {
      state.selectedSubject = action.payload;
    },
    setTranslation(state, action: PayloadAction<string | null>) {
      state.translation = action.payload;
    },
    setModality(state, action: PayloadAction<string | null>) {
      state.modality = action.payload;
    },
  },
});

export const {
  setSelectedCategory,
  setSelectedAuthors,
  setSelectedAudioLanguages,
  setSelectedSubtitleLanguages,
  setSelectedDate,
  setStatus,
  setSelectedSubject,
  setTranslation,
  setModality,
} = filterSlice.actions;
export default filterSlice.reducer;
