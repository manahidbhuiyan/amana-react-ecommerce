import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import banner_1 from '../assets/images/b.jpg';
import banner_2 from '../assets/images/banner.jpg';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          display: "block",
          position: "absolute",
          transform: "translateY(-50%)",
          top: "50%",
          right: "25px",
          zIndex: 10,
          fontSize: "40px",  // Increase font size for the arrow
          width: "50px",  // Set width of the arrow button
          height: "50px",  // Set height of the arrow button
          background: "transparent", // Set background as transparent if needed
          color: "white", // Arrow color
        }}
        onClick={onClick}
      />
    );
}
  
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          display: "block",
          position: "absolute",
          transform: "translateY(-50%)",
          top: "50%",
          left: "25px",
          zIndex: 10
        }}
        onClick={onClick}
      />
    );
}

const Banner = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <div className="slider-container relative w-full px-5">
            <Slider {...settings} className="relative">
                <div>
                    <img src={banner_1} alt="Slide 1" className="w-full mx-auto h-[500px] object-cover" />
                </div>
                <div>
                    <img src={banner_2} alt="Slide 2" className="w-full h-[500px] object-cover" />
                </div>
            </Slider>
        </div>
    );
};

export default Banner;
