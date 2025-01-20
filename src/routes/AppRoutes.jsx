import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Cart from '../pages/Cart/Cart';
import Product from '../pages/Products/Product';
import SignIn from '../pages/Auth/SignIn'; // If you have authentication page
import Header from '../components/layout/Header'; // Optional: Add header for all pages
import Footer from '../components/layout/Footer'; // Optional: Add footer for all pages

const AppRoutes = () => {
  return (
    <Router>
      <Header /> {/* Optional: Header will appear in all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
      <Footer /> {/* Optional: Footer will appear in all pages */}
    </Router>
  );
};

export default AppRoutes;
