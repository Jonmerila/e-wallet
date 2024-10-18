import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  theme: "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,

  reducers: {
    setTheme: (state, action) => {
      console.log("state", state.theme);
      console.log("action", action.payload);
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
