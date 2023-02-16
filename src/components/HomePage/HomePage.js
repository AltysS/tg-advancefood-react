import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../Button/Button";

const HomePage = () => {
  const navigate = useNavigate();
  return <NavLink to={"/catalogue"}>Open Catalogue</NavLink>;
};

export default HomePage;
