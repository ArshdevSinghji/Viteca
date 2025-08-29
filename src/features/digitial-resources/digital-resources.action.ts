import { createAsyncThunk } from "@reduxjs/toolkit";
import { DigitalResourceFilter } from "./digital-resources.types";

export const GetDigitalResource = createAsyncThunk(
  "digitalResource/getDigitalResource",
  async (filter: DigitalResourceFilter, thunkAPI) => {
    try {
      const response = await fetch(`/api/digital-resources/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filter }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch digital resources");
      }

      return response.json();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.title);
    }
  }
);
