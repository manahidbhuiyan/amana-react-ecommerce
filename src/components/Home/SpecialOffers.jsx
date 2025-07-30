import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import notFoundImage from "../../assets/images/products/no-image.jpg";
import redRibbon from "../../assets/images/red-ribbon.png";
import ProductLoadCard from "../common/ProductLoadCard";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../utilis/api";
import { addToLocalCart, updateLocalCartQuantity, removeFromLocalCart } from "../../features/cart/cartSlice";
import { useAddToCartMutation, useUpdateCartQuantityMutation, useRemoveFromCartMutation } from "../../features/cart/cartApi.js";
import { useGetProductsQuery } from "../../features/products/productApi";
import { setSpecialOffers } from "../../features/products/productSlice";
import { toast } from "react-toastify";
import { Plus, Minus } from "lucide-react";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SpecialOffers = () => {
  const [slides, setSlides] = useState({ data: [], count: 0 });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { specialOffers } = useSelector((state) => state.products);
  const { CartInformation } = useSelector((state) => state.cart);

  // RTK Query mutations
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
  const [updateCartQuantity, { isLoading: isUpdatingQuantity }] = useUpdateCartQuantityMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  // ✅ Regular Hook - Component load এর সাথে সাথেই API call হবে
  const {
    data: productsData,
    isLoading,
    error
  } = useGetProductsQuery({
    pageNo: 1,
    branchID: localStorage.getItem("branchId") || "",
    queryString: {
      specialOffer: true,
    },
  });

  // Cart lookup map
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

  // useEffect(() => {
  //   let queryString = {
  //     specialOffer: true,
  //   };
  //   let branchId = localStorage.branchId;

  //   dispatch(loadProductData({ pageNo: 1, branchId, queryString, queryType: "specialOffer" }));
  // }, [dispatch]);

  // ✅ API response handle
  useEffect(() => {
    if (productsData) {

      // Server response যেকোনো format এ আসুক, handle করুন
      let products = [];

      if (productsData.data && Array.isArray(productsData.data)) {
        // Format: { data: [...], count: 10 }
        products = productsData.data;
      } else if (Array.isArray(productsData)) {
        // Format: [...]
        products = productsData;
      }

      if (products.length > 0) {
        dispatch(setSpecialOffers(products));
      }
    }
  }, [productsData, dispatch]);

  useEffect(() => {
    if (specialOffers && Array.isArray(specialOffers) && specialOffers.length > 0) {
      // setSlides(specialOffers);
      // setLoading(false);

      // let random_Start = Math.floor(Math.random() * 7);
      // let end_count = random_Start + 7;
      // let new_random_number = specialOffers.data.length <= 7 ? 0 : specialOffers.data.length - 7;
      // let new_end_count = specialOffers.data.length;

      // let slicedOffers = {};
      // slicedOffers.count = specialOffers.count;
      // slicedOffers.data = end_count > new_end_count ? specialOffers.data.slice(new_random_number, new_end_count) : specialOffers.data.slice(random_Start, end_count);
      // setSlides(slicedOffers);

      const totalProducts = specialOffers.length;
      const maxSlides = Math.min(totalProducts, 7);

      let random_Start = totalProducts <= 7 ? 0 : Math.floor(Math.random() * (totalProducts - 7));
      let selectedProducts = specialOffers.slice(random_Start, random_Start + maxSlides);

      const slidesData = {
        count: totalProducts,
        data: selectedProducts,
      };

      setSlides(slidesData);
    } else {
      setSlides({ data: [], count: 0 });
    }
  }, [specialOffers]);

  // ✅ Error handling
  useEffect(() => {
    if (error) {
      toast.error("Failed to load special products");
    }
  }, [error]);

  const moveToProductDetails = (product) => {
    navigate(`/product/${product.category.name}/${product.subcategory.name}/${product.slug}/${product.barcode}`);
  };

  const goProductList = () => {
    const specialOfferCondition = true;
    navigate(`/products/list/search/?specialOffer=${encodeURIComponent(specialOfferCondition)}`);
  };

  const add_to_cart = (product) => {
    let code = product._id;
    let branchId = localStorage.getItem("branchId");

    if (localStorage.getItem("userToken")) {
      addToCart({ code, branchId });
    } else {
      dispatch(addToLocalCart(product));
    }
  };

  const cartQuantityPlus = (product) => {
    const cartItem = checkProductToCart(product);

    if (cartItem && cartItem.quantity < cartItem.maxQuantity) {
      const newQuantity = cartItem.quantity + 1;

      if (localStorage.getItem("userToken")) {
        updateCartQuantity({
          productId: cartItem._id,
          quantity: newQuantity,
          branchId: localStorage.getItem("branchId"),
        });
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
          We are very sorry! We currently do not have the quantity of <strong>'{cartItem?.name || product.name}'</strong> in stock that you require.
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

  const cartQuantityMinus = (product) => {
    const cartItem = checkProductToCart(product);
    if (cartItem && cartItem.quantity > 1) {
      const newQuantity = cartItem.quantity - 1;

      if (localStorage.getItem("userToken")) {
        updateCartQuantity({
          productId: cartItem._id,
          quantity: newQuantity,
          branchId: localStorage.getItem("branchId"),
        });
      } else {
        dispatch(
          updateLocalCartQuantity({
            productId: cartItem._id,
            quantity: newQuantity,
          })
        );
      }
    } else if (cartItem && cartItem.quantity === 1) {
      removeProduct(cartItem);
    }
  };

  const removeProduct = (item) => {
    const productId = item._id;
    if (localStorage.getItem("userToken")) {
      removeFromCart({
        productId,
        branchId: localStorage.getItem("branchId"),
      });
    } else {
      dispatch(removeFromLocalCart(productId));
    }
  };

  if (isLoading) {
    return (
      <div className="py-10">
        <div className="home-new-products">
          <div className="sec-header flex items-center justify-between mb-4">
            <h2 className="text-font-14 sm:text-font-16 md:text-font-26 lg:text-font-32 text-themeColor capitalize font-bold mb-1">Special Offers</h2>
          </div>
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-3">Loading special offers...</span>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Error state
  // if (error) {
  //   return (
  //     <div className="py-10">
  //       <div className="home-new-products">
  //         <div className="sec-header flex items-center justify-between mb-4">
  //           <h2 className="text-font-14 sm:text-font-16 md:text-font-26 lg:text-font-32 text-themeColor capitalize font-bold mb-1">Special Offers</h2>
  //         </div>
  //         <div className="flex flex-col justify-center items-center h-40">
  //           <div className="text-red-500 mb-2">Failed to load special offers</div>
  //           <button onClick={() => refetch()} className="px-4 py-2 bg-themeColor text-white rounded hover:bg-[#41b899]">
  //             Retry
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // ✅ No data state
  // if (!slides.count || slides.count === 0) {
  //   return (
  //     <div className="py-10">
  //       <div className="home-new-products">
  //         <div className="sec-header flex items-center justify-between mb-4">
  //           <h2 className="text-font-14 sm:text-font-16 md:text-font-26 lg:text-font-32 text-themeColor capitalize font-bold mb-1">Special Offers</h2>
  //         </div>
  //         <div className="flex justify-center items-center h-40">
  //           <div className="text-gray-500">No special offers available</div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="py-10">
      <div className="home-new-products">
        <div className="sec-header flex items-center justify-between mb-4">
          <h2 className="text-font-14 sm:text-font-16 md:text-font-26 lg:text-font-32 text-themeColor capitalize font-bold mb-1 ">Special Products</h2>
          <div className="flex space-x-2">
            <button className="prev-special-offer carousel-nav bg-gray-300 text-themeColor w-8 h-8 flex items-center justify-center rounded-full hover:bg-themeColor hover:text-white">
              <i className="fas fa-angle-left"></i>
            </button>
            <button className="next-special-offer carousel-nav bg-gray-300 text-themeColor w-8 h-8 flex items-center justify-center rounded-full hover:bg-themeColor hover:text-white">
              <i className="fas fa-angle-right"></i>
            </button>
          </div>
        </div>

        {/* Replace grid with Swiper */}
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
            nextEl: ".next-special-offer",
            prevEl: ".prev-special-offer",
          }}
          autoplay={{
            delay: 3000,
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
            slides.data.map((product, index) => (
              <SwiperSlide key={product._id || index}>
                <div className={`card product-card bg-white shadow-lg rounded-lg overflow-hidden h-[400px]`}>
                  <div className="relative">
                    {product.discount > 0 && (
                      <div
                        className="absolute top-0 right-0 w-[150px] h-[35px] bg-no-repeat bg-cover text-white text-font-17 font-bold flex items-center justify-end pr-6 pt-1"
                        style={{ backgroundImage: `url(${redRibbon})` }}
                      >
                        {product.discount.toFixed(0)} tk Off
                      </div>
                    )}

                    <img
                      src={product.images && product.images[0] ? getImageUrl(product.images[0]) : notFoundImage}
                      // src={notFoundImage}
                      alt="Product Image swiper-lazy"
                      className="w-full h-48 object-cover"
                    />
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
                        {!cartItemsMap.get(product._id) ? (
                          <button
                            onClick={() => add_to_cart(product)}
                            disabled={isAddingToCart}
                            className="w-full bg-themeColor text-white text-sm font-medium py-2 rounded hover:bg-[#41b899] disabled:opacity-50"
                          >
                            <i className="fas fa-shopping-basket"></i>
                            {isAddingToCart ? " Adding..." : " Add To Cart"}
                          </button>
                        ) : (
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => cartQuantityMinus(product)}
                              disabled={isUpdatingQuantity}
                              className="w-1/5 p-3 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-3/5 px-4 py-2 border-x border-gray-300 font-medium text-center cursor-pointer">{cartItemsMap.get(product._id)?.quantity || 0}</span>
                            <button
                              onClick={() => cartQuantityPlus(product)}
                              disabled={isUpdatingQuantity}
                              className="w-1/5 p-3 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="mt-4 text-center">
                        <span className="text-red-500 font-bold">Out of Stock</span>
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          <SwiperSlide key="load-more-card" onClick={() => goProductList()}>
            <ProductLoadCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default SpecialOffers;
