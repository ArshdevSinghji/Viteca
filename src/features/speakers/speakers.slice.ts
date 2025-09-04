import { createSlice } from "@reduxjs/toolkit";
import { GetSpeakers } from "./speakers.action";

export interface Speaker {
  uuid: string;
  first_name: string;
  last_name: string;
}

interface SpeakerState {
  data: Speaker[];
  count: number;
  per_page: number;
  total: number;
  current_page: number;
  loading: boolean;
  error: string | null;
}

const initialState: SpeakerState = {
  data: [],
  count: 0,
  per_page: 0,
  total: 0,
  current_page: 0,
  loading: false,
  error: null,
};

const SpeakerSlice = createSlice({
  name: "speakerSlice",
  initialState,
  reducers: {
    clearSpeakers: (state) => {
      state.data = [];
      state.count = 0;
      state.current_page = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetSpeakers.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetSpeakers.fulfilled, (state, action) => {
        state.loading = false;
        // For infinite scroll, accumulate data instead of replacing
        if (action.payload.current_page === 1) {
          // First page - replace data
          state.data = action.payload.rows;
        } else {
          // Subsequent pages - append data
          state.data = [...state.data, ...action.payload.rows];
        }
        state.count = action.payload.count;
        state.per_page = action.payload.per_page;
        state.total = action.payload.total;
        state.current_page = action.payload.current_page;
      })
      .addCase(GetSpeakers.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { clearSpeakers } = SpeakerSlice.actions;
export default SpeakerSlice.reducer;
