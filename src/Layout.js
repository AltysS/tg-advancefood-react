import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";

const AppLayout = () => {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "50px" }}>
        <Outlet />
      </main>
      <footer>footer</footer>
    </>
  );
};

export default AppLayout;
