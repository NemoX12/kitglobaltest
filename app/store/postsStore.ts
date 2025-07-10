import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";
import postModalReducer from "./postModalSlice";
import postCommentsReducer from "./postsCommentsSlice";

const postsStore = configureStore({
  reducer: {
    posts: postsReducer,
    postModal: postModalReducer,
    postComments: postCommentsReducer,
  },
});

export default postsStore;
