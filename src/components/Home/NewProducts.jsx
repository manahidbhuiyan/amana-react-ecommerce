import React from 'react'
import product_image_1 from '../../assets/images/products/image-1.jpg'

const NewProducts = () => {
  return (
    <div className="py-10">
  <div className="home-new-products">
    <div className="sec-header flex justify-between items-center mb-4">
      <h2 className="text-font-14 sm:text-font-16 md:text-font-26 lg:text-font-32 text-themeColor capitalize font-bold mb-1 ">New Products</h2>
      <div className="space-x-2">
        <button className="carousel-nav bg-gray-300 text-gray-700 w-8 h-8 flex items-center justify-center rounded-full hover:bg-green-500 hover:text-white">
          <i className="fas fa-angle-left"></i>
        </button>
        <button className="carousel-nav bg-gray-300 text-gray-700 w-8 h-8 flex items-center justify-center rounded-full hover:bg-green-500 hover:text-white">
          <i className="fas fa-angle-right"></i>
        </button>
      </div>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      <div className="card product-card bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative">
        <div className="absolute top-0 right-0 w-[70px] h-[70px] p-[15px] pt-[15px] bg-[url('../../assets/images/offer.png')] bg-no-repeat bg-cover bg-center text-white text-center text-[15px] font-bold z-5">
            50 Tk<br />Off
          </div>
          <img src={product_image_1} alt="Product Image" className="w-full h-48 object-cover" />
        </div>
        <div className="p-4">
          <span className="product-type inline-block text-green-500 border border-green-500 text-xs px-2 py-1 rounded">KG</span>
          <h3 className="card-title text-gray-700 text-base font-medium mt-2">Product Name</h3>
          <div className="min-w-100">
                    <del className="text-[#cd5c5c] text-left text-font-11">Tk. 25</del>
                  </div>
          <div className="price text-green-500 text-lg font-bold">Tk. 20</div>
          <button className="w-full bg-green-500 text-white text-sm font-medium py-2 mt-4 rounded hover:bg-green-600">
            <i className="fas fa-shopping-basket"></i> Add To Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default NewProducts
