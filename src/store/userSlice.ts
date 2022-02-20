import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getMe,
  login,
  signup,
  updateProfile,
  logout,
} from "../utils/fetchers/auth";
import { User } from "../utils/Types";
import { RootState } from "./store";

interface UserState {
  user: User | null;
  isFetching: boolean;
  errorFetching: boolean;
  isManualLogging: boolean;
}

const initialState: UserState = {
  user: null,
  isFetching: true,
  errorFetching: false,
  isManualLogging: false,
};

export const fetchCurrentUser = createAsyncThunk(
  "user/fetch",
  async (signal: AbortSignal, { rejectWithValue }) => {
    try {
      const res = await getMe(signal);
      return res.data.data.user;
    } catch {
      rejectWithValue("error");
    }
  }
);

export const logUserIn = createAsyncThunk(
  "user/login",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await login(data);
      return res.data.data.user;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Error occured! Please try again"
      );
    }
  }
);

export const signUserUp = createAsyncThunk(
  "user/signup",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await signup(data);
      return res.data.data.user;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Error occured! Please try again"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/update",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await updateProfile(data);
      return res.data.data.user;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Error occured! Please try again"
      );
    }
  }
);

export const logUserOut = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logout();
      return "successful";
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Error occured! Please try again"
      );
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isFetching = true;
        state.errorFetching = false;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isFetching = false;
        state.errorFetching = false;
        state.isManualLogging = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isFetching = false;
        state.errorFetching = true;
        state.user = null;
      })
      .addCase(logUserIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isManualLogging = true;
      })
      .addCase(signUserUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isManualLogging = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logUserOut.fulfilled, (state, action) => {
        state.user = null;
      });
  },
});

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
