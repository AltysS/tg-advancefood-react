import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    shoppingCart: [],
  },
  reducers: {
    cartHasUnmanagedProducts: (state) => {
      const cartItems = JSON.parse(localStorage.getItem("inCart"));
      if (cartItems) {
        state.shoppingCart = cartItems;
      }
    },
    deleteAllProducts: (state, action) => {
      const findProductIndex = state.shoppingCart.findIndex(
        (el) => el.barcode === action.payload
      );
      state.shoppingCart.splice(findProductIndex, 1);
      localStorage.setItem("inCart", JSON.stringify(state.shoppingCart));
    },
    incrementCartProduct: (state, action) => {
      const findProductIndex = state.shoppingCart.findIndex(
        (el) => el.barcode === action.payload
      );
      state.shoppingCart[findProductIndex].orderedQty += 1;
      localStorage.setItem("inCart", JSON.stringify(state.shoppingCart));
    },
    decrementCartProduct: (state, action) => {
      const findProductIndex = state.shoppingCart.findIndex(
        (el) => el.barcode === action.payload
      );
      if (state.shoppingCart[findProductIndex].orderedQty === 1) {
        state.shoppingCart.splice(findProductIndex, 1);
        localStorage.setItem("inCart", JSON.stringify(state.shoppingCart));
      } else {
        state.shoppingCart[findProductIndex].orderedQty -= 1;
        localStorage.setItem("inCart", JSON.stringify(state.shoppingCart));
      }
    },
    addProductToCart: (state, action) => {
      const findIndex = state.shoppingCart.findIndex(
        (el) => el.barcode === action.payload.barcode
      );
      if (findIndex === -1) {
        const newItem = { ...action.payload, orderedQty: 1 };
        state.shoppingCart.push(newItem);
        localStorage.setItem("inCart", JSON.stringify(state.shoppingCart));
      } else {
        state.shoppingCart[findIndex].orderedQty += 1;
        localStorage.setItem("inCart", JSON.stringify(state.shoppingCart));
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
  cartHasUnmanagedProducts,
} = cartSlice.actions;

export default cartSlice.reducer;
