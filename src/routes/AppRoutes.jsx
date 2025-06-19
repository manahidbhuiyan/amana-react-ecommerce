import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Cart from '../pages/Cart/Cart';
import Products from '../pages/Products/Product';
import SignIn from '../pages/Auth/SignIn';
import ProductDetails from '../pages/Products/ProductDetails';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products/list/search/" element={<Products />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/product/:category/:subcategory/:slug/:barcode" element={<ProductDetails />} />
    </Routes>
  );
};

export default AppRoutes;
