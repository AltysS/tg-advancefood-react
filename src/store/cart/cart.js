import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    shoppingCart: [],
    isCheckoutFormOpen: false,
  },
  reducers: {
    successfulOrder: (state) => {
      state.shoppingCart = [];
      state.isCheckoutFormOpen = false;
    },
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
        localStorage.setItem("inCart", JSON.stringify(state.shoppingCart));
      } else {
        state.shoppingCart[findIndex].orderedQty -= 1;
        localStorage.setItem("inCart", JSON.stringify(state.shoppingCart));
      }
    },
    setCheckoutForm: (state, action) => {
      state.isCheckoutFormOpen = action.payload;
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
  setCheckoutForm,
  successfulOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
