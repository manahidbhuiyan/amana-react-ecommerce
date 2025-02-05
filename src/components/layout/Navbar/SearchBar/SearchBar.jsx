import React, { useState } from "react";

const SearchBar = () => {
    
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="header-bottom-col search-wrap flex-grow flex-shrink basis-auto hidden lg:block font-proxima">
      <div className="header-bottom-mid bg-white rounded shadow-sm">
        <form className="flex">
          <div className="form-group w-1/4 mb-0 relative mr-2 mr-lg-3">
            <select
              className="w-full rounded-md py-2 px-4 text-[14px] text-[#495057] cursor-pointer appearance-none bg-white bg-no-repeat bg-right bg-[length:10px_10px] focus:outline-none"
              onClick={() => setIsClicked(true)}
              onChange={(e) => console.log(`Selected: ${e.target.value}`)}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='10' height='12' viewBox='0 0 10 12'%3e%3cpath fill='%23343a40' d='M5 0L0 5h10L5 0zM5 12L0 7h10L5 12z'/%3e%3c/svg%3e")`,
                backgroundPosition: "calc(100% - 10px) center",
              }}
            >
              <option value="all" disabled={isClicked} className="cursor-pointer text-[#6c757d]">
                All Categories
              </option>
              <option value="fruits" className="cursor-pointer">
                Fruits
              </option>
              <option value="grocery" className="cursor-pointer">
                Grocery
              </option>
              <option value="vegetables" className="cursor-pointer">
                Vegetables
              </option>
              <option value="snacks" className="cursor-pointer">
                Snacks
              </option>
              <option value="beverages" className="cursor-pointer">
                Beverages
              </option>
              <option value="meat" className="cursor-pointer">
                Meat
              </option>
            </select>
            <div className="absolute right-[-17px] top-1/2 transform -translate-y-1/2 bg-[#212529] w-[2px] h-[15px] z-10 hidden lg:block"></div>
          </div>
          <div className="form-group w-3/4 mb-0 flex-fill ml-3">
            <div className="input-group w-full relative p-1">
              <input
                type="text"
                className="form-control w-3/4 lg:w-4/5 border-0 px-2 placeholder:text-font-14 placeholder:text-[#495057] focus-visible:outline-0"
                placeholder="Search for products..."
              />
              <div className="absolute right-2 top-1.5">
                <button type="button" className="input-group-text text-font-14 text-[#495057]">
                  <i className="fas fa-search mr-2" style={{ color: "#41b883" }}></i>
                  Search
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
