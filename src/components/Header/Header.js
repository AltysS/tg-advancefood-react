import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BurgerMenuItems from "./BurgerMenu/BurgerMenu";
import "./Header.css";
import BurgerMenu from "./images/BurgerMenu";
import CloseMenu from "./images/CloseMenu";
import Logo from "./images/Logo";

const Header = () => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state) => state.catalogue.catalogueCategories[0]
  );
  const isMenuOpen = useSelector((state) => state.catalogue.isMenuOpen);
  console.log(categories);
  return (
    <header>
      <BurgerMenuItems />
      <div className="menuList">
        {isMenuOpen &&
          categories.map((el) => {
            return (
              <div
              // onClick={() => {
              //   dispatch(incrementCategoryLevel(id));
              //   navigate(`${id}`);
              // }}
              >
                <a href="#">{el.name}</a>
              </div>
            );
          })}
      </div>
    </header>
  );
};

export default Header;
