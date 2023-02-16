import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <header>header</header>
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </>
  );
};

export default AppLayout;
