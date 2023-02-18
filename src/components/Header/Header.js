import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryID,
  setCategoryLevel,
  toggleIsMenuOpen,
} from "../../store/catalogue/catalogueSlice";
import { useNavigate } from "react-router-dom";
import BurgerMenuItems from "./BurgerMenu/BurgerMenu";
import "./Header.css";
import BurgerMenu from "./images/BurgerMenu";
import CloseMenu from "./images/CloseMenu";
import Logo from "./images/Logo";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(
    (state) => state.catalogue.catalogueCategories[0]
  );
  const isMenuOpen = useSelector((state) => state.catalogue.isMenuOpen);
  return (
    <header>
      <BurgerMenuItems />
      {isMenuOpen && (
        <div className="menuList">
          {categories.map((el) => {
            return (
              <div
                onClick={() => {
                  dispatch(setCategoryLevel(1));
                  dispatch(setCategoryID(el.id));
                  dispatch(toggleIsMenuOpen());
                  navigate(`/catalogue/${el.id}`);
                }}
              >
                <a className="menuItem" href="#">
                  {el.name}
                </a>
              </div>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Header;
