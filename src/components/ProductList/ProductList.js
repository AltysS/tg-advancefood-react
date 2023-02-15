import React, { useCallback, useEffect, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import "./ProductList.css";
import useTelegram from "../../hooks/useTelegram";
import { useNavigate } from "react-router-dom";
import { useSelector, use, useDispatch } from "react-redux";
import {
  addProductToCart,
  setCatalogueProducts,
} from "../../store/catalogue/catalogueSlice";

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
  const dispatch = useDispatch();
  const catalogueProducts = useSelector(
    (store) => store.catalogue.catalogueProducts
  );
  const [needUpdate, setNeedUpdate] = useState(false);
  const [order, setOrder] = useState();
  const { tg } = useTelegram();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCatalogueProducts(products));
  }, []);

  const onSendOrder = useCallback((products) => {
    const data = {
      order: products,
      orderNo: Math.random(1 * 10),
    };
    setOrder(data);
    navigate(`${data.orderNo}/form`);
  });

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendOrder);
    return () => tg.offEvent("mainButtonClicked", onSendOrder);
  }, [onSendOrder]);

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
    dispatch(addProductToCart(product));
    tg.MainButton.setParams({
      text: `Придбати на сумму ${getTotalPrice(catalogueProducts)}`,
    });
    tg.MainButton.show();
  };
  return (
    catalogueProducts && (
      <div className={"list"}>
        {catalogueProducts.map((item) => (
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
