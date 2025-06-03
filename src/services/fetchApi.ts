import { createAsyncThunk } from "@reduxjs/toolkit";
import githubApi from "./githubApi";

interface ParamsTypes {
  q: string;
  per_page: number;
}

export const fetchSearchUser = createAsyncThunk(
  "github/fetchUsers",
  async ({ q, per_page }: ParamsTypes, thunkApi) => {
    try {
      const response = await githubApi.get(`/search/users`, {
        params: { q, per_page },
      });

      return {
        users: response.data.items.map((user: any) => ({
          login: user.login,
          avatar_url: user.avatar_url,
          id: user.id,
        })),
        total_count: response.data.total_count,
      };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const fetchReposByUser = createAsyncThunk(
  "user/repos",
  async (username: string, thunkApi) => {
    try {
      const response = await githubApi.get(`/users/${username}/repos`);
      return {
        username,
        repos: response.data,
      };
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch repos"
      );
    }
  }
);
