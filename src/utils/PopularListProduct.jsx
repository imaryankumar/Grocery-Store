"use client";
import Image from "next/image";
import { useState } from "react";

const PopularListProduct = ({
  id,
  productImage,
  productName,
  productReguPrice,
  productBasePrice,
  productQuantity,
  productCategory,
}) => {
  const [isOpenProductModal, setIsOpenProductModal] = useState(false);
  const [isProductDetails, setIsProductDetails] = useState("");
  const allProductDetails = {
    id,
    productImage,
    productName,
    productReguPrice,
    productBasePrice,
    productQuantity,
    productCategory,
  };
  const showProductDetailsHandler = (id) => {
    setIsProductDetails(id);
    setIsOpenProductModal(true);
  };

  return (
    <div className=" relative w-full h-full border flex items-center justify-center gap-4 rounded shadow cursor-pointer ">
      <div className=" relative py-10 w-full h-full flex flex-col gap-4 items-center justify-center ">
        <Image src={productImage} width={200} height={200} alt={productName} />
        <h3 className="text-xl flex gap-2">
          <span>
            <strong>{productName}</strong>
          </span>
          <span>({productQuantity})</span>
        </h3>
        <h4 className="flex gap-3">
          <strong>{productReguPrice}</strong>
          <span>{productBasePrice}</span>
        </h4>
        <button
          className="border border-gray-300 px-6 py-2 rounded text-green-500 font-medium text-lg"
          onClick={() => showProductDetailsHandler(allProductDetails)}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default PopularListProduct;
