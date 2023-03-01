import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  decrementCategoryLevel,
  getCatalogueCategories,
  incrementCategoryLevel,
  setCategoryID,
  setCategoryLevel,
  setIsLoading,
} from "../../store/catalogue/catalogueSlice";
import Button from "../Button/Button";
import Preloader from "../Preloader/Preloader";
import Вreadcrumbs from "../Вreadcrumbs/Вreadcrumbs";

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
    if (categories.length === 0) {
      dispatch(setIsLoading(true));
      dispatch(getCatalogueCategories(params));
    }
  }, []);

  useEffect(() => {
    if (params.childID) {
      dispatch(setCategoryLevel(2));
      dispatch(setCategoryID(params.childID));
    } else if (params.id) {
      dispatch(setCategoryLevel(1));
      dispatch(setCategoryID(params.id));
    } else {
      dispatch(setCategoryLevel(0));
      dispatch(setCategoryID(null));
    }
  }, [params]);

  const formImageLink = (id) => {
    let imageLink = id.toString();
    const neededSymbols = 9 - imageLink.length;
    imageLink = "0".repeat(neededSymbols) + imageLink + ".jpg";
    return imageLink;
  };

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
                key={id}
                onClick={() => {
                  const hasChildCategory =
                    categories[categoryLevel + 1] &&
                    categories[categoryLevel + 1].find((el) => {
                      return el.child_categories[0] === id;
                    });
                  if (!hasChildCategory) {
                    navigate(`/products/${params.id}/${id}`, { replace: true });
                  } else {
                    dispatch(incrementCategoryLevel(id));
                    navigate(`${id}`, { replace: true });
                  }
                }}
                className="categoryContainer"
              >
                <div>
                  <img
                    style={{ height: "150px" }}
                    src={
                      "https://detta.com.ua/sections_img/" + formImageLink(id)
                    }
                    onError={(e) => {
                      e.target.src =
                        "https://zoougolok.com.ua/nopic/default.png";
                    }}
                  />
                </div>
                <p>{name}</p>
              </div>
            );
          })}
        </div>
      );
    } else {
      JSX = !isLoading && (
        <div className="categoriesWrapper">
          {categories[categoryLevel].map(({ id, name }) => {
            formImageLink(id);
            return (
              <div
                key={id}
                onClick={() => {
                  dispatch(incrementCategoryLevel(id));
                  navigate(`${id}`, { replace: true });
                }}
                className="categoryContainer"
              >
                <div>
                  <img
                    className="categoryImage"
                    style={{ height: "150px" }}
                    src={
                      "https://detta.com.ua/sections_img/" + formImageLink(id)
                    }
                    onError={(e) => {
                      e.target.src =
                        "https://zoougolok.com.ua/nopic/default.png";
                    }}
                  />
                </div>
                <p>{name}</p>
              </div>
            );
          })}
        </div>
      );
    }
    JSX.props.children.length === 0 &&
      navigate(`/products/${categoryID}/${categoryID}`, { replace: true });
    return JSX;
  };

  return (
    <div>
      <Вreadcrumbs
        categoryLevel={categoryLevel}
        categoryID={categoryID}
        categories={categories}
        isLoading={isLoading}
        params={params}
      />
      {/* <Button
        disabled={categoryLevel === 0 && true}
        onClick={() => {
          dispatch(decrementCategoryLevel());
          navigate(-1);
        }}
      >
        Go Back
      </Button> */}
      {!isLoading ? categoryComponent() : <Preloader />}
    </div>
  );
};

export default RootCatalogue;
