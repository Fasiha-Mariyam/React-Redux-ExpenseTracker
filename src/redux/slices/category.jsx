import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  isLoading: false,
};

const slice = createSlice({
  name: "category",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    stopLoading(state) {
      state.isLoading = false;
    },

    addCategory(state, action) {
      state.categories = [...state.categories, ...action.payload];
    },

    deleteCategory(state, action) {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },

    resetCategory: () => initialState,
  },
});

export default slice.reducer;
export const {
  resetCategory,
  addCategory,
  deleteCategory,
  startLoading,
  stopLoading,
} = slice.actions;
