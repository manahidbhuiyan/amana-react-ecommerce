import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner_1 from "../../assets/images/banner.jpg";
import banner_2 from "../../assets/images/banner-2.jpg";
import banner_3 from "../../assets/images/banner-3.jpg";
import { fetchHeroBanners } from "../../features/slice/heroSlice";
import { getImageUrl } from "../../utilis/api";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-next-arrow`} onClick={onClick}>
      <i className="fas fa-chevron-right"></i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} custom-prev-arrow`} // Add a custom class
      onClick={onClick}
    >
      <i className="fas fa-chevron-left"></i> {/* Font Awesome Icon */}
    </div>
  );
}

const Hero = () => {
  const dispatch = useDispatch();
  const { largeBanners, loading, error } = useSelector((state) => state.hero);

  // Fallback banners if API fails or no data
  const fallbackBanners = [
    { image: banner_2, alt: "Banner 2" },
    { image: banner_1, alt: "Banner 1" },
    { image: banner_3, alt: "Banner 3" },
  ];

  useEffect(() => {
    const branchId = localStorage.branchId;
    if (branchId) {
      dispatch(fetchHeroBanners(branchId));
    }
  }, [dispatch]);

  var sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  // Determine which banners to show
  const bannersToShow = largeBanners.length > 0 ? largeBanners : fallbackBanners;

  if (loading) {
    return (
      <div className="slider-container relative w-full h-[400px] flex items-center justify-center bg-gray-200">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="slider-container relative w-full">
      <Slider {...sliderSettings} className="relative">
        {bannersToShow.map((banner, index) => (
          <div key={index} className="focus-visible:outline-none">
            <img
              src={banner.photo ? getImageUrl(banner.photo) : banner.image} // API might use different field name
              alt={banner.title || `Banner ${index + 1}`}
              className="w-full h-[400px] object-fill"
              onError={(e) => {
                // Fallback to static image if API image fails
                if (fallbackBanners[index]) {
                  e.target.src = fallbackBanners[index].image;
                }
              }}
            />
            {/* Optional: Show banner title/description if available */}
            {banner.title && (
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
                <h3 className="font-semibold">{banner.title}</h3>
                {/* {banner.description && <p className="text-sm">{banner.description}</p>} */}
              </div>
            )}
          </div>
        ))}
      </Slider>

      {/* Optional: Error display */}
      {error && <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded text-sm">Failed to load banners</div>}
    </div>
  );
};

export default Hero;
