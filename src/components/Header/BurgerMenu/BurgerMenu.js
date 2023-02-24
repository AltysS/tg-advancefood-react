import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseMenu from "../images/CloseMenu";
import {
  setIsMenuOpen,
  toggleIsMenuOpen,
} from "../../../store/catalogue/catalogueSlice";
import BurgerMenu from "../images/BurgerMenu";

const BurgerMenuItems = () => {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state) => state.catalogue.isMenuOpen);
  const isLoading = useSelector((state) => state.catalogue.isLoading);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() => !isLoading && dispatch(toggleIsMenuOpen())}
    >
      {isMenuOpen ? <CloseMenu /> : <BurgerMenu />}
    </div>
  );
};

export default BurgerMenuItems;
