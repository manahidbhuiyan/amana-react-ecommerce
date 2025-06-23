import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useDispatch, useSelector  } from "react-redux";
import { fetchCustomeReviews } from "../../features/slice/customerReviewSlice";
// Sample customer data
// const customersData = [
//   {
//     id: 1,
//     name: "Mutakabbir Ahmed",
//     review:
//       "I Want to order some grocery item for my family. Their Support team instantly replied to my query and managed to delivery the product. The Best Thing I noticed, they informed step by step updated news about the order processing.",
//     rating: 5,
//     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
//   },
//   {
//     id: 2,
//     name: "Fatima Rahman",
//     review: "Amazing service! The delivery was super fast and the products were fresh. Customer support was very helpful and responsive. I will definitely order again from this platform.",
//     rating: 5,
//     image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
//   },
//   {
//     id: 3,
//     name: "Karim Hassan",
//     review: "Outstanding quality and excellent customer service. The ordering process was smooth and the delivery tracking system is very convenient. Highly recommended for grocery shopping!",
//     rating: 5,
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
//   },
// ];

// Star Rating Component
const StarRating = ({ rating }) => {
  return (
    <div className="flex justify-center gap-1 mb-4">
      {[...Array(5)].map((_, index) => (
        <Star key={index} className={`w-5 h-5 ${index < rating ? "text-orange-400 fill-orange-400" : "text-gray-300"}`} />
      ))}
    </div>
  );
};

const Testimonial = () => {
  const dispatch = useDispatch();
  // Get data from Redux store
  const { customerReview, loading, error } = useSelector((state) => state.customerReview);

  useEffect(() => {
    dispatch(fetchCustomeReviews());
  }, [dispatch]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>Loading customer reviews...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading reviews: {error}</p>
          <button onClick={() => dispatch(fetchCustomeReviews())} className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No data state
  // if (!customerReview || customerReview.length === 0) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 py-16 px-4 flex items-center justify-center">
  //       <div className="text-center">
  //         <p>No customer reviews found.</p>
  //         <p className="text-sm text-gray-500 mt-2">Debug: Check API endpoint and data structure</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-font-14 sm:text-font-16 md:text-font-26 lg:text-font-32 font-bold capitalize text-gray-800 mb-4">
            What Our <span className="text-themeColor">Customer Say</span>
          </h2>
          <div className="w-20 h-1 bg-themeColor mx-auto rounded"></div>
        </div>
        
        {/* Testimonials Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-green-500",
              bulletActiveClass: "swiper-pagination-bullet-active !bg-green-600",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="testimonial-swiper"
          >
            {customerReview.map((customer, index) => (
              <SwiperSlide key={customer.id || customer._id || index}>
                <div className="p-8 mx-4">
                  <div className="text-center">
                    {/* Customer Image */}
                    <div className="mb-6">
                      <img
                        src={customer.image || customer.photo || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`}
                        alt={customer.name || "Customer"}
                        className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-green-100"
                      />
                    </div>

                    {/* Star Rating */}
                    <StarRating rating={customer.rating || 5} />

                    {/* Review Text */}
                    <p className="text-gray-600 italic text-lg leading-relaxed mb-6 max-w-2xl mx-auto">"{customer.review || customer.comment || customer.feedback}"</p>

                    {/* Customer Name */}
                    <h3 className="text-xl font-semibold text-green-600">{customer.name || customer.customerName || "Anonymous"}</h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="custom-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-themeColor transition-colors duration-300 cursor-pointer group">
            <ChevronLeft className="w-6 h-6 text-themeColor group-hover:text-white" />
          </button>
          <button className="custom-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-themeColor transition-colors duration-300 cursor-pointer group">
            <ChevronRight className="w-6 h-6 text-themeColor group-hover:text-white" />
          </button>
        </div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx>{`
        .testimonial-swiper .swiper-pagination {
          bottom: -50px !important;
        }
        .testimonial-swiper .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          margin: 0 6px !important;
        }
      `}</style>
    </div>
  );
};

export default Testimonial;
