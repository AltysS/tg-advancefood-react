import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const productInCart = useSelector((state) => state.cart.shoppingCart);
  console.log(productInCart);
  return <div>Cart</div>;
};

export default Cart;
