import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    shoppingCart: [],
  },
  reducers: {
    deleteAllProducts: (state, action) => {
      const findProductIndex = state.shoppingCart.findIndex(
        (el) => el.barcode === action.payload
      );
      state.shoppingCart.splice(findProductIndex, 1);
    },
    incrementCartProduct: (state, action) => {
      const findProductIndex = state.shoppingCart.findIndex(
        (el) => el.barcode === action.payload
      );
      state.shoppingCart[findProductIndex].orderedQty += 1;
    },
    decrementCartProduct: (state, action) => {
      const findProductIndex = state.shoppingCart.findIndex(
        (el) => el.barcode === action.payload
      );
      if (state.shoppingCart[findProductIndex].orderedQty === 1) {
        state.shoppingCart.splice(findProductIndex, 1);
      } else {
        state.shoppingCart[findProductIndex].orderedQty -= 1;
      }
    },
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
export const {
  addProductToCart,
  deleteProductFromCart,
  incrementCartProduct,
  decrementCartProduct,
  deleteAllProducts,
} = cartSlice.actions;

export default cartSlice.reducer;
