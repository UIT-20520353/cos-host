import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../pages/Login/login.reducer";
import contestReducer from "./contest.reducer";

export const store = configureStore({
  reducer: { user: userReducer, contests: contestReducer }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
