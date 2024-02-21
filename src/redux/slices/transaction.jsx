import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transaction: [],
  isLoading: false,
};

const slice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    stopLoading(state) {
      state.isLoading = false;
    },

    addTransaction(state, action) {
      state.transaction = [...state.transaction, ...action.payload];
    },

    deleteTransaction(state, action) {
      state.transaction = state.transaction.filter(
        (transaction) => transaction.id !== action.payload
      );
    },

    resetTransaction: () => initialState,
  },
});

export default slice.reducer;
export const {
  resetTransaction,
  addTransaction,
  deleteTransaction,
  startLoading,
  stopLoading,
} = slice.actions;
