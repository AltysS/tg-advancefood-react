import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryID,
  setCategoryLevel,
  setIsMenuOpen,
  toggleIsMenuOpen,
} from "../../store/catalogue/catalogueSlice";
import { useLocation, useNavigate } from "react-router-dom";
import BurgerMenuItems from "./BurgerMenu/BurgerMenu";
import "./Header.css";
import CartImage from "./images/CartImage";

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
      {isMenuOpen
        ? document.body.classList.add("toggleScroll")
        : document.body.classList.remove("toggleScroll")}
      {isMenuOpen && (
        <div
          onClick={(e) => {
            if (e.target.closest("div").className === "menuContainer") {
              dispatch(setIsMenuOpen());
            }
          }}
          className="menuContainer"
        >
          <div className="menuList">
            {categories.map((el) => {
              return (
                <div
                  onClick={() => {
                    dispatch(setCategoryLevel(1));
                    dispatch(setCategoryID(el.id));
                    dispatch(toggleIsMenuOpen());
                    navigate(`${el.id}`, { replace: true });
                  }}
                >
                  <p className="menuItem">{el.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div
        onClick={() => navigate("/cart")}
        style={{ width: "20px", height: "20px" }}
      >
        <CartImage />
      </div>
    </header>
  );
};

export default Header;
