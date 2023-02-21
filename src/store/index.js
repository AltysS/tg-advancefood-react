import { configureStore } from "@reduxjs/toolkit";
import catalogueSlice from "./catalogue/catalogueSlice";
import cartSlice from "./cart/cart";

const store = configureStore({
  reducer: {
    catalogue: catalogueSlice,
    cart: cartSlice,
  },
});

export default store;
