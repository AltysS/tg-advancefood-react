import React, { useCallback, useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cartHasUnmanagedProducts } from "../../store/cart/cart";
import {
  getCatalogueCategories,
  setIsLoading,
  setRequestedProducts,
  setSortedProducts,
  sortRequestedProducts,
} from "../../store/catalogue/catalogueSlice";
import ProductItem from "../ProductItem/ProductItem";
import "./ProductList.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(
    (state) => state.catalogue.catalogueProducts,
    shallowEqual
  );
  const isLoading = useSelector((state) => state.catalogue.isLoading);
  const requestedProducts = useSelector(
    (state) => state.catalogue.requestedProducts,
    shallowEqual
  );

  const params = useParams();
  useEffect(() => {
    if (products.length === 0) {
      dispatch(setIsLoading(true));
      dispatch(getCatalogueCategories(params));
    }
    dispatch(cartHasUnmanagedProducts());
  }, []);

  const filterAndSortProducts = (optionElement) => {
    const filterProducts = products.filter(
      (el) => el.category === params.subcategory
    );
    const sortedProducts = [];
    filterProducts.forEach((el) => {
      const alreadyAddedIndex = sortedProducts.findIndex(
        (product) => product.uid === el.uid
      );
      if (alreadyAddedIndex === -1) {
        // Find existing product and make a copy as it have read-only opt property
        const item = Object.assign({}, el);
        // Do an opt option to be an array of objects
        item.opt = [{ opt: item.opt, barcode: item.barcode }];
        sortedProducts.push(item);
      } else {
        // Find existing product and make a copy as it have read-only opt property

        const existingItem = Object.assign(
          {},
          sortedProducts[alreadyAddedIndex]
        );
        sortedProducts.splice(alreadyAddedIndex, 1);
        existingItem.opt.push({ opt: el.opt, barcode: el.barcode });
        sortedProducts.push(existingItem);
      }
    });
    // Sort options
    sortedProducts.forEach((el) => {
      el.opt.sort((a, b) => a.opt.localeCompare(b.opt));
    });

    // Sort products Array
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    dispatch(setSortedProducts(sortedProducts));
    // return sortedProducts;
  };
  useEffect(() => {
    dispatch(setIsLoading(true));
    filterAndSortProducts();
  }, [products]);

  const handleChangeOpt = (barcode, imageRef, sku) => {
    const requestedEl = products.find((el) => el.barcode === barcode);
    imageRef.current.src =
      "https://zoougolok.com.ua/upload/iblock/" + requestedEl.barcode + ".jpg";
    dispatch(sortRequestedProducts({ requestedEl, sku }));
  };

  return (
    <div>
      {products.length === 0 ? (
        <h2>Loading</h2>
      ) : (
        <>
          <h2>Product List</h2>
          <div className="productWrapper">
            {requestedProducts.map(
              ({ brand, count, name, opt, price, barcode, uid, sku }) => {
                return (
                  <ProductItem
                    key={barcode}
                    brand={brand}
                    count={count}
                    name={name}
                    opt={opt}
                    price={price}
                    barcode={barcode}
                    uid={uid}
                    sku={sku}
                    handleChangeOpt={handleChangeOpt}
                  />
                );
              }
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
