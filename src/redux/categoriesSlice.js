import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    data: [],
    error: '',
    loading: 'idle',
    active: ''
  },
  reducers: {
    categoriesLoading: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    categoriesReceived: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.data = action.payload
      }
    },
    categoriesError: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.payload
      }
    },
    activeCategory: (state, action) => {
      state.active = action.payload
    }
  }
});

export const { categoriesLoading, categoriesReceived, categoriesError, activeCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
