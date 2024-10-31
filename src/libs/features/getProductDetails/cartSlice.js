import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { cardSliceInitalData } from "./common";

export const productCardDetail = createAsyncThunk(
  "cardDetail/cartSlice",
  async () => {
    try {
      const fetchData = await axios.get(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/products/all`
      );
      return fetchData.data;
    } catch (error) {
      console.log("err", error);
      throw new Error(error.response?.data?.message || "Failed to fetch data");
    }
  }
);

const cartSlice = createSlice({
  name: "cardDetail",
  initialState: cardSliceInitalData,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(productCardDetail.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(productCardDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productDetails = action.payload;
    });
    builder.addCase(productCardDetail.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = action.error.message;
    });
  },
});

export const {} = cartSlice.actions;
export default cartSlice.reducer;
