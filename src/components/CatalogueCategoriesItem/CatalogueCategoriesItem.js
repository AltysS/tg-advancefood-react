import React from "react";
import "./CatalogueCategoriesItem.css";

const CatalogueCategoriesItem = ({ name }) => {
  return (
    <div className="categoryContainer">
      <div>
        <img src="https://detta.com.ua/upload/iblock/689/000000005.jpg" />
      </div>
      <a href="#">{name}</a>
    </div>
  );
};

export default CatalogueCategoriesItem;
