import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface ConfigState {
  siteLang: "en" | "ar";
}

const initialState: ConfigState = {
  siteLang: "en",
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {},
});

export const selectLang = (state: RootState) => state.config.siteLang;

export default configSlice.reducer;
