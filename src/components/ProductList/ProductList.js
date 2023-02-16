import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getCatalogueCategories,
  setIsLoading,
} from "../../store/catalogue/catalogueSlice";
import ProductItem from "../ProductItem/ProductItem";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.catalogue.catalogueProducts);
  const isLoading = useSelector((state) => state.catalogue.isLoading);
  useEffect(() => {
    if (products.length === 0) {
      dispatch(setIsLoading(true));
      dispatch(getCatalogueCategories());
    }
  }, []);
  const { subcategory } = useParams();
  const filterProducts =
    !isLoading && products.filter((el) => el.category === subcategory);
  console.log(filterProducts);
  return (
    <div>
      {isLoading ? (
        <h2>Loading</h2>
      ) : (
        <>
          <h2>Product List</h2>
          <ProductItem />
          {filterProducts.map(({ brand, count, name, opt, price }) => {
            <ProductItem
              brand={brand}
              count={count}
              name={name}
              opt={opt}
              price={price}
            />;
          })}
        </>
      )}
    </div>
  );
};

export default ProductList;
