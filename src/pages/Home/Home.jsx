import React, { useEffect, useState, useRef } from "react";
import Hero from "../../components/Home/Hero";
import NewProducts from "../../components/Home/NewProducts";
import SpecialOffers from "../../components/Home/SpecialOffers";
import Catrgories from "../../components/Home/AllCategories";
import Testimonial from "../../components/Home/Testimonial";
import Location from "../../components/layout/Navbar/Location/Location";
import Sidebar from "../../components/layout/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { setActiveCategory, setActiveSubCategory } from "../../features/slice/sidebarSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const dispatch = useDispatch();
  const locationRef = useRef(null);
  const localSelectArea = localStorage.getItem("selectedArea");
  
  // Get sidebar state from Redux
  const { isOpen: sidebarOpen, activeCategory, activeSubCategory } = useSelector((state) => state.sidebar);

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

  // Redux action handlers
  const handleCategorySelect = (categoryId) => {
    dispatch(setActiveCategory(categoryId));
  };

  const handleSubCategorySelect = (subCategory) => {
    dispatch(setActiveSubCategory(subCategory));
  };

  return (
    <div className="bg-sectionBackgroundLight relative">
      <ToastContainer />
      {localSelectArea ? (
        <div className="relative">
          {/* Fixed Sidebar - Only show when sidebarOpen is true */}
          {sidebarOpen && (
            <div className="fixed left-0 top-[170px] w-1/5 bg-white shadow-lg h-[calc(100vh-170px)] overflow-y-auto border-r border-gray-200 z-10">
              <div className="p-4">
                <Sidebar 
                  isOpen={sidebarOpen}
                  activeCategory={activeCategory}
                  activeSubCategory={activeSubCategory}
                  onCategorySelect={handleCategorySelect}
                  onSubCategorySelect={handleSubCategorySelect}
                />
              </div>
            </div>
          )}
          
          {/* Main Content - Adjust margin based on sidebar state */}
          <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-[20%]' : 'ml-0'}`}>
            {/* Show selected category/subcategory info for testing */}
            {(activeCategory || activeSubCategory) && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 m-4">
                <h3 className="text-lg font-semibold text-green-800">
                  {activeCategory && `Category: ${activeCategory}`}
                  {activeSubCategory && ` > Subcategory: ${activeSubCategory}`}
                </h3>
                <p className="text-green-600 text-sm mt-1">
                  Products will be filtered based on this selection
                </p>
              </div>
            )}
            
            <Hero />
            <SpecialOffers />
            <NewProducts />
            <Catrgories />
            <Testimonial />
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Location ref={locationRef} />
        </div>
      )}
    </div>
  );
};

export default Home;