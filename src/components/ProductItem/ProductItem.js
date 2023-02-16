import React from "react";

const ProductItem = ({ brand, count, name, opt, price }) => {
  console.log("render");
  return (
    <div style={{ display: "flex", border: "1px solid black" }}>
      <h2>{name}</h2>
      <p>{opt}</p>
      <p>Qty: {count}</p>
      <p>{price} UAH</p>
    </div>
  );
};

export default ProductItem;
