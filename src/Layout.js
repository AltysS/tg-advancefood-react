import React from "react";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <footer>Footer</footer>
    </>
  );
};

export default Layout;
