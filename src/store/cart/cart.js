import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    shoppingCart: [],
  },
  reducers: {
    addProductToCart: (state, action) => {
      const findIndex = state.shoppingCart.findIndex(
        (el) => el.barcode === action.payload.barcode
      );
      if (findIndex === -1) {
        const newItem = { ...action.payload, orderedQty: 1 };
        state.shoppingCart.push(newItem);
      } else {
        state.shoppingCart[findIndex].orderedQty += 1;
      }
    },
    deleteProductFromCart: (state, action) => {
      const findIndex = state.shoppingCart.findIndex(
        (el) => el.barcode === action.payload.barcode
      );
      if (state.shoppingCart[findIndex].orderedQty === 1) {
        state.shoppingCart.splice(findIndex, 1);
      } else {
        state.shoppingCart[findIndex].orderedQty -= 1;
      }
    },
  },
});
export const { addProductToCart, deleteProductFromCart } = cartSlice.actions;

export default cartSlice.reducer;
