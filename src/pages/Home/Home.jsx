import React, { useEffect, useState, useRef } from "react";
import Hero from "../../components/Home/Hero";
import NewProducts from "../../components/Home/NewProducts";
import SpecialOffers from "../../components/Home/SpecialOffers";
import Location from "../../components/layout/Navbar/Location/Location";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const locationRef  = useRef(null);
  const localSelectArea = localStorage.getItem("selectedArea");

  useEffect(() => {
    if (!localSelectArea) {
      toast.warning("You need to select an area first", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      if (locationRef.current) {
        setTimeout(() => {
          locationRef.current.openDialog();
        }, 300);
      }
    }
  }, [localSelectArea]);

  return (
    <div className="mt-10 px-4">
      <ToastContainer />
      {localSelectArea ? (
        <>
          <Hero />
          <SpecialOffers />
          <NewProducts />
        </>
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Location ref={locationRef} />
        </div>
      )}
    </div>
  );
};

export default Home;