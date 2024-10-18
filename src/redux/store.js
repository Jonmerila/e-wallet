import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./cardSlice";
import themeReducer from "./themeSlice";

const store = configureStore({
  reducer: {
    cards: cardReducer,
    theme: themeReducer,
  },
});

export default store;
