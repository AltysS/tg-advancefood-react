import React from "react";
import "./ProductItem.css";

const ProductItem = ({ brand, count, name, opt, price, barcode }) => {
  return (
    <div className="productItemWrapper">
      <div className="productImageWrapper">
        <img
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
      <p>{opt}</p>
      <br />
      <p>Qty: {count}</p>
      <p>{price} UAH</p>
    </div>
  );
};

export default ProductItem;
