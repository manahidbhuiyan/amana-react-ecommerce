import React, { useState, useEffect } from "react";
import notFoundImage from "../../assets/images/products/no-image.jpg";
import { useSelector, useDispatch } from "react-redux";
import redRibbon from "../../assets/images/red-ribbon.png";
import { loadProductData } from "../../features/products/productSlice";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const queryParams = Object.fromEntries(new URLSearchParams(search));

  useEffect(() => {
    let queryString = queryParams;
    let branchId = localStorage.branchId;
    console.log("queryString",queryString)

    dispatch(loadProductData({ pageNo: 1, branchId, queryString }));
  }, [dispatch]);

  const { productList, isLoading, isError } = useSelector((state) => state.products);
  // Safe check করুন
  const products = productList?.data || productList || [];
  console.log("productList", productList);
  console.log("products", products);

  const moveToProductDetails = (product) => {
    navigate(`/product/${product.category.name}/${product.subcategory.name}/${product.slug}/${product.barcode}`);
  };

  return (
    <div className="container mx-auto px-2 py-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-7">
        {products.length > 0 ? (
          products.map((product, index) => {
            return (
              <div key={product._id || index} className={`card product-card bg-white shadow-lg rounded-lg overflow-hidden h-[400px]`}>
                <div className="relative">
                  {product.discount > 0 && (
                    <div
                      className="absolute top-0 right-0 w-[150px] h-[35px] bg-no-repeat bg-cover text-white text-font-17 font-bold flex items-center justify-end pr-6 pt-1"
                      style={{ backgroundImage: `url(${redRibbon})` }}
                    >
                      {product.discount.toFixed(0)} tk Off
                    </div>
                  )}

                  <img src={notFoundImage} alt="Product Image" className="w-full h-48 object-cover" />
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">{product.unitType && product.unitType.shortform === "pc" ? "Piece" : "KG"}</span>
                  </div>

                  <h3
                    onClick={() => moveToProductDetails(product)}
                    className="card-title text-textColor hover:text-themeColor text-base font-bold mt-2 min-h-[48px] line-clamp-2 leading-6 cursor-pointer"
                  >
                    {product.name
                      .split(" ")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </h3>

                  {product.discount > 0 ? (
                    <div className="flex justify-start gap-3 items-center pt-2">
                      <div className="price text-themeColor text-lg font-bold leading-normal">Tk. {(product.price.sell - product.discount).toFixed(2)}</div>
                      <del className="text-gray-400 text-sm leading-normal">Tk. {product.price.sell.toFixed(2)}</del>
                    </div>
                  ) : (
                    <div className="flex justify-start gap-2 items-center pt-2">
                      <div className="price text-themeColor text-lg font-bold leading-normal">Tk. {product.price.sell.toFixed(2)}</div>
                    </div>
                  )}

                  <button className="w-full bg-themeColor text-white text-sm font-medium py-2 mt-4 rounded hover:bg-[#41b899]">
                    <i className="fas fa-shopping-basket"></i> Add To Cart
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-lg text-gray-500">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
