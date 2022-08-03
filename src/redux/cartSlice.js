import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
    totalItems: 0
  },
  reducers: {
    totalItems: (state, action) => {
      state.totalItems = action.payload
    },
    cartItems: (state, action) => {
      state.data = action.payload
    }
  }
});

export const { totalItems, cartItems } = cartSlice.actions;

export default cartSlice.reducer;
