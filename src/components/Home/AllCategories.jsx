import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadCategoryData } from "../../features/categories/categoriesSlice";
import "./AllCategories.css";
import { getImageUrl } from "../../utilis/api";


const AllCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { CategoriesData, isLoading, isError } = useSelector((state) => state.categories);
  const topCategories = CategoriesData;

  // Fetch categories on component mount
  useEffect(() => {
    let branchId = localStorage.branchId;
    dispatch(loadCategoryData({ branchId }));
  }, [dispatch]);

  // Handle navigation to products page
  const redirectToProducts = (categoryName) => {
    const encodedCategory = encodeURIComponent(categoryName);
    navigate(`/products/list/search/?category=${encodedCategory}`);
  };

  return (
    <div className="py-10">
      <h2 className="text-font-14 sm:text-font-16 md:text-font-26 lg:text-font-32 text-themeColor capitalize font-bold text-center mb-5">All Categories</h2>

      {/* Error State */}
      {isError && !isLoading && (
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <p className="text-gray-500 text-lg font-medium">No categories available</p>
            <p className="text-gray-400 text-sm">Check back later for updates</p>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      {!isLoading && !isError && (
        <div className="category-grid grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {topCategories.map((categoryData, index) => (
            <div key={index} className="col-span-1 sm:col-span-1 md:col-span-1 xl:col-span-1 px-1 mb-2" onClick={() => redirectToProducts(categoryData.category.slug)}>
              <div className="bg-white rounded-lg shadow cursor-pointer">
                <img src={getImageUrl(categoryData.category.cover)} alt="top category name" className="w-full h-auto object-cover" />
                <div className="p-2 flex justify-between">
                  <div className="capitalize text-[17px] font-bold text-black">{categoryData.category.name.slice(0, 20)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCategories;
