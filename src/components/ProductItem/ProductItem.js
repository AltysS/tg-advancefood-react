import React, { useRef } from "react";
import "./ProductItem.css";
import Button from "../Button/Button";

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
      <div>
        {opt.map((el) => (
          <p
            data-id={el.barcode}
            onClick={(e) => handleChangeOpt(e.target.dataset.id, imageRef, sku)}
          >
            {el.opt}
          </p>
        ))}
      </div>
      <div style={{ maxWidth: "150px" }}>
        <h2>{name}</h2>
      </div>
      <p>Available Qty: {count}</p>
      <p>{price} UAH</p>
      {count === 0 ? (
        <Button disabled>Немає в наявності</Button>
      ) : (
        <Button>У кошик</Button>
      )}
    </div>
  );
};

export default ProductItem;
