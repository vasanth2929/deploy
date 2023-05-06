import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MusicState {
  playingId?: string;
}

const initialState: MusicState = {
  playingId: undefined,
};

export const musicSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPlayingId(state, action: PayloadAction<string>) {
      state.playingId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPlayingId } = musicSlice.actions;

export default musicSlice.reducer;
