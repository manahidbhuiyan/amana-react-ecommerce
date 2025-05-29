import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadProductSingleData } from "../../features/products/productSlice";
import { ChevronLeft, ChevronRight, ShoppingCart, Plus, Minus, Star, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import notFoundImage from "../../assets/images/products/no-image.jpg";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { category, subcategory, slug, barcode } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const branchId = localStorage.branchId;

  // Local state
  const [singleProductData, setSingleProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Dummy data - replace with your Redux state
  const [dummySingleProduct] = useState({
    name: "Premium Wireless Headphones",
    description:
      "High-quality wireless headphones with active noise cancellation and premium sound quality. Perfect for music lovers and professionals.High-quality wireless headphones with active noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=500&h=500&fit=crop",
    ],
    price: { sell: 2500 },
    discount: 300,
    maxQuantity: 15,
    unitType: { shortform: "pc" },
    brand: { name: "TechBrand" },
    sku: "WH-001",
    rating: 4.5,
    reviews: 128,
  });

  const { singleProduct } = useSelector((state) => state.products);

  // FIX 1: Add all dependencies to useEffect
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    if (branchId && slug && barcode) {
      dispatch(loadProductSingleData({ branchId, slug, barcode }));
    }
  }, [dispatch, branchId, slug, barcode]); // Added missing dependencies

  useEffect(() => {
    if (singleProduct) {
      setSingleProduct(singleProduct.data);
      setRelatedProducts(singleProduct.related || []);
    }
  }, [singleProduct]);

  // State for image gallery
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // State for related products slider
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Add missing state and functions
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);

  const updateQuantity = (action) => {
    if (action === "plus" && quantity < singleProductData?.quantity) {
      setQuantity(quantity + 1);
    } else if (action === "minus" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsInCart(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleImageHover = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1 >= Math.ceil(relatedProducts.length / 4) ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 < 0 ? Math.ceil(relatedProducts.length / 4) - 1 : prev - 1));
  };

  const finalPrice = singleProductData?.price?.sell - (singleProductData?.discount || 0);
  const discountPercentage = singleProductData?.discount ? Math.round((singleProductData.discount / singleProductData.price.sell) * 100) : 0;

  const moveToProductDetails = (product) => {
    navigate(`/product/${product.category.name}/${product.subcategory.name}/${product.slug}/${product.barcode}`);
  };

  return (
    <div className="bg-sectionBackgroundLight min-h-screen">
      {/* Loading Spinner */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Adding to cart...</p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <span>Home</span> / <span>{category}</span> / <span>{subcategory}</span> /<span className="text-gray-900 font-medium"> {singleProductData?.name}</span>
        </nav>

        {/* Main Product Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Left: Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative bg-gray-100 rounded-lg overflow-hidden group">
                <div className="aspect-square relative cursor-zoom-in" onMouseEnter={() => setIsZoomed(true)} onMouseLeave={() => setIsZoomed(false)} onMouseMove={handleImageHover}>
                  {/* singleProductData?.images?.length > 0 ? singleProductData.images[selectedImage] :  */}
                  <img
                    src={dummySingleProduct.images[selectedImage]}
                    alt={singleProductData?.name || dummySingleProduct.name}
                    className={`w-full h-full object-cover transition-transform duration-300 ${isZoomed ? "scale-150" : "scale-100"}`}
                    style={
                      isZoomed
                        ? {
                            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                          }
                        : {}
                    }
                  />

                  {/* Discount Badge */}
                  {singleProductData?.discount > 0 && <div className="absolute top-4 left-4 bg-badgeColor text-white px-3 py-1 rounded-full text-sm font-semibold">{discountPercentage}% OFF</div>}

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white p-2 rounded-full shadow-lg hover:bg-sectionBackgroundLight mr-1">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="bg-white p-2 rounded-full shadow-lg hover:bg-sectionBackgroundLight">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* FIX 2: Thumbnail Images - Fixed array reference and added proper keys */}

              {/* singleProductData?.images?.length > 0 ? singleProductData.images :  */}

              <div className="grid grid-cols-4 gap-3">
                {dummySingleProduct.images.map((image, index) => (
                  <button
                    key={`thumbnail-${index}`}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img src={image} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {singleProductData?.name
                    ?.split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </h1>

                {/* Stock Status */}
                <div className="mb-4">
                  {singleProductData?.quantity > 0 ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">✓ In Stock ({singleProductData?.maxQuantity} available)</span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">✗ Out of Stock</span>
                  )}
                </div>

                {/* Brand & SKU */}
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium">Brand:</span> {singleProductData?.brand?.name}
                  </p>
                  <p>
                    <span className="font-medium">SKU:</span> {singleProductData?.barcode}
                  </p>
                  <p>
                    <span className="font-medium">Unit:</span> {singleProductData?.unitType?.shortform === "pc" ? "Piece" : "Kilogram"}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-gray-900">৳{finalPrice?.toFixed(2)}</span>
                  {singleProductData?.discount > 0 && (
                    <>
                      <span className="text-xl text-gray-500 line-through">৳{singleProductData?.price?.sell?.toFixed(2)}</span>
                      <span className="text-lg font-semibold text-green-600">Save ৳{singleProductData?.discount?.toFixed(2)}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              {singleProductData?.quantity > 0 && (
                <div className="space-y-4">
                  {!isInCart ? (
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button onClick={() => updateQuantity("minus")} className="p-3 hover:bg-gray-100 transition-colors" disabled={quantity <= 1}>
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-3 border-x border-gray-300 font-medium">{quantity}</span>
                        <button onClick={() => updateQuantity("plus")} className="p-3 hover:bg-gray-100 transition-colors" disabled={quantity >= singleProductData?.maxQuantity}>
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={addToCart}
                        className="flex-1 bg-themeColor text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#41b899] transition-colors flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border border-green-300 rounded">
                          <button onClick={() => updateQuantity("minus")} className="p-2 hover:bg-green-100 transition-colors">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 py-2 border-x border-green-300 font-medium">{quantity}</span>
                          <button onClick={() => updateQuantity("plus")} className="p-2 hover:bg-green-100 transition-colors">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-themeColor font-medium">in Cart</span>
                      </div>
                    </div>
                  )}

                  {/* <button className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                    Buy Now
                  </button> */}
                </div>
              )}

              {/* Features */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <Truck className="w-8 h-8 text-blue-600" />
                    <span className="text-sm text-gray-600">Free Delivery</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <Shield className="w-8 h-8 text-green-600" />
                    <span className="text-sm text-gray-600">Warranty</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <RotateCcw className="w-8 h-8 text-purple-600" />
                    <span className="text-sm text-gray-600">Easy Return</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{singleProductData?.description || dummySingleProduct.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-font-32 font-bold text-themeColor leading-none">Some Of Similar Products</h2>
              <div className="flex space-x-2">
                <button onClick={prevSlide} className="group p-2 border border-gray-300 rounded-lg hover:bg-themeColor transition-colors">
                  <ChevronLeft className="w-5 h-5 group-hover:text-white" />
                </button>
                <button onClick={nextSlide} className="group p-2 border border-gray-300 rounded-lg hover:bg-themeColor transition-colors">
                  <ChevronRight className="w-5 h-5 group-hover:text-white" />
                </button>
              </div>
            </div>

            <div className="overflow-hidden">
              <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {relatedProducts.map((product) => (
                  <div key={`related-${product.id || product.barcode}`} className="w-1/4 flex-shrink-0 px-3">
                    <div className="bg-white rounded-lg overflow-hidden group shadow-lg transition-shadow">
                      <div className="relative">
                        {product.discount > 0 && (
                          <div
                            className="absolute top-0 right-0 w-[150px] h-[35px] bg-no-repeat bg-cover text-white text-font-17 font-bold flex items-center justify-end pr-6 pt-1"
                            style={{ backgroundImage: `url(${redRibbon})` }}
                          >
                            {product.discount.toFixed(0)} tk Off
                          </div>
                        )}

                        {/* <img src={product.images?.[0] || notFoundImage} alt="Product Image" className="w-full h-48 object-cover" /> */}
                        <img src={notFoundImage} alt="Product Image" className="w-full h-48 object-cover" />
                      </div>

                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">{product.unitType?.shortform === "pc" ? "Piece" : "Kilogram"}</span>
                        </div>
                        <h3
                          onClick={() => moveToProductDetails(product)}
                          className="card-title text-textColor hover:text-themeColor text-base font-bold mt-2 min-h-[48px] line-clamp-2 leading-6 cursor-pointer"
                        >
                          {product.name
                            ?.split(" ")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")}
                        </h3>

                        {product.discount > 0 ? (
                          <div className="flex justify-start gap-3 items-center pt-2">
                            <div className="price text-themeColor text-lg font-bold leading-normal">Tk. {(product.price.sell - product.discount).toFixed(2)}</div>
                            <del className="text-gray-400 text-sm leading-normal">Tk. {product.price.sell.toFixed(2)}</del>
                          </div>
                        ) : (
                          <div className="flex justify-start gap-2 items-center pt-2">
                            <div className="price text-themeColor text-lg font-bold leading-normal">Tk. {product.price.sell.toFixed(2)}</div>
                          </div>
                        )}
                        <button className="w-full bg-themeColor text-white text-sm font-medium py-2 mt-4 rounded hover:bg-[#41b899]">
                          <i className="fas fa-shopping-basket"></i> Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
