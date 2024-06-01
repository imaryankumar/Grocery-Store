"use client";
import { useEffect, useRef, useState } from "react";
import PopularItemList from "../../public/json/PopularItemList.json";
import PopularListProduct from "@/utils/PopularListProduct";
import { RxCross2 } from "react-icons/rx";
import { RiShoppingBag3Line } from "react-icons/ri";
import Image from "next/image";
import ProductAddBtn from "@/utils/ProductAddBtn";
const PopularProducts = () => {
  const [isProductDetails, setIsProductDetails] = useState("");
  const [isOpenModal, setIsModalOpen] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    if (isOpenModal) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "auto";
    };
  }, [isOpenModal]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [modalRef]);

  return (
    <div className=" relative w-full h-full py-10">
      <h3 className="text-2xl md:text-3xl font-bold text-[#67b12b]">
        Our Popular Products
      </h3>
      <div className="pt-3 w-full h-full grid grid-cols-1 sm:grid-col-2 md:grid-cols-4 gap-10">
        {PopularItemList.map((item) => {
          return (
            <PopularListProduct
              key={item.id}
              id={item.id}
              productImage={item.productImage}
              productName={item.productName}
              productReguPrice={item.productReguPrice}
              productBasePrice={item.productBasePrice}
              productQuantity={item.productQuantity}
              productCategory={item.productCategory}
              productDescr={item.productDescr}
              setIsProductDetails={setIsProductDetails}
              setIsModalOpen={setIsModalOpen}
            />
          );
        })}
      </div>
      {isOpenModal && (
        <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center">
          <div
            ref={modalRef}
            className="w-[50%] h-[50%] bg-white shadow rounded-lg flex items-center justify-center">
            <div className=" relative w-full h-full p-10">
              <h3
                className="absolute top-3 right-3 text-xl cursor-pointer"
                onClick={() => setIsModalOpen(false)}>
                <RxCross2 />
              </h3>
              <div className="w-full h-full flex items-center justify-between">
                <div className="w-full h-full flex items-start justify-center">
                  <Image
                    src={isProductDetails.productImage}
                    width={350}
                    height={350}
                    alt={isProductDetails.productName}
                    className="bg-slate-200"
                  />
                </div>
                <div className="w-full h-full flex flex-col items-start justify-start gap-3">
                  <div className="flex gap-2">
                    <h2>{isProductDetails.productName}</h2>
                    <span>
                      <strong>({isProductDetails.productQuantity})</strong>
                    </span>
                  </div>
                  <p>{isProductDetails.productDescr}</p>
                  <div className="flex gap-5">
                    {isProductDetails.productBasePrice && (
                      <h3>${isProductDetails.productBasePrice}</h3>
                    )}
                    <span>
                      <strong>${isProductDetails.productReguPrice}</strong>
                    </span>
                  </div>
                  <h3>Quantity ({isProductDetails.productQuantity})</h3>
                  <ProductAddBtn
                    productPrice={isProductDetails.productReguPrice}
                  />
                  <button className="bg-green-500 px-4 py-2 text-white display-flex gap-4 rounded text-xl ">
                    <span className="text-2xl">
                      <RiShoppingBag3Line />
                    </span>
                    <span>Add To Cart</span>
                  </button>
                  <h3>
                    <span>Category: </span>
                    {isProductDetails.productCategory}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularProducts;
