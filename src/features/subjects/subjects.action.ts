import { createAsyncThunk } from "@reduxjs/toolkit";

interface Query {
  page?: number;
  max?: number;
  search?: string;
}

export const GetSubjects = createAsyncThunk(
  "subjects/getSubjects",
  async (query: Query, thunkAPI) => {
    try {
      const searchParams = new URLSearchParams();
      if (query.page) searchParams.append("page", query.page.toString());
      if (query.max) searchParams.append("max", query.max.toString());
      if (query.search) searchParams.append("search", query.search);

      const response = await fetch(`/api/subjects?${searchParams.toString()}`);
      return response.json();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
