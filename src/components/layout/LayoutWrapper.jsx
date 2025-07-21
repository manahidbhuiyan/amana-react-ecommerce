// src/components/layout/LayoutWrapper.jsx
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setActiveCategory, setActiveSubCategory } from "../../features/slice/sidebarSlice";
import { loadLocalCartProducts } from "../../features/cart/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Location from "./Navbar/Location/Location";
import Sidebar from "./Sidebar";
import CartDetails from "../../pages/Cart/CartDetails";

const LayoutWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const locationRef = useRef(null);
  const localSelectArea = localStorage.getItem("selectedArea");

  // Get sidebar state from Redux
  const { isOpen: sidebarOpen, activeCategory, activeSubCategory } = useSelector((state) => state.sidebar);

  // Import configuration
  // import { shouldShowSidebar as checkSidebar } from "../../config/sidebarConfig";

  // Define pages where sidebar should be excluded
  const excludedPages = ["/checkout", "/order", "/payment", "/login", "/register"];
  const shouldShowSidebar = !excludedPages.includes(location.pathname);

  // Alternative: Use configuration file
  // const shouldShowSidebar = checkSidebar(location.pathname);

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

  useEffect(() => {
    dispatch(loadLocalCartProducts());
  }, [dispatch]);

  return (
    <div className="bg-sectionBackgroundLight relative">
      <ToastContainer />
      {localSelectArea ? (
        <div className="relative">
          {/* Fixed Sidebar - Only show when sidebarOpen is true and page allows sidebar */}
          {sidebarOpen && shouldShowSidebar && (
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

          {/* Main Content - Adjust margin based on sidebar state and page type */}
          <div className={`transition-all duration-300 ${sidebarOpen && shouldShowSidebar ? "ml-[20%]" : "ml-0"}`}>
            {/* Show selected category/subcategory info for testing (only on pages with sidebar) */}
            {/* {shouldShowSidebar && (activeCategory || activeSubCategory) && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 m-4">
                <h3 className="text-lg font-semibold text-green-800">
                  {activeCategory && `Category: ${activeCategory}`}
                  {activeSubCategory && ` > Subcategory: ${activeSubCategory}`}
                </h3>
                <p className="text-green-600 text-sm mt-1">
                  Products will be filtered based on this selection
                </p>
              </div>
            )} */}

            {/* Render children components */}
            {children}
            {/* <CartDetails /> */}
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

export default LayoutWrapper;
