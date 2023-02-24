import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cartHasUnmanagedProducts,
  decrementCartProduct,
  deleteAllProducts,
  incrementCartProduct,
} from "../../store/cart/cart";
import Button from "../Button/Button";
import "./Cart.css";
import DeleteFromCartIMG from "./images/deleteFromCartIMG";

const Cart = () => {
  const productInCart = useSelector((state) => state.cart.shoppingCart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cartHasUnmanagedProducts());
  }, []);
  return (
    <>
      {productInCart.length === 0 ? (
        <h2>The cart is empty</h2>
      ) : (
        <>
          {productInCart.map(({ name, opt, price, orderedQty, barcode }) => {
            return (
              <div>
                <div className="productCartWrapper">
                  <div
                    onClick={() => {
                      dispatch(deleteAllProducts(barcode));
                    }}
                  >
                    <DeleteFromCartIMG />
                  </div>
                  <img
                    className="cartProductImage"
                    src={
                      "https://zoougolok.com.ua/upload/iblock/" +
                      barcode +
                      ".jpg"
                    }
                    onError={(e) => {
                      e.target.src =
                        "https://zoougolok.com.ua/nopic/default.png";
                    }}
                  />
                  <div>
                    <h2 className="cartProducName">{name}</h2>
                    <p>{opt}</p>
                    <div className="cartProductQty">
                      <p>{price}</p>
                      <Button
                        className="incrementAndDecrementButtons"
                        onClick={() => {
                          dispatch(decrementCartProduct(barcode));
                        }}
                      >
                        -
                      </Button>
                      <p>{orderedQty}</p>
                      <Button
                        className="incrementAndDecrementButtons"
                        onClick={() => {
                          dispatch(incrementCartProduct(barcode));
                        }}
                      >
                        +
                      </Button>
                      <p>{price * orderedQty}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
      <div>
        Сумма замовлення:{" "}
        {productInCart.reduce((acc, el) => acc + el.price * el.orderedQty, 0)}{" "}
        UAH
      </div>
      <Button>Замовити</Button>
    </>
  );
};

export default Cart;
