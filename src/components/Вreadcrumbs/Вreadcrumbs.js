import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setCategoryID,
  setCategoryLevel,
} from "../../store/catalogue/catalogueSlice";
import "./Вreadcrumbs.css";

const Вreadcrumbs = ({
  categoryLevel,
  calledFromProductList,
  params,
  categories,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCategory = (childID) => {
    if (calledFromProductList) {
      let childCategory;
      const categoryArr = [];
      console.log(params);
      for (let i = categoryLevel; i >= 0; i--) {
        if (i === 2) {
          categories[i].find((el) => {
            if (el.id === Number(childID)) {
              childCategory = el.child_categories[0];
              categoryArr.push({
                link: `/products/${params.category}/${params.subcategory}`,
                ...el,
              });
            }
          });
          !childCategory ? (childCategory = childID) : null;
        } else {
          categories[i].find((el) => {
            if (el.id === Number(childCategory)) {
              childCategory = el.child_categories[0];
              console.log(el);
              categoryArr.push({
                categoryLVL: i === 1 ? 2 : 1,
                categoryID: el.id,
                link: i === 1 ? `/${params.category}/${el.id}` : `/${el.id}`,
                ...el,
              });
            }
          });
        }
      }
      categoryArr.reverse();
      return categoryArr.map((el) => (
        <li className="breadcrumbsItemContainer">
          <a
            className="breadcrumbsItemLink"
            onClick={() => {
              dispatch(setCategoryLevel(el.categoryLVL));
              dispatch(setCategoryID(el.categoryID));
              navigate(`${el.link}`, { replace: true });
            }}
          >
            {el.name}
          </a>
        </li>
      ));
    } else if (childID) {
      const category = categories[0].find((el) => el.id === Number(params.id));

      const subCategory = categories[categoryLevel - 1].filter(
        (el) => el.id === Number(params.childID)
      );
      return (
        <>
          <li className="breadcrumbsItemContainer">
            <a
              className="breadcrumbsItemLink"
              onClick={() => {
                dispatch(setCategoryLevel(1));
                dispatch(setCategoryID(category.id));
                navigate(`/${category.id}`, { replace: true });
              }}
            >
              {category.name}
            </a>
          </li>
          {subCategory.map((el) => {
            return (
              <li className="breadcrumbsItemContainer">
                <a
                  className="breadcrumbsItemLink"
                  onClick={() => {
                    dispatch(setCategoryLevel(2));
                    dispatch(setCategoryID(el.id));
                    navigate(`/${category.id}/${el.id}`, { replace: true });
                  }}
                >
                  {el.name}
                </a>
              </li>
            );
          })}
        </>
      );
    } else {
      const category = categories[categoryLevel - 1].find(
        (el) => el.id === Number(params.id)
      );
      return (
        <li className="breadcrumbsItemContainer">
          <a
            className="breadcrumbsItemLink"
            onClick={() => {
              dispatch(setCategoryLevel(1));
              dispatch(setCategoryID(category.id));
              navigate(`/${category.id}`, { replace: true });
            }}
          >
            {category.name}
          </a>
        </li>
      );
    }
  };

  return (
    <div className="breadcrumbsWrapper">
      <nav>
        <ul className="breadcrumbsItemList">
          {!isLoading && categoryLevel >= 0 && (
            <li className="breadcrumbsItemContainer">
              <a
                className="breadcrumbsItemLink"
                onClick={() => {
                  navigate("/", { replace: true });
                  dispatch(setCategoryLevel(0));
                  dispatch(setCategoryID(null));
                }}
              >
                Головна
              </a>
            </li>
          )}
          {!isLoading &&
            calledFromProductList &&
            getCategory(params.subcategory)}
          {!isLoading &&
            categoryLevel == 2 &&
            !calledFromProductList &&
            getCategory(params.childID)}
          {!isLoading &&
            categoryLevel == 1 &&
            !calledFromProductList &&
            getCategory()}
        </ul>
      </nav>
    </div>
  );
};

export default Вreadcrumbs;
