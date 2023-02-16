import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import "./CatalogueCategoriesProductList.css";

const CatalogueCategoriesItem = ({ id, name }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(location.pathname + `category/${id}`)}
      className="categoryContainer"
    >
      <div>
        <img src="https://detta.com.ua/upload/iblock/689/000000005.jpg" />
      </div>
      <a href="#">{name}</a>
    </div>
  );
};

export default CatalogueCategoriesItem;
