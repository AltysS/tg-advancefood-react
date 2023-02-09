import React, { useEffect, useState } from "react";
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
    orderedQty: 0,
  },
  {
    id: 2,
    title: "Advance Dog Yorkshire",
    price: 845,
    description:
      "Advance Dog Yorkshire - високоякісний збалансований повнораціонний корм спеціально розроблений для забезпечення харчових потреб собак породи Йоркширський терsєр в віці від 1 року",
    orderedQty: 0,
  },
  {
    id: 3,
    title: "Advance Dog Yorkshire",
    price: 795,
    description:
      "Advance Dog Yorkshire - високоякісний збалансований повнораціонний корм спеціально розроблений для забезпечення харчових потреб собак породи Йоркширський терsєр в віці від 1 року",
    orderedQty: 0,
  },
  {
    id: 4,
    title: "Advance Dog Yorkshire",
    price: 695,
    description:
      "Advance Dog Yorkshire - високоякісний збалансований повнораціонний корм спеціально розроблений для забезпечення харчових потреб собак породи Йоркширський терsєр в віці від 1 року",
    orderedQty: 0,
  },
  {
    id: 5,
    title: "Advance Dog Yorkshire",
    price: 595,
    description:
      "Advance Dog Yorkshire - високоякісний збалансований повнораціонний корм спеціально розроблений для забезпечення харчових потреб собак породи Йоркширський терsєр в віці від 1 року",
    orderedQty: 0,
  },
];

const getTotalPrice = (items) => {
  return items.reduce((acc, item) => {
    return (acc += item.price * item.orderedQty);
  }, 0);
};

const ProductList = () => {
  const [addedItems, setAddedItems] = useState();
  const [needUpdate, setNeedUpdate] = useState(false);
  const { tg } = useTelegram();

  useEffect(() => {
    setNeedUpdate(!needUpdate);
  }, [addedItems]);
  useEffect(() => {
    setAddedItems(products);
  }, []);

  const onDelete = (product) => {
    let totalQty = 0;
    const newItemsArr = addedItems.map((el) => {
      if (el.id === product.id && product.orderedQty !== 0) {
        el.orderedQty -= 1;
        totalQty += el.orderedQty;
      } else {
        totalQty += el.orderedQty;
      }
      return el;
    });
    totalQty === 0 && tg.MainButton.hide();
    setAddedItems(newItemsArr);
    setNeedUpdate(!needUpdate);
  };

  const onAdd = (product) => {
    const newItemsArr = addedItems;
    newItemsArr.map((el) => {
      if (el.id === product.id) {
        return (el.orderedQty += 1);
      }
      return el;
    });
    setAddedItems(newItemsArr);
    setNeedUpdate(!needUpdate);
    tg.MainButton.setParams({
      text: `Придбати на сумму ${getTotalPrice(newItemsArr)}`,
    });
    tg.MainButton.show();
    // const alreadyAdded = addedItems.find((item) => item.id === product.id);
    // let newItems = [];
    // if (alreadyAdded) {
    //   newItems = addedItems.filter((item) => item.id !== product.id);
    // } else {
    //   newItems = [...addedItems, product];
    // }
    // setAddedItems(newItems);
    // console.log(getTotalPrice(newItems));
    // if (newItems.length === 0) {
    //   tg.MainButton.hide();
    // } else {
    //   tg.MainButton.setParams({
    //     text: `Замовити товар на сумму ${getTotalPrice(newItems)}`,
    //   });
    //   tg.MainButton.show();
    // }
  };
  return (
    addedItems && (
      <div className={"list"}>
        {addedItems.map((item) => (
          <ProductItem
            orderedQty={item.orderedQty}
            key={item.id}
            product={item}
            onAdd={onAdd}
            onDelete={onDelete}
            needUpdate={needUpdate}
          />
        ))}
      </div>
    )
  );
};

export default ProductList;
