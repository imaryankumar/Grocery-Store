import { createSlice } from "@reduxjs/toolkit";

const getInitialDarkMode = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  }
  return false;
};

const initialState = {
  mode: getInitialDarkMode(),
};

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.mode = !state.mode;
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("darkMode", JSON.stringify(state.mode));
      }
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
