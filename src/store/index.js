import { configureStore } from "@reduxjs/toolkit";
import catalogueSlice from "./catalogue/catalogueSlice";

const store = configureStore({
  reducer: {
    catalogue: catalogueSlice,
  },
});

export default store;
