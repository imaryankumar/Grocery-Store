"use client";
import { useState } from "react";

const ProductAddBtn = ({ productPrice }) => {
  const [productCount, setProductCount] = useState(1);
  return (
    <div className="w-full flex items-center justify-start gap-4 select-none">
      <div className="productadd-btn">
        <span
          onClick={() =>
            setProductCount((prevCount) =>
              prevCount <= 1 ? productCount : prevCount - 1
            )
          }>
          -
        </span>
        <span>{productCount}</span>
        <span onClick={() => setProductCount((prevCount) => prevCount + 1)}>
          +
        </span>
      </div>
      {productCount > 1 && (
        <h3 className="flex gap-3">
          <strong>=</strong>{" "}
          <span>${(productPrice * productCount).toFixed(2)}</span>
        </h3>
      )}
    </div>
  );
};

export default ProductAddBtn;
