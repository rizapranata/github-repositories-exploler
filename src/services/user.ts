import { createAsyncThunk } from "@reduxjs/toolkit";
import githubApi from "./githubApi";

interface ParamsTypes {
  page: number;
  username: string;
}

export const fetchSearchUser = createAsyncThunk(
  "user/github",
  async ({ page, username }: ParamsTypes, thunkApi) => {
    try {
      const response = await githubApi.get(`/user/${username}`, {
        params: {
          page,
          username,
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
