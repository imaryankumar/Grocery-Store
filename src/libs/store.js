import { configureStore } from "@reduxjs/toolkit";
import darkModeSlice from "./features/darkModeSlice";

export const store = () => {
  return configureStore({
    reducer: {
      darkMode: darkModeSlice,
    },
  });
};
