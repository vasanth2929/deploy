import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UIState {
  isImageModalOpen: boolean;
  activePath: string;
}

const initialState: UIState = {
  isImageModalOpen: false,
  activePath: "/",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleImageModalOpen(state, action: PayloadAction<boolean>) {
      state.isImageModalOpen = action.payload;
    },
    setActivePath(state, action: PayloadAction<string>) {
      state.activePath = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleImageModalOpen, setActivePath } = uiSlice.actions;

export default uiSlice.reducer;
