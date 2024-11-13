import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSignInForm: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleForm: (state) => {
      state.showSignInForm = !state.showSignInForm;
    },
    newAccountClicked: (state) => {
      state.showSignInForm = false; // Stel in op false voor nieuw account
    },
  },
});

export const { toggleForm, newAccountClicked } = authSlice.actions;

export default authSlice.reducer;
