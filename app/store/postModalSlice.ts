import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PostModalType = {
  id: string;
  content: string;
};

interface PostModalState {
  post: PostModalType | null;
}

const initialState: PostModalState = {
  post: null,
};

export const postModalSlice = createSlice({
  name: "postModal",
  initialState,
  reducers: {
    openModalAction: (state, action: PayloadAction<PostModalType>) => {
      state.post = action.payload;
    },
    closeModalAction: (state) => {
      state.post = null;
    },
  },
});

export const { closeModalAction, openModalAction } = postModalSlice.actions;
export default postModalSlice.reducer;
