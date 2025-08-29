import { createSlice } from "@reduxjs/toolkit";
import { GetDigitalResource } from "./digital-resources.action";
import {
  GeneratedLanguage,
  Language,
  Modality,
  Status,
} from "./digital-resources.types";

export interface DigitalResource {
  uuid: string; //"3fa85f64-5717-4562-b3fc-2c963f66afa6"
  urls: {
    thumbnail: string; //"https://example.com/thumbnail.jpg";
    preview: string; //"https://example.com/preview.mp4";
    play: string; //"https://example.com/play";
    download: string; //"https://example.com/download.zip";
  };
  title: string; //"string";
  type: string; //"string";
  main_language: Language; //"en";
  created_at: string; //"2025-08-29T05:21:57.906Z";
  duration: 0;
  speakers: [
    {
      uuid: string; //"string";
      first_name: string; //"string";
      last_name: string; //"string";
    }
  ];
  campus_name: string; //"string";
  generated_language: GeneratedLanguage; //"automatic";
  modality: Modality; //"virtual";
  status: Status; //"published";
}

interface DigitalResourcesState {
  data: DigitalResource[] | [];
  count: number;
  per_page: number;
  total: number;
  current_page: number;
  loading: boolean;
}

const initialState: DigitalResourcesState = {
  data: [],
  count: 0,
  per_page: 0,
  total: 0,
  current_page: 0,
  loading: false,
};

const digitalResourcesSlice = createSlice({
  name: "digitalResources",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetDigitalResource.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetDigitalResource.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.rows;
        state.count = action.payload.count;
        state.per_page = action.payload.per_page;
        state.total = action.payload.total;
        state.current_page = action.payload.current_page;
      })
      .addCase(GetDigitalResource.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default digitalResourcesSlice.reducer;
