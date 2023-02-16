import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCatalogueCategories,
  incrementCategoryLevel,
  setIsLoading,
} from "../../store/catalogue/catalogueSlice";
import Button from "../Button/Button";

import "./RootCatalogue.css";

const RootCatalogue = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoryLevel = useSelector((state) => state.catalogue.categoryLevel);
  const categoryID = useSelector((state) => state.catalogue.categoryID);
  const categories = useSelector(
    (state) => state.catalogue.catalogueCategories
  );
  const isLoading = useSelector((state) => state.catalogue.isLoading);

  useEffect(() => {
    dispatch(setIsLoading(true));
    dispatch(getCatalogueCategories());
  }, []);

  const categoryComponent = () => {
    let JSX;
    const filteredArr =
      categoryID &&
      categories[categoryLevel].filter((el) => {
        console.log(el.child_categories[0] === categoryID);
        if (el.child_categories[0] === categoryID) {
          return el;
        }
      });
    if (filteredArr) {
      JSX = !isLoading && (
        <div className="categoriesWrapper">
          {filteredArr.map(({ id, name }) => {
            return (
              <div
                onClick={() => dispatch(incrementCategoryLevel(id))}
                className="categoryContainer"
              >
                <div>
                  <img src="https://detta.com.ua/upload/iblock/689/000000005.jpg" />
                </div>
                <a href="#">{name}</a>
              </div>
            );
          })}
        </div>
      );
    } else {
      JSX = !isLoading && (
        <div className="categoriesWrapper">
          {categories[categoryLevel].map(({ id, name }) => {
            return (
              <div
                onClick={() => dispatch(incrementCategoryLevel(id))}
                className="categoryContainer"
              >
                <div>
                  <img src="https://detta.com.ua/upload/iblock/689/000000005.jpg" />
                </div>
                <a href="#">{name}</a>
              </div>
            );
          })}
        </div>
      );
    }
    return JSX;
  };

  return (
    <div>
      <Button>Choose category</Button>
      <Button onClick={() => console.log("click")}>Go Back</Button>
      {!isLoading ? categoryComponent() : <h2>Loading</h2>}
    </div>
  );
};

export default RootCatalogue;
