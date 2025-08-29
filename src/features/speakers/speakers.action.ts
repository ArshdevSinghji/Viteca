import { createAsyncThunk } from "@reduxjs/toolkit";

interface Query {
  limit?: number;
  page?: number;
  search?: string;
}

export const GetSpeakers = createAsyncThunk(
  "speakers/getSpeakers",
  async (query: Query, thunkAPI) => {
    try {
      const searchParams = new URLSearchParams();
      if (query.limit) searchParams.append("limit", query.limit.toString());
      if (query.page) searchParams.append("page", query.page.toString());
      if (query.search) searchParams.append("search", query.search);
      const response = await fetch(`api/speakers?${searchParams.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to get speakers!");
      }
      return response.json();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.title);
    }
  }
);
