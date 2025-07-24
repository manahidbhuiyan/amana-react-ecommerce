import React, { useMemo } from "react";
import { useSelector } from "react-redux";
// import notFoundThumb from "../../assets/images/noImageThumbnail.png";
import notFoundThumb from "../../assets/images/noImageThumbnail2.jpg";
import { useDispatch } from "react-redux";
import { closeCartModule, clearAllCart } from "../../features/cart/cartSlice";
import { Truck } from "lucide-react";
import { toast } from "react-toastify";
import { updateCartQuantity, updateLocalCartQuantity, removeFromCart, removeFromLocalCart } from "../../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { CartInformation } = useSelector((state) => state.cart);

  // Helper function to get price value
  const getPrice = (priceData) => {
    if (typeof priceData === "object" && priceData !== null) {
      return priceData.sell || 0;
    }
    return priceData || 0;
  };

  // Calculate totals from all products
  let subtotal = 0;
  let vatTotal = 0;
  let discountTotal = 0;

  if (CartInformation && Array.isArray(CartInformation)) {
    CartInformation.forEach((item) => {
      const quantity = item.quantity || 0;
      const price = getPrice(item?.price); // Fixed: Use helper function
      const vat = item.vat || 0;
      const discount = item.discount || 0;

      subtotal += price * quantity;
      vatTotal += vat * quantity;
      discountTotal += discount * quantity;
    });
  }

  const finalTotal = subtotal + vatTotal - discountTotal;
  const totalItems = CartInformation?.length || 0;

  const cartClear = () => {
    dispatch(clearAllCart());
  };

  const handleCartClick = () => {
    dispatch(closeCartModule());
  };

  // Move useMemo to component level - Create cart lookup map
 const cartItemsMap = useMemo(() => {
    const map = new Map();
    
    if (CartInformation && Array.isArray(CartInformation)) {
      CartInformation.forEach((item) => {
        const productId = item._id;
        
        if (productId) {
          map.set(productId, item);
        }
      });
    }
    return map;
  }, [CartInformation]);

  // Helper function to check if product is in cart
  const checkProductToCart = (item) => {
    const product = item
    const productId = item._id
    return cartItemsMap.get(product._id) || null;
  };

  // Quantity increase function
  const cartQuantityPlus = (product) => {
    const cartItem = checkProductToCart(product);

    if (cartItem && cartItem.quantity < cartItem.maxQuantity) {
      const newQuantity = cartItem.quantity + 1;

      if (localStorage.userToken) {
        dispatch(
          updateCartQuantity({
            productId: cartItem._id,
            quantity: newQuantity,
          })
        );
      } else {
        dispatch(
          updateLocalCartQuantity({
            productId: cartItem._id,
            quantity: newQuantity,
          })
        );
      }
    } else {
      toast.warning(
        <div>
          We are very sorry! We currently do not have the quantity of <strong>'{cartItem.name}'</strong> in stock that you require.
        </div>,
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  // Quantity decrease function
  const cartQuantityMinus = (product) => {
    const cartItem = checkProductToCart(product);
    if (cartItem && cartItem.quantity > 1) {
      const newQuantity = cartItem.quantity - 1;

      if (localStorage.userToken) {
        dispatch(
          updateCartQuantity({
            productId: cartItem._id,
            quantity: newQuantity,
          })
        );
      } else {
        dispatch(
          updateLocalCartQuantity({
            productId: cartItem._id,
            quantity: newQuantity,
          })
        );
      }
    } else if (cartItem && cartItem.quantity == 1) {
      removeProduct(cartItem);
    }
  };

  const removeProduct = (item) => {
    const productId = item._id;
    if (localStorage.userToken) {
      dispatch(removeFromCart({ productId }));
    } else {
      dispatch(removeFromLocalCart(productId));
    }
  };

  return (
    <div className="w-[420px] h-[calc(100vh-117px)] fixed right-0 top-[117px] bg-white z-50 shadow-lg border-l">
      {/* Header - Fixed */}
      <div className="sticky top-0 bg-lightgrey z-10 p-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h4 className="text-font-18 font-bold text-textColor ">Cart ( {totalItems} Items )</h4>
          <div className="flex items-center space-x-3">
            {totalItems > 0 && (
              <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors" onClick={cartClear}>
                Clear Cart
              </button>
            )}
            <button className="text-textColor hover:text-gray-700 text-lg font-bold text-font-18" onClick={handleCartClick}>
              ✕
            </button>
          </div>
        </div>
      </div>

      {/* Cart Content - Scrollable */}
      <div className="flex-1 overflow-hidden flex flex-col h-full z-40">
        {CartInformation && CartInformation.length > 0 ? (
          <>
            {/* Delivery Info Banner */}
            <div className="mt-2 mx-4 py-1 px-2 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-green-700">
                <Truck size={16} />
                <span className="text-sm font-medium">
                  {subtotal < 500 ? (
                    <p className="">
                      Add ৳<strong>{500 - subtotal}</strong> more to unlock Free Delivery!
                    </p>
                  ) : (
                    <p className="">
                      You’ve unlocked <strong>Free Delivery!</strong>
                    </p>
                  )}
                </span>
              </div>
            </div>
            {/* Products List - Scrollable */}
            <div className="flex-1 overflow-y-auto px-3 py-2 pb-[54px] ">
              <div className="space-y-2">
                {CartInformation.map((item, index) => {
                  // Get the correct price for this item
                  const itemPrice = getPrice(item?.price);
                  const itemTotal = (itemPrice * (item.quantity || 0)).toFixed(2);

                  return (
                    <div key={index} className="flex items-start space-x-2 py-1 border-b border-gray-100 last:border-none ">
                      <img
                        src={localStorage.userToken ? item?.thumbnail || notFoundThumb : item?.images?.[0] || notFoundThumb}
                        // alt="product"
                        className="w-[60px] h-[60px] object-cover rounded-full flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-medium text-gray-800 truncate">{item?.name}</h5>
                        <p className="text-xs text-gray-600">
                          ৳{itemPrice.toFixed(2)} x {item.quantity} = ৳{itemTotal}
                        </p>
                      </div>

                      {/* Quantity Controls & Delete - Converted from Vue */}
                      <div className="flex items-end space-x-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded">
                          <button className="px-1.5 py-0.5 hover:bg-gray-100 text-gray-600 text-xs" onClick={() => cartQuantityMinus(item)}>
                            <i className="fas fa-minus"></i>
                          </button>
                          <input type="text" value={item.quantity} className="w-8 text-center border-0 outline-none text-xs" readOnly />
                          <button className="px-1.5 py-0.5 hover:bg-gray-100 text-gray-600 text-xs" onClick={() => cartQuantityPlus(item)}>
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>

                        {/* Delete Button */}
                        <button className="text-red-500 hover:text-red-700 text-sm" onClick={() => removeProduct(item)}>
                          <i className="fas fa-times-circle"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Checkout Section - Fixed */}
            <div className="z-30 relative bottom-[92px] bg-white border-t border-gray-200 p-3">
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
