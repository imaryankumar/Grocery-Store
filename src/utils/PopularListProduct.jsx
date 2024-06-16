"use client";
import Image from "next/image";
const PopularListProduct = ({
  id,
  productImage,
  productName,
  productReguPrice,
  productBasePrice,
  productQuantity,
  productCategory,
  productDescr,
  setIsProductDetails,
  setIsModalOpen,
  setProductCount,
  isProductDetails,
  productCount,
}) => {
  const allProductDetails = {
    id,
    productImage,
    productName,
    productReguPrice,
    productBasePrice,
    productQuantity,
    productCategory,
    productDescr,
  };
  // console.log("allProducts", allProductDetails);
  const showProductDetailsHandler = (details) => {
    setIsProductDetails(details);
    setIsModalOpen(true);
    if (details.id === isProductDetails.id) {
      setProductCount(productCount);
    } else {
      setProductCount(1);
    }
  };

  return (
    <div className=" relative w-full h-full border flex items-center justify-center gap-4 rounded shadow cursor-pointer ">
      <div className=" relative py-10 w-full h-full flex flex-col gap-4 items-center justify-center ">
        <Image
          src={productImage}
          width={200}
          height={200}
          alt={productName}
          objectFit="cover"
        />
        <h3 className="text-xl flex gap-2">
          <span>
            <strong>{productName}</strong>
          </span>
          <span>({productQuantity})</span>
        </h3>
        <h4 className="flex gap-3">
          <strong>${productReguPrice}</strong>
          <span>
            {productBasePrice && <span>$</span>}
            {productBasePrice}
          </span>
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
