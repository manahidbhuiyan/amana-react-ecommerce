// src/pages/Home/Home.jsx
import React, { useEffect } from "react";
import Hero from "../../components/Home/Hero";
import NewProducts from "../../components/Home/NewProducts";
import SpecialOffers from "../../components/Home/SpecialOffers";
import Catrgories from "../../components/Home/AllCategories";
import Testimonial from "../../components/Home/Testimonial";

const Home = () => {
 

  return (
    <>
      <Hero />
      <SpecialOffers />
      <NewProducts />
      <Catrgories />
      <Testimonial />
    </>
  );
};

export default Home;
