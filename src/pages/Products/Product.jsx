import React, { useState, useEffect, useRef, useCallback } from "react";
import notFoundImage from "../../assets/images/products/no-image.jpg";
import { useSelector, useDispatch } from "react-redux";
import redRibbon from "../../assets/images/red-ribbon.png";
import { useLocation, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetProductsQuery } from "../../features/products/productApi";
import { getImageUrl } from "../../utilis/api";

const Product = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const page = useRef(1);
  const [hasMore, setHasMore] = useState(true);
  const [allProducts, setAllProducts] = useState([]);

  const queryParams = Object.fromEntries(new URLSearchParams(search));
  
  // Move the hook call to the top level
  const {
    data: productsData,
    isLoading,
    error,
    refetch
  } = useGetProductsQuery({
    pageNo: page.current,
    branchID: localStorage.getItem("branchId") || "",
    queryString: queryParams,
  });

  // Handle the API response
  useEffect(() => {
    if (productsData && productsData.data) {
      console.log("productsData after",productsData.data)

      const newProducts = productsData.data?.filter((product) => {
        const hasStock = product.quantity >= 1

        const hasImage = product.images && Array.isArray(product.images) && product.images.length > 0 && product.images[0]

        // const isAvailable = product.online_active == true

        return hasStock && hasImage 
      }) || [];

      console.log("newProducts after",newProducts)
     
      
      if (page.current === 1) {
        // First page - replace all products
        setAllProducts(newProducts);
      } else {
        // Subsequent pages - append new products
        setAllProducts(prev => [...prev, ...newProducts]);
      }
      
      // Check if there are more products to load
      if (newProducts.length === 0) {
        setHasMore(false);
      }
    }
  }, [productsData]);

  // Reset when search changes
  useEffect(() => {
    setHasMore(true);
    page.current = 1;
    setAllProducts([]);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [search]);

  // Infinite scroll handler
  const infinateHandler = useCallback(() => {
    if (!isLoading && hasMore) {
      page.current++;
      refetch(); // Trigger a new query with updated page number
    }
  }, [isLoading, hasMore, refetch]);

  const moveToProductDetails = (product) => {
    navigate(`/product/${product.category.name}/${product.subcategory.name}/${product.slug}/${product.barcode}`);
  };

  // Use allProducts for rendering instead of products from Redux
  const displayProducts = allProducts.length > 0 ? allProducts : [];

  console.log("displayProducts",displayProducts)

  return (
    <div className="mx-auto px-4 py-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-7">
        {displayProducts.map((product, index) => {
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

                <img src={product.images && product.images[0] ? getImageUrl(product.images[0]) : notFoundImage} alt="Product Image" className="w-full h-48 object-cover" />
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
                    {product.unitType && product.unitType.shortform === "pc" ? "Piece" : "KG"}
                  </span>
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
                    <div className="price text-themeColor text-lg font-bold leading-normal">
                      Tk. {(product.price.sell - product.discount).toFixed(2)}
                    </div>
                    <del className="text-gray-400 text-sm leading-normal">
                      Tk. {product.price.sell.toFixed(2)}
                    </del>
                  </div>
                ) : (
                  <div className="flex justify-start gap-2 items-center pt-2">
                    <div className="price text-themeColor text-lg font-bold leading-normal">
                      Tk. {product.price.sell.toFixed(2)}
                    </div>
                  </div>
                )}

                <button className="w-full bg-themeColor text-white text-sm font-medium py-2 mt-4 rounded hover:bg-[#41b899]">
                  <i className="fas fa-shopping-basket"></i> Add To Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <InfiniteScroll
        dataLength={displayProducts.length}
        next={infinateHandler}
        hasMore={hasMore}
        loader={<div className="text-center py-4">Loading more products...</div>}
        endMessage={
          <p className="text-center pt-5 lg:pt-10">
            <b>No more product found!</b>
          </p>
        }
      />
    </div>
  );
};

export default Product;