import React from "react";
import "./ProductItem.css";
import Button from "../../components/Button/Button";

const ProductItem = ({ product, className, onAdd }) => {
  const onAddHandler = () => {
    onAdd(product);
  };
  return (
    <div className={"product" + className}>
      <div className={"img"} />
      <div className={"title"}>{product.title}</div>
      <div className={"description"}>{product.description}</div>
      <div className={"price"}>
        <span>
          Ціна: <b>{product.price}</b>
        </span>
        <Button className={"add-btn"} onClick={onAddHandler}>
          Додати до кошика
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
