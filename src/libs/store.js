import { configureStore } from "@reduxjs/toolkit";
import darkModeSlice from "./features/darkModeSlice";
import cartReducer from "./features/getProductDetails/cartSlice";

export const store = () => {
  return configureStore({
    reducer: {
      darkMode: darkModeSlice,
      cart: cartReducer,
    },
  });
};

export default store;
