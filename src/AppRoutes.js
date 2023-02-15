import React from "react";
import { Route, Routes } from "react-router-dom";
// import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
import Layout from "./Layout";
import CatalogueCategories from "./components/CatalogueCategories/CatalogueCategories";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CatalogueCategories />} />
        <Route path={":id/form"} element={<Form />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
