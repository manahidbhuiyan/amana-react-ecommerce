import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import notFoundImage from "../../assets/images/products/no-image.jpg";
import { loadProductData } from "../../features/products/productSlice";
import { addToCart, addToLocalCart, updateCartQuantity, updateLocalCartQuantity, removeFromCart, removeFromLocalCart } from "../../features/cart/cartSlice";
import ProductLoadCard from "../common/ProductLoadCard";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../utilis/api";
import { toast } from "react-toastify";

import { Plus, Minus } from "lucide-react";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const NewProducts = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { newProducts } = useSelector((state) => state.products);
  const { CartInformation, isLoading } = useSelector((state) => state.cart);

  // Move useMemo to component level - Create cart lookup map
  const cartItemsMap = useMemo(() => {
    const map = new Map();
    CartInformation.forEach((item) => {
      const productId = localStorage.userToken ? item.product?._id : item._id;
      if (productId) {
        map.set(productId, item);
      }
    });
    return map;
  }, [CartInformation]);

  // Helper function to check if product is in cart
  const checkProductToCart = (product) => {
    return cartItemsMap.get(product._id) || null;
  };

  useEffect(() => {
    let queryString = {
      newProduct: true,
    };
    let branchId = localStorage.branchId;

    dispatch(loadProductData({ pageNo: 1, branchId, queryString, queryType: "newProduct" }));
  }, [dispatch]);

  useEffect(() => {
    if (newProducts && newProducts.count > 0) {
      setSlides(newProducts);
      setLoading(false);

      let random_Start = Math.floor(Math.random() * 7);
      let end_count = random_Start + 7;
      let new_random_number = newProducts.data.length <= 7 ? 0 : newProducts.data.length - 7;
      let new_end_count = newProducts.data.length;

      let slicedOffers = {};
      slicedOffers.count = newProducts.count;
      slicedOffers.data = end_count > new_end_count ? newProducts.data.slice(new_random_number, new_end_count) : newProducts.data.slice(random_Start, end_count);
      setSlides(slicedOffers);
    }
  }, [newProducts]);

  const moveToProductDetails = (product) => {
    navigate(`/product/${product.category.name}/${product.subcategory.name}/${product.slug}/${product.barcode}`);
  };

  const goProductList = () => {
    const newProductCondition = true;
    navigate(`/products/list/search/?newProduct=${encodeURIComponent(newProductCondition)}`);
  };

  const add_to_cart = (product) => {
    let code = product._id;
    let branchId = localStorage.branchId;

    if (localStorage.userToken) {
      dispatch(addToCart({ code, branchId }));
    } else {
      dispatch(addToLocalCart(product));
    }
  };

  // Quantity increase function
  const cartQuantityPlus = (product) => {
    const cartItem = checkProductToCart(product);

    if (cartItem && cartItem.quantity < cartItem.maxQuantity) {
      const newQuantity = cartItem.quantity + 1;

      if (localStorage.userToken) {
        dispatch(
          updateCartQuantity({
            productId: cartItem._id,
            quantity: newQuantity,
          })
        );
      } else {
        dispatch(
          updateLocalCartQuantity({
            productId: cartItem._id,
            quantity: newQuantity,
          })
        );
      }
    } else {
      toast.warning(
        <div>
          We are very sorry! We currently do not have the quantity of <strong>'{cartItem.name}'</strong> in stock that you require.
        </div>,
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  // Quantity decrease function
  const cartQuantityMinus = (product) => {
    const cartItem = checkProductToCart(product);
    if (cartItem && cartItem.quantity > 1) {
      const newQuantity = cartItem.quantity - 1;

      if (localStorage.userToken) {
        dispatch(
          updateCartQuantity({
            productId: cartItem._id,
            quantity: newQuantity,
          })
        );
      } else {
        dispatch(
          updateLocalCartQuantity({
            productId: cartItem._id,
            quantity: newQuantity,
          })
        );
      }
    } else if(cartItem && cartItem.quantity == 1)  {
      removeProduct(cartItem)
    }
  };

   const removeProduct = (item) => {
      const productId = item._id;
      if (localStorage.userToken) {
        dispatch(removeFromCart({productId}));
      } else {
        dispatch(removeFromLocalCart(productId));
      }
    };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="home-new-products">
        <div className="sec-header flex items-center justify-between mb-4">
          <h2 className="text-font-14 sm:text-font-16 md:text-font-26 lg:text-font-32 text-themeColor capitalize font-bold mb-1">New Products</h2>
          <div className="flex space-x-2">
            <button className="prev-new-product carousel-nav bg-gray-300 text-themeColor w-8 h-8 flex items-center justify-center rounded-full hover:bg-themeColor hover:text-white">
              <i className="fas fa-angle-left"></i>
            </button>
            <button className="next-new-product carousel-nav bg-gray-300 text-themeColor w-8 h-8 flex items-center justify-center rounded-full hover:bg-themeColor hover:text-white">
              <i className="fas fa-angle-right"></i>
            </button>
          </div>
        </div>

        <Swiper
          lazy={{
            loadPrevNext: true,
            loadPrevNextAmount: 1,
          }}
          slidesPerView={7}
          spaceBetween={20}
          loop={false}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".next-new-product",
            prevEl: ".prev-new-product",
          }}
          autoplay={{
            delay: 30000,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay]}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            480: { slidesPerView: 2, spaceBetween: 10 },
            640: { slidesPerView: 3, spaceBetween: 15 },
            768: { slidesPerView: 4, spaceBetween: 15 },
            1024: { slidesPerView: 5, spaceBetween: 20 },
            1500: { slidesPerView: 6, spaceBetween: 20 },
          }}
          className="mySwiper bg-sectionBackgroundLight"
        >
          {slides.count > 0 &&
            slides.data.map((product, index) => {
              return (
                <SwiperSlide key={product._id || index}>
                  <div className="card product-card bg-white shadow-lg rounded-lg overflow-hidden h-[420px]">
                    <div className="relative">
                      {product.discount > 0 && (
                        <div className="absolute top-0 right-0 w-[70px] h-[70px] p-[15px] pt-[15px] bg-[url('../../assets/images/offer.png')] bg-no-repeat bg-cover bg-center text-white text-center text-[15px] font-bold z-5">
                          {Number(product.discount.toFixed(2)) + " tk."} <br />
                          Off
                        </div>
                      )}

                      <img src={product.images && product.images[0] ? getImageUrl(product.images[0]) : notFoundImage} alt="Product Image swiper-lazy" className="w-full h-48 object-cover" />
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

                      {/* Stock check */}
                      {product.quantity > 0 ? (
                        <div className="actions mt-4">
                          {/* Direct check - no extra function call */}
                          {!cartItemsMap.get(product._id) ? (
                            <button
                              onClick={() => add_to_cart(product)}
                              disabled={isLoading}
                              className="w-full bg-themeColor text-white text-sm font-medium py-2 rounded hover:bg-[#41b899] disabled:opacity-50"
                            >
                              <i className="fas fa-shopping-basket"></i>
                              {isLoading ? " Adding..." : " Add To Cart"}
                            </button>
                          ) : (
                            // Quantity Controls
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => cartQuantityMinus(product)}
                                className="w-1/5 p-3 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
                                // disabled={cartItemsMap.get(product._id)?.quantity <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-3/5 px-4 py-2 border-x border-gray-300 font-medium text-center cursor-pointer">{cartItemsMap.get(product._id)?.quantity || 0}</span>
                              <button
                                onClick={() => cartQuantityPlus(product)}
                                className="w-1/5 p-3 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
                                // disabled={cartItemsMap.get(product._id)?.quantity >= cartItemsMap.get(product._id)?.maxQuantity}
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        // Out of Stock
                        <div className="mt-4 text-center">
                          <span className="text-red-500 font-bold">Out of Stock</span>
                        </div>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}

          <SwiperSlide key="load-more-card" onClick={() => goProductList()}>
            <ProductLoadCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default NewProducts;
