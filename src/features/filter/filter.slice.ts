import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Category,
  GeneratedLanguage,
  Language,
  Modality,
  Status,
  Subtitle,
} from "../digitial-resources/digital-resources.types";

const initialState = {
  date: {
    publication_date: undefined as string | undefined,
    date_comparison: "eq" as "gt" | "lt" | "eq",
  },
  //TODO: add campus
  search: undefined as string | undefined,
  authors: undefined as string[] | undefined,
  audio_languages: undefined as Language[] | undefined,
  subtitle_languages: undefined as Subtitle[] | undefined,
  status: undefined as Status | undefined,
  subjects: undefined as string[] | undefined,
  category: undefined as Category | undefined,
  generated_language: undefined as GeneratedLanguage | undefined,
  modality: undefined as Modality | undefined,
  pagination: {
    page: 1,
    pageSize: 2,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    clearFilters(state) {
      state.category = undefined;
      state.authors = undefined;
      state.subtitle_languages = undefined;
      state.audio_languages = undefined;
      state.subjects = undefined;
      state.date.publication_date = undefined;
      state.status = undefined;
      state.generated_language = undefined;
      state.modality = undefined;
    },
    setSelectedCategory(state, action: PayloadAction<Category | undefined>) {
      state.category = action.payload;
    },
    setSelectedAuthors(state, action: PayloadAction<string[] | undefined>) {
      state.authors = action.payload;
    },
    setSelectedAudioLanguages(
      state,
      action: PayloadAction<Language[] | undefined>
    ) {
      state.audio_languages = action.payload;
    },
    setSelectedSubtitleLanguages(
      state,
      action: PayloadAction<Subtitle[] | undefined>
    ) {
      state.subtitle_languages = action.payload;
    },
    setSelectedDate(state, action: PayloadAction<string | undefined>) {
      state.date.publication_date = action.payload;
    },
    setDateComparison(state, action: PayloadAction<"gt" | "lt" | "eq">) {
      state.date.date_comparison = action.payload;
    },
    setStatus(state, action: PayloadAction<Status | undefined>) {
      state.status = action.payload;
    },
    setSelectedSubject(state, action: PayloadAction<string[] | undefined>) {
      state.subjects = action.payload;
    },
    setTranslation(
      state,
      action: PayloadAction<GeneratedLanguage | undefined>
    ) {
      state.generated_language = action.payload;
    },
    setModality(state, action: PayloadAction<Modality | undefined>) {
      state.modality = action.payload;
    },
    setSearch(state, action: PayloadAction<string | undefined>) {
      state.search = action.payload;
    },
    setPagination(
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) {
      state.pagination = action.payload;
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
  clearFilters,
  setSearch,
  setPagination,
  setDateComparison,
} = filterSlice.actions;
export default filterSlice.reducer;
