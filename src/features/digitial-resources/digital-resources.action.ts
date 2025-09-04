import { createAsyncThunk } from "@reduxjs/toolkit";
import { DigitalResourceFilter } from "./digital-resources.types";
import { getSession } from "@/app/auth/session-token";

export const GetDigitalResource = createAsyncThunk(
  "digitalResource/getDigitalResource",
  async (filter: DigitalResourceFilter, thunkAPI) => {
    const session = await getSession();
    const token = session?.user?.token;
    try {
      const response = await fetch(`/api/digital-resources/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
