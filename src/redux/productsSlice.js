import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    topSales: [],
    error: '',
    loading: 'idle',
    searchQuery: '',
    next: []
  },
  reducers: {
    productsLoading: (state, action) => {
        state.loading = 'pending'
    },
    productsReceived: (state, action) => {
        state.loading = 'idle'
        state.data = action.payload
    },
    topSalesReceived: (state, action) => {
        state.loading = 'idle'
        state.topSales = action.payload
    },
    productsAppend: (state, action) => {
        state.loading = 'idle'
        state.data = [...state.data, ...action.payload]
    },
    setSearchQuery: (state, action) => {
        state.searchQuery = action.payload
    },
    setOffset: (state, action) => {
        state.next = action.payload
    },
    productsError: (state, action) => {
        state.loading = 'idle'
        state.error = action.payload
    },
  }
});

export const { productsLoading, productsReceived, productsError, setSearchQuery, setOffset, productsAppend, topSalesReceived } = productsSlice.actions;

export default productsSlice.reducer;
