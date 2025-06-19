import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo-beta.png";
import profile_image from "../../assets/images/fox.jpg";
import SearchBar from "./Navbar/SearchBar/SearchBar";
import Location from "./Navbar/Location/Location";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logOutUser } from "../../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { userInformation, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !userInformation) {
      dispatch(loadUser());
    }
  }, [dispatch, token, userInformation]);

  useEffect(() => {
    if (userInformation && Object.keys(userInformation).length > 0) {
      setIsLoggedIn(true);
      navigate("/", { replace: true });
    } else {
      setIsLoggedIn(false);
    }
  }, [userInformation]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleSignOut = () => {
    dispatch(logOutUser());
    setIsLoggedIn(false);
    setDropdownOpen(false);
    navigate("/signin", { replace: true });
  };

  return (
    <div>
      <div className="bg-sectionBackgroundLight">
        {/* Header Bottom */}
        <div className="header-bottom z-50 px-4 py-0">
          <div className="flex items-center justify-between lg:gap-5 py-2">
            {/* Header Left */}
            <div className="header-left flex items-center w-1/5">
              <div className="header-bottom-col logo flex justify-start w-[100px] 2md:logo-[185px] lg:w-[200px] ">
                <div className="logo-inner w-[85px] ml-0 2md:mx-auto 2md:w-[130px]">
                  <img onClick={() => navigate("/", { replace: true })} src={logo} alt="Amana Big Bazar" className="img-fluid cursor-pointer" />
                </div>
              </div>
            </div>

            {/* Search for Large Devices */}
            <div className="w-3/5">
              <SearchBar />
            </div>

            {/* Header Right */}
            <div className="w-1/5 flex items-center text-right justify-end gap-5 header-bottom-col">
              <Location></Location>

              <div className="profile-button min-w-[35px] 2md:min-w[65px]">
                {/* Profile Button - Conditional Rendering */}
                <div className="signin-dropdown">
                  <div className="dropdown relative">
                    <button className="profile-dropdown-btn flex items-center" onClick={toggleDropdown}>
                      {/* Show icon and text if not logged in */}
                      {!isLoggedIn ? (
                        <>
                          <div onClick={() => navigate("/signin", { replace: true })} className="flex justify-end gap-1 items-center text-font-17 text-themeColor ">
                            {/* <i className="fas fa-user mr-0.5"></i> Sign In */}
                            <i className="fa-regular fa-circle-user mr-0.5"></i> Login
                          </div>
                        </>
                      ) : (
                        <div className="pro-pic w-[35px] h-[35px] rounded-full bg-white text-center leading-[35px] shadow-[0_0_10px_2px_rgba(0,0,0,.08)]">
                          {/* Show profile picture if logged in */}
                          {userInformation.info?.avatar ? (
                            <img src={userInformation.info.avatar} alt="profile-pic" className="img-fluid rounded-full" />
                          ) : (
                            <img src={profile_image} alt="profile-pic" className="img-fluid rounded-full" />
                          )}
                        </div>
                      )}
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && isLoggedIn && (
                      <div className="dropdown-menu absolute right-0 mt-2 w-[200px] bg-white border border-gray-300 rounded shadow-lg z-10">
                        <a href="#" className="dropdown-item block px-4 py-2 text-left items-center text-font-14 text-gray-700 hover:text-themeColor hover:bg-[#f8f9fa] ">
                          <i className="text-font-14 hover:text-themeColor fas fa-user mr-1"></i> My Profile
                        </a>
                        <a href="#" className="dropdown-item block px-4 py-2 text-left items-center text-font-14 text-gray-700 hover:text-themeColor hover:bg-[#f8f9fa] ">
                          <i className="text-font-14 hover:text-themeColor fas fa-box mr-1"></i> My Orders
                        </a>
                        <a href="#" className="dropdown-item block px-4 py-2 text-left items-center text-font-14 text-gray-700 hover:text-themeColor hover:bg-[#f8f9fa] ">
                          <i className="text-font-14 hover:text-themeColor fas fa-lock mr-1"></i> Change Password
                        </a>
                        <a href="#" className="dropdown-item block px-4 py-2 text-left items-center text-font-14 text-gray-700 hover:text-themeColor hover:bg-[#f8f9fa] ">
                          <i className="text-font-14 hover:text-themeColor fas fa-user-times mr-1"></i> Delete Account
                        </a>
                        {/* <div className="dropdown-divider my-2"></div> */}
                        <a
                          href="#"
                          className="dropdown-item block px-4 py-2 text-left items-center text-font-14 text-gray-700 hover:text-themeColor hover:bg-[#f8f9fa] border-t border-t-[#e9ecef]"
                          onClick={handleSignOut}
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
          <button type="button" className="btn btn-default btn-category-all d-sm-none mr-3">
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
                  <input type="text" className="form-control border-0" placeholder="Search for products..." />
                  <div className="input-group-append">
                    <button type="button" className="input-group-text">
                      <i className="fas fa-search mr-2 text-success"></i> Search
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-themeColor">
        {/* Categories and Offer */}
        <div className="bg-theme px-5 py-1.5 flex justify-between items-center">
          <div className="all-categories-btn">
            <button type="button" className="btn text-font-16 tracking-[1px] text-uppercase text-[#F8FAFC] btn-block flex items-center justify-between font-weight-bold bg-theme">
              All Categories <i className="fas fa-list pl-2"></i>
            </button>
          </div>
          {/* Special Product Show for Large Devices */}
          <div className="bg-themeColor h-[36px] flex justify-between p-0 border-[3px] border-sectionBackground rounded-[14px] cursor-pointer align-middle items-center font-times shadow-[0px_0px_5px_0px_#41b883]">
            <button className="offer-btn bg-sectionBackground font-bold border-0 py-[6px] px-[8px] rounded-[10px] text-themeColor text-font-14 tracking-[1px]">OFFERS</button>
            <p className="offer-text px-[6px] text-[20px] font-bold text-[#F8FAFC] leading-[1.3] self-center">99+</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
