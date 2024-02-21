import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: [],
  isLoading: false,
};

const slice = createSlice({
  name: "account",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    stopLoading(state) {
      state.isLoading = false;
    },

    createAccounts(state, action) {
      state.account = [...state.account, ...action.payload];
    },

    deleteAccount(state, action) {
      state.account = state.account.filter(
        (account) => account.id !== action.payload
      );
    },

    updateAccount(state, action) {
      const { id, amount } = action.payload;
      const accountToUpdate = state.account.find(
        (account) => account.id === id
      );
      if (accountToUpdate) {
        accountToUpdate.data.amount = amount;
      }
    },

    resetAccounts: () => initialState,
  },
});

export default slice.reducer;
export const {
  resetAccounts,
  createAccounts,
  deleteAccount,
  updateAccount,
  startLoading,
  stopLoading,
} = slice.actions;
