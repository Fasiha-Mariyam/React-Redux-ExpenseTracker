import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  user: null,
  signup: null,
  error: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    stopLoading(state){
      state.isLoading = false;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getSignUp(state, action) {
      state.isLoading = false;
      state.signup = action.payload;
    },

    getSignin(state, action) {
      state.isLoading = false;
      state.user = action.payload;
    },

    resetAuth: () => initialState,
  },
});

export default slice.reducer;
export const {
  getSignin,
  getSignUp,
  stopLoading,
  resetAuth,
  startLoading,
  hasError,
} = slice.actions;
