import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUser } from "../../utils";

export interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: Boolean(getUser()?.id),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuthenticated } = authSlice.actions;

export default authSlice.reducer;
