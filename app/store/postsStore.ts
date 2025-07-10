import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";

const postsStore = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default postsStore;
