import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner_1 from "../../assets/images/banner.jpg";
import banner_2 from "../../assets/images/banner-2.jpg";
import banner_3 from "../../assets/images/banner-3.jpg";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-next-arrow`} onClick={onClick}>
      <i className="fas fa-chevron-right"></i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
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
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="slider-container relative w-full ">
      <Slider {...settings} className="relative">
        <div className="focus-visible:outline-none">
          <img src={banner_2} alt="Slide 2" className="w-full h-[400px] object-fill" />
        </div>
        <div className="focus-visible:outline-none">
          <img src={banner_1} alt="Slide 1" className="w-full h-[400px] object-fill " />
        </div>
        <div className="focus-visible:outline-none">
          <img src={banner_3} alt="Slide 2" className="w-full h-[400px] object-fill" />
        </div>
      </Slider>
    </div>
  );
};

export default Hero;
