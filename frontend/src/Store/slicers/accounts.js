import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: null,
  myNFTs : null,
};

export const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    setMyNFTs: (state, action) => {
      state.myNFTs = action.payload;
    },
  },
});

export const { setAccount,setMyNFTs } = accountsSlice.actions;

export default accountsSlice.reducer;





