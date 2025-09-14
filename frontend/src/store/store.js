import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../store/authSlice.js";
import notesSlice from "../store/notesSlice.js";

// Create and configure the Redux store
const store = configureStore({
  reducer: {
    auth: authSlice,
    notes: notesSlice,
  },
});

export default store;
