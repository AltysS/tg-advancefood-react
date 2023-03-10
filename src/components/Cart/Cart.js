import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cartHasUnmanagedProducts,
  decrementCartProduct,
  deleteAllProducts,
  incrementCartProduct,
  setCheckoutForm,
} from "../../store/cart/cart";
import {
  getCatalogueCategories,
  setIsLoading,
} from "../../store/catalogue/catalogueSlice";
import Button from "../Button/Button";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import "./Cart.css";
import DeleteFromCartIMG from "./images/deleteFromCartIMG";

const Cart = () => {
  const productInCart = useSelector((state) => state.cart.shoppingCart);
  const categories = useSelector(
    (state) => state.catalogue.catalogueCategories
  );

  const isCheckoutFormOpen = useSelector(
    (state) => state.cart.isCheckoutFormOpen
  );

  const calculateSum = () => {
    const sum = productInCart.reduce(
      (acc, el) => acc + el.price * el.orderedQty,
      0
    );
    return parseFloat(sum).toFixed(2);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(setIsLoading(true));
      dispatch(getCatalogueCategories());
    }
  }, []);

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
                    className="productCartDeleteBtn"
                    onClick={() => {
                      dispatch(deleteAllProducts(barcode));
                    }}
                  >
                    <DeleteFromCartIMG />
                  </div>
                  <div className="cartImageWrapper">
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
                  </div>

                  <div>
                    <h2 className="cartProducName">{name}</h2>
                    <p>{opt}</p>
                    <div className="cartProductQty">
                      <p>{parseFloat(price).toFixed(0)}</p>
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
                      <p>{parseFloat(price * orderedQty).toFixed(0)}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
      <p style={{ textAlign: "center" }}>
        ?????????? ????????????????????: {calculateSum()} UAH
      </p>

      <div className="orderBtnWrapper">
        <Button
          className="orderBtn"
          onClick={() => {
            scrollTo(0, 0);
            dispatch(setCheckoutForm(true));
          }}
        >
          ????????????????
        </Button>
      </div>
      {isCheckoutFormOpen
        ? document.body.classList.add("toggleScroll")
        : document.body.classList.remove("toggleScroll")}
      {isCheckoutFormOpen && <CheckoutForm />}
    </>
  );
};

export default Cart;
