import React, { useState } from 'react';
import logo from '../../assets/images/logo-beta.png';
import profile_image from '../../assets/images/profile-img.png';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // This state controls whether the user is logged in
  const [dropdownOpen, setDropdownOpen] = useState(false);
    
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div>
      {/* Header Bottom */}
      <div className="header-bottom z-50 px-4 py-0">
        <div className="flex items-center justify-between lg:gap-5 py-2">
          {/* Header Left */}
          <div className="header-left flex items-center">
            <div className="header-bottom-col logo flex justify-start w-[100px] 2md:logo-[185px] lg:w-[200px] ">
              <div className="logo-inner w-[85px] ml-0 2md:mx-auto 2md:w-[130px]">
                <a href="/">
                  <img
                    src={logo}
                    alt="Amana Big Bazar"
                    className="img-fluid"
                  />
                </a>
              </div>
            </div>
            {/* Special Product Show for Large Devices */}
            <div className="special-product-button h-[40px] flex justify-between p-0 border-[3px] border-[#41b883] rounded-[14px] cursor-pointer ml-[5px] align-middle items-center font-times shadow-[0px_0px_5px_0px_#41b883]">
                <button className="offer-btn bg-[#41b883] font-bold border-0 py-[8px] px-[10px] rounded-[10px] text-white text-font-14 tracking-[1px]">OFFERS</button>
                <p className="offer-text px-[6px] text-[20px] font-bold text-[#41b883] leading-[1.3] self-center">99+</p>
            </div>

          </div>

          {/* Search Form for Large Devices */}
          <div className="header-bottom-col search-wrap flex-grow flex-shrink basis-auto hidden lg:block">
            <div className="header-bottom-mid bg-white rounded shadow-sm py-1">
              <form className="flex">
              <div className="form-group mb-0 relative mr-2 mr-lg-3">
                <select className="form-control border-none text-sm cursor-pointer focus:outline-none focus:ring-0">
                    <option disabled>All Categories</option>
                    <option>Category 1</option>
                    <option>Category 2</option>
                    {/* Add categories here */}
                </select>
                <div className="absolute right-[-17px] top-1/2 transform -translate-y-1/2 bg-[#212529] w-[2px] h-[15px] z-10 hidden lg:block"></div>
                </div>
                <div className="form-group mb-0 flex-fill ml-3">
                  <div className="input-group cus-input-field">
                    <input
                      type="text"
                      className="form-control border-0"
                      placeholder="Search for products..."
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="input-group-text"
                      >
                        <i className="fas fa-search mr-2" style={{ color: '#41b883' }}></i>
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Header Right */}
          <div className="header-right flex items-center text-right justify-between gap-3 header-bottom-col ml-2 ml-lg-4">
            <button className="mr-2 text-capitalize small-device-branch branch-change ">
              <span className="text">
                <i className="fas fa-map-marker-alt mr-2" style={{ color: '#41b883' }}></i>
                Branch Name
              </span>
            </button>

    <div className="profile-button min-w-[35px] 2md:min-w[65px]">
      {/* Profile Button - Conditional Rendering */}
      <div className="signin-dropdown">
      <div className="dropdown relative">
      <button 
        className="profile-dropdown-btn flex items-center" 
        onClick={toggleDropdown}
      >
        {/* Show icon and text if not logged in */}
        {!isLoggedIn ? (
          <>
            <i className="fas fa-user mr-2"></i> Sign In
          </>
        ) : (
          <div className="pro-pic w-[35px] h-[35px] rounded-full bg-white text-center leading-[35px] shadow-[0_0_10px_2px_rgba(0,0,0,.08)]">
            {/* Show profile picture if logged in */}
            <img
              src={profile_image} // Replace with actual image URL
              alt="profile-pic"
              className="img-fluid rounded-full"
            />
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && isLoggedIn && (
        <div className="dropdown-menu absolute right-0 mt-2 w-[200px] bg-white border border-gray-300 rounded shadow-lg z-10">
          <a href="#" className="dropdown-item block px-4 py-2 text-left items-center text-font-14 text-gray-700 hover:text-themeColor hover:bg-[#f8f9fa] "><i className="text-font-14 hover:text-themeColor fas fa-user mr-1"></i> My Profile</a>
          <a href="#" className="dropdown-item block px-4 py-2 text-left items-center text-font-14 text-gray-700 hover:text-themeColor hover:bg-[#f8f9fa] "><i className="text-font-14 hover:text-themeColor fas fa-box mr-1"></i> My Orders</a>
          <a href="#" className="dropdown-item block px-4 py-2 text-left items-center text-font-14 text-gray-700 hover:text-themeColor hover:bg-[#f8f9fa] "><i className="text-font-14 hover:text-themeColor fas fa-lock mr-1"></i> Change Password</a>
          <a href="#" className="dropdown-item block px-4 py-2 text-left items-center text-font-14 text-gray-700 hover:text-themeColor hover:bg-[#f8f9fa] "><i className="text-font-14 hover:text-themeColor fas fa-user-times mr-1"></i> Delete Account</a>
          {/* <div className="dropdown-divider my-2"></div> */}
          <a 
            href="#" 
            className="dropdown-item block px-4 py-2 text-left items-center text-font-14 text-gray-700 hover:text-themeColor hover:bg-[#f8f9fa] border-t border-t-[#e9ecef]" 
            onClick={() => setIsLoggedIn(false)}
          >
           <i className="text-font-14 hover:text-themeColor fas fa-sign-out-alt mr-1"></i> Sign Out
          </a>
        </div>
      )}
    </div>
      </div>
    </div>

          </div>
        </div>
      </div>

      {/* Smaller to Mid Devices Search */}
      <div className="header-sm flex items-center mt-1 mb-0 mx-3 lg:hidden">
        <button
          type="button"
          className="btn btn-default btn-category-all d-sm-none mr-3"
        >
          <i className="fas fa-list"></i>
        </button>
        <div className="header-bottom-mid bg-white rounded shadow-sm px-2 flex-fill">
          <form className="flex">
            <div className="form-group mb-0 header-select mr-2 mr-lg-3 d-none sm:block">
              <select className="form-control">
                <option disabled>All Categories</option>
                <option>Category 1</option>
                <option>Category 2</option>
                {/* Add categories here */}
              </select>
            </div>
            <div className="form-group mb-0 flex-fill ml-0 ml-sm-3">
              <div className="input-group cus-input-field">
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Search for products..."
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="input-group-text"
                  >
                    <i className="fas fa-search mr-2 text-success"></i> Search
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Categories and Offer */}
      <div className="bg-theme flex items-center">
        <div className="all-categories-btn">
          <button
            type="button"
            className="btn btn-default text-uppercase text-white btn-block flex items-center justify-between font-weight-bold bg-theme"
          >
            All Categories <i className="fas fa-list"></i>
          </button>
        </div>
        <div className="offers pl-4 hidden sm:flex">
          {/* Add offers here */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
