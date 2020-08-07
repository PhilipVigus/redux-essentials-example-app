import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", title: "First Post!", content: "Hello!" },
  { id: "2", title: "Second Post", content: "More text" },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  // note that reducers should NEVER calculate random values
  // generate them first in the action object before passing
  // them into the reducer
  reducers: {
    postAdded: {
      // the reducer itself
      reducer(state, action) {
        state.push(action.payload);
      },
      // a callback called before the reducer is called
      // returns the payload, and allows logic like randome generators
      // to be separated from the reducer. Can also have a meta field to
      // indicate errors etc
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
});

export const { postAdded, postUpdated } = postsSlice.actions;
export default postsSlice.reducer;
