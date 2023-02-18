import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseMenu from "../images/CloseMenu";
import { toggleIsMenuOpen } from "../../../store/catalogue/catalogueSlice";
import BurgerMenu from "../images/BurgerMenu";

const BurgerMenuItems = () => {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state) => state.catalogue.isMenuOpen);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() => dispatch(toggleIsMenuOpen())}
    >
      {isMenuOpen ? <CloseMenu /> : <BurgerMenu />}
    </div>
  );
};

export default BurgerMenuItems;
