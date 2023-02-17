import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BurgerMenuItems from "./BurgerMenu/BurgerMenu";
import "./Header.css";
import BurgerMenu from "./images/BurgerMenu";
import CloseMenu from "./images/CloseMenu";

const Header = () => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state) => state.catalogue.catalogueCategories
  );

  return (
    <div>
      <BurgerMenuItems />
    </div>
  );
};

export default Header;
