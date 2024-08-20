import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import noteSlice from "./noteSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
