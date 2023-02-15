import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCatalogueCategories,
  setIsLoading,
} from "../../store/catalogue/catalogueSlice";
import Button from "../Button/Button";
import CatalogueCategoriesItem from "../CatalogueCategoriesItem/CatalogueCategoriesItem";
import "./CatalogueCategories.css";

const CatalogueCategories = () => {
  const dispatch = useDispatch();
  const categoryLevel = useSelector((state) => state.catalogue.categoryLevel);
  const categories = useSelector(
    (state) => state.catalogue.catalogueCategories
  );

  const isLoading = useSelector((state) => state.catalogue.isLoading);
  useEffect(() => {
    dispatch(setIsLoading(true));
    dispatch(getCatalogueCategories());
  }, []);
  return (
    <div>
      <Button>Choose category</Button>
      <Button>Go Back</Button>
      {!isLoading && (
        <div className="categoriesWrapper">
          {categories[categoryLevel].map(({ id, name }) => {
            return <CatalogueCategoriesItem key={id} name={name} />;
          })}
        </div>
      )}
      {isLoading && <h2>Loading</h2>}
    </div>
  );
};

export default CatalogueCategories;
