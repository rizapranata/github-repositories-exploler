import { createSlice } from "@reduxjs/toolkit";
import { fetchReposByUser, fetchSearchUser } from "../services/fetchApi";
import { Repos } from "../models/repoModel";
import { User } from "../models/userModel";

interface UserState {
  users: User[];
  reposByUsername: Record<string, Repos[]>;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  reposByUsername: {},
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchUser.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.loading = false;
      })
      .addCase(fetchSearchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      })
      .addCase(fetchReposByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReposByUser.fulfilled, (state, action) => {
        const { username, repos } = action.payload;
        state.reposByUsername[username] = repos;
        state.loading = false;
      })
      .addCase(fetchReposByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      });
  },
});

export default userSlice.reducer;
