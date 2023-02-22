import React from "react";
import { Route, Routes } from "react-router-dom";
// import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
import AppLayout from "./Layout";
import HomePage from "./components/HomePage/HomePage";
import RootCatalogue from "./components/RootCatalogue/RootCatalogue";
import ProductList from "./components/ProductList/ProductList";
import Cart from "./components/Cart/Cart";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="catalogue/" element={<RootCatalogue />} />
        <Route path="catalogue/:id/" element={<RootCatalogue />} />
        <Route path="catalogue/:id/:childID" element={<RootCatalogue />} />
        <Route
          path="products/:category/:subcategory"
          element={<ProductList />}
        />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
