import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Category,
  GeneratedLanguage,
  Language,
  Modality,
  Status,
  Subtitle,
} from "../digitial-resources/digital-resources.types";

interface Filter {
  date: {
    publication_date: string | undefined;
    date_comparison: "gt" | "lt" | "eq";
  };
  //TODO: add campus
  search: string | undefined;
  authors: string[] | undefined;
  audio_languages: Language[] | undefined;
  subtitle_languages: Subtitle[] | undefined;
  status: Status | undefined;
  subjects: string[] | undefined;
  category: Category | undefined;
  generated_language: GeneratedLanguage | undefined;
  modality: Modality | undefined;
  pagination: {
    page: number;
    pageSize: number;
  };
}

interface FilterState {
  filter: Filter;
  draft: Filter;
}

const initialState: FilterState = {
  filter: {
    date: {
      publication_date: undefined,
      date_comparison: "eq",
    },
    //TODO: add campus
    search: undefined,
    authors: undefined,
    audio_languages: undefined,
    subtitle_languages: undefined,
    status: undefined,
    subjects: undefined,
    category: undefined,
    generated_language: undefined,
    modality: undefined,
    pagination: {
      page: 1,
      pageSize: 2,
    },
  },
  draft: {
    date: {
      publication_date: undefined,
      date_comparison: "eq",
    },
    //TODO: add campus
    search: undefined,
    authors: undefined,
    audio_languages: undefined,
    subtitle_languages: undefined,
    status: undefined,
    subjects: undefined,
    category: undefined,
    generated_language: undefined,
    modality: undefined,
    pagination: {
      page: 1,
      pageSize: 2,
    },
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    clearFilters(state) {
      state.filter = {
        date: {
          publication_date: undefined,
          date_comparison: "eq",
        },
        search: undefined,
        authors: undefined,
        audio_languages: undefined,
        subtitle_languages: undefined,
        status: undefined,
        subjects: undefined,
        category: undefined,
        generated_language: undefined,
        modality: undefined,
        pagination: {
          page: 1,
          pageSize: 2,
        },
      };
      state.draft = {
        date: {
          publication_date: undefined,
          date_comparison: "eq",
        },
        search: undefined,
        authors: undefined,
        audio_languages: undefined,
        subtitle_languages: undefined,
        status: undefined,
        subjects: undefined,
        category: undefined,
        generated_language: undefined,
        modality: undefined,
        pagination: {
          page: 1,
          pageSize: 2,
        },
      };
    },

    closeFilter(state) {
      state.draft = state.filter;
    },

    applyFilter(state, action: PayloadAction<Filter>) {
      state.filter = action.payload;
    },

    setSelectedCategory(state, action: PayloadAction<Category | undefined>) {
      state.draft.category = action.payload;
    },
    setSelectedAuthors(state, action: PayloadAction<string[] | undefined>) {
      state.draft.authors = action.payload;
    },
    setSelectedAudioLanguages(
      state,
      action: PayloadAction<Language[] | undefined>
    ) {
      state.draft.audio_languages = action.payload;
    },
    setSelectedSubtitleLanguages(
      state,
      action: PayloadAction<Subtitle[] | undefined>
    ) {
      state.draft.subtitle_languages = action.payload;
    },
    setSelectedDate(state, action: PayloadAction<string | undefined>) {
      state.draft.date.publication_date = action.payload;
    },
    setDateComparison(state, action: PayloadAction<"gt" | "lt" | "eq">) {
      state.draft.date.date_comparison = action.payload;
    },
    setStatus(state, action: PayloadAction<Status | undefined>) {
      state.draft.status = action.payload;
    },
    setSelectedSubject(state, action: PayloadAction<string[] | undefined>) {
      state.draft.subjects = action.payload;
    },
    setTranslation(
      state,
      action: PayloadAction<GeneratedLanguage | undefined>
    ) {
      state.draft.generated_language = action.payload;
    },
    setModality(state, action: PayloadAction<Modality | undefined>) {
      state.draft.modality = action.payload;
    },
    setSearch(state, action: PayloadAction<string | undefined>) {
      state.draft.search = action.payload;
    },
    setPagination(
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) {
      state.draft.pagination = action.payload;
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
  applyFilter,
  closeFilter,
} = filterSlice.actions;
export default filterSlice.reducer;
