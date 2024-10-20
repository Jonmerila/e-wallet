import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("theme") || "dark", // Default to "dark" if no theme is set
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
