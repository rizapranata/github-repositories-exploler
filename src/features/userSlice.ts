import { createSlice } from "@reduxjs/toolkit";
import { fetchReposByUser, fetchSearchUser } from "../services/fetchApi";
import { Repos } from "../models/repoModel";
import { User } from "../models/userModel";

interface UserState {
  users: User[];
  reposByUsername: { [username: string]: Repos[] };
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
        state.users = [];
        state.reposByUsername = {};
      })
      .addCase(fetchSearchUser.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.loading = false;
      })
      .addCase(fetchSearchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchReposByUser.fulfilled, (state, action) => {
        const { username, repos } = action.payload;
        state.reposByUsername[username] = repos;
      });
  },
});

export default userSlice.reducer;
