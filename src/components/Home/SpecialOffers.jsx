import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import notFoundImage from "../../assets/images/products/no-image.jpg";
import redRibbon from "../../assets/images/red-ribbon.png";
import { loadProductData } from "../../features/products/productSlice";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SpecialOffers = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { specialOffers } = useSelector((state) => state.products);

  useEffect(() => {
    let queryString = {
      specialOffer: true,
    };
    let branchId = "6236fbf5bcadba0c84549883";

    dispatch(loadProductData({ pageNo: 1, branchId, queryString, queryType: "specialOffer" }));
  }, [dispatch]);

  useEffect(() => {
    if (specialOffers && specialOffers.count > 0) {
      setSlides(specialOffers);
      setLoading(false);
    }
  }, [specialOffers]);

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
          <h2 className="text-font-14 sm:text-font-16 md:text-font-26 lg:text-font-32 text-themeColor capitalize font-bold mb-1 ">
            Special Products
          </h2>
          <div className="flex space-x-2">
            <button className="prev-special-offer carousel-nav bg-gray-300 text-gray-700 w-8 h-8 flex items-center justify-center rounded-full hover:bg-green-500 hover:text-white">
              <i className="fas fa-angle-left"></i>
            </button>
            <button className="next-special-offer carousel-nav bg-gray-300 text-gray-700 w-8 h-8 flex items-center justify-center rounded-full hover:bg-green-500 hover:text-white">
              <i className="fas fa-angle-right"></i>
            </button>
          </div>
        </div>

        {/* Replace grid with Swiper */}
        <Swiper
          lazy={true}
          slidesPerView={7}
          spaceBetween={20}
          loop={true}
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
          className="mySwiper"
        >
          {slides.count > 0 &&
            slides.data.map((product, index) => (
              <SwiperSlide key={product._id || index}>
                <div
                  className={`card product-card bg-white shadow-lg rounded-lg overflow-hidden ${
                    product.discount > 0 ? "h-[424px]" : "h-[400px]"
                  }`}
                >
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
                      // src={product.images && product.images[0] ? product.images[0] : notFoundImage}
                      src={notFoundImage}
                      alt="Product Image swiper-lazy"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <span className="product-type inline-block text-themeColor border border-themeColor text-xs px-2 py-1 rounded">
                      {product.unitType && product.unitType.shortform === "pc" ? "PC" : "KG"}
                    </span>
                    <h3 className="card-title text-gray-700 text-base font-medium mt-2 min-h-[48px] ">
                      {product.name}
                    </h3>
                    {product.discount > 0 && (
                      <div className="min-w-100">
                        <del className="text-badgeColor text-left text-font-11">Tk. {product.price.sell}</del>
                      </div>
                    )}
                    <div className="price text-themeColor  text-lg font-bold">
                      Tk. {(product.price.sell - product.discount).toFixed(2)}
                    </div>
                    <button className="w-full bg-themeColor text-white text-sm font-medium py-2 mt-4 rounded hover:bg-[#41b899]">
                      <i className="fas fa-shopping-basket"></i> Add To Cart
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SpecialOffers;
