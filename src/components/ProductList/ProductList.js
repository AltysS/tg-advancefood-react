import React, { useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import "./ProductList.css";
import useTelegram from "../../hooks/useTelegram";

const products = [
  {
    id: 1,
    title: "Advance Dog Yorkshire",
    price: 495,
    description:
      "Advance Dog Yorkshire - високоякісний збалансований повнораціонний корм спеціально розроблений для забезпечення харчових потреб собак породи Йоркширський терsєр в віці від 1 року",
  },
  {
    id: 1,
    title: "Advance Dog Yorkshire",
    price: 495,
    description:
      "Advance Dog Yorkshire - високоякісний збалансований повнораціонний корм спеціально розроблений для забезпечення харчових потреб собак породи Йоркширський терsєр в віці від 1 року",
  },
  {
    id: 1,
    title: "Advance Dog Yorkshire",
    price: 495,
    description:
      "Advance Dog Yorkshire - високоякісний збалансований повнораціонний корм спеціально розроблений для забезпечення харчових потреб собак породи Йоркширський терsєр в віці від 1 року",
  },
  {
    id: 1,
    title: "Advance Dog Yorkshire",
    price: 495,
    description:
      "Advance Dog Yorkshire - високоякісний збалансований повнораціонний корм спеціально розроблений для забезпечення харчових потреб собак породи Йоркширський терsєр в віці від 1 року",
  },
  {
    id: 1,
    title: "Advance Dog Yorkshire",
    price: 495,
    description:
      "Advance Dog Yorkshire - високоякісний збалансований повнораціонний корм спеціально розроблений для забезпечення харчових потреб собак породи Йоркширський терsєр в віці від 1 року",
  },
];

const getTotalPrice = (items) => {
  return items.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
};

const ProductList = () => {
  const [addedItems, setAddedItems] = useState([]);

  const tg = useTelegram();

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id);
    let newItems = [];
    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Придбати ${getTotalPrice()}`,
      });
    }
  };
  return (
    <div className={"list"}>
      {products.map((item) => (
        <ProductItem product={item} className={"item"} onAdd={onAdd} />
      ))}
    </div>
  );
};

export default ProductList;
