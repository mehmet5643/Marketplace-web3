import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: null,
};

export const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
  },
});

export const { setAccount } = accountsSlice.actions;

export default accountsSlice.reducer;





