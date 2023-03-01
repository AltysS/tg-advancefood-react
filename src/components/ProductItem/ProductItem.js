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

      <div
        style={{
          maxWidth: "150px",
          padding: "1px",
          overflowWrap: "break-word",
          minHeight: "80px",
        }}
      >
        <h2>{name}</h2>
      </div>
      <p>Available Qty: {count}</p>
      <p className="itemPrice">{price} UAH</p>
      <div className="propsWrapper">
        {opt.map((el) => {
          const inCart = cart.find((item) => item.barcode === el.barcode);
          const inStock = products.find(
            (product) => product.barcode === el.barcode
          );
          return (
            <div className="productProps">
              <div className="productOptWrapper">
                <p
                  className={el.barcode === barcode ? "active" : "productOpt"}
                  data-id={el.barcode}
                  onClick={(e) => {
                    handleChangeOpt(e.target.dataset.id, imageRef, sku);
                  }}
                >
                  {el.opt}
                </p>
              </div>

              {inStock.count === 0 && (
                <Button
                  className="addToCartBtn"
                  disabled
                  style={{ color: "grey" }}
                >
                  Відсутній
                </Button>
              )}
              {inStock.count !== 0 && !inCart && (
                <Button
                  className="addToCartBtn"
                  data-id={el.barcode}
                  onClick={(e) => {
                    const findProduct = products.find(
                      (item) => item.barcode === el.barcode
                    );
                    dispatch(addProductToCart(findProduct));
                    handleChangeOpt(e.target.dataset.id, imageRef, sku);
                  }}
                >
                  У кошик
                </Button>
              )}
              {inStock.count !== 0 && inCart && (
                <>
                  <Button
                    className="incrementAndDecrementButtons"
                    data-id={el.barcode}
                    onClick={(e) => {
                      const findProduct = products.find(
                        (item) => item.barcode === el.barcode
                      );
                      dispatch(deleteProductFromCart(findProduct));
                      handleChangeOpt(e.target.dataset.id, imageRef, sku);
                    }}
                  >
                    -
                  </Button>
                  <p className="ordererQty">{inCart.orderedQty}</p>
                  <Button
                    className="incrementAndDecrementButtons"
                    data-id={el.barcode}
                    onClick={(e) => {
                      const findProduct = products.find(
                        (item) => item.barcode === el.barcode
                      );
                      dispatch(addProductToCart(findProduct));
                      handleChangeOpt(e.target.dataset.id, imageRef, sku);
                    }}
                  >
                    +
                  </Button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductItem;
