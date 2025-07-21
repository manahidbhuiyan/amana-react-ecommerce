import React from "react";
import { useSelector } from "react-redux";
import notFoundThumb from "../../assets/images/noImageThumbnail.png";

const Cart = () => {
  const CartInformation = useSelector((state) => state.cart.CartInformation);

  // Calculate totals from all products
  let subtotal = 0;
  let vatTotal = 0;
  let discountTotal = 0;

  if (CartInformation && Array.isArray(CartInformation)) {
    CartInformation.forEach((item) => {
      const quantity = item.quantity || 0;
      const price = item?.price || 0;
      const vat = item.vat || 0;
      const discount = item.discount || 0;

      subtotal += price * quantity;
      vatTotal += vat * quantity;
      discountTotal += discount * quantity;
    });
  }

  const finalTotal = subtotal + vatTotal - discountTotal;
  const totalItems = CartInformation?.length || 0;

  return (
    <div className="w-[420px] h-[calc(100vh-117px)] fixed right-0 top-[117px] bg-white z-50 shadow-lg border-l">
      {/* Header - Fixed */}
      <div className="sticky top-0 bg-lightgrey z-10 p-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-semibold text-gray-800">Cart ({totalItems} Items)</h4>
          <div className="flex items-center space-x-2">
            {totalItems > 0 && <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors">Clear Cart</button>}
            <button className="text-gray-500 hover:text-gray-700 text-lg">✕</button>
          </div>
        </div>
      </div>

      {/* Cart Content - Scrollable */}
      <div className="flex-1 overflow-hidden flex flex-col h-full z-40">
        {CartInformation && CartInformation.length > 0 ? (
          <>
            {/* Products List - Scrollable */}
            <div className="flex-1 overflow-y-auto px-3 py-2 pb-[54px] ">
              <div className="space-y-2">
                {CartInformation.map((item, index) => (
                  <div key={index} className="flex items-start space-x-2 py-1 border-b border-gray-100 last:border-none ">
                    <img
                      src={item?.images ? item.images[1] : notFoundThumb}
                      // alt="product"
                      className="w-10 h-10 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-medium text-gray-800 truncate">{item?.name}</h5>
                      <p className="text-xs text-gray-600">
                        ৳{item?.price} x {item.quantity} = ৳{((item?.price || 0) * (item.quantity || 0)).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls & Delete - Converted from Vue */}
                    <div className="flex items-end space-x-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded">
                        <button className="px-1.5 py-0.5 hover:bg-gray-100 text-gray-600 text-xs">
                          <i className="fas fa-minus"></i>
                        </button>
                        <input type="text" value={item.quantity} className="w-8 text-center border-0 outline-none text-xs" readOnly />
                        <button className="px-1.5 py-0.5 hover:bg-gray-100 text-gray-600 text-xs">
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>

                      {/* Delete Button */}
                      <button className="text-red-500 hover:text-red-700 text-sm">
                        <i className="fas fa-times-circle"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkout Section - Fixed */}
            <div className="z-30 relative bottom-[50px] bg-white border-t border-gray-200 p-3">
              {/* Totals */}
              <div className="space-y-1 mb-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">৳{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">VAT:</span>
                  <span className="font-medium">৳{vatTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">Discount:</span>
                  <span className="font-medium">৳{discountTotal.toFixed(2)}</span>
                </div>

                {/* <div className="flex justify-between items-center text-sm font-bold pt-1 border-t">
                  <span>Total:</span>
                  <span>৳{finalTotal.toFixed(2)}</span>
                </div> */}
              </div>

              <div className="flex justify-between items-center pt-3 border-t">
                {/* Checkout Button */}
                <button className=" bg-themeColor text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors">Checkout</button>
                <div className="flex flex-end items-center text-sm space-x-1 ">
                  <span className="font-bold">Total:</span>
                  <span>৳{finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-center text-gray-500 text-sm">Cart is Empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
