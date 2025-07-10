import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CommentType = {
  id: string;
  comment: string;
};

interface CommentsState {
  comments: CommentType[];
}

const initialState: CommentsState = {
  comments: [],
};

export const commentsSlice = createSlice({
  name: "postComments",
  initialState,
  reducers: {
    getAllComments: (state, action: PayloadAction<CommentType[]>) => {
      state.comments = action.payload;
    },
    addComments(state, action: PayloadAction<CommentType[]>) {
      state.comments.push(...action.payload);
    },
  },
});

export const { addComments, getAllComments } = commentsSlice.actions;
export default commentsSlice.reducer;
