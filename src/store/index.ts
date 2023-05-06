import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import ui from "./ui";
import music from "./music";

export const store = configureStore({
  reducer: {
    ui,
    auth,
    music,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
