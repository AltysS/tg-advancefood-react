import React, { useEffect, useRef } from "react";
import "./ProductItem.css";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, deleteProductFromCart } from "../../store/cart/cart";

const ProductItem = ({
  brand,
  count,
  name,
  opt,
  price,
  barcode,
  uid,
  sku,
  handleChangeOpt,
}) => {
  const imageRef = useRef(null);
  const cart = useSelector((state) => state.cart.shoppingCart);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.catalogue.catalogueProducts);
  return (
    <div className="productItemWrapper">
      <div className="productImageWrapper">
        <img
          ref={imageRef}
          className="productImage"
          src={"https://zoougolok.com.ua/upload/iblock/" + barcode + ".jpg"}
          onError={(e) => {
            e.target.src = "https://zoougolok.com.ua/nopic/default.png";
          }}
        />
      </div>

      <div style={{ maxWidth: "150px" }}>
        <h2>{name}</h2>
      </div>
      <p>Available Qty: {count}</p>
      <p>{price} UAH</p>
      <div>
        {opt.map((el) => {
          const inCart = cart.find((item) => item.barcode === el.barcode);
          console.log(inCart);
          return (
            <>
              <p
                data-id={el.barcode}
                onClick={(e) => {
                  handleChangeOpt(e.target.dataset.id, imageRef, sku);
                }}
              >
                {el.opt}
              </p>
              {!inCart && (
                <Button
                  onClick={() => {
                    const findProduct = products.find(
                      (item) => item.barcode === el.barcode
                    );
                    dispatch(addProductToCart(findProduct));
                  }}
                >
                  У кошик
                </Button>
              )}
              {inCart && (
                <>
                  <Button
                    onClick={() => {
                      const findProduct = products.find(
                        (item) => item.barcode === el.barcode
                      );
                      dispatch(deleteProductFromCart(findProduct));
                    }}
                  >
                    -
                  </Button>
                  {inCart.orderedQty}
                  <Button
                    onClick={() => {
                      const findProduct = products.find(
                        (item) => item.barcode === el.barcode
                      );
                      dispatch(addProductToCart(findProduct));
                    }}
                  >
                    +
                  </Button>
                </>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ProductItem;
