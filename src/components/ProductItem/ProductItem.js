import React, { useEffect } from "react";
import "./ProductItem.css";
import Button from "../../components/Button/Button";

const ProductItem = ({ orderedQty, product, onAdd, onDelete, needUpdate }) => {
  console.log(orderedQty);
  const onDeleteHandler = () => {
    onDelete(product);
  };
  const onAddHandler = () => {
    onAdd(product);
  };
  return (
    <div className={"product"}>
      <img
        src="https://detta.com.ua/upload/iblock/41a/8410650170480.png"
        className={"img"}
      />
      {orderedQty > 0 && (
        <div className={"qtyRoundFigure"}>{product.orderedQty}</div>
      )}
      <div className={"title"}>{product.title}</div>
      <div className={"description"}>{product.description}</div>
      <div className={"price"}>
        <span>
          Ціна: <b>{product.price}</b>
        </span>
        <div className={"btn-container"}>
          <Button className={"btn"} onClick={onDeleteHandler}>
            -
          </Button>
          <Button className={"btn"} onClick={onAddHandler}>
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
