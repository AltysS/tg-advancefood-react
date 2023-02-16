import React from "react";
import { Route, Routes } from "react-router-dom";
// import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
import Layout from "./Layout";
import HomePage from "./components/HomePage/HomePage";
import RootCatalogue from "./components/RootCatalogue/RootCatalogue";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/catalogue" element={<RootCatalogue />} />
        {/* <Route path="/tour/:itemNo" element={<TourPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/contacts" element= {<ContactUsPage />} />
      <Route path="*" element={<ErrorPage />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
