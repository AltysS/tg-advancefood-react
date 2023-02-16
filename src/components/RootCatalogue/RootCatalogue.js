import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  decrementCategoryLevel,
  getCatalogueCategories,
  incrementCategoryLevel,
  setCategoryLevel,
  setIsLoading,
} from "../../store/catalogue/catalogueSlice";
import Button from "../Button/Button";

import "./RootCatalogue.css";

const RootCatalogue = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const categoryLevel = useSelector((state) => state.catalogue.categoryLevel);
  const categoryID = useSelector((state) => state.catalogue.categoryID);
  const categories = useSelector(
    (state) => state.catalogue.catalogueCategories
  );
  const isLoading = useSelector((state) => state.catalogue.isLoading);

  useEffect(() => {
    dispatch(setIsLoading(true));
    dispatch(getCatalogueCategories(params.id));
  }, []);

  const categoryComponent = () => {
    let JSX;
    const filteredArr =
      categoryID &&
      categories[categoryLevel].filter((el) => {
        if (el.child_categories[0] === Number(categoryID)) {
          return el;
        }
      });
    if (filteredArr) {
      JSX = !isLoading && (
        <div className="categoriesWrapper">
          {filteredArr.map(({ id, name }) => {
            return (
              <div
                onClick={() => {
                  dispatch(incrementCategoryLevel(id));
                  navigate(`${id}`);
                }}
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
                onClick={() => {
                  console.log(params);
                  dispatch(incrementCategoryLevel(id));
                  navigate(`${id}`);
                }}
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
      <Button
        onClick={() => {
          dispatch(decrementCategoryLevel());
          navigate(-1);
        }}
      >
        Go Back
      </Button>
      {!isLoading ? categoryComponent() : <h2>Loading</h2>}
    </div>
  );
};

export default RootCatalogue;
