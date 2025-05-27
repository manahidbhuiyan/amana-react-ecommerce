import React from "react";

const ProductLoadCard = () => {
  return (
    <div className="card product-card product-load-card w-full flex justify-center items-center bg-themeColor  cursor-pointer 
      h-[400px]"
    >
      <h5 className="mb-0 text-font-17 text-sectionBackground font-semibold">Load More</h5>
    </div>
  );
};

export default ProductLoadCard;
