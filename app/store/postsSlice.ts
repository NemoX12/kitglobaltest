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
    editPost: (state, action: PayloadAction<PostType>) => {
      const { id, content } = action.payload;
      const postToEdit = state.posts.find((post) => post.id === id);

      if (postToEdit) {
        postToEdit.content = content;
      }
    },
  },
});

export const { addPosts, removePost, getAllPosts, editPost } = postsSlice.actions;
export default postsSlice.reducer;
