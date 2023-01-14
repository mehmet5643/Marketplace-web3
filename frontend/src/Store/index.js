import { configureStore } from "@reduxjs/toolkit";
import AccountReducer from "./slicers/accounts";


export const store = configureStore({
  reducer: {
    // Add your reducers here
    accounts: AccountReducer
  },

})