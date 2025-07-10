import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PostType = {
  id: string;
  content: string;
};

interface PostsState {
  posts: PostType[];
}

const initialState: PostsState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getAllPosts: (state, action: PayloadAction<PostType[]>) => {
      state.posts = action.payload;
    },
    addPosts(state, action: PayloadAction<PostType[]>) {
      state.posts.push(...action.payload);
    },
    removePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const { addPosts, removePost, getAllPosts } = postsSlice.actions;
export default postsSlice.reducer;
