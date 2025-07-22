import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {openCartModule} from '../../features/cart/cartSlice'

const Header = () => {

  const CartInformation = useSelector((state) => state.cart.CartInformation)
  const cartTotalItem = CartInformation?.lenght
  const dispatch = useDispatch();

  const handleCartClick = () =>{
    dispatch(openCartModule())
  }
  return (
    <div className="flex items-center justify-end space-x-6">
      {/* Wishlist */}
      <div className="flex items-center space-x-2 cursor-pointer hover:text-themeColor transition-colors">
        <div className="relative">
          <Heart className="w-6 h-6 text-gray-600 hover:text-themeColor" />
          <span className="absolute -top-2 -right-2 bg-themeColor text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            0
          </span>
        </div>
        <span className="text-gray-700 font-medium">Wishlist</span>
      </div>

      {/* Cart */}
      <div className="flex items-center space-x-1 cursor-pointer hover:text-themeColor transition-colors group" onClick={handleCartClick}>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-600 group-hover:text-themeColor" />
            <span className="absolute -top-2 -right-2 bg-themeColor text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
              {cartTotalItem}
            </span>
          </div>
          <span className="text-gray-700 font-medium group-hover:text-themeColor">Cart</span>
        </div>
        
        {/* Price badge */}
        <div className="bg-green-50 border border-green-200 px-2 py-1 rounded-md">
          <span className="text-themeColor font-semibold text-sm">৳7,250</span>
        </div>
      </div>
    </div>
  );
};

export default Header;